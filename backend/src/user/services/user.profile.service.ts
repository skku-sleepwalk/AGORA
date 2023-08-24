import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetDownloadHistory } from 'src/entites/asset/asset.download.history.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { CommunityBoard } from 'src/entites/community/community.board.entity';
import { CommunityBoardLike } from 'src/entites/community/community.board.like.entity';
import { CommunityBoardView } from 'src/entites/community/community.board.view.entity';
import { GameBoard } from 'src/entites/game/game.board.entity';
import { GameBoardLike } from 'src/entites/game/game.board.like.entity';
import { GameBoardView } from 'src/entites/game/game.board.view.entity';
import { Game } from 'src/entites/game/game.entity';
import { GameLike } from 'src/entites/game/game.like.entity';
import { Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { UserProfileUploadedGameDto } from '../dto/user.profile.uploaded-game.dto';
import { UserProfileWrittenGameBoardDto } from '../dto/user.profile.written-game-board.dto';
import { UserProfileWrittenCommunityBoardDto } from '../dto/user.profile.written-community-board.dto';
import { User } from 'src/entites/user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(CommunityBoard)
    private readonly communityBoardRepository: Repository<CommunityBoard>,
    @InjectRepository(CommunityBoardLike)
    private readonly communityBoardLikeRepository: Repository<CommunityBoardLike>,
    @InjectRepository(CommunityBoardView)
    private readonly communityBoardViewRepository: Repository<CommunityBoardView>,

    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameLike)
    private readonly gameLikeRepository: Repository<GameLike>,
    @InjectRepository(PlayTime)
    private readonly playtimeRepository: Repository<PlayTime>,

    @InjectRepository(GameBoard)
    private readonly gameBoardRepository: Repository<GameBoard>,
    @InjectRepository(GameBoardLike)
    private readonly gameBoardLikeRepository: Repository<GameBoardLike>,
    @InjectRepository(GameBoardView)
    private readonly gameBoardViewRepository: Repository<GameBoardView>,

    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AssetDownloadHistory)
    private readonly assetDownloadHistoryRepository: Repository<AssetDownloadHistory>,
  ) {}
  async userValidation(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    return user;
  }

  async getChildCount(isGame: boolean, parentId: string): Promise<number> {
    if (!parentId) {
      return 0; // parentId가 제공되지 않으면 0을 반환하여 자식이 없음을 표시합니다.
    }

    let children: any[]; // 하위 게시물들을 담을 배열입니다.
    let count: number; // 하위 게시물들의 개수를 담을 변수입니다.
    // parentId를 가진 하위 게시물들을 조회하고 개수를 세어 반환합니다.
    if (isGame) {
      [children, count] = await this.gameBoardRepository.findAndCount({
        where: { parent: { id: parentId } },
      });
    } else {
      [children, count] = await this.communityBoardRepository.findAndCount({
        where: { parent: { id: parentId } },
      });
    }

    let totalCount = count; // 즉시 하위 항목들의 개수로 totalCount를 초기화합니다.

    // 각 하위 게시물들에 대해 getChildCount를 재귀적으로 호출하여 하위 항목들의 개수를 얻고, 총 개수에 더합니다.
    for (const child of children) {
      const childCount = await this.getChildCount(isGame, child.id);
      totalCount += childCount;
    }

    return totalCount;
  }

  async getGameByUser(userId: string, _cursor: Cursor) {
    const queryBuilder = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.store', 'store')
      .leftJoinAndSelect('store.cost', 'cost')
      .where('game.authorId = :userId', { userId })
      .orderBy('game.createdAt', 'DESC');

    // 페이징 옵션 설정
    const paginationOption: PaginationOptions<Game> = {
      entity: Game,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'DESC',
      },
    };

    // 페이징 처리를 위한 Paginator를 생성합니다.
    const paginator = buildPaginator(paginationOption);

    // 페이징을 적용하여 데이터 조회합니다.
    const { data, cursor } = await paginator.paginate(queryBuilder);

    // 조회된 데이터를 가공하여 수정된 데이터와 cursor를 반환합니다.
    const dataModified = data.map(async (_game) => {
      const { id, store, shortImgUrl } = _game;
      const avgPlaytime = await this.playtimeRepository
        .createQueryBuilder('playtime')
        .where('playtime.gameId = :gameId', { gameId: id })
        .getManyAndCount()
        .then(([playtimes, count]) => {
          return (
            playtimes
              .map((playtime) => playtime.playtime)
              .reduce((acc, current) => acc + current, 0) / count
          );
        });

      const likeCount = await this.gameLikeRepository
        .createQueryBuilder('like')
        .where('like.gameId = :gameId', { gameId: id })
        .getCount();
      const game: UserProfileUploadedGameDto = {
        id,
        shortImgUrl,
        store,
        avgPlaytime,
        likeCount,
      };
      return game;
    });
    // 조회된 데이터를 가공하여 수정된 데이터와 cursor를 반환합니다.
    return { data: dataModified, cursor };
  }

  async getAssetByUser(userId: string, _cursor: Cursor) {
    const user = await this.userValidation(userId);

    const queryBuilder = this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.cost', 'cost')
      .where('asset.authorId = :userId', { userId: user.id });

    const paginationOption: PaginationOptions<Asset> = {
      entity: Asset,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('asset');

    const { data, cursor } = await paginator.paginate(queryBuilder);
    const promises = data.map(async (asset) => {
      const result = await this.assetDownloadHistoryRepository
        .createQueryBuilder('downloadHistory')
        .select('"userId"')
        .addSelect('MIN("createdAt")', 'minCreatedAt')
        .where('"assetId" = :assetId', { assetId: asset.id })
        .groupBy('"userId"')
        .getRawMany();

      return result.length;
    });

    const downloadCounts = await Promise.all(promises);

    const dataModified = data.map((asset, index) => {
      return { ...asset, downloadCount: downloadCounts[index] };
    });

    return { data: dataModified, cursor };
  }

  async getCommunityBoardByUser(userId: string, _cursor: Cursor) {
    const user = await this.userValidation(userId);

    const queryBuilder = this.communityBoardRepository
      .createQueryBuilder('board')
      .where('board.authorId = :userId', { userId: user.id })
      .orderBy('board.createdAt', 'DESC');
    const paginationOption: PaginationOptions<CommunityBoard> = {
      entity: CommunityBoard,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('board');

    const { data, cursor } = await paginator.paginate(queryBuilder);
    const promises = data.map(async (_board) => {
      const { id, title, createdAt, updatedAt } = _board;
      const likeCount = await this.communityBoardLikeRepository
        .createQueryBuilder('like')
        .where('like.boardId = :boardId', { boardId: id })
        .getCount();
      const viewCount = await this.communityBoardViewRepository
        .createQueryBuilder('view')
        .where('view.boardId = :boardId', { boardId: id })
        .getCount();

      const isGame = false;
      const commentCount = await this.getChildCount(isGame, id);

      const board: UserProfileWrittenCommunityBoardDto = {
        id,
        title,
        createdAt,
        updatedAt,
        likeCount,
        viewCount,
        commentCount,
      };
      return board;
    });
    const dataModified = await Promise.all(promises);
    return { data: dataModified, cursor };
  }

  async getGameBoardByUser(userId: string, _cursor: Cursor) {
    const user = await this.userValidation(userId);

    const queryBuilder = this.gameBoardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.game', 'game')
      .where('board.authorId = :userId', { userId: user.id })
      .orderBy('board.createdAt', 'DESC');
    const paginationOption: PaginationOptions<GameBoard> = {
      entity: GameBoard,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('board');
    const { data, cursor } = await paginator.paginate(queryBuilder);
    const promises = data.map(async (_board) => {
      const { id, title, createdAt, updatedAt } = _board;
      const likeCount = await this.gameBoardLikeRepository
        .createQueryBuilder('like')
        .where('like.boardId = :boardId', { boardId: id })
        .getCount();
      const viewCount = await this.gameBoardViewRepository
        .createQueryBuilder('view')
        .where('view.boardId = :boardId', { boardId: id })
        .getCount();

      const isGame = true;
      const commentCount = await this.getChildCount(isGame, id);

      const board: UserProfileWrittenGameBoardDto = {
        id,
        title,
        createdAt,
        updatedAt,
        likeCount,
        viewCount,
        commentCount,
      };
      return board;
    });
    const dataModified = await Promise.all(promises);
    return { data: dataModified, cursor };
  }

  async getDownloadedAsset(userId: string) {
    const user = await this.userValidation(userId);
    const downloadHistory = await this.assetDownloadHistoryRepository
      .createQueryBuilder('downloadHistory')
      .where('downloadHistory.userId = :userId', { userId: user.id })
      .select('"assetId"')
      .addSelect('COUNT(*)', 'downloadCount')
      .groupBy('"assetId"')
      .orderBy('"downloadCount"', 'DESC')
      .getRawMany();

    const assetIds = downloadHistory.map((history) => history.assetId);
    const assets = await this.assetRepository
      .createQueryBuilder('asset')
      .leftJoin('asset.downloadHistories', 'downloadHistory')
      .where('asset.id IN (:...assetIds)', { assetIds })
      .getMany();

    const dataModified = downloadHistory.map((history) => {
      const { fileUrl, ...rest } = assets.find(
        (asset) => asset.id === history.assetId,
      );
      return {
        asset: rest,
        downloadCount: history.downloadCount,
      };
    });
    return dataModified;
  }
}

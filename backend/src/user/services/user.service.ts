import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/common/dto/user.dto';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { Game } from 'src/entites/game/game.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameLike } from 'src/entites/game/game.like.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetDownloadHistory } from 'src/entites/asset/asset.download.history.entity';
import { UserProfileGameDto } from '../dto/user.profile.game.dto';
import { GameDto } from 'src/game/dto/game.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSubscribe)
    private readonly userSubscribeRepository: Repository<UserSubscribe>,
    @InjectRepository(PlayTime)
    private readonly playtimeRepository: Repository<PlayTime>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameLike)
    private readonly gameLikeRepository: Repository<GameLike>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AssetDownloadHistory)
    private readonly assetDownloadHistoryRepository: Repository<AssetDownloadHistory>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException('존재하지 않는 사용자입니다.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }
    return user;
  }

  async postUsers(
    email: string,
    name: string,
    password: string,
    description: string,
  ) {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(user);
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userRepository.save({
      email,
      name,
      password: hashedPassword,
      description,
    });
  }

  async get() {
    const users = await this.userRepository.find();
    users.map(async (user) => {
      const playtimes = await this.playtimeRepository.find({
        where: { user: { id: user.id } },
      });
      const totalPlaytime = playtimes
        .map((playtime) => playtime.playtime)
        .reduce((acc, current) => acc + current, 0);
      return { ...user, totalPlaytime };
    });
    return users;
  }

  async getMe(userEmail: string) {
    const user: UserDto = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    const playtimes = await this.playtimeRepository.find({
      where: { user: { id: user.id } },
      relations: ['game'],
    });
    const totalPlaytime = playtimes
      .map((playtime) => playtime.playtime)
      .reduce((acc, current) => acc + current, 0);
    user.totalPlaytime = totalPlaytime;
    user.playtimes = playtimes.map((playtime) => ({
      game: playtime.game,
      playtime: playtime.playtime,
    }));
    return user;
  }

  async getUser(id: string) {
    const user: UserDto = await this.userRepository.findOne({ where: { id } });

    const playtimes = await this.playtimeRepository.find({
      where: { user: { id: user.id } },
      relations: ['game'],
    });
    const totalPlaytime = playtimes
      .map((playtime) => playtime.playtime)
      .reduce((acc, current) => acc + current, 0);
    user.totalPlaytime = totalPlaytime;
    user.playtimes = playtimes.map((playtime) => ({
      game: playtime.game,
      playtime: playtime.playtime,
    }));

    const currentAt = new Date();
    const remainPlayTime = (
      await this.userSubscribeRepository
        .createQueryBuilder('subscribe')
        .leftJoinAndSelect('subscribe.user', 'user')
        .where('user.email = :userEmail', { userEmail: user.email })
        .andWhere('subscribe.startAt < :currentAt', { currentAt })
        .andWhere('subscribe.endAt > :currentAt', { currentAt })
        .andWhere('subscribe.remainPlayTime > 0')
        .orderBy('subscribe.createdAt', 'DESC')
        .getOne()
    ).remainPlayTime;

    user.remainPlaytime = remainPlayTime;
    return user;
  }

  // MyPage 구현 시 필요한 API

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
        limit: 5,
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
      const game: UserProfileGameDto = {
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
    const queryBuilder = this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.cost', 'cost')
      .where('asset.authorId = :userId', { userId });

    const paginationOption: PaginationOptions<Asset> = {
      entity: Asset,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 6,
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
}

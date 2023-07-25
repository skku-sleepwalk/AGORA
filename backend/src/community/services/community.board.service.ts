import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityCategory } from 'src/entites/community.category.entity';
import { User } from 'src/entites/user.entity';

@Injectable()
export class CommunityBoardService {
  constructor(
    @InjectRepository(CommunityBoard)
    private communityBoardRepository: Repository<CommunityBoard>,
    private dataSource: DataSource,
  ) {}

  async createBoard(
    userEmail: string,
    title: string,
    content: string,
    categoryNames: Array<string>,
    parentId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const { password, ...author }: User = await queryRunner.manager
      .getRepository(User)
      .findOne({
        where: { email: userEmail },
      });
    if (!author) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            writerEmail: `이메일이 ${userEmail}인 사용자를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const parent: CommunityBoard = await queryRunner.manager
        .getRepository(CommunityBoard)
        .findOne({ where: { id: parentId } });
      const newBoard: CommunityBoard = await queryRunner.manager
        .getRepository(CommunityBoard)
        .save({ author, title, content, parent });

      const promises = Object.keys(categoryNames).map(async (categoryName) => {
        const genre = await queryRunner.manager
          .getRepository(CommunityCategory)
          .findOne({
            where: {
              name: categoryName,
            },
          });
        if (!genre) {
          return await queryRunner.manager
            .getRepository(CommunityCategory)
            .save({ name: categoryName });
        } else {
          return genre;
        }
      });

      const Categories: CommunityCategory[] = await Promise.all(promises);
      newBoard.categories.push(...Categories);
    } catch (error) {
    } finally {
      await queryRunner.release();
    }
  }
}

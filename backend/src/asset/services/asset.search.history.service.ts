import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetSearchHistory } from 'src/entites/asset/asset.search.history.entity';
import { User } from 'src/entites/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AssetSearchHistoryService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(AssetSearchHistory)
    private readonly assetSearchHistoryRepository: Repository<AssetSearchHistory>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userEmail: string, keyword: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      return null;
    }

    const newHistory = this.assetSearchHistoryRepository.create({
      user,
      keyword,
    });
    await this.assetSearchHistoryRepository.save(newHistory);
  }

  async getHistory(userEmail: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      return null;
    }
    const histories = await this.assetSearchHistoryRepository
      .createQueryBuilder('history')
      .where('history.user = :user', { user: user.id })
      .orderBy('history.createdAt', 'DESC')
      .getMany();

    const uniqueHistoriesMap = new Map<string, AssetSearchHistory>();

    // Loop through the searchList and update the uniqueSearchHistoriesMap
    for (const search of histories) {
      const existingSearch = uniqueHistoriesMap.get(search.keyword);
      if (!existingSearch || search.createdAt > existingSearch.createdAt) {
        uniqueHistoriesMap.set(search.keyword, search);
      }
    }

    const uniqueHistories = Array.from(uniqueHistoriesMap.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5); // Get the first 5 entries

    return uniqueHistories;
  }

  async delete(userEmail: string, keyword: string) {
    const searches = await this.assetSearchHistoryRepository.find({
      where: { keyword, user: { email: userEmail } },
    });
    if (searches.length === 0) {
      throw new NotFoundException('검색 기록을 찾을 수 없습니다.');
    }
    searches.map(async (search) => {
      await this.assetSearchHistoryRepository.softDelete(search.id);
    });
  }

  async deleteAll(userEmail: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      return null;
    }

    await this.entityManager
      .createQueryBuilder()
      .update(AssetSearchHistory)
      .set({ deletedAt: new Date() }) // Set the deletedAt timestamp
      .where('user = :userId', { userId: user.id })
      .execute();
  }
}

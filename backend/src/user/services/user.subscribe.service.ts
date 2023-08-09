import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSubscribeService {
  constructor(
    @InjectRepository(UserSubscribe)
    private readonly userSubscribeRepository: Repository<UserSubscribe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async subscribe(userEmail: string, remainPlayTime: number, duration: number) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const startAt = new Date();
    const endAt = startAt.setDate(startAt.getDate() + duration);
    return this.userSubscribeRepository.save({
      user,
      remainPlayTime,
      startAt,
      endAt,
    });
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/common/dto/user.dto';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PlayTime)
    private readonly playtimeRepository: Repository<PlayTime>,
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
    return user;
  }
}

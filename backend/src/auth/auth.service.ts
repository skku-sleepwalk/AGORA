// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import bcrypt from 'bcrypt';
// import { User } from 'src/entites/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//   ) {}

//   async validateUser(email: string, password: string) {
//     const user = await this.userRepository.findOne({
//       where: { email },
//       select: ['id', 'email', 'password'],
//     });
//     console.log(email, password, user);
//     if (!user) {
//       return null;
//     }
//     const result = await bcrypt.compare(password, user.password);
//     if (result) {
//       const { password, ...userWithoutPassword } = user;
//       return userWithoutPassword;
//     }
//     return null;
//   }
// }

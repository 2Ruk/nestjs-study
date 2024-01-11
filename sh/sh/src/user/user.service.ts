import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '@api/auth/auth.service';
import { UserRepository } from '@api/user/user.repository';
import { User } from '@api/user/entities/user.entity';
import { LoginDto } from '@api/user/dto/login.dto';
import { ReadOneUserDto } from '@api/user/dto/read-one-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // NOTE: 유저 이름 검색 후 중복시 에러
    const findUser = await this.findOne(createUserDto.userName);
    if (findUser) throw new BadRequestException('이미 존재하는 유저입니다.');

    // NOTE: 비밀번호 암호화
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );

    // NOTE: 유저 생성
    // TODO: DB에 저장
    const user = User.create({
      username: createUserDto.userName,
      password: hashedPassword,
    });
    await this.userRepository.createUser(user);

    // NOTE: JWT 토큰 생성
    return {
      result: true,
    };
  }

  async loginUser({ userName, password }: LoginDto): Promise<string> {
    // NOTE: 유저 이름 검색 후 중복시 에러
    const user = await this.findOne(userName);
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    // NOTE: 비밀번호 검증
    const isPasswordValid = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new BadRequestException('로그인 정보를 확인해주세요.');

    return this.authService.signJWT({
      userName: user.username,
      id: user.id,
    });
  }

  async findOneUser(userName: string): Promise<ReadOneUserDto> {
    const user = await this.findOne(userName);
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');
    return {
      id: user.id,
      userName: user.username,
      updatedAt: user.updated_at,
      createdAt: user.created_at,
    };
  }

  async findOne(userName: string): Promise<User> {
    return await this.userRepository.findOneBy({
      username: userName,
    });
  }
}

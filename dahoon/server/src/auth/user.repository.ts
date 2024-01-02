import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    const UserRepository = dataSource.getRepository(User);
    super(
      UserRepository.target,
      UserRepository.manager,
      UserRepository.queryRunner,
    );
  }

  async createUser(authCredentailDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentailDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}

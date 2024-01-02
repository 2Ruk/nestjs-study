import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '안녕하세요.',
  password: '비밀번호가_올라간_것_같죠?',
  database: 'test',
  entities: [__dirname+'/../**/*.entity.{js,ts}'],
  synchronize: true
}
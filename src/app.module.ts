import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extable } from './entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'minsu1234',
    database: 'exampledb',
    entities: [Extable],
    synchronize: true, // 개발 환경에서만 true로 설정, 프로덕션에서는 false로 설정
  }),
  TypeOrmModule.forFeature([Extable]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

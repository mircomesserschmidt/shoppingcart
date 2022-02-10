import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from '../entities/Contents';
import { ShoppingCart } from '../entities/ShoppingCart';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'shoppingcart',
      entities: [Contents, ShoppingCart],
      dropSchema: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ShoppingCart]),
    TypeOrmModule.forFeature([Contents])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

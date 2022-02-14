import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await createDatabase({ ifNotExist: true, charset: "utf8mb4_general_ci", characterSet: "utf8mb4" }, {
  //   type: 'mysql',
  //   host: 'localhost',
  //   port: 3306,
  //   username: 'root',
  //   password: 'password',
  //   database: 'shoppingcar'
  // });

  await app.listen(3000);
}
bootstrap();

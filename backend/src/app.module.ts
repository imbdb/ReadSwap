import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    BooksModule,
    ExchangesModule,
    AuthModule,
    JwtAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

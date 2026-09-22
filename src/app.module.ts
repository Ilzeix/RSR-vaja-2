import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { GenresModule } from './genres/genres.module';
import { LoansModule } from './loans/loans.module';
import { ReviewsModule } from './reviews/reviews.module';
import { HealthController } from './health/health.controller';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH ?? 'app.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthorsModule,
    BooksModule,
    MembersModule,
    GenresModule,
    LoansModule,
    ReviewsModule,
  ],
  controllers: [HealthController],
  providers: [SeedService],
})
export class AppModule {}

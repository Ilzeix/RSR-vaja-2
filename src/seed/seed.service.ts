import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';

// Loads seed.json into an empty database on startup.
const TABLES: Record<string, string> = {
  authors: 'Author',
  books: 'Book',
  members: 'Member',
  genres: 'Genre',
  loans: 'Loan',
  reviews: 'Review',
};

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if ((await this.dataSource.getRepository('Author').count()) > 0) return;
    const seed = JSON.parse(readFileSync('seed.json', 'utf8'));
    for (const [key, entity] of Object.entries(TABLES)) {
      await this.dataSource.getRepository(entity).insert(seed[key] ?? []);
    }
  }
}

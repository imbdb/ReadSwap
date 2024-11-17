import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly db: DatabaseService) {}

  async create(createBookDto: Prisma.BookCreateInput) {
    return this.db.book.create({ data: createBookDto });
  }

  async findAll() {
    return this.db.book.findMany();
  }

  async findOne(id: number) {
    return this.db.book.findUnique({ where: { id } });
  }

  async update(id: number, updateBookDto: Prisma.BookUpdateInput) {
    return this.db.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    return this.db.book.delete({ where: { id } });
  }
}

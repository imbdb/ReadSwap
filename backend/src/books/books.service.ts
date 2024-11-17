import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: any, createBookDto: Partial<Prisma.BookCreateInput>) {
    const user = await this.db.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    createBookDto.user = { connect: { id: user.id } };
    return this.db.book.create({
      data: createBookDto as Prisma.BookCreateInput,
    });
  }

  async findAll(search: string) {
    if (!search) {
      return this.db.book.findMany({
        where: {
          wishlist: false,
        },
      });
    }
    return this.db.book.findMany({
      where: {
        OR: [{ title: { contains: search } }],
      },
    });
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

  async findByOwner(ownerId: number) {
    return this.db.book.findMany({ where: { userId: ownerId } });
  }
}

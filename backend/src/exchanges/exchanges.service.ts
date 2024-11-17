import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExchangesService {
  constructor(private readonly db: DatabaseService) {}
  create(createExchangeDto: Prisma.ExchangeCreateInput) {
    return this.db.exchange.create({ data: createExchangeDto });
  }

  findAll() {
    return this.db.exchange.findMany();
  }

  findOne(id: number) {
    return this.db.exchange.findUnique({ where: { id } });
  }

  update(id: number, updateExchangeDto: Prisma.ExchangeUpdateInput) {
    return this.db.exchange.update({
      where: { id },
      data: updateExchangeDto,
    });
  }

  remove(id: number) {
    return this.db.exchange.delete({ where: { id } });
  }
}

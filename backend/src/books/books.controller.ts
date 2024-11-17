import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() createBookDto: Prisma.BookCreateInput) {
    const { user } = req;
    return this.booksService.create(user.id, createBookDto);
  }

  @Get('all')
  findAll(@Query('search') search: string) {
    return this.booksService.findAll(search);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req) {
    const { user } = req;
    return this.booksService.findByOwner(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: Prisma.BookUpdateInput,
  ) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}

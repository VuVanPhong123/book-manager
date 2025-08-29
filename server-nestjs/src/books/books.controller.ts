import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.booksService.findAll(page, limit);
  }

  @Get('search')
  search(@Query() searchBookDto: SearchBookDto) {
    return this.booksService.search(searchBookDto);
  }

  @Get(':asin')
  findOne(@Param('asin') asin: string) {
    return this.booksService.findOne(asin);
  }

  @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createBookDto: CreateBookDto) {
    console.log('CREATE BOOK received:', createBookDto);
    try {
        const result = await this.booksService.create(createBookDto);
        console.log('CREATE BOOK success:', result);
        return result;
    } catch (error) {
        console.error('CREATE BOOK error:', error);
        throw error;
    }
    }

  @Put(':asin') 
  @UseGuards(JwtAuthGuard)
  update(@Param('asin') asin: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(asin, updateBookDto);
  }

  @Delete(':asin')
  @UseGuards(JwtAuthGuard)
  remove(@Param('asin') asin: string) {
    return this.booksService.remove(asin);
  }
}
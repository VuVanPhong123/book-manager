import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';

function generateASIN(): string {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const books = await this.bookModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.bookModel.countDocuments();

    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books,
    };
  }

  async search(searchBookDto: SearchBookDto) {
    const { search, categories, page = 1, limit = 10 } = searchBookDto;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    if (categories && categories.length > 0) {
      query.categories = { $in: categories };
    }

    const books = await this.bookModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.bookModel.countDocuments(query);

    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books,
    };
  }

  async findOne(asin: string) {
    const book = await this.bookModel.findOne({ asin });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const { asin, title } = createBookDto;

    // Check if book already exists
    const existingBook = await this.bookModel.findOne({
      $or: [{ asin }, { title }],
    });

    if (existingBook) {
      throw new ConflictException('Book with this ASIN or title already exists');
    }

    const book = new this.bookModel({
      ...createBookDto,
      asin: asin || generateASIN(),
    });

    return await book.save();
  }

  async update(asin: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookModel.findOne({ asin });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    Object.assign(book, updateBookDto);
    return await book.save();
  }

  async remove(asin: string) {
    const book = await this.bookModel.findOne({ asin });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.bookModel.deleteOne({ _id: book._id });
    return { message: 'Book deleted successfully', deletedBook: { asin: book.asin, title: book.title } };
  }
}
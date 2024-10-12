import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}
  
  async create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return await createdBook.save();
  }

  async findAll() {
    return await  this.bookModel.find().exec();
  }

  async findOne(id: string) {
    return await this.bookModel.findById(id).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.bookModel.updateOne({_id: id}, updateBookDto).exec();
    
  }

  async destroy(id: string): Promise<{ deletedCount?: number }> {
    return await this.bookModel.deleteOne({_id: id}).exec();
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    date: Date;

    @Prop()
    isbn: string;

}

export const BookSchema = SchemaFactory.createForClass(Book);
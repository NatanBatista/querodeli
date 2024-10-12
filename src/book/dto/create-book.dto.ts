import { IsDateString, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDateString()
    date: string;

    @IsString()
    isbn: string;
}

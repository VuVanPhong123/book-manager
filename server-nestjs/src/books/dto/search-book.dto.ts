import { IsOptional, IsString, IsArray } from 'class-validator';

export class SearchBookDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsArray()
  categories: string[];

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
import { IsOptional, IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @IsOptional()
  @IsString()
  asin?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  rating?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : Number(value))
  @IsNumber()
  reviews_count?: number;

  @IsOptional()
  @IsString()
  availability?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : Number(value)) // <-- Convert empty string to undefined
  @IsNumber()
  final_price?: number;

  @IsOptional()
  @IsString()
  item_weight?: string;

  @IsOptional()
  @IsString()
  product_dimensions?: string;

  @IsOptional()
  @IsArray()
  categories?: string[];

  @IsOptional()
  @IsArray()
  format?: any[];

  @IsOptional()
  @IsArray()
  delivery?: string[];

  @IsOptional()
  @IsArray()
  best_sellers_rank?: any[];
}
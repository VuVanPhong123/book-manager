import { 
  IsEmail, 
  IsString, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsIn, 
  IsInt, 
  Matches,
  Min,
  Max 
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : parseInt(value, 10))
  @IsInt()
  @Min(1) 
  @Max(300) 
  age?: number;

  @IsOptional()
  @Matches(/^[0-9]{8,15}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  socialId?: string;
}
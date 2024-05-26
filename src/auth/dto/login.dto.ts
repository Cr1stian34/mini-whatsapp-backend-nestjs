import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  isNotEmpty,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

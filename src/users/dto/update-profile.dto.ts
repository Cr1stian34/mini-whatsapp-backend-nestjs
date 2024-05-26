import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  username?: string;

  // @IsString()
  profilePicture?: string;

  // @IsString()
  status?: string;
}

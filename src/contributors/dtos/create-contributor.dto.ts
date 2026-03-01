import { IsString } from 'class-validator';

export class CreateContributorDto {
  @IsString()
  name: string;
}

import { IsMongoId } from 'class-validator';

export class FindOneContributorDto {
  @IsMongoId()
  id: string;
}

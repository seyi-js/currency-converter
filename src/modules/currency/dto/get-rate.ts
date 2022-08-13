import { IsNotEmpty, IsString } from 'class-validator';

export class GetRateDTO {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  destination: string;
}

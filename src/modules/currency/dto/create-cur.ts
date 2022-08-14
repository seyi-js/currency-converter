import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCurrencyDTO {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;
}

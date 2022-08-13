import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCurrencyDTO {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  rate: number;
}

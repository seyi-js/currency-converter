import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRateDTO {
  @IsNotEmpty()
  @IsNumber()
  rate: number;
}

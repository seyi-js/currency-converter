import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import {
  ConvertDTO,
  CreateCurrencyDTO,
  GetRateDTO,
  UpdateRateDTO,
} from './dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @Post('/')
  async createCurrency(@Body() payload: CreateCurrencyDTO) {
    const currency = await this.service.createCurrency(payload);

    return {
      message: 'Currency created successfully',
      currency,
    };
  }

  @Get('/rate')
  async getRate(@Query() payload: GetRateDTO) {
    const currency = await this.service.getRate(payload);

    return {
      message: 'Currency rate retrieved successfully',
      currency,
    };
  }

  @Get('/convert')
  async convert(@Query() payload: ConvertDTO) {
    const currency = await this.service.convert(payload);

    return {
      message: 'Currency converted successfully',
      currency,
    };
  }

  @Get('/')
  async all() {
    const currencies = await this.service.find();

    return {
      message: 'Currencies retrieved successfully',
      currencies,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.service.delete({ _id: id });

    return {
      message: 'Currency rate deleted successfully',
    };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateRateDTO) {
    const rate = await this.service.update(id, payload);

    return {
      message: 'Currency rate updated successfully',
      rate,
    };
  }
}

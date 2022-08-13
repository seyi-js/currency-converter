import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertDTO, CreateCurrencyDTO, GetRateDTO } from './dto';

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
}

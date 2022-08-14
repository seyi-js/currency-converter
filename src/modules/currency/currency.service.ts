import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrencyDocument } from './currency.schema';
import { ConvertDTO, CreateCurrencyDTO, GetRateDTO } from './dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel('Currency') private readonly model: Model<CurrencyDocument>,
  ) {}

  async createCurrency(payload: CreateCurrencyDTO) {
    const { source, destination } = payload;

    await this.isExist(source, destination);

    return await this.model.create(payload);
  }

  async getRate(payload: GetRateDTO) {
    const currency = await this.findOne(payload);

    return currency;
  }

  async convert(payload: ConvertDTO) {
    const { source, destination, amount } = payload;

    const currency = await this.findOne({ source, destination });

    return {
      ...payload,
      conversion: amount * currency.rate,
    };
  }

  async find(payload?: any) {
    return await this.model.find(payload);
  }

  async findOne(payload: any) {
    const currency = await this.model.findOne(payload);

    if (!currency) {
      throw new NotFoundException('Currency record not found');
    }

    return currency;
  }

  async update(id: string, payload: any) {
    return await this.model.findByIdAndUpdate(id, payload, { new: true });
  }

  async delete(payload: any) {
    return await this.model.deleteOne(payload);
  }

  private async isExist(source: string, destination: string) {
    const currency = await this.model.findOne({ source, destination });

    if (currency) {
      throw new ConflictException('Currency record already exists');
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { AppSpecModule } from '../../../app.module.spec.test';
import { CurrencyService } from '../currency.service';

jest.setTimeout(10000);

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppSpecModule],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let id: string;

  describe('createCurrency', () => {
    it('should create a currency', async () => {
      const payload = {
        source: 'USD',
        destination: 'NGN',
        rate: 500,
      };

      const currency = await service.createCurrency(payload);

      id = currency._id;

      expect(currency.source).toBe(payload.source);
      expect(currency.destination).toBe(payload.destination);
      expect(currency.rate).toBe(payload.rate);
    });
  });

  describe('getRate', () => {
    it('should get the rate for a currency pair', async () => {
      const result = await service.getRate({
        source: 'USD',
        destination: 'NGN',
      });

      expect(result.rate).toBe(500);
    });
  });

  describe('convert', () => {
    it('should convert a certain amount', async () => {
      const result = await service.convert({
        source: 'USD',
        destination: 'NGN',
        amount: 1000,
      });

      expect(result.conversion).toBe(500000);
    });
  });

  describe('update', () => {
    it('should update a currency rate', async () => {
      const payload = {
        rate: 1000,
      };

      const result = await service.update(id, payload);

      expect(result.rate).toBe(1000);
    });
  });

  describe('delete', () => {
    it('should delete a currency', async () => {
      const result = await service.delete({ _id: id });

      expect(result.deletedCount).toBe(1);
    });
  });
});

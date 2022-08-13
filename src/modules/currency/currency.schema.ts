import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Currency {
  @Prop({
    required: true,
    type: String,
  })
  source: string;

  @Prop({
    required: true,
    type: String,
  })
  destination: string;

  @Prop({
    required: true,
    type: Number,
  })
  rate: number;
}

const CurrencySchema = SchemaFactory.createForClass(Currency);

CurrencySchema.loadClass(Currency);

export { CurrencySchema };

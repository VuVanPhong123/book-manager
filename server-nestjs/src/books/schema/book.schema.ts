import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Format {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  url: string;
}

class BestSellersRank {
  @Prop()
  category: string;

  @Prop()
  rank: number;
}

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true, unique: true })
  asin: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: 'N/A' })
  description: string;

  @Prop({ default: 'N/A' })
  brand: string;

  @Prop()
  image_url: string;

  @Prop({ default: 'NA' })
  rating: string;

  @Prop({ default: 0 })
  reviews_count: number;

  @Prop()
  availability: string;

  @Prop()
  final_price: number;

  @Prop()
  item_weight: string;

  @Prop()
  product_dimensions: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: [Format], default: [] })
  format: Format[];

  @Prop({ type: [String], default: [] })
  delivery: string[];

  @Prop({ type: [BestSellersRank], default: [] })
  best_sellers_rank: BestSellersRank[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
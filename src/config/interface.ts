import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface IAppConfig {
  port: number;
  environment: 'development' | 'production';
}

export interface IDatabaseConfig {
  mongodb: IMongoDBAttributes;
}

export interface IMongoDBAttributes {
  development: MongooseModuleOptions;
  staging: MongooseModuleOptions;
  test: MongooseModuleOptions;
  production: MongooseModuleOptions;
}

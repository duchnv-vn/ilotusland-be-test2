import { ConnectOptions, Types as MongooseTypes } from 'mongoose';
import { CollectionName, ModelName } from '../../common/enum/collection';

export namespace MongoDatabase {
  export type ConfigOptions = ConnectOptions;
  export type FeatureModuleOptions = {
    provide: ModelName;
    collection?: CollectionName;
    schema: any;
  };
}

export { MongooseTypes };

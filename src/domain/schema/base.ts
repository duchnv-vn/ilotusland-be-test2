export interface IBaseSchemaCommon {
  _id: number;
}

export interface IBaseSchema extends IBaseSchemaCommon {
  createdAt: Date;
  updatedAt: Date;
}

export interface AttachedFile {
  name: string;
  type: string;
  url: string;
}

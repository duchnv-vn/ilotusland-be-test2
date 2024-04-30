import { PipelineStage } from 'mongoose';
import { CollectionName } from '../../../../common/enum/collection';

type LookupCustomerProp = {
  propName: string;
  localField: string;
  foreignField?: string;
};

export const lookupCustomerPipelineBuilder = (
  props: LookupCustomerProp,
): PipelineStage[] => {
  const { propName, localField, foreignField = '_id' } = props;

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: CollectionName.CUSTOMER,
        as: propName,
        foreignField,
        localField,
      },
    },
    {
      $unwind: {
        path: `$${propName}`,
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  return pipeline;
};

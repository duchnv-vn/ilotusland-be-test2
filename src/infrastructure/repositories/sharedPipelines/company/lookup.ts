import { PipelineStage } from 'mongoose';
import { CollectionName } from '../../../../common/enum/collection';

type LookupCompanyProp = {
  propName: string;
  localField: string;
  foreignField?: string;
};

export const lookupCompanyPipelineBuilder = (
  props: LookupCompanyProp,
): PipelineStage[] => {
  const { propName, localField, foreignField = '_id' } = props;

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: CollectionName.COMPANY,
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

import { PipelineStage } from 'mongoose';
import { CollectionName } from '../../../../common/enum/collection';

type LookupUserProp = {
  propName: string;
  localField: string;
  foreignField?: string;
};

export const lookupUserPipelineBuilder = (
  props: LookupUserProp,
): PipelineStage[] => {
  const { propName, localField, foreignField = '_id' } = props;

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: CollectionName.USER,
        as: propName,
        foreignField,
        localField,
        pipeline: [{ $project: { password: 0 } }],
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

import { PipelineStage } from 'mongoose';
import { lookupUserPipelineBuilder } from '../user/lookup';
import { lookupCompanyPipelineBuilder } from '../company/lookup';
import { lookupCustomerPipelineBuilder } from '../customer/lookup';

type Props = {
  taskId: number;
};

export const findTicketByIdPiplineBuilder = (props: Props): PipelineStage[] => {
  const { taskId } = props;

  const asigneeProp = 'asignee';
  const reporterProp = 'reporter';
  const companyProp = 'company';
  const customerProp = 'customer';
  const createdByProp = 'createdUser';
  const lookupUserPayloads = [
    {
      propName: asigneeProp,
      localField: 'asigneeId',
    },
    {
      propName: reporterProp,
      localField: 'reporterId',
    },
    {
      propName: createdByProp,
      localField: 'createdBy',
    },
  ];

  const pipeline: PipelineStage[] = [
    {
      $match: { _id: taskId },
    },
  ];

  lookupUserPayloads.forEach((payload) => {
    pipeline.push(...lookupUserPipelineBuilder(payload));
  });

  pipeline.push(
    ...lookupCompanyPipelineBuilder({
      propName: companyProp,
      localField: 'companyId',
    }),
  );

  pipeline.push(
    ...lookupCustomerPipelineBuilder({
      propName: customerProp,
      localField: 'customerId',
    }),
  );

  pipeline.push(
    ...[
      {
        $project: {
          asigneeId: 0,
          reporterId: 0,
          companyId: 0,
          customerId: 0,
          createdBy: 0,
        },
      },
    ],
  );

  return pipeline;
};

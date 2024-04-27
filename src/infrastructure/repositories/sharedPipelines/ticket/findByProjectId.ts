import { PipelineStage } from 'mongoose';
import { lookupUserPipelineBuilder } from '../user/lookup';
import { lookupCompanyPipelineBuilder } from '../company/lookup';
import { lookupCustomerPipelineBuilder } from '../customer/lookup';

type Props = {
  projectId: number;
  deleteFlag?: boolean;
  isGetAsigneeDetail?: boolean;
  isGetReporterDetail?: boolean;
  isGetCreatedByDetail?: boolean;
  isGetCustomerDetail?: boolean;
  isGetCompanyDetail?: boolean;
  includeAttributes?: Record<string, 0 | 1>;
};

export const findTicketsByProjectPiplineBuilder = (
  props: Props,
): PipelineStage[] => {
  const {
    projectId,
    deleteFlag = 0,
    isGetAsigneeDetail,
    isGetCompanyDetail,
    isGetCreatedByDetail,
    isGetCustomerDetail,
    isGetReporterDetail,
    includeAttributes = {},
  } = props;

  const asigneeProp = 'asignee';
  const reporterProp = 'reporter';
  const companyProp = 'company';
  const customerProp = 'customer';
  const createdByProp = 'createdUser';
  const lookupUserPayloads = [
    {
      propName: asigneeProp,
      localField: 'asigneeId',
      isGet: isGetAsigneeDetail,
    },
    {
      propName: reporterProp,
      localField: 'reporterId',
      isGet: isGetReporterDetail,
    },
    {
      propName: createdByProp,
      localField: 'createdBy',
      isGet: isGetCreatedByDetail,
    },
  ];

  const pipeline: PipelineStage[] = [];

  pipeline.push({
    $match: {
      projectId,
      deleteFlag,
    },
  });

  lookupUserPayloads.forEach(({ isGet, ...payload }) => {
    isGet && pipeline.push(...lookupUserPipelineBuilder(payload));
  });

  isGetCompanyDetail &&
    pipeline.push(
      ...lookupCompanyPipelineBuilder({
        propName: companyProp,
        localField: 'companyId',
      }),
    );

  isGetCustomerDetail &&
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
          ...includeAttributes,
          ...(isGetAsigneeDetail && { [asigneeProp]: 1 }),
          ...(isGetReporterDetail && { [reporterProp]: 1 }),
          ...(isGetCompanyDetail && { [companyProp]: 1 }),
          ...(isGetCustomerDetail && { [customerProp]: 1 }),
          ...(isGetCreatedByDetail && { [createdByProp]: 1 }),
        },
      },
      {
        $project: {
          ...(isGetAsigneeDetail && { asigneeId: 0 }),
          ...(isGetReporterDetail && { reporterId: 0 }),
          ...(isGetCompanyDetail && { companyId: 0 }),
          ...(isGetCustomerDetail && { customerId: 0 }),
          ...(isGetCreatedByDetail && { createdBy: 0 }),
        },
      },
    ],
  );

  return pipeline;
};

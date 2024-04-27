import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../../infrastructure/repositories/ticket/ticket.repository';
import { FindTicketsByProjectBoard } from '../../common/type/ticket.type';
import { ProjectMemberRepository } from '../../infrastructure/repositories/projectMember/projectMember.repository';
import { ProjectRepository } from '../../infrastructure/repositories/project/project.repository';
import { RequestExceptionEnum } from '../../common/enum/exception';
import { Ticket } from '../../domain/schema/ticket/ticket.interface';

type ValidateUpdatePayload = {
  asigneeId: number;
  reporterId: number;
  projectId: number;
  ticketId: number;
  stageId: number;
  requestTypeId: number;
};

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly projectMemberRepository: ProjectMemberRepository,
  ) {}

  async findManyByProjectId(
    projectId: number,
  ): Promise<FindTicketsByProjectBoard[]> {
    const data = await this.ticketRepository.findTicketsByProjectBoard(
      projectId,
    );
    return data;
  }

  async validateUserInProject(
    userId: number,
    projectId: number,
  ): Promise<boolean> {
    const isExit = await this.projectMemberRepository.checkExistBy({
      projectId,
      userId,
    });
    return isExit;
  }

  async validateTaskInProject(
    taskId: number,
    projectId: number,
  ): Promise<boolean> {
    const isExit = await this.ticketRepository.checkExistBy({
      _id: taskId,
      projectId,
    });
    return isExit;
  }

  async validateValidStageOfProject(stageId: number, projectId: number) {
    const isExit = await this.projectRepository.checkStageExist(
      projectId,
      stageId,
    );
    return isExit;
  }

  async validateValidRequestTypeOfProject(
    requestTypeId: number,
    projectId: number,
  ) {
    const isExit = await this.projectRepository.checkRequestTypeExist(
      projectId,
      requestTypeId,
    );
    return isExit;
  }

  async validateUpdatePayload(props: ValidateUpdatePayload): Promise<string> {
    const {
      asigneeId,
      reporterId,
      projectId,
      ticketId,
      requestTypeId,
      stageId,
    } = props;

    const validations = {
      assigneeInProject: {
        isSkip: !asigneeId,
        errorMessage: RequestExceptionEnum.ASIGNEE_NOT_IN_PROJECT,
        handler: () => this.validateUserInProject(asigneeId, projectId),
      },
      reporterInProject: {
        isSkip: !reporterId,
        errorMessage: RequestExceptionEnum.REPORTER_NOT_IN_PROJECT,
        handler: () => this.validateUserInProject(reporterId, projectId),
      },
      TicketInProject: {
        isSkip: false,
        errorMessage: RequestExceptionEnum.TICKET_NOT_IN_PROJECT,
        handler: () => this.validateTaskInProject(ticketId, projectId),
      },
      validStage: {
        isSkip: !stageId,
        errorMessage: RequestExceptionEnum.STAGE_NOT_IN_PROJECT,
        handler: () => this.validateValidStageOfProject(stageId, projectId),
      },
      validRequestType: {
        isSkip: !requestTypeId,
        errorMessage: RequestExceptionEnum.REQUEST_TYPE_NOT_IN_PROJECT,
        handler: () =>
          this.validateValidRequestTypeOfProject(requestTypeId, projectId),
      },
    };

    for (const { handler, errorMessage, isSkip } of Object.values(
      validations,
    )) {
      if (isSkip) continue;
      const isValid = await handler();
      if (!isValid) return errorMessage;
    }
    return '';
  }

  async update(ticketId: number, payload: Partial<Ticket>) {
    const result = await this.ticketRepository.update(
      { _id: ticketId },
      payload,
    );
    return result.toObject();
  }
}

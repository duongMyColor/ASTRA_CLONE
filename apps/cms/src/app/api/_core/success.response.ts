'use strict';

// import { logger } from '@repo/lib/logger';
import { StatusCodes, ReasonPhrases } from './httpStatusCode';
import { ResponseIF } from '@repo/types/response';

class SuccessResponse implements ResponseIF {
  message: string;
  status: number;
  reason: string;
  metadata: object;
  count?: number | undefined;

  constructor({ message, status, reason, metadata, count }: ResponseIF) {
    this.message = message ?? reason;
    this.status = status ?? StatusCodes.OK;
    this.reason = reason ?? ReasonPhrases.OK;
    this.metadata = metadata || {};
    this.count = count;

    // logger.info(`${status} - ${message}`);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata, count }: ResponseIF) {
    super({
      message,
      status: StatusCodes.OK,
      reason: ReasonPhrases.OK,
      metadata,
      count,
    });
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, metadata, count }: ResponseIF) {
    super({
      message,
      status: StatusCodes.CREATED,
      reason: ReasonPhrases.CREATED,
      metadata,
      count,
    });
  }
}

export { SuccessResponse, OK, CREATED };

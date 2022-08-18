import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('Not Authorized');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not authorized' }];
  }
}

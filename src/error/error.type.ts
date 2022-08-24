export class GeneralError extends Error {
  errorCode = 500;
  constructor(message: string) {
    super(message);
  }
}
export class NotFound extends GeneralError {
  constructor(message: string) {
    super(message);
    this.errorCode = 404;
  }
}

export class BadRequest extends GeneralError {
  constructor(message: string) {
    super(message);
    this.errorCode = 400;
  }
}

export abstract class BaseError extends Error {
  protected statusCode;
  public customStack;
  public data: any;

  constructor(message, customStack = {}) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.customStack = customStack;
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public getObject() {
    const errorObject = {
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      customStack:
        this.customStack instanceof Error
          ? {
              innerData: this.customStack,
              innerStackTrace: this.customStack.stack,
            }
          : this.customStack,
      data: this.data ? this.data : undefined,
    };

    return errorObject;
  }
}

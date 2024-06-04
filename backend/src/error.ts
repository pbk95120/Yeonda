class CustomError extends Error {
  code: number;
  error?: any;

  constructor(code: number, message: string, error?: any) {
    super(message);
    this.code = code;
    this.error = error;
  }
}

export default CustomError;

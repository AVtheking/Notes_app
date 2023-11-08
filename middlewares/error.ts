class ErrorHandler extends Error {
  statusCode: any;
  constructor(statusCode: any, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default {
  errorMiddleware: (err: any, req: any, res: any, next: any) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    console.log(err);

    return res.status(err.statusCode).json({
      success: false,
      msg: err.message,
    });
  },
  ErrorHandler,
};

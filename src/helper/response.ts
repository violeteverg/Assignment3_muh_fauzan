import { Response } from "express";

export function responseStatusMsg(
  res: Response,
  code: number,
  message?: string,
  type?: string,
  data?: any,
  error?: any
) {
  switch (type) {
    case "success_data":
      return res.status(code).json({
        code: code,
        message: message || "Success",
        data: data,
      });
    case "error":
      return res.status(code).json({
        code: code,
        message: error?.message || "An error occurred",
        error: error,
      });
    default:
      return res.status(code).json({
        code: code,
        message: message || "Unknown status",
      });
  }
}

import { Response } from 'express';

const ResponseFormatter = {
  success: (res: Response, data: unknown) => (
    res.json({
      data,
    })
  ),

  failed: (res: Response, { status = 400, message = 'An unknown error occurred' }) => (
    res.status(status).json({
      code: status,
      message,
    })
  ),
};

export default ResponseFormatter;

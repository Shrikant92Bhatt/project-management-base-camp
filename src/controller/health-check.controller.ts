import { APIResponse } from '../utils/api.response';
import { APIError } from '../utils/api.error';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/async-handler';

// const healthCheckController  = async(req: Request, res: Response, next: NextFunction)=> {
//     try {
//         res.status(200).json(new APIResponse(200, "✅ Server is running", "Server is running"));
//     } catch (error) {
//         next(error);
//         res.status(500).json(new APIError(500, "❌ Server is not running", [...error as string],));
//     }
// }

const healthCheckController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(
            new APIResponse(200, '✅ Server is running', 'Server is running'),
        );
    },
);
export { healthCheckController };

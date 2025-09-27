import { APIResponse } from "../utils/api.response";
import { APIError } from "../utils/api.error";
import { Request, Response } from "express";

const healthCheckController  = async(req: Request, res: Response)=> {
    try {
        res.status(200).json(new APIResponse(200, "✅ Server is running", "Server is running"));
    } catch (error) {
        res.status(500).json(new APIError(500, "❌ Server is not running", [...error as string],));
    }
}

export default healthCheckController;
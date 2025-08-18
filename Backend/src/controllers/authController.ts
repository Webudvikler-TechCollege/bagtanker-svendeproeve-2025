import { Request, Response } from "express";
import {
    authenticateUser,
    verifyRefreshToken,
    getUserIdFromToken,
} from "../services/authServices";

export const Authenticate = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        res.status(400).json({ message: "Missing credentials" });
    }

    try {
        const result = await authenticateUser(username, password);
        if (!result) res.sendStatus(401);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(400).json({ message: "Refresh token required" });
        return;
    }

    try {
        const accessToken = await verifyRefreshToken(refreshToken);
        if (!accessToken) res.status(400).json({ message: "Invalid refresh token" });
        res.json({ accessToken });
    } catch {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};

export const getUserFromToken = (req: Request, res: Response) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader?.startsWith("Bearer ")) {
        res.sendStatus(401)
        return;
    };


    const token = bearerHeader.split(" ")[1];
    const userId = getUserIdFromToken(token);
    if (!userId) res.status(401).json({ message: "Invalid token" });

    res.json({ userId });
};

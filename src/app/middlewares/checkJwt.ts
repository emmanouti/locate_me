import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    const { userId, mail } = jwtPayload;
    const newToken = jwt.sign({ userId, mail }, config.jwtSecret, {
        expiresIn: "1h"
    });
    console.log("token checked")
    res.setHeader("token", newToken);

    next();
};
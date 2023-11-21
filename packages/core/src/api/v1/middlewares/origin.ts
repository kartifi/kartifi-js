import { Request, Response, NextFunction } from 'express';
import * as geoip from 'fast-geoip';
import { db } from '../../../loaders/database';
// import {Country} from ""

export default async function (req: Request, res: Response, next: NextFunction) {
    if (!req.cookies['kartify-info']) {
        const ipInfo = await geoip.lookup(req.ip!);
        if (ipInfo) {
            //TODO: Only allow whitelist of countries
        }


    }
    next();
}
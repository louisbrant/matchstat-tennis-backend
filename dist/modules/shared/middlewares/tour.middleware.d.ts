import { Request, Response, NextFunction } from 'express';
export declare enum TourType {
    ATP = "atp",
    WTA = "wta"
}
export declare function tour(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;

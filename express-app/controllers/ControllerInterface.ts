import * as express from 'express';

export interface IController {
    path: string;
    router: express.IRouter;
    initializeRoutes: () => void;
}

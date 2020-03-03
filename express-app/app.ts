import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { IController } from './controllers/ControllerInterface';

export default class {
    public app: express.Application;

    constructor (controllers: IController[], public port: number) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public initializeMiddlewares () {
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    public initializeControllers (controllers: IController[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }

    public listen() {
        this.app.listen(this.port, () => console.log(`App is listening on port ${this.port}`))
    }
}
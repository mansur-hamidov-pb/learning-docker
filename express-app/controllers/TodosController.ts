import * as express from 'express';
import { IController } from './ControllerInterface';

interface ITodo {
    id: number;
    name: string;
    isDone: boolean;
}

const todos: ITodo[] = [
    {
        id: 1,
        name: "Todo 1",
        isDone: true
    },
    {
        id: 2,
        name: "Todo 2",
        isDone: false
    },
    {
        id: 3,
        name: "Todo 3",
        isDone: true
    }
]

class TodosController implements IController {
    public path = '/todos';
    public todos = todos;
    public router = express.Router();

    public constructor () {
        this.initializeRoutes();
    }

    public initializeRoutes () {
        this.router.get(this.path, this.getTodos);
        this.router.post(this.path, this.addTodo);
    }

    public getTodos (_: express.Request, response: express.Response) {
        // response.sendStatus(500);
        response.json(todos);
    }

    public addTodo (request: express.Request, response: express.Response) {
        const todo: Omit<ITodo, 'id'> = request.body;
        const id = this.todos[this.todos.length - 1].id + 1;
        this.todos = [
            ...this.todos,
            { ...todo, id}
        ];
        response.send({ ...todo, id });
    }
}

export default new TodosController();

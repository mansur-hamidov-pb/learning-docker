import App from './app';
import TodosController from './controllers/TodosController';

const app = new App(
    [
        TodosController
    ],
    5000
);

app.listen();
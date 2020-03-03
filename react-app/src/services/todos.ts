import axios from 'axios';

export interface ITodo {
    id: string;
    name: string;
    isDone: boolean;
}

class TodosService {
    public endPoint: string = '/todos';

    public getTodos(): Promise<ITodo[]> {
        return axios.get(`http://localhost:5000${this.endPoint}`);
    }
}

export const todosService = new TodosService();

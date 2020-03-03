import React from 'react';
import './App.css';
import { useAsyncData } from './hooks';
import { ITodo, todosService } from './services/todos';
import { Async } from './components/Async';

function App() {
  const [todos, getTodosList] = useAsyncData<ITodo[]>();

  React.useEffect(
    () => {
      getTodosList(() => todosService.getTodos())
    },
    []
  )

  return (
    <div className="App">
      <Async
        branch={todos}
        successRender={(data) => {console.log('data', data);return (
          <>
            {data.map(todo => <div>{todo.name}</div>)}
          </>
        )}}
        loadingRender={() => <div>Loading</div>}
        errorRender={error => <div>Error</div>}
      />
    </div>
  );
}

export default App;

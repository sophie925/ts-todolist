import { TodoProvider } from './TodoContext';
import TodoCreate from './components/TodoCreate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoTempate from './components/TodoTemplate';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTempate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTempate>
    </TodoProvider>
  );
}

export default App;

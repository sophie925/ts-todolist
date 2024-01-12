import { createContext, useContext, useReducer, useRef } from "react";

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

interface State extends Array<Todo> {}

type Action =
| { type: 'CREATE'; todo: Todo }
| { type: 'TOGGLE'; id: number }
| { type: 'REMOVE'; id: number };

type ContextProps = {
    children: React.ReactNode;
}

const TodoStateContext = createContext<State | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<Action> | null>(null);
const TodoNextIdContext = createContext<React.MutableRefObject<number> | null>(null);

const initialTodos: State = [
    {
        id: 1,
        text: 'netlify 배포하기',
        done: false
    }
];

function todoReducer(state : State, action : Action) {
    switch(action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done} : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error('Unhandled action');
    }
}

export function TodoProvider({ children } : ContextProps) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannnot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannnot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannnot find TodoProvider');
    }
    return context;
  }
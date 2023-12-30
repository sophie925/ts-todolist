import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

export default function TodoList() {
    return (
        <TodoListBlock>
            <TodoItem text="타입스크립트 투두 프로젝트 생성하기" done={true} />
            <TodoItem text="git repository 새로 생성하기" done={true} />
            <TodoItem text="로컬 저장소랑 연결하기" done={false} />
            <TodoItem text="기능 구현하기" done={false} />
        </TodoListBlock>
    );
}
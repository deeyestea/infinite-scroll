import type { FC } from 'react';
import type { todo } from '../types/todo';
import type React from 'react';

interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
    todo: todo;
}

const TodoCard: FC<TodoCardProps> = ({ todo, ...props }) => {
    return (
        <p className='todo-card' key={todo?.id} {...props}>
            {todo?.title}
        </p>
    );
};

export default TodoCard;

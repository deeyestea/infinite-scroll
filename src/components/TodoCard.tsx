import type { FC } from 'react';
import type { todo } from '../types/todo';
import type React from 'react';

interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
    todo: todo;
    innerRef?: React.Ref<HTMLParagraphElement>;
}

const TodoCard: FC<TodoCardProps> = ({ todo, innerRef, ...props }) => {
    return (
        <p className='todo-card' key={todo?.id} ref={innerRef} {...props}>
            {todo?.title}
        </p>
    );
};

export default TodoCard;

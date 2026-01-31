import { useEffect, useState } from 'react';
import './App.css';
import TodoCard from './components/TodoCard';
import type { todo } from './types/todo';
import { useInfiniteQuery } from '@tanstack/react-query';

function App() {
    const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
        );
        return res.json();
    };

    const {
        data,
        status,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = lastPage.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });

    const content = data?.pages.map((todos: todo[]) =>
        todos.map((todo) => {
            return <TodoCard key={todo?.id} todo={todo} />;
        })
    );

    if (status === 'pending') return <h1>Loading....</h1>;

    if (status === 'error') return <h1>{error.message}</h1>;

    return (
        <div className='app'>
            {content}{' '}
            <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? 'Loading more....' : 'Load more'}
            </button>
        </div>
    );
}

export default App;

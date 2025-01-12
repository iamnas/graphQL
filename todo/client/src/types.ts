export interface Todo {
  id: string;
  title: string;
  user: {
    id: string;
    name: string;
  };
}

export interface TodoListProps {
  items: Todo[];
}
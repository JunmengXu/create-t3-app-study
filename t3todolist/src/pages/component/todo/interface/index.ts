export interface Todo {
    id: number;
    description: string | null; // Allow null for description
    createdAt: string;
    dueTime: string | null;
    status: boolean | null;
}

export interface TodoData {
    todos: Todo[];
}

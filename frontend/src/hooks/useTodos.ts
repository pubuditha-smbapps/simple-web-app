import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../utils/axiosConfig";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
};

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Todo[]>("/todos");
      setTodos(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (payload: Partial<Todo>) => {
    const res = await axios.post<Todo>("/todos", payload);
    setTodos((p) => [res.data, ...p]);
    return res.data;
  }, []);

  const updateTodo = useCallback(async (id: string, payload: Partial<Todo>) => {
    const res = await axios.put<Todo>(`/todos/${id}`, payload);
    setTodos((p) => p.map((t) => (t.id === id ? res.data : t)));
    return res.data;
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    await axios.delete(`/todos/${id}`);
    setTodos((p) => p.filter((t) => t.id !== id));
  }, []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } as const;
}

export default useTodos;

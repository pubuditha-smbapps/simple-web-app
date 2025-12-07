import { Request, Response } from "express";
import { readDB, writeDB } from "../storage.js";
import { Todo } from "../models/todoModel.js";
import crypto from "crypto";

export function getAllTodos(req: Request, res: Response) {
  try {
    const data = readDB();
    const todos = data.todos || [];
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
}
export function getTodoById(req: Request, res: Response) {
  try {
    const data = readDB();
    const todos = data.todos || [];
    const todo = todos.find((t: Todo) => t.id === req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
}
export function createTodo(req: Request, res: Response) {
  try {
    const data = readDB();
    const todos = data.todos || [];

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    writeDB({ ...data, todos });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Error creating todo", error });
  }
}

export function updateTodo(req: Request, res: Response) {
  try {
    const data = readDB();
    const todos = data.todos || [];
    const index = todos.findIndex((t: Todo) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos[index] = {
      ...todos[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    writeDB({ ...data, todos });
    res.status(200).json(todos[index]);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
}

export function deleteTodo(req: Request, res: Response) {
  try {
    const data = readDB();
    const todos = data.todos || [];
    const filteredTodos = todos.filter((t: Todo) => t.id !== req.params.id);

    if (todos.length === filteredTodos.length) {
      return res.status(404).json({ message: "Todo not found" });
    }

    writeDB({ ...data, todos: filteredTodos });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
}

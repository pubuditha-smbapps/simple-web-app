import React, { useState } from "react";
import { Row, Col, Spin, message, Empty } from "antd";
import TodoCard from "../../components/Todo/TodoCard";
import type { Todo } from "../../types";
import TodoEditModal from "../../components/Todo/TodoEditModal";

type TodoSectionProps = {
  filter?: "all" | "completed" | "pending";
  todos: Todo[];
  loading: boolean;
  updateTodo: (id: string, payload: Partial<Todo>) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
};

const TodoSection: React.FC<TodoSectionProps> = ({
  filter = "all",
  todos,
  loading,
  updateTodo,
  deleteTodo,
}) => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      message.success("Todo deleted");
    } catch (err) {
      console.error(err);
      message.error("Failed to delete todo");
    }
  };

  const handleMarkDone = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      const newCompleted = !todo.completed;
      await updateTodo(id, { completed: newCompleted });
      message.success(
        newCompleted ? "Todo marked done" : "Todo marked as not completed"
      );
    } catch (err) {
      console.error(err);
      message.error("Failed to update todo");
    }
  };

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalVisible(true);
  };

  const handleSave = async (values: {
    title: string;
    description?: string;
  }) => {
    try {
      if (!editingTodo) return;
      await updateTodo(editingTodo.id, values);
      message.success("Todo updated");
      setIsModalVisible(false);
      setEditingTodo(null);
    } catch (err) {
      console.error(err);
      message.error("Failed to update todo");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTodo(null);
  };

  const filtered = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return !!t.completed;
    return !t.completed;
  });

  return (
    <div>
      {loading ? (
        <Spin />
      ) : filtered.length === 0 ? (
        <Empty
          description={
            filter === "completed" ? "No completed tasks" : "No todos"
          }
        />
      ) : (
        <Row
          gutter={[8, 8]}
          justify="start"
          style={{ alignItems: "flex-start" }}
        >
          {filtered.map((todo) => (
            <Col key={todo.id} xs={24} sm={12} md={8} lg={6}>
              <div style={{ padding: 4 }}>
                <TodoCard
                  todo={todo}
                  onDelete={handleDelete}
                  onMarkDone={handleMarkDone}
                  onEdit={openEdit}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
      <TodoEditModal
        open={isModalVisible}
        todo={editingTodo}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TodoSection;

import React from "react";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Card, Grid } from "antd";
import type { Todo } from "../../types";

type Props = {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void;
  onMarkDone?: (id: string) => void;
};

const TodoCard: React.FC<Props> = ({ todo, onDelete, onEdit, onMarkDone }) => {
  const screens = Grid.useBreakpoint();
  const actions = [
    <EditOutlined key="edit" onClick={() => onEdit && onEdit(todo)} />,
    <CheckOutlined
      key="mark"
      onClick={() => onMarkDone && onMarkDone(todo.id)}
      style={{ color: todo.completed ? "#52c41a" : "#000" }}
    />,
    <DeleteOutlined
      key="delete"
      onClick={() => onDelete(todo.id)}
      style={{ color: "#ba3131bd" }}
    />,
  ];

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: screens.xs ? "100%" : 360,
    height: screens.xs ? "auto" : 160,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: todo.completed ? "#f6ffed" : "#fffbe6",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  };

  return (
    <Card
      loading={false}
      actions={actions}
      style={cardStyle}
      styles={{ body: { padding: "12px 16px" } }}
    >
      <div>
        <div style={{ fontWeight: 600, marginBottom: 8, color: "#000" }}>
          {todo.title}
        </div>
        <div
          style={{
            maxHeight: screens.xs ? 140 : 120,
            overflowY: "auto",
            paddingRight: 6,
            color: "rgba(0,0,0,0.45)",
            lineHeight: 1.4,
          }}
        >
          {todo.description}
        </div>
      </div>
    </Card>
  );
};

export default TodoCard;

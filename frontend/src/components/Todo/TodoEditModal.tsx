import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import type { Todo } from "../../types";

type Props = {
  open: boolean;
  todo: Todo | null;
  onSave: (values: {
    title: string;
    description?: string;
  }) => Promise<void> | void;
  onCancel: () => void;
};

const TodoEditModal: React.FC<Props> = ({ open, todo, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (todo) {
      form.setFieldsValue({ title: todo.title, description: todo.description });
    } else {
      form.resetFields();
    }
  }, [todo, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    await onSave(values as { title: string; description?: string });
  };

  return (
    <Modal
      title="Edit Todo"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoEditModal;

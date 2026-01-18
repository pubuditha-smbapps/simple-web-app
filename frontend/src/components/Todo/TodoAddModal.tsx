import React from "react";
import { Modal, Form, Input } from "antd";

type Props = {
  open: boolean;
  onSave: (values: {
    title: string;
    description?: string;
  }) => Promise<void> | void;
  onCancel: () => void;
};

const TodoAddModal: React.FC<Props> = ({ open, onSave, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSave(values as { title: string; description?: string });
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Add New Todo"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter todo title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Enter description (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoAddModal;

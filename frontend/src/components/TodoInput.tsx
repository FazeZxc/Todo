import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Typography } from "antd";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  createdby: string;
  status: string;
  due: string;
  description: string;
}

const { Meta } = Card;
const { Option } = Select;
const { Text , Title } = Typography;

export const TodoInput: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState<Partial<Todo>>(() => {
    return {
      title: "",
      createdby: "",
      status: "",
      due: "",
      description: "",
    };
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>("http://localhost:3000/todos");
      console.log(response.data.todos);
      setTodos(response.data.todos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUserInput((prevState) => {
      const updatedState = {
        ...prevState,
        [id]: value,
      };
      return updatedState;
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const createTodo = async () => {
    setOpen(false);
    try {
      await axios.post("http://localhost:3000/todos", userInput);
      setUserInput({
        title: "",
        createdby: "",
        status: "",
        due: "",
        description: "",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <ul>
        <Title> Hello </Title>
        {todos.map((todo) => (
            <Card
              key={todo._id}
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" onClick={() => deleteTodo(todo._id)} />,
                <EditOutlined key="edit" onClick={() => updateTodo(todo._id, { status: "Done" })} />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                  }
                  title={todo.title}
                  description={todo.description}
                />
              </Skeleton>
            </Card>
        ))}
      </ul>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New To-do
      </Button>
      <Drawer
        title="Create a new To-do"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={createTodo} type="primary">
              Create
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="To-do title"
                  value={userInput.title}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="createdby"
                label="Created By"
                rules={[{ required: true, message: "Name is Required" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter your name"
                  value={userInput.createdby}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: false }]}
              >
                <Select placeholder="To-do Status">
                  <Option value="todo">To-do</Option>
                  <Option value="done">Done</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="Due"
                rules={[{ required: false }]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="To-do description"
                  value={userInput.description}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

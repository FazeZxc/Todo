import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import axios from "axios";
import TodoTable from "./TodoTable";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Todo, todoAtom } from "../store/todoAtom";
import { isString } from "antd/es/button";
import { backendUrlAtom } from "../store/urlAtom";

const { Option } = Select;

export const TodoInput: React.FC = () => {
  const backendUrl = useRecoilValue(backendUrlAtom);
  const setTodos = useSetRecoilState(todoAtom);
  const [open, setOpen] = useState(false);
  //   const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState<Partial<Todo>>(() => {
    return {
      title: "",
      createdby: "",
      status: "",
      dueDate: "",
      description: "",
    };
  });

  useEffect(() => {
    fetchTodos();
  });

  interface TodoResponse {
    todos: Todo[] | ((currVal: Todo[]) => Todo[]);
    data: {
      todos: Todo[];
    };
  }
  const fetchTodos = async () => {
    try {
      const response = await axios.get<TodoResponse>(backendUrl + "/todos", {
        withCredentials: true,
      });
      console.log(response);
      if (response.data && Array.isArray(response.data.todos)) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "creating to-do",
    });
    setTimeout(() => {
      if (!userInput.title) {
        messageApi.open({
          key,
          type: "error",
          content: "Entries not filled",
          duration: 2,
        });
      } else {
        messageApi.open({
          key,
          type: "success",
          content: "To-do created!",
          duration: 2,
        });
        createTodo();
      }
    }, 1000);
  };
  const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    try {
      await axios.put(backendUrl + `/todos/${id}`, updatedTodo, {
        withCredentials: true,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(backendUrl + `/todos/${id}`, {
        withCredentials: true,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleDateChange: DatePickerProps['onChange'] = (dateString) => {
    console.log(dateString);
    setUserInput((prevState): Partial<Todo> =>{
      const updatedState = {
        ...prevState,
        dueDate: dateString.format('YYYY-MM-DD')
      }
      return updatedState
    })
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    if (isString(e)) {
      setUserInput((prevState) => {
        const updatedState = {
          ...prevState,
          status: e,
        };
        return updatedState;
      });
      return;
    }
    const { id, value } = e.target;
    console.log(id, value, e);
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

  const [form] = Form.useForm();
  const onClose = () => {
    setOpen(false);
  };

  const createTodo = async () => {
    setOpen(false);
    console.log(userInput);
    // openMessage()
    try {
      await axios.post(backendUrl + "/todos", userInput, {
        withCredentials: true,
      });
      form.resetFields();
      setUserInput({
        title: "",
        createdby: "",
        status: "",
        dueDate: "",
        description: "",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New To-do
      </Button>
      <TodoTable updateTodo={updateTodo} deleteTodo={deleteTodo}></TodoTable>
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
            <Button onClick={openMessage} type="primary">
              Create
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={onClose} form={form}>
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
                  //   style={{ width: "100%" }}
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
                <Select
                  id="status"
                  placeholder="To-do Status"
                  onSelect={handleChange}
                >
                  <Option value="to-do">to-do</Option>
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
                <DatePicker
                  style={{ width: "100%" }}
                  type="date"
                  getPopupContainer={(trigger) => trigger.parentElement!}
                  onChange={handleDateChange}
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

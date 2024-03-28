import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useRecoilValue } from "recoil";
import { Todo, todoAtom } from "../store/todoAtom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";


type updateTodoProp = (param1: string, param2: Partial<Todo>) => void;
type deleteTodoProp = (param1: string) => void
interface props {
  updateTodo: updateTodoProp;
  deleteTodo: deleteTodoProp;
}

const TodoTable: React.FC<props> = ({ updateTodo, deleteTodo }) => {
  const todos = useRecoilValue(todoAtom);
  const columns: TableProps<Todo>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Created By",
      dataIndex: "createdby",
      key: "createdby",
      render: (name) => {
        return <Tag>{name}</Tag>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        if (status == "to-do") {
          color = "red";
        } else if (status == "done") {
          color = "green";
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Due Date",
      key: "dueDate",
      dataIndex: "dueDate",
      render: (record) => <a>{record}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <CheckOutlined
              onClick={() => {
                const updatedTodo = {
                  status: "done",
                };
                console.log(updatedTodo);
                updateTodo(record._id, updatedTodo);
              }}
            />
            <CloseOutlined onClick={() => deleteTodo(record._id)} />
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <Table columns={columns} dataSource={todos} bordered={true} />;
    </div>
  );
};

export default TodoTable;

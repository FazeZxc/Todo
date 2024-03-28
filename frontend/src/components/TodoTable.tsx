import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useRecoilValue } from "recoil";
import { todoAtom } from "../store/todoAtom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface DataType {
  _id: string;
  title: string;
  createdby: string;
  status: string;
  dueDate: string;
  description: string;
}

const TodoTable: React.FC = ({ updateTodo, deleteTodo }) => {
  const todos = useRecoilValue(todoAtom);
  const columns: TableProps<DataType>["columns"] = [
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
      title: "DueDate",
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
                    status : "done"
                }
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

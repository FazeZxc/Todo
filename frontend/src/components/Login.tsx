import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../store/authAtom";
import { userAtom } from "../store/userAtom";
import { backendUrlAtom } from "../store/urlAtom";

interface values {
  email: string;
  password: string;
  remember: boolean;
}

export const Login: React.FC = () => {
  const backendUrl = useRecoilValue(backendUrlAtom);
  const setIsloggedIn = useSetRecoilState(isLoggedInAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const onFinish = async (values: values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post(backendUrl + "/auth/login", values, {
        withCredentials: true,
      });
      console.log(response);
      setUser(response.data.user);
      setIsloggedIn(true);
      navigate("/todos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br />
          <br />
          <a href="/auth/register">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

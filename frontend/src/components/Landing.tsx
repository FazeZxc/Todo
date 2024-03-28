import React from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../store/authAtom";
import { userAtom } from "../store/userAtom";
import { Button , Typography } from "antd";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

export const Landing: React.FC = () => {
  const loggedIn = useRecoilValue(isLoggedInAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  console.log(loggedIn);

  const { Text, Title } = Typography;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        background: "beige",
      }}
    >
      <div className="mainContainer">
        <div className={"titleContainer"}>
          <Title>Welcome! {user.name}</Title>
        </div>
        <Text>This is the home page.</Text>
        <div className={"buttonContainer"}>
          {loggedIn ? <LogoutButton /> : <LogoutButton />}
          {loggedIn ? null : (
            <Button type="primary" onClick={() => navigate("/todos")}>View To-Dos</Button>
          )}
          {loggedIn ? <Text>Your email address is {user.email}</Text> : <div />}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const LogoutIn:React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <Button onClick={handleLogin}>Login</Button>
  );
};

export default LogoutIn;

import React from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isLoggedInAtom } from '../store/authAtom';
import { userAtom } from '../store/userAtom';
import { Button } from 'antd';

const LogoutButton:React.FC = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const resetUser = useResetRecoilState(userAtom)
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    resetUser()
    navigate('/auth/login');
  };

  return (
    <Button type="dashed" onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;

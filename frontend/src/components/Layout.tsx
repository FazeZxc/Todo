import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { TodoInput } from './TodoInput';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;


const HeroLayout: React.FC = () => {
    const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{height: "auto" , width: "100vw" , margin: "0px"}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, minWidth: 0 }}
        />
        <LogoutButton></LogoutButton>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' , cursor: 'pointer' }}>
          <Breadcrumb.Item onClick={()=>navigate("/")}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Todos</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <TodoInput/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Developed By Abhinav Mishra
      </Footer>
    </Layout>
  );
};

export default HeroLayout;
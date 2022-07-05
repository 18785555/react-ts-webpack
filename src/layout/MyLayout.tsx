import { Layout, Spin } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import BottomPlay from "../components/BottomPlay";
import "./layout.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SideMenu from "./SidebarMenu";
import AppHeader from "../components/AppHeader";
const { Header, Footer, Sider, Content } = Layout;
const MyLayout: React.FC = () => {
  const isLoading = useSelector((state:RootState)=>state.app.isLoading)
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{background:'#91d5ff',padding:'0'}}><AppHeader/></Header>
      <Layout>
        <Sider
          className="innerbox"
          theme="light"
          breakpoint="xs"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <SideMenu />
        </Sider>
        <Content>
          {
            isLoading?<Spin tip="Loading..."/>:<Outlet />
          }
        </Content>
      </Layout>
      <Footer style={{ padding: "10px",zIndex:'8',background:'none'}}>
        <BottomPlay />
      </Footer>
    </Layout>
  );
};
export default MyLayout;

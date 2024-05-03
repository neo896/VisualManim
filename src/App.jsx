import React from "react";
import { Layout } from "@douyinfe/semi-ui";

import LeftSide from "./components/layouts/LeftSide";
import Flow from "./components/flow";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const commonStyle = {
    height: 64,
    lineHeight: "64px",
    background: "var(--semi-color-fill-0)",
  };

  return (
    <Layout className="h-lvh">
      <Header style={commonStyle}>Header</Header>
      <Layout>
        <Sider className="w-1/6 border ">
          <LeftSide />
        </Sider>
        <Content>
          <Flow />
        </Content>
        <Sider
          style={{ width: "220px", background: "var(--semi-color-fill-2)" }}
        >
          属性
        </Sider>
      </Layout>
      <Footer style={commonStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;

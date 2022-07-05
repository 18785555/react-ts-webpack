import { Card, Tabs } from "antd";
import React, { useState } from "react";
import AllPlaylist from "./components/Allplaylist";
import Recommend from "./components/Recommend";
import Toplist from "./components/Toplist";

const Found = () => {
  const { TabPane } = Tabs;
  const [key,setKey]=useState<string>('1')
  const onChange = (key: string) => {
    setKey(key)
  };
  return (
    <div className="innerbox" style={{ height: "100%", overflow: "auto" }}>
    <Card >
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="个性推荐" key="1">
          <Recommend akey={key}></Recommend>
        </TabPane>
        <TabPane tab="歌单" key="2">
          <AllPlaylist akey={key}/>
        </TabPane>
        <TabPane tab="排行榜" key="3">
         <Toplist akey={key}/>
        </TabPane>
        <TabPane tab="最新音乐" key="4">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="歌手" key="5">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Card>
    </div>
  );
};

export default Found;

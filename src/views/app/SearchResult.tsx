import { Card, Col, Row, Tabs } from "antd";
import { useState } from "react";
import MusicSearchResult from "./components/MusicSearchResult";
import { useParams } from "react-router-dom";

const { TabPane } = Tabs;
const titleStyle:React.CSSProperties = {fontSize:'18px',fontWeight:'bold',marginRight:'10px'}
const SearchResult = ()=>{
  const {searchWord} = useParams()
  const [tabKey,setTabKey] = useState<string>('1')
  const tabChange = (key:string)=>{
    setTabKey(key)
  }
 
    return (
        <div className="innerbox" style={{ height: "100%", overflow: "auto" }}>
          <Card style={{ minHeight: "100%" }}>
            <Row className="space_custom">
              <Col span={24}>
                <span style={titleStyle}>搜索</span>
                <span style={titleStyle}>{searchWord}</span>
              </Col>
            </Row>
            <Row className="space_custom">
              <Col span={24}></Col>
            </Row>
            <Row className="space_custom">
              <Col span={24}>
                <Tabs onChange={tabChange}>
                  <TabPane tab="单曲" key="1">
                    <MusicSearchResult tabKey={tabKey} searchWord={searchWord} />
                  </TabPane>
                  <TabPane tab="专辑" key="2">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="视频" key="3">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="歌单" key="4">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="歌词" key="5">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="电台" key="6">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="视频" key="7">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="综合" key="8">
                    Content of tab 3
                  </TabPane>
                  <TabPane tab="声音" key="9">
                    Content of tab 3
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </div>
      );
}
export default SearchResult
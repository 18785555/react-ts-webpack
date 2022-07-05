import { Col, Row } from "antd"
import {MediumWorkmarkOutlined } from "@ant-design/icons";

import SearchResult from "./Search";
import Profile from "./Profile";

function AppHeader() {
    return (
        <>
            <Row style={{ width: '100%',paddingLeft:'20px' }}>
                <Col span={6}><MediumWorkmarkOutlined style={{fontSize:'60px'}} /></Col>
                <Col span={6}></Col>
                <Col span={3}></Col>
                <Col span={3}>
                    <Profile/>
                </Col>
                <Col span={6}>
                    <SearchResult/>
                </Col>
            </Row>
        </>
    )
}
export default AppHeader
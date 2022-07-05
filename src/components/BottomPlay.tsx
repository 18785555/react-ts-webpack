import { Col, Row, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { TwitterOutlined, TeamOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import "../style/global.css";
import Play from "./Play";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RightDrawer from "./Drawer";
import PlayMusicPage from "./playpage/PlayMusicPage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const avatarStyle:React.CSSProperties = { color: "whitesmoke", fontSize: "30px" }
const avatarContainerStyle:React.CSSProperties = { width: "4em", height: "4em", position: "relative" }
const upStyle: React.CSSProperties = {
  position: "absolute",
  right: "0",
  top: "0",
  width: "4em",
  height: "4em",
  backgroundColor: "rgba(107, 107, 107, 0.653)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const btnStyle: React.CSSProperties = { color: "whitesmoke", cursor: 'pointer' };
const BottomPlay = () => {
  const navigate = useNavigate()
  const currentSong = useSelector((state: RootState) => state.playlist.currentSong);
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const [drawerButton, setDrawerButton] = useState<boolean>(false);
  const changButtonStatus = () => setButtonStatus(!buttonStatus);
  const childRef: any = useRef();

  const onSearch = (value: string) => {
    // 不用问号直接接
    navigate(`/searchResult/${value}`)
  }
  return (
    <Row>
      <Col span={7}>
        <Row>
          <Col
            span={4}
            onMouseOver={() => setDrawerButton(true)}
            onMouseLeave={() => setDrawerButton(false)}
          >
            <div style={avatarContainerStyle}>
              <Avatar
                shape="square"
                style={{ height: "100%", width: "100%" }}
                src={currentSong?.al.picUrl}
                icon={<UserOutlined />}
              />
              {drawerButton ? (
                <div style={upStyle}>
                  {buttonStatus ? <FullscreenOutlined
                    onClick={childRef.current.showDrawer}
                    style={avatarStyle}
                  /> : <FullscreenExitOutlined
                    onClick={childRef.current.onClose}
                    style={avatarStyle}
                  />}
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={20}>
            <h4 style={buttonStatus ? { cursor: 'pointer' } : btnStyle} 
                onClick={() => onSearch(currentSong?.name as string)}>
                  {currentSong?.name || "暂无播放歌曲"}</h4>
            {currentSong?.ar.map((item) => (
              <span style={buttonStatus ? { cursor: 'pointer', padding: '5px' } : btnStyle} key={item.id} onClick={() => onSearch(item.name)}>
                {item.name}
              </span>
            ))}
          </Col>
        </Row>
      </Col>
      <Play buttonStatus={buttonStatus} />
      <Col span={7}>
        <div className="right">
          <span className="hover" style={buttonStatus ? {} : btnStyle}>
            <TwitterOutlined />
          </span>
          <span className="hover" style={buttonStatus ? {} : btnStyle}>
            <TeamOutlined />
          </span>
          <span className="hover" style={buttonStatus ? {} : btnStyle}>
            <RightDrawer />
          </span>
        </div>
      </Col>
      <PlayMusicPage
        childRef={childRef}
        changButtonStatus={changButtonStatus}
      />
    </Row>
  );
};

export default BottomPlay;

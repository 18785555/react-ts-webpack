import { Drawer, List } from "antd";
import React, { useState } from "react";
import {
  UnorderedListOutlined,
  PlaySquareOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentMusicUrl, setCurrentSong } from "../store/actions/playlist";
import { getMusicUrl } from "../utils/apis";
const RightDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: RootState) => state.playlist.currentMusicUrl);
  const music_play_list = useSelector((state: RootState) => state.playlist.musicPlayList);
  const [visible, setVisible] = useState(false);

  // 播放
  const play = (val: any) => {
    dispatch(setCurrentSong(val));
    getMusicUrl(val.id).then((res: any) =>
      dispatch(setCurrentMusicUrl(res.data.data[0]))
    );
  };

  return (
    <>
      <span onClick={() => setVisible(true)} className="hover">
        <UnorderedListOutlined />
        <span style={{ fontSize: "15px", marginLeft: "10px" }}>
          {music_play_list.length}
        </span>
      </span>
      <Drawer
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>播放列表</h1>
            <span style={{ color: "gray", fontSize: "12px" }}>
              总{music_play_list.length}首
            </span>
          </div>
        }
        placement={"right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={"right"}
      >
        <List
          itemLayout="horizontal"
          dataSource={music_play_list}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.ar.map((i, index) => (
                  <span key={index}>{i.name}</span>
                ))}
              />
              {currentUrl?.id === item.id ? (
                <NotificationOutlined style={{ color: "blue" }} />
              ) : (
                <PlaySquareOutlined onClick={() => play(item)} />
              )}
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default RightDrawer;

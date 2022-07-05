import { Tag, Col, Row, Image, Card, Avatar, Button, Space, Tabs, Input, Divider } from "antd";
import { YoutubeOutlined, DownloadOutlined, HeartOutlined, ManOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { MusicDetail } from "../../constance";
import { setCurrentMusicUrl, setCurrentSong, setMusicAutoPlayList } from "../../store/actions/playlist";
import { getMusicUrl, handleCollection } from "../../utils/apis";
import { useState } from "react";
import Songlist from "./components/Songlist";
import "../../style/global.css";
const { TabPane } = Tabs;

const Playlist = () => {
  const dispatch = useDispatch();
  const uid = window.localStorage.getItem("uid");
  const currentPlaylist = useSelector((state: RootState) => state.playlist.currentPlaylist);
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const [searchValue, setSearchValue] = useState<string>("");


  const onSearch = ($event: any) => { setSearchValue($event.target.value) };

  // 播放当前歌单全部歌曲
  const setPlayList = () => {
    var _music_play_list: MusicDetail[] = [];
    playlist.forEach((i: MusicDetail) => {
      _music_play_list.push(i);
    });
    // 设置当前播放列表
    dispatch(setMusicAutoPlayList(_music_play_list));
    dispatch(setCurrentSong(_music_play_list[0]));
    getMusicUrl(_music_play_list[0].id).then((res: any) =>
      dispatch(setCurrentMusicUrl(res.data.data[0]))
    );
  };

  // 转换为日期格式
  const format_date = function (timestamp: number) {
    let datetime = new Date(timestamp).toLocaleString();
    return datetime;
  };
  // 搜索组件
  const operations = (
    <Input
      placeholder="default size"
      onChange={(e) => onSearch(e)}
      prefix={<SearchOutlined />}
    />
  );

  const collection = (type: number) => {
    if (currentPlaylist) {
      handleCollection(type, currentPlaylist.id).then((res) => {
        if (type === 1) {
          console.log("收藏成功");
        } else {
          console.log("取消成功");
        }
      });
    }
  };
  return (
    <div className="innerbox" style={{ height: "100%", overflow: "auto" }}>
      <Card style={{ minHeight: "100%" }}>
        <Row className="space_custom">
          <Col span={4}>
            <Image
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "5px" }}
              src={currentPlaylist?.coverImgUrl}
            />
          </Col>
          <Col span={20} style={{ padding: "20px" }}>
            <div>
              <Space>
                <Tag color="blue">歌单</Tag>
                <Divider orientation="left">{currentPlaylist?.name}</Divider>
              </Space>
            </div>
            <Space>
              <Avatar src={currentPlaylist?.creator.avatarUrl} />
              {currentPlaylist?.creator.userId === Number(uid) ? (
                <span>我</span>
              ) : (
                <span>{currentPlaylist?.creator.nickname}</span>
              )}
              <span>
                更新于{format_date(currentPlaylist?.updateTime as number)}
              </span>
            </Space>
            <div style={{ marginTop: "20px" }}>
              <Space>
                <Button
                  onClick={setPlayList}
                  type="primary"
                  shape="round"
                  icon={<YoutubeOutlined />}
                >
                  播放全部
                </Button>
                {currentPlaylist?.subscribed ||
                  currentPlaylist?.creator.userId === Number(uid) ? (
                  <Button
                    onClick={() => collection(2)}
                    shape="round"
                    icon={<HeartOutlined style={{ color: "red" }} />}
                  >
                    已收藏
                  </Button>
                ) : (
                  <Button
                    onClick={() => collection(1)}
                    shape="round"
                    icon={<HeartOutlined />}
                  >
                    收藏
                  </Button>
                )}

                <Button shape="round" icon={<ManOutlined />}>
                  分享
                </Button>
                <Button shape="round" icon={<DownloadOutlined />}>
                  下载全部
                </Button>
              </Space>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Space>
                <span>歌曲：{currentPlaylist?.trackCount}</span>
                <span>播放：{currentPlaylist?.playCount}</span>
              </Space>
            </div>
          </Col>
        </Row>
        <Row className="space_custom">
          <Col span={24}>
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="歌曲列表" key="1">
                <Songlist value={searchValue} />
              </TabPane>
              <TabPane tab="评论" key="2">
                Content of tab 2
              </TabPane>
              <TabPane tab="收藏者" key="3">
                Content of tab 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Playlist;

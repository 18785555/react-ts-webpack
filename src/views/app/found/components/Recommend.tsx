import { Carousel, Col, Row, Image, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { Personalized } from "../../../../constance";
import { getMusicUrl, getNormalPlaylistDetail, getNormalPlaylistSonglist, getPersonalized, getPlaylistSonglist } from "../../../../utils/apis";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCurrentMusicUrl, setCurrentPlaylist, setCurrentSong, setMusicAutoPlayList, setPlaylist } from "../../../../store/actions/playlist";
import { setLoading } from "../../../../store/actions/app";
import { useNavigate } from "react-router-dom";
const contentStyle: React.CSSProperties = {
  height: "160px",
  width: "100%",
  lineHeight: "160px",
  borderRadius: "5px",
  cursor: "pointer",
};
const contextStyle: React.CSSProperties = {
  cursor: "default",
  whiteSpace: "nowrap",
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontSize: "14px",
};
const itemImageStyle: React.CSSProperties = {
  position: "absolute",
  right: "50%",
  transform: "translateX(50%)",
  bottom: "50%",
  color: "#1890ff",
  fontSize: "40px",
  cursor: "pointer",
};
const Recommend = (props: any) => {
  const { akey } = props;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [personalized, setpersonalized] = useState<Personalized[]>([]);
  const [personalized1, setpersonalized1] = useState<Personalized[]>([]);
  const [currentItem, setCurrentItem] = useState<Personalized>();
  const scrollBox = useRef<any>();
  useEffect(() => {
    if (akey === "1") {
      getPersonalized().then((res: any) => {
        setpersonalized(res.data.result.slice(0, 6));
        setpersonalized1(res.data.result);
      });
    }
  }, [akey]);

  const tranNumber = (num: number, point = 2) => {
    if (num > 1 && num < 10000) return num
    if (num < 100000000 && num > 10000) return (num / 10000).toFixed(0) + "万"
    if (num > 100000000) return (num / 100000000).toFixed(0) + "亿"
};

  // 播放歌单全部歌曲
  const play = () => {
    getNormalPlaylistSonglist(currentItem?.id as number).then((res:any)=>{
      dispatch(setMusicAutoPlayList(res.data.songs));
      dispatch(setCurrentSong(res.data.songs[0]));
      getMusicUrl(res.data.songs[0].id).then((res: any) =>
      dispatch(setCurrentMusicUrl(res.data.data[0]))
    );
    })
  };
  // 查看歌单详情
  const show = () => {
      navigate("/playlist");
      dispatch(setLoading(true))
      const id = Number(currentItem?.id);
      getNormalPlaylistDetail(id).then((res:any)=>{
        dispatch(setCurrentPlaylist(res.data.playlist))
        console.log(res.data.playlist);
        
      })
      // 获取当前歌单所有歌曲
      getPlaylistSonglist(id).then((res: any) => {
        dispatch(setPlaylist(res.data.songs));
        dispatch(setLoading(false))
      });
  };

  return (
    <div ref={scrollBox} style={{ height: "100vh" }} id="scrollBox">
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Carousel autoplay>
            {personalized.map((item: Personalized) => (
              <div key={item.id}>
                <img style={contentStyle} src={item.picUrl} alt="" />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row>
        <Space>
          <Col>
            <h1 style={{ width: "100%", cursor: "pointer" }}>歌单推荐》</h1>
          </Col>
        </Space>
      </Row>
      <Row>
        {personalized1.map((item: Personalized) => (
          <Col key={item.id} span={4} style={{ padding: "10px" }}>
            <Image
              onClick={show}
              onMouseEnter={() => setCurrentItem(item)}
              preview={false}
              style={{ cursor: "pointer", position: "relative" }}
              src={item.picUrl}
            />
            {currentItem?.id === item.id ? (
              <PlayCircleOutlined
                onClick={play}
                style={itemImageStyle}
              />
            ) : null}
            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "10px",
                color: "whitesmoke",
                fontWeight: "bold",
              }}
            >
              <PlayCircleOutlined />
              <span style={{ padding: "6px" }}>
                {tranNumber(item.playCount)}
              </span>
            </div>
            <h1 style={contextStyle}>{item.name}</h1>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Recommend;

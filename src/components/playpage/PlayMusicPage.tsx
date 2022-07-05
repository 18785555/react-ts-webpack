import { Drawer, Row, Col, Image } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getMusicLyr } from "../../utils/apis";
import { useNavigate } from "react-router-dom";
const backgroundStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  left: "0",
  top: "0",
  filter: "blur(10px) brightness(50%)",
  backgroundSize: "cover",
  zIndex: "-111111111",
};

type LyItem = {
  time: string;
  lyric: string;
};
type SytleType = {
  transform: string;
};
const PlayMusicPage = (props: any) => {
  // defined Props
  const navigate = useNavigate()
  const { childRef, changButtonStatus } = props;
  const currentSong = useSelector((state: RootState) => state.playlist.currentSong);
  const currentPlayTime = useSelector((state: RootState) => state.playlist.currentPlayTime);
  const [musicLyric, setMusicLyric] = useState<LyItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [lyricContainerScrollStyle, LyricContainerScrollStyle] = useState<SytleType>();
  const [currentLyricIndex, setCurrentLyricIndex] = useState<number>();

  //使用useImperativeHandle 向父组件抛出的方法属性
  useImperativeHandle(childRef, () => ({
    showDrawer: () => { setVisible(true) },
    onClose: () => { setVisible(false) },
    visible: visible
  }));
  const onClose = () => { setVisible(false) };
  const formatSecond = (time: number) => {
    const _time = Math.floor(time);
    const minute = Math.floor(_time / 60).toString().padStart(2, "0");
    const second = (_time % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
  };

  const onSearch = (value: string) => {
    // 不用问号直接接
    navigate(`/searchResult/${value}`)
    onClose()
}
  useEffect(() => {
    const currentTime = formatSecond(currentPlayTime);
    for (let i: number = 0; i < musicLyric.length; i++) {
      if (currentTime > musicLyric[i].time && currentTime < musicLyric[i + 1].time) {
        setCurrentLyricIndex(i);
        LyricContainerScrollStyle({ transform: `translateY(-${30 * i}px)` });
      }
    }
  }, [currentPlayTime]);

  // 切歌请求歌词
  useEffect(() => {
    if (currentSong?.id) {
      getMusicLyr(currentSong?.id).then((res: any) => {
        const lyr = res.data;
        const arr: LyItem[] = [];
        lyr["lrc"]["lyric"].split(/[\n]/).forEach((item: any) => {
          const temp: Array<string> = item.split(/\[(.+?)\]/);
          arr.push({
            time: temp[1],
            lyric: temp[2],
          });
        });
        setMusicLyric(arr);
      });
    }
  }, [currentSong?.id]);
  useEffect(() => { changButtonStatus() }, [visible])
  return (
    <>
      <Drawer
        headerStyle={{ display: "none" }}
        placement={"bottom"}
        height={"100vh"}
        width={500}
        zIndex={7}
        visible={visible}
      >
        <DownOutlined
          onClick={onClose}
          style={{ fontSize: "20px", color: "whitesmoke" }}
        />
        <Row style={{ marginTop: "4em" }}>
          <Col span={2}></Col>
          <Col span={9}>
            <Image
              width={"30em"}
              height={"30em"}
              preview={false}
              src={currentSong?.al.picUrl}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={12}>
            <Row>
              <Col span={12} className="title">
                <h2 className="title" onClick={()=>onSearch(currentSong?.name as string)}> {currentSong?.name} </h2>
                {currentSong?.ar.map((item) => (
                  <span key={item.id} onClick={()=>onSearch(item.name)}>
                    {item.name}
                  </span>
                ))}
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ height: "30em", overflow: "auto" }}
                className="container_lyric"
              >
                <div style={lyricContainerScrollStyle} className="lyric">
                  {musicLyric.map((item: LyItem, index: number) => (
                    <p
                      key={index}
                      style={
                        currentLyricIndex === index
                          ? { color: "rgb(0, 195, 255)", fontSize: "15px" }
                          : { color: "" }
                      }
                      className="ptext"
                    >
                      {item.lyric}
                    </p>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <img style={backgroundStyle} src={currentSong?.al.picUrl} alt="" />
      </Drawer>
    </>
  );
};
export default PlayMusicPage;

import { Col, Row, Image, Space } from "antd";
import { useEffect, useState } from "react";
import { PlaylistItem } from "../../../../constance";
import { getMusicUrl, getNormalPlaylistSonglist, getToplist } from "../../../../utils/apis";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCurrentMusicUrl, setCurrentSong, setMusicAutoPlayList } from "../../../../store/actions/playlist";
import ToplistItemMusic from "./ToplistItemMusic";
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

const Toplist = (props: any) => {
    const { akey } = props;
    const dispatch = useDispatch();
    const [personalized, setpersonalized] = useState<PlaylistItem[]>([]);
    const [personalized1, setpersonalized1] = useState<PlaylistItem[]>([]);
    const [currentItem, setCurrentItem] = useState<PlaylistItem>();
    useEffect(() => {
        if (akey === "3") {
            getToplist().then((res: any) => {
                setpersonalized(res.data.list.slice(0, 4));
                setpersonalized1(res.data.list.slice(4));
            });
        }
    }, [akey]);

    // 播放歌单全部歌曲
    const play = () => {
        getNormalPlaylistSonglist(currentItem?.id as number).then((res: any) => {
            dispatch(setMusicAutoPlayList(res.data.songs));
            dispatch(setCurrentSong(res.data.songs[0]));
            getMusicUrl(res.data.songs[0].id).then((res: any) =>
                dispatch(setCurrentMusicUrl(res.data.data[0]))
            );
        });
    };
    const tranNumber = (num: number, point = 2) => {
        if (num > 1 && num < 10000) return num
        if (num < 100000000 && num > 10000) return (num / 10000).toFixed(0) + "万"
        if (num > 100000000) return (num / 100000000).toFixed(0) + "亿"
    };
    return (
        <div style={{ height: "100vh",overflow:'auto'}} className='innerbox'>
            <Row>
                <Space>
                    <Col>
                        <h1 style={{ fontWeight: "bold", fontSize: '20px', cursor: "defalut" }}>官方榜</h1>
                    </Col>
                </Space>
            </Row>
            {personalized.map((item: PlaylistItem) => (
                <Row key={item.id}>
                    <Col span={24}>
                        <Row>
                            <Col span={5}>
                                <Image
                                    onMouseEnter={() => setCurrentItem(item)}
                                    height={250}
                                    preview={false}
                                    style={{
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        position: "relative",
                                    }}
                                    src={item.coverImgUrl}
                                />
                                {currentItem?.id === item.id ? (
                                    <PlayCircleOutlined onClick={play} style={itemImageStyle} />
                                ) : null}
                            </Col>
                            <Col span={2} />
                            <Col span={17}>
                                <ToplistItemMusic sendId={item.id} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
            <Row>
                <Space>
                    <Col>
                        <h1 style={{ fontWeight: "bold", fontSize: '20px', cursor: "defalut" }}>全球榜</h1>
                    </Col>
                </Space>
            </Row>
            <Row>
                {personalized1.map((item: PlaylistItem) => (
                    <Col key={item.id} span={4} style={{ padding: "10px" }}>
                        <Image
                            onMouseEnter={() => setCurrentItem(item)}
                            preview={false}
                            style={{ cursor: "pointer", position: "relative" }}
                            src={item.coverImgUrl}
                        />
                        {currentItem?.id === item.id ? (
                            <PlayCircleOutlined onClick={play} style={itemImageStyle} />
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

export default Toplist;

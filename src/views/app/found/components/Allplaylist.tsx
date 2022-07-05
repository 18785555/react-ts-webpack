import { Col, Row, Image, Space } from "antd";
import { useEffect, useState } from "react";
import { PlaylistItem } from "../../../../constance";
import {getHighquality,getMusicUrl,getNormalPlaylistSonglist,getPlaylistSonglist} from "../../../../utils/apis";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {setCurrentMusicUrl,setCurrentPlaylist,setCurrentSong,setMusicAutoPlayList,setPlaylist} from "../../../../store/actions/playlist";
import { setLoading } from "../../../../store/actions/app";
import { useNavigate } from "react-router-dom";

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
const AllPlaylist = (props: any) => {
    const { akey } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [personalized1, setpersonalized1] = useState<PlaylistItem[]>([]);
    const [currentItem, setCurrentItem] = useState<PlaylistItem>();
    useEffect(() => {
        if (akey === "2") {
            getHighquality(60).then((res: any) => {
                setpersonalized1(res.data.playlists);
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
        getNormalPlaylistSonglist(currentItem?.id as number).then((res: any) => {
            dispatch(setMusicAutoPlayList(res.data.songs));
            dispatch(setCurrentSong(res.data.songs[0]));
            getMusicUrl(res.data.songs[0].id).then((res: any) =>
                dispatch(setCurrentMusicUrl(res.data.data[0]))
            );
        });
    };
    // 查看歌单详情
    const playlistDetail = () => {
        navigate("/playlist");
        dispatch(setLoading(true));
        if (currentItem) dispatch(setCurrentPlaylist(currentItem));
        // 获取当前歌单所有歌曲
        getPlaylistSonglist(Number(currentItem?.id)).then((res: any) => {
            dispatch(setPlaylist(res.data.songs));
            dispatch(setLoading(false));
        });
    };

    return (
        <div style={{ height: "100vh" }} id="scrollBox">
            <Row>
                <Space>
                    <Col>
                        <h1 style={{ width: "100%", cursor: "pointer" }}>精品歌单》</h1>
                    </Col>
                </Space>
            </Row>
            <Row>
                {personalized1.map((item: PlaylistItem) => (
                    <Col key={item.id} span={4} style={{ padding: "10px" }}>
                        <Image
                            onClick={playlistDetail}
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

export default AllPlaylist;

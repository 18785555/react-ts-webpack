import { List } from "antd";
import { useEffect, useState } from "react";
import { MusicDetail } from "../../../../constance";
import { getMusicUrl, getNormalPlaylistDetail, getNormalPlaylistSonglist, getPlaylistSonglist } from "../../../../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusicUrl, setCurrentPlaylist, setCurrentSong, setMusicAutoPlayList, setPlaylist } from "../../../../store/actions/playlist";
import { RootState } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../../store/actions/app";
const itemStyle = { backgroundColor: "rgba(49, 32, 32, 0.253)" };

const ToplistItemMusic = (props: any) => {
    const { sendId } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const musicPlayList = useSelector((state: RootState) => state.playlist.musicPlayList);
    const currentMusicUrl = useSelector((state: RootState) => state.playlist.currentMusicUrl);
    const [toplist, setToplist] = useState<MusicDetail[]>([]);
    useEffect(() => {
        getNormalPlaylistSonglist(sendId, 5).then((res: any) => {
            setToplist(res.data.songs);
        });
    }, []);

    const play = (val: MusicDetail) => {
        let _item = musicPlayList.find((item: any) => item.id === val.id);
        if (!_item) {
            // 判断歌曲是否在播放列表里
            let arr = [val, ...musicPlayList];
            dispatch(setMusicAutoPlayList(arr));
        }
        dispatch(setCurrentSong(val));
        getMusicUrl(val.id).then((res: any) =>
            dispatch(setCurrentMusicUrl(res.data.data[0]))
        );
    };

    // 查看歌单详情
    const show = () => {
        navigate("/playlist");
        dispatch(setLoading(true))
        getNormalPlaylistDetail(sendId).then((res: any) => {
            dispatch(setCurrentPlaylist(res.data.playlist))
        })
        // 获取当前歌单所有歌曲
        getPlaylistSonglist(sendId).then((res: any) => {
            dispatch(setPlaylist(res.data.songs));
            dispatch(setLoading(false))
        });
    };

    return (
        <>
            <List
                size="small"
                bordered
                style={{ cursor: "pointer" }}
                dataSource={toplist}
                renderItem={(item) => (
                    <List.Item
                        onClick={() => play(item)}
                        key={item.id}
                        style={currentMusicUrl?.id === item.id ? itemStyle : {}}
                    >
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.name}</a>}
                        />
                        {item.ar.map((i, index) => (
                            <span key={index}>{i.name}</span>
                        ))}
                    </List.Item>
                )}
            />
            <List
                itemLayout="horizontal"
                dataSource={["查看更多>"]}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta title={<span onClick={show} style={{ cursor: "pointer" }}>{item}</span>} />
                    </List.Item>
                )}
            />
        </>
    );
};

export default ToplistItemMusic;

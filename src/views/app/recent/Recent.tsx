import { Space, Table } from "antd";
import { PlayCircleOutlined, SoundOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../store";
import { setCurrentMusicUrl, setCurrentSong, setMusicAutoPlayList } from "../../../store/actions/playlist";
import { getMusicUrl, getSearchResult } from "../../../utils/apis";
import type { MusicDetail } from "../../../constance";
interface DataType {
    key:string
    id: number;
    name: string;
    ar: any[];
    al: null;
    publishTime: any;
}

const Recent = (props: any) => {
    const dispatch = useDispatch()
    const musicPlayList = useSelector((state: RootState) => state.playlist.musicPlayList);
    const currentMusicUrl = useSelector((state: RootState) => state.playlist.currentMusicUrl);

    // 播放触发 &&添加到播放列表
    const playHandle = (val: any) => {
        let _item = musicPlayList.find((item: any) => item.id === val.id)
        if (!_item) {// 判断歌曲是否在播放列表里
            let arr = [val, ...musicPlayList]
            dispatch(setMusicAutoPlayList(arr))
        }
        dispatch(setCurrentSong(val));
        getMusicUrl(val.id).then((res: any) =>
            dispatch(setCurrentMusicUrl(res.data.data[0]))
        );
    };
    // 转换为日期格式
    const format_date = function (timestamp: number) {
        let datetime = new Date(timestamp).toLocaleString();
        return datetime;
    };

    const columns: ColumnsType<MusicDetail> = [
        {
            title: "操作",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {currentMusicUrl?.id === record.id ? (
                        <SoundOutlined
                            style={{ color: "blue", fontSize: "20px" }}
                        />
                    ) : (
                        <PlayCircleOutlined
                            style={{ fontSize: "20px" }}
                            onClick={() => playHandle(record)}
                        />
                    )}
                </Space>
            ),
            width: 80,
        },
        {
            title: "标题",
            dataIndex: "name",
            key: "name",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "歌手",
            dataIndex: "ar",
            key: "ar",
            render: (ar) => (
                <>
                    {ar.map((item: any) => (
                        <span style={{ padding: "5px" }}>{item.name}</span>
                    ))}
                </>
            ),
        },
        {
            title: "专辑",
            dataIndex: "al",
            key: "al",
            render: (al) => <span>{al.name}</span>,
        },
        {
            title: "时间",
            dataIndex: "publishTime",
            key: "publishTime",
            render: (publishTime) => <span>{format_date(publishTime)}</span>,
        },
    ];
    return (
        <div className="innerbox" style={{ height: "100%", overflow: "auto" }}>
    <Table columns={columns} dataSource={musicPlayList} />
    </div>
    
    );
}
export default Recent
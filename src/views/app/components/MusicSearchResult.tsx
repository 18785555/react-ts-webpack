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

const MusicSearchResult = (props: any) => {
    const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ]
    const dispatch = useDispatch()
    const { tabKey, searchWord } = props
    const [searcMusichResult, setSearchMusicResult] = useState<DataType[]>([])
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

    useEffect(() => {
        getSearchResult(searchWord).then((res: any) => {
            if (tabKey === '1') {
                const _searcMusichResult = res.data.result.songs
                setSearchMusicResult(_searcMusichResult.map((item:MusicDetail)=>{
                    item['key'] = item.id
                    return item
                }))
            }
        })
    }, [tabKey, searchWord])
    const columns: ColumnsType<DataType> = [
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
    return (<Table columns={columns} dataSource={searcMusichResult} />);
}
export default MusicSearchResult
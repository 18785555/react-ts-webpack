import { Space, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { PlayCircleOutlined, SoundOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {setCurrentMusicUrl,setCurrentSong,setMusicAutoPlayList} from "../../../store/actions/playlist";
import { getMusicUrl } from "../../../utils/apis";
import { RootState } from "../../../store";
import { MusicDetail } from "../../../constance";
interface DataType {
  id: number;
  name: string;
  ar: any[];
  al: null;
  time: number;
}
const Songlist = (props: any) => {
  const dispatch = useDispatch();
  const { value } = props;
  const [searchList, setSearchList] = useState<any[]>([]);
  const [searchResultShow, setSearchResultShow] = useState<boolean>(false);
  const list = useSelector((state: any) => state.playlist.playlist);
  const playList = useSelector((state: RootState) => state.playlist.musicPlayList);
  const currentMusic = useSelector((state: RootState) => state.playlist.currentSong);
  
  
  // 播放触发 &&添加到播放列表
  const playHandle = (val: any) => {
    let _item = playList.find((item:any)=>item.id===val.id)
    if(!_item){// 判断歌曲是否在播放列表里
      let arr = [val,...playList]
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
          {currentMusic?.id === record.id ? (
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
  
  useEffect(() => {
    list.map((item: any) => (item.key = item.id));
    setSearchResultShow(false);
  }, [list]);

  // 搜索
  useEffect(() => {
    if (value !== "") {
      var newData = list.filter((item: any) => {
        if (item.name.indexOf(value) > -1) {
          return item;
        }
        return newData;
      });
      setSearchList(newData);
      setSearchResultShow(true);
    } else {
      setSearchResultShow(false);
    }
  }, [value]);
  return (
    <>
      {searchResultShow ? (
        <Table columns={columns} dataSource={searchList} />
      ) : (
        <Table columns={columns} dataSource={list} />
      )}
    </>
  );
};

export default Songlist;

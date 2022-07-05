import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { UnorderedListOutlined, DownloadOutlined, CustomerServiceOutlined, CloudOutlined, DingtalkOutlined, QrcodeOutlined, } from "@ant-design/icons";
import { getPlaylistSonglist, getUserPlayList } from "../utils/apis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAllPlaylist, setCurrentPlaylist, setPlaylist, } from "../store/actions/playlist";
import { RootState } from "../store";
import { setLoading } from "../store/actions/app";

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
type Menuitem = Required<MenuProps>["items"][number];

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPlaylist = useSelector((state: RootState) => state.playlist.allPlaylist);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [createPlaylist, setCreatePlaylist] = useState<Menuitem[]>([]);
  const [collectionPlaylist, setCollectionPlaylist] = useState<Menuitem[]>([]);
  const item = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: Menuitem[],
    type?: "group"
  ): Menuitem => ({ key, icon, children, label, type }) as Menuitem;

  const getMenu = () => {
    const uid = localStorage.getItem("uid");
    const cookie = localStorage.getItem("cookie");
    if (!cookie && !uid) return
    else {
      const _create: any = [];
      const _collection: any = [];
      getUserPlayList(cookie, Number(uid)).then((res) => {
        dispatch(saveAllPlaylist(res.data.playlist));
        res.data.playlist.forEach((_item: any) => {
          // 判断歌单是否是自己创建的
          if (_item.creator.userId === Number(uid)) {
            _create.push(
              item(_item.name, _item.id, <UnorderedListOutlined key={_item.id} />)
            );
          } else {
            _collection.push(
              item(_item.name, _item.id, <UnorderedListOutlined key={_item.id} />)
            );
          }
        });
      });
      setCreatePlaylist(_create);
      setCollectionPlaylist(_collection);
    }
  };
  const items: Menuitem[] = [
    item("发现音乐", "发现音乐", ""),
    item("播客", "播客", ""),
    item("视频", "视频", ""),
    item("关注", "关注", ""),
    item("私人FM", "私人FM", ""),
    item("我的音乐", "我的音乐", null, [], "group"),
    item("本地与下载", "本地与下载", <DownloadOutlined />),
    item("最近播放", "最近播放", <CustomerServiceOutlined />),
    item("我的音乐云盘", "我的音乐云盘", <CloudOutlined />),
    item("我的博客", "我的博客", <DingtalkOutlined />),
    item("我的收藏", "我的收藏", <QrcodeOutlined />),
    item("创建的歌单", "创建的歌单", "", createPlaylist),
    item("收藏的歌单", "收藏的歌单", "", collectionPlaylist),
  ];
  const nav = (val: any) => {
    // 判断用户点击事件
    const len = val.keyPath.length;
    if (len === 1) {
      switch (val.key) {
        case "发现音乐":
          console.log("发现音乐");
          navigate("/Found");
          break;
        case "博客":
          console.log("博客");
          navigate("/Found");
          break;
        case "视频":
          console.log("视频");
          navigate("/Found");
          break;
        case "关注":
          console.log("关注");
          navigate("/Found");
          break;
        case "私人FM":
          console.log("私人FM");
          navigate("/Found");
          break;
        case "本地与下载":
          console.log("本地与下载");
          navigate("/Found");
          break;
        case "最近播放":
          console.log("最近播放");
          navigate("/recent");
          break;
        case "我的音乐云盘":
          console.log("我的音乐云盘");
          navigate("/Found");
          break;
        case "我的博客":
          console.log("我的博客");
          navigate("/Found");
          break;
        case "我的收藏":
          console.log("我的收藏");
          navigate("/Found");
          break;
      }
      return;
    }
    if (len === 2) {
      navigate("/playlist");
      dispatch(setLoading(true));
      const id = Number(val.key);
      const arr = allPlaylist.find((item: any) => item.id === id);
      getPlaylistSonglist(id).then((res: any) => {
        dispatch(setPlaylist(res.data.songs));
        // 获取当前歌单所有歌曲
        if (arr) {
          dispatch(setLoading(false));
          dispatch(setCurrentPlaylist(arr));
        }
      });
    }
  };
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    getMenu()
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      theme="light"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
      onClick={nav}
    />
  );
};
export default SideMenu;

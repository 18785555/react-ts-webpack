import { Col, Slider } from "antd";
import {
  RetweetOutlined,
  StepBackwardOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  SoundOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import "../style/global.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { MusicDetail } from "../constance";
import { getMusicUrl } from "../utils/apis";
import { setCurrentMusicUrl, setCurrentPlayTime, setCurrentSong, } from "../store/actions/playlist";
import Volum from "./Volum";
const btnStyle: React.CSSProperties = { color: "whitesmoke" };
interface PlayComponentState {
  playRate: number;
  isPlay: boolean;
  volume: number;
  allTime: number;
  currentTime: number;
}

const Play = (props: any) => {
  const { buttonStatus } = props
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: RootState) => state.playlist.currentMusicUrl);
  const music_play_list = useSelector((state: RootState) => state.playlist.musicPlayList);
  const [progress, setprogress] = useState<number>(0);
  const [volum, setVolum] = useState<boolean>(false);
  const [state, setState] = useState<PlayComponentState>({
    playRate: 1,
    isPlay: false,
    volume: 100,
    allTime: 0,
    currentTime: 0,
  });
  useEffect(() => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    audio.load();
    playAudio();
  }, [currentUrl?.id]);

  // 音乐播放自然结束回调
  const onpause = () => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    if (audio.ended) {
      let index = music_play_list.findIndex(
        (item: MusicDetail) => item.id === currentUrl?.id
      );
      let next: MusicDetail | null = null;
      switch (playRate) {
        // 播放列表顺序播放
        case 1:
          next = music_play_list[index + 1];
          dispatch(setCurrentSong(next));
          getMusicUrl(next.id).then((res: any) =>
            dispatch(setCurrentMusicUrl(res.data.data[0]))
          );
          break;
        // 单曲循环
        case 2:
          next = music_play_list[index];
          dispatch(setCurrentSong(next));
          getMusicUrl(next.id).then((res: any) =>
            dispatch(setCurrentMusicUrl(res.data.data[0]))
          );
          break;
        // 随机播放
        case 3:
          next =
            music_play_list[Math.floor(Math.random()) * music_play_list.length];
          dispatch(setCurrentSong(next));
          getMusicUrl(next.id).then((res: any) =>
            dispatch(setCurrentMusicUrl(res.data.data[0]))
          );
          break;
      }
    }
  };

  // 时间格式处理
  const formatSecond = (time: number) => {
    const i = Math.floor(time);
    const minute = Math.floor(i / 60)
      .toString()
      .padStart(2, "0");
    const second = (i % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
  };

  // 初始获取播放总时长
  const onCanPlay = () => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    setState({
      ...state,
      allTime: audio.duration,
    });
  };

  // 播放
  const playAudio = () => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    audio.play();
    setState({
      ...state,
      isPlay: true,
    });
  };

  // 停止
  const pauseAudio = () => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    audio.pause();
    setState({
      ...state,
      isPlay: false,
    });
  };

  // 滑动控制播放时间
  const changeTime = (e: number) => {
    const value = (e * allTime) / 100;
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    setState({
      ...state,
      currentTime: value,
    });
    audio.currentTime = value;
    if (value === audio.duration) {
      setState({
        ...state,
        isPlay: false,
      });
    }
  };

  // 当前播放位置改变时执行
  const onTimeUpdate = () => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    dispatch(setCurrentPlayTime(audio.currentTime));
    setState({
      ...state,
      currentTime: audio.currentTime,
    });
    setprogress(Math.ceil((currentTime / allTime) * 100));
    if (audio.currentTime === audio.duration) {
      setState({
        ...state,
        isPlay: false,
      });
    }
  };

  // 音量调节
  const changeVolume = (value: number) => {
    const audio = document.getElementById("My_Audio") as HTMLAudioElement;
    audio.volume = value / 100;
    setState({
      ...state,
      volume: value,
    });
  };
  // 滚轮调节音量
  const _changeVolume = (e: any) => {
    console.log(e.wheelDelta)

  }
  // 上一曲
  const prev = () => {
    let index = music_play_list.findIndex(
      (item: MusicDetail) => item.id === currentUrl?.id
    );
    if (index === 0) return;
    else {
      let prev = music_play_list[index - 1];
      dispatch(setCurrentSong(prev));
      getMusicUrl(prev.id).then((res: any) =>
        dispatch(setCurrentMusicUrl(res.data.data[0]))
      );
    }
  };
  // 下一曲
  const next = () => {
    let index = music_play_list.findIndex(
      (item: MusicDetail) => item.id === currentUrl?.id
    );
    if (index === music_play_list.length - 1) return;
    else {
      let next = music_play_list[index + 1];
      dispatch(setCurrentSong(next));
      getMusicUrl(next.id).then((res: any) =>
        dispatch(setCurrentMusicUrl(res.data.data[0]))
      );
    }
  };
  const { playRate, isPlay, allTime, volume, currentTime } = state;
  return (
    <Col span={10}>
      <div className="contorl_container">
        <audio
          id="My_Audio"
          src={currentUrl?.url}
          preload={"play"}
          onPause={onpause}
          onCanPlay={onCanPlay}
          onTimeUpdate={onTimeUpdate}
        ></audio>

        <span className="hover" style={buttonStatus ? {} : btnStyle}>
          <RetweetOutlined />
        </span>
        <span className="hover" style={buttonStatus ? {} : btnStyle}>
          <StepBackwardOutlined onClick={prev} />
        </span>
        {isPlay ? (
          <span className="hover" style={buttonStatus ? {} : btnStyle}>
            <PauseOutlined onClick={pauseAudio} />
          </span>
        ) : (
          <span className="hover" style={buttonStatus ? {} : btnStyle}>
            <CaretRightOutlined onClick={playAudio} />
          </span>
        )}

        <span className="hover">
          <StepForwardOutlined onClick={next} style={buttonStatus ? {} : btnStyle} />
        </span>
        <span onWheel={_changeVolume} className="hover" style={buttonStatus ? {} : btnStyle}>
          {volum ? (
            <Volum
              changeVolume={changeVolume}
              onMouseLeave={() => setVolum(false)}
              volume={volume}
            />
          ) : null}
          <SoundOutlined onMouseEnter={() => setVolum(true)} />
        </span>
      </div>
      <div className="contorl_container">
        <span style={{ padding: "0 10px" }}>{formatSecond(currentTime)}</span>
        <Slider
          style={{ width: "100%" }}
          onChange={changeTime}
          value={progress}
          defaultValue={progress}
        />
        <span style={{ padding: "0 10px" }}>{formatSecond(allTime)}</span>
      </div>
    </Col>
  );
};

export default Play;

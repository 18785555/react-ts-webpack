import { PlaylistItem, MusicDetail } from "../../constance";
import {
  PlaylistActionsType,
  SET_PLAYLIST,
  SAVE_ALL_PLAYLIST,
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_SONG,
  SET_CURRENT_MUSIC_URL,
  SET_CURRENT_MUSIC_LYR,
  SET_MUSIC_PLAY_LIST,
  CurrentMusicUrl,
  SET_CURRENT_PLAYTIME
} from "../types/playlist";
// 获取歌单所有歌曲
export const setPlaylist = (value:MusicDetail[]): PlaylistActionsType => {
  return {
    type: SET_PLAYLIST,
    payload: value,
  };
};


// 设置当前歌单
export const setCurrentPlaylist = (value:PlaylistItem)=>{
  return {
    type:SET_CURRENT_PLAYLIST,
    payload:value
  }
}

// 保存所有歌单
export const saveAllPlaylist = (value:PlaylistItem[])=>{
  return {
    type:SAVE_ALL_PLAYLIST,
    payload:value
  }
}

//  设置当前播放歌曲
export const setCurrentSong = (value:MusicDetail)=>{
  return {
    type:SET_CURRENT_SONG,
    payload:value
  }
}
// 当前音乐播放地址
export const setCurrentMusicUrl = (value:CurrentMusicUrl)=>{
  return{
    type:SET_CURRENT_MUSIC_URL,
    payload:value
  }
}
// 当前播放音乐歌词
export const setCurrentMusicLyr = (value:any)=>{
  return{
    type:SET_CURRENT_MUSIC_LYR,
    payload:value
  }
}

// 设置播放列表
export const setMusicAutoPlayList = (value:MusicDetail[])=>{
  return{
    type:SET_MUSIC_PLAY_LIST,
    payload:value
  }
}

// 设置当前播放时间
export const setCurrentPlayTime = (value:number)=>{
  return {
    type: SET_CURRENT_PLAYTIME,
    payload:value
  }
}
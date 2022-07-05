import { PlaylistItem, MusicDetail } from "../../constance";

export interface CurrentMusicUrl {
  id:number,
  url:string
}
export type PlaylistState = {
  playlist: MusicDetail[];
  allPlaylist: PlaylistItem[];
  currentPlaylist: PlaylistItem | null;
  currentSong: MusicDetail | null;
  currentMusicUrl:CurrentMusicUrl|null;
  currentMusicLyr:any;
  musicPlayList:MusicDetail[],
  currentPlayTime:number
  // ...
};
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SAVE_ALL_PLAYLIST = "SAVE_ALL_PLAYLIST";
export const SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_CURRENT_MUSIC_URL = "SET_CURRENT_MUSIC_URL";
export const SET_CURRENT_MUSIC_LYR = "SET_CURRENT_MUSIC_LYR";
export const SET_MUSIC_PLAY_LIST = "SET_MUSIC_PLAY_LIST";
export const SET_CURRENT_PLAYTIME = "SET_CURRENT_PLAYTIME"
export type SetPlaylist = {
  type: typeof SET_PLAYLIST;
  payload: MusicDetail[];
};

export type SaveAllPlaylist = {
  type: typeof SAVE_ALL_PLAYLIST;
  payload: PlaylistItem[];
};

export type SetCurrentPlaylist = {
  type: typeof SET_CURRENT_PLAYLIST;
  payload: PlaylistItem;
};

export type SetCurrentSong = {
  type: typeof SET_CURRENT_SONG;
  payload: MusicDetail;
}

export type SetCurrentMusicUrl = {
  type: typeof SET_CURRENT_MUSIC_URL;
  payload: CurrentMusicUrl;
};
export type SetCurrentMusicLyr = {
  type: typeof SET_CURRENT_MUSIC_LYR;
  payload: any;
};
export type SetMusicAutoPlayList = {
  type: typeof SET_MUSIC_PLAY_LIST,
  payload:MusicDetail[]
}

export type SetCurrentPlayTime = {
  type: typeof SET_CURRENT_PLAYTIME;
  payload: number;
};
export type PlaylistActionsType =
  | SetPlaylist
  | SaveAllPlaylist
  | SetCurrentSong
  | SetCurrentPlaylist
  | SetCurrentMusicUrl
  | SetCurrentMusicLyr
  | SetMusicAutoPlayList
  | SetCurrentPlayTime

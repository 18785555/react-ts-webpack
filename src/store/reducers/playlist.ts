import {
  PlaylistState,
  PlaylistActionsType,
  SET_PLAYLIST,
  SAVE_ALL_PLAYLIST,
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_SONG,
  SET_CURRENT_MUSIC_URL,
  SET_CURRENT_MUSIC_LYR,
  SET_MUSIC_PLAY_LIST,
  SET_CURRENT_PLAYTIME,
} from "../types/playlist";

let initialState: PlaylistState = {
  playlist: [],
  allPlaylist: [],
  currentPlaylist: null,
  currentSong: null,
  currentMusicUrl: null,
  currentMusicLyr:"",
  musicPlayList:[],


  // lyric
  currentPlayTime:0,
};

export const playlistReducer = (
  state = initialState,
  action: PlaylistActionsType
): PlaylistState => {
  switch (action.type) {
    case SET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case SAVE_ALL_PLAYLIST:
      return { ...state, allPlaylist: action.payload };
    case SET_CURRENT_PLAYLIST:
      return { ...state, currentPlaylist: action.payload };
    case SET_CURRENT_SONG:
      return { ...state, currentSong: action.payload };
    case SET_CURRENT_MUSIC_URL:
      return { ...state, currentMusicUrl: action.payload };
    case SET_CURRENT_MUSIC_LYR:
      return { ...state, currentMusicLyr: action.payload };
      case SET_MUSIC_PLAY_LIST:
      return { ...state, musicPlayList: action.payload};
      case SET_CURRENT_PLAYTIME:
      return { ...state, currentPlayTime: action.payload};
    default:
      return state;
  }
};

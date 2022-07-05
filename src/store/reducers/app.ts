import {
  AppActionType,
  AppState,
  SET_APP_LOADING,
  SET_BOTTOM_STATUS,
  SET_RECENT_MUSIC_LIST,
  SET_USER_PROFILE,
} from "../types/app";

let initialState: AppState = {
  isLoading: false,
  bottomStatus: "",
  userProfile: null,
  recentPlayMusicList: null
};

export const applicationReducer = (
  state = initialState,
  action: AppActionType
): AppState => {
  switch (action.type) {
    case SET_APP_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_BOTTOM_STATUS:
      return { ...state, bottomStatus: action.payload };
    case SET_USER_PROFILE:
      return { ...state, userProfile: action.payload };
    case SET_RECENT_MUSIC_LIST:
      return { ...state, recentPlayMusicList: action.payload };
    default:
      return state;
  }
};

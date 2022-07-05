import { MusicDetail, Profile } from "../../constance"

export interface AppState {
    isLoading:boolean,
    bottomStatus:string,
    userProfile:Profile|null,
    recentPlayMusicList:MusicDetail[]|null
}

export const SET_APP_LOADING = "SET_APP_LOADING"
export const SET_BOTTOM_STATUS = "SET_BOTTOM_STATUS"
export const SET_USER_PROFILE = "SET_USER_PROFILE"
export const SET_RECENT_MUSIC_LIST = "SET_RECENT_MUSIC_LIST"
export type SetAppLoading = {
    type:typeof SET_APP_LOADING,
    payload:boolean
}

export type SetBottomStatus = {
    type:typeof SET_BOTTOM_STATUS,
    payload:string
}

export type SetUserProfile = {
    type: typeof SET_USER_PROFILE,
    payload:Profile
}

export type SetRecentPlayMusicList = {
    type: typeof SET_RECENT_MUSIC_LIST,
    payload:MusicDetail[]
}
export type AppActionType = SetAppLoading|SetBottomStatus|SetUserProfile|SetRecentPlayMusicList
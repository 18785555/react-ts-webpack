import { MusicDetail, Profile } from "../../constance"
import { SET_APP_LOADING, SET_BOTTOM_STATUS, SET_RECENT_MUSIC_LIST, SET_USER_PROFILE } from "../types/app"

export const setLoading = (value:boolean)=>{
    return{
        type:SET_APP_LOADING,
        paload:value
    }
}
export const setBottomStatus = (value:string)=>{
    return{
        type:SET_BOTTOM_STATUS,
        paload:value
    }
}

export const setUserProfile = (value:Profile)=>{
    return{
        type:SET_USER_PROFILE,
        payload:value
    }
}

export const setRecentPlayMusicList = (value:MusicDetail[])=>{
    return {
        type:SET_RECENT_MUSIC_LIST,
        payload:value
    }
}
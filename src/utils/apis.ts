import api from "./request";
const cookie = localStorage.getItem("cookie");
// 登录
export const login = (cellphone: number, password: number) => {
  return api.post("/login/cellphone", {
    phone: cellphone,
    password: password,
  });
};
// 验证手机号码是否已注册
export const verifyPhone = (cellphone:number)=>{
  return api.post('/cellphone/existence/check',{
    phone:cellphone
  })
}
// 发送验证码
export const getCaptcha = (cellphone:number)=>{
  return api.post('/captcha/sent',{
    phone:cellphone
  })
}
// 验证验证码
export const verifyCaptcha = (cellphone:number,captcha:number)=>{
  return api.post('/captcha/verify',{
    phone:cellphone,
    captcha:captcha
  })
}
// 获取用户资料
export const getUserProfile = (uid:number)=>{
  return api.get(`/user/detail?uid=${uid}`)
}
// 获取用户歌单
export const getUserPlayList = (cookie: string | null, uid: number | null) => {
  return api.get("/user/playlist", {
    params: {
      cookie: cookie,
      uid: uid,
    },
  });
};
// 获取用户歌单全部歌曲
export const getPlaylistSonglist = (id: number) => {
  return api.get(`/playlist/track/all?id=${id}`, {
    params: {
      cookie: cookie,
    },
  });
};

// 获取普通歌单详情
export const getNormalPlaylistDetail = (id: number) => {
  return api.get(`/playlist/detail?id=${id}`);
};
// 获取普通歌单全部歌曲
export const getNormalPlaylistSonglist = (id: number, limit?: number) => {
  return api.get(`/playlist/track/all?id=${id}&limit=${limit}`);
};
// 播放地址
export const getMusicUrl = (song_id: number) => {
  return api.get(`/song/url?id=${song_id}`, {
    params: {
      cookie: cookie,
    },
  });
};
// 歌词
export const getMusicLyr = (song_id: number) => {
  return api.get(`/lyric?id=${song_id}`);
};

// 推荐歌单 在此默认取6个
export const getPersonalized = (limit = 48) => {
  return api.get(`/personalized?limit=${limit}`, {
    params: {
      cookie: cookie,
    },
  });
};

// 精品歌单// /top/playlist/highquality
export const getHighquality = (limit = 48) => {
  return api.get(`/top/playlist/highquality?limit=${limit}`);
};

// 榜单   // 说明: 请使用歌单详情接口,传入排行榜 id 获取排行榜详情数据(排行榜也是歌单的一种)
export const getToplist = () => {
  return api.get(`/toplist`);
};

// 收藏取消收藏歌单 t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export const handleCollection = (type: number, id: number) => {
  return api.post(`/playlist/subscribe`, {
    type: type,
    id: id,
    cookie: cookie,
  });
};

// 热搜列表
export const getSearchHot = () => {
  return api.get("/search/hot/detail");
};
// 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
//  搜索建议
export const getSearchResult = (keyword: string,type=1) => {
  return api.get(`/cloudsearch?keywords=${keyword}&type=${type}`);
};

// 私人FM
export const getpersonal_fm = () => {
  return api.get(`/personal_fm`,{
    params:{
      cookie:cookie
    }
  });
};
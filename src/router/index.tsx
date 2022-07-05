import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "../views";
import Login from '../views/auth/Login';
import MyLayout from "../layout/MyLayout";
import Playlist from "../views/home/Playlist";
import Found from "../views/app/found/Found";
import { useEffect, useState } from "react";
import SearchResult from "../views/app/SearchResult";
import Fm from "../views/app/personal_fm/Fm";
import Recent from "../views/app/recent/Recent";
import Register from "../views/auth/Register";


const Test = ()=><div>test</div>
const MyRouter = () => {
  const Auth = ()=>{
    const localCookie = localStorage.getItem('cookie')
    const [cookie,setCookie] = useState<string>()
    useEffect(()=>{
      
      if(localCookie)setCookie(localCookie)
    },[])
      return(
        localCookie ? <MyLayout/>:<Navigate to={"/login"}/>
      )
    }
  return (
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/playlist"element={<Playlist />}/>
          <Route path="/test"element={<Test />}/>
          <Route path="/fm"element={<Fm />}/>
          <Route path="/Found"element={<Found />}/>
          <Route path="/recent"element={<Recent />}/>
          <Route path="/searchResult/:searchWord"element={<SearchResult />}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default MyRouter;

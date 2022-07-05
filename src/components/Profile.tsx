import { Avatar, Button, Popover, Tooltip } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getUserProfile } from "../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserProfile } from "../store/actions/app";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userProfile = useSelector((state: RootState) => state.app.userProfile);
    const logout = ()=>{
        window.localStorage.clear()
        navigate('/login')
    }
    const content = (
        <div>
            <p>个人信息</p>
            <Tooltip title="search">
                <Button onClick={logout} icon={<SearchOutlined />}>退出登录</Button>
            </Tooltip>
        </div>
    );
    useEffect(() => {
        const uid = window.localStorage.getItem("uid");
        getUserProfile(Number(uid)).then((res) => {
            dispatch(setUserProfile(res.data.profile));
        });
    }, []);
    return (
        <>
            <Popover
                placement="bottom"
                content={content}
                trigger="click"
                
            >
                <Avatar
                    size="large"
                    src={userProfile?.avatarUrl}
                    icon={<UserOutlined />}
                    style={{cursor:'pointer'}}
                />
                <span style={{cursor:'pointer'}}>{userProfile?.nickname}</span>
            </Popover>
        </>
    );
};
export default Profile;

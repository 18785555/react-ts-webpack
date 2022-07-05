import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Col, Row, message, Carousel,Image } from "antd";
import { getUserProfile, login } from "../../utils/apis";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../store/actions/app";
const backgroundStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  left: "0",
  top: "0",
  backgroundSize: "cover",
  zIndex: "-111111111",
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFinish = (form: any) => {
    setIsLoading(true)
    login(form.cellphone, form.password).then((res) => {
      if (res.data.code === 200) {
        message.success('登录成功')
        localStorage.setItem("cookie", res.data.cookie);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.profile.userId);
        const timer = setTimeout(() => {
          getUserProfile(res.data.profile.userId).then(data => {
            dispatch(setUserProfile(data.data.profile))
          })
          navigate("/", { replace: true })
          setIsLoading(false)
          clearTimeout(timer)
        }, 1000)
      } else {
        const timer = setTimeout(() => {
          message.error('Error!!!')
          setIsLoading(false)
          clearTimeout(timer)
        }, 1000)
      }
    });
  };
  return (
    <Row>
      <Col span={16}>
      <img style={backgroundStyle} src='https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp' alt="" />
      </Col>
      <Col span={8}>
        <div className="container_login">
          <div className="container_form">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="cellphone"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  size={"large"}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="手机号码"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  size={"large"}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                {
                  isLoading ? <Button
                    size={"large"}
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading
                  >
                    Log in
                  </Button> : <Button
                    size={"large"}
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                }
                Or <Link to={'/register'}>register now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Login;

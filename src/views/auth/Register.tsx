import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Col, Row } from "antd";
import { verifyPhone, getCaptcha } from "../../utils/apis";
import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<number>(0);
  const onFinish = (form: any) => {
    console.log(form);
   
    
  };
  const sendCode = ()=>{
    console.log(phone);
    verifyPhone(Number(phone)).then(res=>{
      console.log(res);
      
      if(res.data.exist===1){
        console.log("账号已存在");
        return
      }
      getCaptcha(Number(phone)).then(res=>{
        console.log(res);
        
      })
    })
  }
  return (
    <Row>
      <Col span={16}></Col>
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
                  { required: true, message: "Please input your cellphone!" },
                ]}
              >
                <Input
                  size={"large"}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="手机号码"
                  onChange={(e:any)=>setPhone(Number(e.target.value))}
                />
              </Form.Item>
              <Form.Item
                name="Username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  size={"large"}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="昵称"
                />
              </Form.Item>
              <Form.Item
                name="captcha"
                rules={[
                  { required: true, message: "Please input your captcha!" },
                ]}
              >
                <Input
                  size={"large"}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="手机验证码"
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Button shape="round" onClick={sendCode} type="primary">发送验证码</Button>
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
                    register
                  </Button> : <Button
                    size={"large"}
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    register
                  </Button>
                }
                Or <Link to={'/login'}>login now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Register;

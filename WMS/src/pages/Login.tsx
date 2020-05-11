import React, { useReducer } from 'react';
import { Button, InputItem } from 'antd-mobile';
import Footer from '@/components/Footer'

/* 配置项 */
import {Admin} from '@/utils/config/Server'
import Api from '@/utils/config/Api'
import Request from '@/utils/utils/Request'
import PdaStorage from '@/utils/utils/Storage'

/* UI */
import UI from '@/utils/utils/UI'

/* style */
import '@/utils/theme/Login.less'

/* interface */
import PublicInterface from '@/utils/interface/Public'
import Interface from '@/utils/interface/Login'


export default class Login extends React.Component<Interface.Props, Interface.State> {
  constructor(props: Interface.Props){
    super(props)
    this.state = new Interface.State()
  }

  componentDidMount(): void {
    this.IsLogin();
  }

  IsLogin = (): void => {
    const USER = PdaStorage.Get('WMS_USER')
    if(USER.UserId){
      (this.props as any).history.replace('/index')
    }else {
      (this.refs.Email as any).focus();
    }
  }

  ClickLogin = ():void =>{
    const { LoginForm } = this.state
    if(this.Validate(LoginForm)){
      UI.Loading.Show()
      Request.Post({
        Server: Admin,
        Api: Api.Login,
        Login: false,
        Data: LoginForm,
        Callback: (Res: PublicInterface.RequestRes): void => {
          UI.Loading.Hide()
          if(Res.IsSuccess){
            PdaStorage.Set('WMS_USER', Res.Data.Data);
            (this.props as any).history.replace('/index')
          }else{
            Request.Error(Res)
          }
        }
      })
    }
  }

  Validate = (Form: Interface.LoginForm): boolean => {
    if(!Form.Email){
      UI.Toast.Info('请输入登录账号');
      (this.refs.Email as any).focus();
      return false
    }
    if(!Form.Password){
      UI.Toast.Info('请输入登录密码');
      (this.refs.Password as any).focus();
      return false
    }
    return true
  }

  HandleVal = (Key: string, Val: string): void => {
   let F: Interface.LoginForm = this.state.LoginForm;
   (F as any)[Key] = Val
    this.setState({
      LoginForm: F
    })
  }

  HandleError = (Key: string, Val: string): boolean => {
    return Boolean(Val)
  }

  ResetLogin = (): void => {
    this.setState({
      LoginForm : new Interface.LoginForm()
    })
  }

  render(){
    const { LoginForm } = this.state
    return (
      <div className="Login-Container">
        <div className="Login-Bg">
          <img className="Logo" src="/images/furui.png" alt=""/>
        </div>
        <div className="Login-Form">
          <InputItem clear ref="Email" placeholder="请输入登录账号" value={LoginForm.Email} onChange={this.HandleVal.bind(this, 'Email')} onVirtualKeyboardConfirm={this.ClickLogin}></InputItem>
          <InputItem clear ref="Password" placeholder="请输入登录密码" type="password" value={LoginForm.Password} onChange={this.HandleVal.bind(this, 'Password')} onVirtualKeyboardConfirm={this.ClickLogin}></InputItem>
          <Button type="primary" inline onClick={this.ClickLogin}>登录</Button>
          <Button type="warning" inline onClick={this.ResetLogin}>重置</Button>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
import axios, {AxiosResponse} from 'axios'

import PdaStorege from '@/utils/utils/Storage'
import { createHashHistory } from 'history'

import UI from '@/utils/utils/UI'

import PublicInterface from '@/utils/interface/Public'
import Interface from '@/utils/interface/Request'

namespace RequestHandler {
  export class Request {
    Headers(Arg: Interface.PostArg): Interface.PostHeader {
      const USER = PdaStorege.Get('WMS_USER')
      return new Interface.PostHeader(USER.UserId ? USER.UserId : '', USER.Token ? USER.Token : '' ,Arg.Form ? Arg.Data : JSON.stringify(Arg.Data));
    }

    ValidateLogin(): boolean {
      const USER = PdaStorege.Get('WMS_USER')
      return Boolean(USER.UserId)
    }

    Post(PostArg: Interface.PostArg): void{
      if(PostArg.Login && !this.ValidateLogin()){
        this.ForwardLogin()
        return
      }else {
        axios({
          method: 'post',
          url: `${PostArg.Server}${PostArg.Api}`,
          data: JSON.stringify(PostArg.Data),
          headers: this.Headers(PostArg)
        })
        .then(function (Res: AxiosResponse<any>): void {
          if(Res.status === 200){
            PostArg.Callback(Res.data)
          }else{
            UI.Loading.Hide();
          }
        })
        .catch(function (Err: AxiosResponse<any>):void {
          UI.Loading.Hide();
          console.log(Err);
        });
      }
    }

    Error(Res: PublicInterface.RequestRes): void {
      if(Res.ApiStatusCode){
        switch(Res.ApiStatusCode){
          case 407:
            UI.Toast.Info('请校准设备时间')
            break
          default:
            UI.Toast.Info('请重新登录')
            this.ForwardLogin()
            break
        }
      }else{
        UI.Toast.Fail(Res.Msg || '')
      }
    }

    ForwardLogin(): void{
      PdaStorege.Del('WMS_USER')
      createHashHistory().replace('/')
    }
  }
}

export default new RequestHandler.Request()

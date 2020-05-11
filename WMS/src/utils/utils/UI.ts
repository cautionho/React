import { Toast } from 'antd-mobile'

class Loading {
  Show: () => void = function(){
    Toast.loading('Loading...', 0, ()=>{}, true)
  }
  Hide: () => void = function(){
    Toast.hide()
  }
}

class CustomToast {
  Info: (Str: string, Cb?: ()=>void) => void = function(Str: string = '', Cb: ()=>void = ():void => {}){ Toast.info(Str, 3, Cb, false) }
  Success: (Str: string, Cb?: ()=>void) => void = function(Str: string = '', Cb: ()=>void = ():void => {}){ Toast.success(Str, 3, Cb, false)}
  Fail: (Str: string, Cb?: ()=>void) => void = function(Str: string = '', Cb: ()=>void = ():void => {}){ Toast.fail(Str, 3, Cb, false) }
  Offline: (Str: string, Cb?: ()=>void) => void = function(Str: string = '', Cb: ()=>void = ():void => {}){ Toast.offline(Str, 3, Cb, false) }
}

class UI {
  Loading: Loading = new Loading()
  Toast: CustomToast = new CustomToast()
}



export default new UI()
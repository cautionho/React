/* React */
import React from 'react'

import { Drawer } from 'antd-mobile'
import Personnel from '@/components/Drawer/Personnel'

/* 配置项 */
import Request from '@/utils/utils/Request'
import { Admin } from '@/utils/config/Server'
import Api from '@/utils/config/Api'
import PdaResource from '@/utils/config/Resources'

/* Redux */
import Action from '@/redux/Action';
import Store from '@/redux/Store'

/* UI项 */
import UI from '@/utils/utils/UI'

import '@/utils/theme/Drawer.less'

/* Interface */
import PublicInterface from '@/utils/interface/Public'
import Interface from '@/utils/interface/Nav'


export default class Nav extends React.Component<Interface.Props,Interface.State> {
  constructor(Props:Interface.Props){
    super(Props)
    this.state = new Interface.State
  }

  componentDidMount(){
    Action.NAV_BAR_TITLE('')
    const State = Store.getState().State // 从Reducer获取State中的指定值
    if(State.MENUS && State.MENUS.length){
      this.setState(()=>{
        return {
          Menus: State.MENUS
        }
      })
    }else{
      this.GetResources()
    }
  }

  GetResources=():void => {
    UI.Loading.Show()
    Request.Post({
      Server: Admin,
      Api: Api.GetUserResource,
      Login: true,
      Data: "",
      Callback: (Res: PublicInterface.RequestRes): void => {
        UI.Loading.Hide()
        if(Res.IsSuccess){
          const Menus: Interface.Menu[] = Res.Data.Point.filter((Item: Interface.Menu) => PdaResource.includes(Item.ElementId))
          Action.MENUS(Menus) // 触发Action变更值
          this.setState({
            Menus: Menus
          })
        }else{
          Request.Error(Res)
        }
      }
    })
  }

  TriggerDrawer = (): void => {
    this.setState({
      DrawerModal: !this.state.DrawerModal
    })
  }

  ForwardPage = (ElementId: string, N: string):void =>{
    Action.NAV_BAR_TITLE(N)
    this.props.history.push(`${ElementId}`)
  }

  render(){
    const { Menus } = this.state
    return (
      <div>
        <Drawer className="PDA-Drawer" position="right" sidebar={Personnel} open={this.state.DrawerModal} onOpenChange={this.TriggerDrawer}>
          <ul className="Nav">
            {Menus.map((Item) => {
              return (<li onClick={this.ForwardPage.bind(this, Item.ElementId, Item.ResourceName)} key={Item.ElementId}> <img src={`/images/${Item.ElementId}.png`} width="24" alt=""/> <p>{Item.ResourceName}</p></li>)
            })}
          </ul>
        </Drawer>
      </div>
    )
  }
}
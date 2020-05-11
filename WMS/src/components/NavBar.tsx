import React from 'react'
import History, { createHashHistory } from 'history'
import { NavBar, Icon } from 'antd-mobile';

import '@/utils/theme/NavBar.less';

import Interface from '@/utils/interface/NavBar'

const history: History.History<History.History.PoorMansUnknown> = createHashHistory()

export default class NavBars extends React.Component<Interface.Props> {
  constructor(Props: Interface.Props){
    super(Props)
  }

  ForwardBack = ():void => {
    history.goBack()
  }

  render(){
    const { Title, Back, TriggerRightIcon } = this.props
    return (
      <div>
      <NavBar mode="dark" leftContent={
       Back ? <Icon size="sm" type="left" onClick={this.ForwardBack} ></Icon> : ''
      } rightContent={
        <Icon size="sm" type="ellipsis" onClick={TriggerRightIcon} style={{marginRight: '6px'}} />
      }>{ Title }</NavBar>
      </div>
    )
  }
}
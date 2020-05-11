import React, {useRef} from 'react';
import { HashRouter , withRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './router/index';

/* 组件 */
import NavBars from '@/components/NavBar'
// import Footer from '@/components/Footer'

import Action from '@/redux/Action'
import { connect } from 'react-redux'

/* interface */
import ReduxInterface from '@/utils/interface/Redux'
import PublicInterface from '@/utils/interface/Public'
import Interface from '@/utils/interface/Index'

const mapStateToProps = (State:ReduxInterface.State) => {
  return {
    BAR_TITLE: State.State.NAV_BAR_TITLE || ''
  }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = () => {
  return {
    NAV_BAR_TITLE:(Title: string) => Action.NAV_BAR_TITLE(Title)
  }
};

class App extends React.Component<Interface.Props, Interface.State> {
  constructor(Props:Interface.Props){
    super(Props)
    alert(1)
    this.Child = React.createRef()
  }

  Child: any

  componentDidMount(){
    alert(2)
    const Title = routes.filter(Item => Item.path === this.props.location.pathname)[0].title
    this.props.NAV_BAR_TITLE(Title)
  }

  /* 导航栏右边图标触发路由组件的抽屉展开或隐藏 */
  TriggerRightIcon = (): void => {
    this.Child.current.TriggerDrawer()
  }

  render() {
    alert(3)
    const { BAR_TITLE, location } = this.props
    return (
      <HashRouter>
        { location.pathname === '/' ? '' : <NavBars Title={BAR_TITLE || 'WMS仓储管理系统' } Back={Boolean(BAR_TITLE)} TriggerRightIcon={this.TriggerRightIcon}></NavBars>}
        <Switch>
          {renderRoutes(routes as PublicInterface.RouteConfig[], { ref: this.Child })}
        </Switch>
        {/* <Footer></Footer> */}
      </HashRouter>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
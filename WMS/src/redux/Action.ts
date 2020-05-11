import store from './Store'

/* 可以有多个Action，但是只会对应一个Reducer */
const Action = {
  MENUS:(Menus: any):void => {
    store.dispatch({ type: 'MENUS', data: Menus})
  },
  NAV_BAR_TITLE: (Title: string): void => {
    store.dispatch({ type: 'NAV_BAR_TITLE', data: Title })
  }
}

export default Action
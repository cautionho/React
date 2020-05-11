import {combineReducers} from 'redux'

/* 可以写多个Reducer，但是最终会合并到一起，Action触发时，会触发所有Reducer */
/* store.getState后获取到对象，对象中含有State字段和值 */
function State(State: any = {}, Action:any){
  switch(Action.type){
    case 'MENUS':
      return Object.assign({}, State, {
        MENUS: Action.data
      })
    case 'NAV_BAR_TITLE':
      return Object.assign({}, State, {
        NAV_BAR_TITLE: Action.data
      })
      
    default :
      return State
  }
}


export const Reducer = combineReducers({
  State
})
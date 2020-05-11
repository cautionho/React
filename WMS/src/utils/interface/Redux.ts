namespace Interface {
  export type Menu = {
    Id: number
    ResourceName: string
    ParentId: number
    ActionUrl: string
    ElementId: string
    ChildNods: Menu[]
  }
  
  export class StateItem {
    MENUS: Menu[] = []
    NAV_BAR_TITLE: string = ''
  }

  export class State {
    State: StateItem = new StateItem()
  }
}

export default Interface
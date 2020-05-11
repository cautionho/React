namespace Interface {
  export type Menu = {
    Id: number
    ResourceName: string
    ParentId: number
    ActionUrl: string
    ElementId: string
    ChildNods: Menu[]
  }

  export class State {
    Menus: Menu[] = []
    BAR_TITLE: string = ''
    DrawerModal: boolean = false
  }

  export class Props {
    history: any
    location: any
    match: any
    staticContext: any
    route: any
  }
}

export default Interface
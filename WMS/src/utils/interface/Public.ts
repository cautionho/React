namespace Interface {
  export type RequestRes = {
    IsSuccess: boolean
    Data?: any
    ApiStatusCode?: number
    Msg: string | null
  }

  export type RouteConfig = {
    path: string
    exact: boolean
    component: any
    name: string
    title: string
  }
}

export default Interface
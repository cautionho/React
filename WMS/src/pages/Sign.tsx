import React from 'react'
import NavBars from '@/components/NavBar'

export default class Sign extends React.Component<any> {
  constructor(Props:any){
    super(Props)
  }
  render(){
    const {history} = this.props
    return (
      <div>
        {/* <NavBars history={history} Title="签收" Back={true}></NavBars> */}
        123456
      </div>
    )
  }
}
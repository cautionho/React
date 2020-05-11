import md5 from 'md5'
import PublicInterface from './Public'

namespace Interface {
  export class PostArg {
    Server: string = ''
    Api: string = ''
    Login: boolean | undefined = false
    Data: any = ''
    Form?: boolean = false
    Callback: (Res: PublicInterface.RequestRes) => void = (Res: PublicInterface.RequestRes): void => {}
  }

  export class PostHeader {
    'Content-Type': string = 'application/json'
    timestamp: number = 0
    userid: number = 0
    nonce: number = 0
    signature: string = ''
    constructor(UserId: number,Token: string, Conditons: any){
      this.userid = UserId
      const Time = new Date()
      this.timestamp = Time.valueOf()
      this.nonce = Math.floor(Math.random() * Time.getMilliseconds())
      this.signature = md5( `${Token}${this.userid}${this.timestamp}${this.nonce}${Conditons}`)
    }
  }
  
}

export default Interface
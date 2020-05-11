import React from 'react'
import { Button } from 'antd-mobile'

import Request from '@/utils/utils/Request'
import PdaStorage from '@/utils/utils/Storage'

const User = PdaStorage.Get('WMS_USER')


const Personnel = <div>
  {User.UserName}
  <Button onClick={Request.ForwardLogin}>退出登录</Button>
  </div>

export default Personnel
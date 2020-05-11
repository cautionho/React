import loadable from '@loadable/component'; // 按需加载

// export const basename = ''; // 如果访问路径有二级目录，则需要配置这个值，如首页地址为'http://tianzhen.tech/blog/home'，则这里配置为'/blog'

export const routes = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('@/pages/Login')),
    name: 'Login', // 自定义属性
    title: '' // 自定义属性
  },
  {
    path: '/index',
    exact: true,
    component: loadable(() => import('@/pages/Nav')),
    name: 'Index', // 自定义属性
    title: '' // 自定义属性
  }, {
    path: '/PdaCheckOut',
    exact: true,
    component: loadable(() => import('@/pages/Inventory')),
    name: 'Inventory',
    title: '盘点'
  }, {
    path: '/PdaMove',
    exact: true,
    component: loadable(() => import('@/pages/Move')),
    name: 'Move',
    title: '移货'
  }, {
    path: '/PdaPickUp',
    exact: true,
    component: loadable(() => import('@/pages/Picking')),
    name: 'Picking',
    title: '拣货'
  }, {
    path: '/PdaSowing',
    exact: true,
    component: loadable(() => import('@/pages/Sowing')),
    name: 'Sowing',
    title: '播种'
  }, {
    path: '/PdaInStorage',
    exact: true,
    component: loadable(() => import('@/pages/InStorage')),
    name: 'InStorage',
    title: '入库'
  }, {
    path: '/PdaSign',
    exact: true,
    component: loadable(() => import('@/pages/Sign')),
    name: 'Sign',
    title: '签收'
  }, {
    path: '/PdaReplenishOut',
    exact: true,
    component: loadable(() => import('@/pages/ReplenishmentOutStorage')),
    name: 'ReplenishmentOutStorage',
    title: '补货出库'
  }, {
    path: '/PdaOutStorage',
    exact: true,
    component: loadable(() => import('@/pages/ScmsOutStorage')),
    name: 'OutStorage',
    title: '出库'
  }, {
    path: '/PdaWeighting',
    exact: true,
    component: loadable(() => import('@/pages/Measurement')),
    name: 'Measurement',
    title: '称重测量'
  }, {
    path: '/PdaTransferPack',
    exact: true,
    component: loadable(() => import('@/pages/AllotPicking')),
    name: 'AllotPicking',
    title: '调拨拣货'
  }, {
    path: '/PdaCheckDemand',
    exact: true,
    component: loadable(() => import('@/pages/InventoryDemand')),
    name: 'InventoryDemand',
    title: '盘点需求'
  }
  // // 404 Not Found
  // {
  //   path: '*',
  //   exact: true,
  //   component: loadable(() => import('@/pages/demo/404Page/404Page')),
  //   name: '404',
  //   title: '404'
  // }
];
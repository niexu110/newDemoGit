
import select from '@/components/login/select'
import reigter from '@/components/login/reigter'
import login from '@/components/login/login'
import error from '@/components/error'
import bottom from '@/components/common/bottom'
import index from '@/components/index/index'
import find from '@/components/find/find'
import card from '@/components/find/card'
import message from '@/components/message/message'
import my from '@/components/my/my'
const routers=[
    {
        path: '/find',
        name: 'find',
        components: {
            default: find,
            bottom: bottom
        },
        meta: {
            title: '找对象',
            requireAuth: true,
        }
    },
    {
        path: '/index',
        name: 'index',
        components: {
            default: index,
            bottom: bottom
        },
        meta: {
            title: '我是媒婆',
            requireAuth:true,
        }
    },
    {
        path: '/reigter',
        name: 'reigter',
        component: reigter,
        meta: {
            title: '注册',
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登陆',
        }
    },
    {
        path: '/card',
        name: 'card',
        component: card,
        meta: {
            title: '个人名片',
        }
    },
    {
        path: '/select',
        name: 'select',
        component: select,
        meta: {
            title: '完善信息',
        }
     },
      {
          path: '/message',
          name: 'message',
          components: {
               default: message,
               bottom: bottom
          },
          meta: {
               title: '消息',
               requireAuth: true,
          }
     }, {
          path: '/my',
          name: 'my',
          components: {
               default: my,
               bottom: bottom
          },
          meta: {
               title: '个人中心',
               requireAuth: true,    
          }
     }, 
      {
          path: '*',
          name: 'error',
          component: error,
          meta: {
               title: '粗错啦'
          }
     }
]
export default routers
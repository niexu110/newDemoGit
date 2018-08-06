
import select from '@/components/login/select'
import reigter from '@/components/login/reigter'
import login from '@/components/login/login'
import error from '@/components/error'
import bottom from '@/components/common/bottom'
import index from '@/components/index/index'
import code from '@/components/index/code'
import group from '@/components/index/group'
import dynamic from '@/components/index/dynamic'
import signDay from '@/components/index/signDay'
import enlist from '@/components/index/enlist'
import peaslist from '@/components/index/peaslist'
import myrelation from '@/components/index/myrelation'
import newDetial from '@/components/index/newDetial'
import groupapply from '@/components/index/groupapply'
import recom from '@/components/index/recom'
import find from '@/components/find/find'
import card from '@/components/find/card'
import ilike from '@/components/find/ilike'
import likeme from '@/components/find/likeme'
import reward from '@/components/find/reward'
import rewardson from '@/components/find/rewardson'
import rewardDetial from '@/components/find/rewardDetial'
import groupDetial from '@/components/find/groupDetial'
import search from '@/components/find/search'
import message from '@/components/message/message'
import my from '@/components/my/my'
import site from '@/components/my/site'
import fans from '@/components/my/fans'
import phone from '@/components/my/phone'
import follow from '@/components/my/follow'
import mywoman from '@/components/my/mywoman'
import changewoman from '@/components/my/changewoman'
import mylevel from '@/components/my/mylevel'
import leveldesc from '@/components/my/leveldesc'
import about from '@/components/my/about'
import serve from '@/components/my/serve'
import messagesys from '@/components/my/messagesys'
import groupsuc from '@/components/my/groupsuc'
import blacklist from '@/components/my/blacklist'
import sugar from '@/components/my/sugar'
import album from '@/components/my/album'
import authentication from '@/components/my/authentication'
import tuan from '@/components/share/tuan'
const routers = [
    { path: '/', redirect: 'index' },
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
        path: '/code',
        name: 'code',
        component: code,
        meta: {
            title: '我的二维码',
            requireAuth: false,
        }
    },
    {
        path: '/myrelation',
        name: 'myrelation',
        component: myrelation,
        meta: {
            title: '我的媒婆网',
            requireAuth: true,
        }
    },
    {
        path: '/album',
        name: 'album',
        component: album,
        meta: {
            title: '相册',
            requireAuth: true,
        }
    },
    {
        path: '/rewardson',
        name: 'rewardson',
        component: rewardson,
        meta: {
            title: '发布悬赏',
            requireAuth: true,
        }
    },
    {
        path: '/sugar',
        name: 'sugar',
        component: sugar,
        meta: {
            title: '我的喜糖',
            requireAuth: true,
        }
    },
    {
        path: '/groupapply',
        name: 'groupapply',
        component: groupapply,
        meta: {
            title: '单身团申请',
            requireAuth: true,
        }
    },
    {
        path: '/recom',
        name: 'recom',
        component: recom,
        meta: {
            title: '推荐缘由',
            requireAuth: true,
        }
    },
    {
        path: '/groupsuc',
        name: 'groupsuc',
        component: groupsuc,
        meta: {
            title: '牵缘成功',
            requireAuth: true,
        }
    },
    {
        path: '/mywoman',
        name: 'mywoman',
        component: mywoman,
        meta: {
            title: '我的媒婆',
            requireAuth: true,
        }
    },
    {
        path: '/messagesys',
        name: 'messagesys',
        component: messagesys,
        meta: {
            title: '系统消息',
            requireAuth: true,
        }
    },
    {
        path: '/about',
        name: 'about',
        component: about,
        meta: {
            title: '关于我们',
            requireAuth: true,
        }
    },
    {
        path: '/serve',
        name: 'serve',
        component: serve,
        meta: {
            title: '服务条款',
            requireAuth: true,
        }
    },
    {
        path: '/blacklist',
        name: 'blacklist',
        component: blacklist,
        meta: {
            title: '黑名单',
            requireAuth: true,
        }
    },
    {
        path: '/ilike',
        name: 'ilike',
        components: {
            default: ilike,
            bottom: bottom
        },
        meta: {
            title: '我喜欢的',
            requireAuth: true,
        }
    },
    {
        path: '/likeme',
        name: 'likeme',
        components: {
            default: likeme,
            bottom: bottom
        },
        meta: {
            title: '喜欢我的',
            requireAuth: true,
        }
    },
    {
        path: '/mylevel',
        name: 'mylevel',
        component: mylevel,
        meta: {
            title: '媒婆等级',
            requireAuth: true,
        }
    },
    {
        path: '/changewoman',
        name: 'changewoman',
        component: changewoman,
        meta: {
            title: '更换媒婆',
            requireAuth: true,
        }
    },
    {
        path: '/reward',
        name: 'reward',
        components: {
            default: reward,
            bottom: bottom
        },
        meta: {
            title: '悬赏',
            requireAuth: true,
        }
    },
    {
        path: '/rewardDetial',
        name: 'rewardDetial',
        component: rewardDetial,
        meta: {
            title: '悬赏详情',
            requireAuth: true,
        }
    },
    {
        path: '/authentication',
        name: 'authentication',
        component: authentication,
        meta: {
            title: '实名认证',
            requireAuth: true,
        }
    },
    {
        path: '/leveldesc',
        name: 'leveldesc',
        component: leveldesc,
        meta: {
            title: '等级说明',
            requireAuth: true,
        }
    },
    {
        path: '/enlist',
        name: 'enlist',
        component: enlist,
        meta: {
            title: '招募单身团',
            requireAuth: true,
        }
    },
    {
        path: '/groupDetial',
        name: 'groupDetial',
        component: groupDetial,
        meta: {
            title: '选择单身成员',
            requireAuth: true,
        }
    },
    {
        path: '/follow',
        name: 'follow',
        component: follow,
        meta: {
            title: '我关注的',
            requireAuth: true,
        }
    },
    {
        path: '/dynamic',
        name: 'dynamic',
        component: dynamic,
        meta: {
            title: '单身团动态',
            requireAuth: true,
        }
    },
    {
        path: '/signDay',
        name: 'signDay',
        component: signDay,
        meta: {
            title: '搜恋豆豆',
            requireAuth: true,
        }
    },
    {
        path: '/peaslist',
        name: 'peaslist',
        component: peaslist,
        meta: {
            title: '豆豆记录',
            requireAuth: true,
        }
    },
    {
        path: '/fans',
        name: 'fans',
        component: fans,
        meta: {
            title: '粉丝',
            requireAuth: true,
        }
    },
    {
        path: '/phone',
        name: 'phone',
        component: phone,
        meta: {
            title: '绑定手机号',
            requireAuth: true,
        }
    },
    {
        path: '/group',
        name: 'group',
        component: group,
        meta: {
            title: '单身团',
            requireAuth: true,
        }
    },
    {
        path: '/newDetial',
        name: 'newDetial',
        component: newDetial,
        meta: {
            title: '活动详情',
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
            requireAuth: true,
        }
    },
    {
        path: '/reigter',
        name: 'reigter',
        component: reigter,
        meta: {
            title: '注册',
            requireAuth: false,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登陆',
            requireAuth: false,
        }
    },
    {
        path: '/card',
        name: 'card',
        component: card,
        meta: {
            title: '个人名片',
            requireAuth: true,
        }
    },
    {
        path: '/search',
        name: 'search',
        component: search,
        meta: {
            title: '搜索',
            requireAuth: true,
        }
    },
    {
        path: '/select',
        name: 'select',
        component: select,
        meta: {
            title: '完善信息',
            requireAuth: true,
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
        path: '/site',
        name: 'site',
        component: site,
        meta: {
            title: '设置',
            requireAuth: true,
        }
    },
    {
        path: '/tuan',
        name: 'tuan',
        component: tuan,
        meta: {
            title: '查看TA的单身团',
            requireAuth: false,
        }
    },
    {
        path: '*',
        name: 'error',
        component: error,
        meta: {
            title: '粗错啦',
            requireAuth: true,
        }
    }
]
export default routers
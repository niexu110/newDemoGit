import index from '../components/index'
import about from '../components/about'
import action from '../components/action'
import search from '../components/search'
import download from '../components/download'
import error from '../components/error'
import server from '../components/server'
import information from '../components/information'
import investment from '../components/investment'
import footer from '../components/temp/footer'
const routers = [
    { path: '/', redirect: 'index'},
    {
        path: '/action',
        name: 'action',
        components: {
            default: action,
            bottom: footer
        },
        meta: {
            title: '活动中心',
            requireAuth: true,
        }
    },
    {
        path: '/search',
        name: 'search',
        components: {
            default: search,
            bottom: footer
        },
        meta: {
            title: '招商地区查询',
            requireAuth: true,
        }
    },
    {
        path: '/index',
        name: 'index',
        components: {
            default: index,
            bottom: footer
        },
        meta: {
            title: '搜恋网',
            requireAuth: true,
        }
    },
    {
        path: '/about',
        name: 'about',
        components: {
            default: about,
            bottom: footer
        },
        meta: {
            title: '关于我们',
            requireAuth: true,
        }
    },
    {
        path: '/information',
        name: 'information',
        components: {
            default: information,
            bottom: footer
        },
        meta: {
            title: '行业资讯',
            requireAuth: true,
        }
    },
    {
        path: '/investment',
        name: 'investment',
        components: {
            default: investment,
            bottom: footer
        },
        meta: {
            title: '招商加盟',
            requireAuth: true,
        }
    },
    {
        path: '/server',
        name: 'server',
        components: {
            default: server,
            bottom: footer
        },
        meta: {
            title: '服务条款',
            requireAuth: true,
        }
    },
    {
        path: '/download',
        name: 'download',
        components: {
            default: download,
            bottom: footer
        },
        meta: {
            title: '下载APP',
            requireAuth: true,
        }
    },  
    {
        path: '*',
        name: 'error',
        component:error,
        meta: {
            title: '404页面出错啦',
            requireAuth: false,
        }
    },       
]
export default routers
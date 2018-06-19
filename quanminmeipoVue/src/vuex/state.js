import { getLoc, clearKey, setLoc} from '../assets/js/fn.js'
// 状态
// Http路由地址
// common用户小验证
// 用户基本信息
const info=(getLoc('isLogin')==true?true:false);
const userInfo = getLoc('userIfo');
export default{
     Http:"https://a.solian.cc",
     userInfo: userInfo,
     common: info
}
import { getLoc, clearKey, setLoc } from '../assets/js/fn.js'
import { mapState, mapActions } from 'vuex';
export default {
      _setUseInfo(state, data) {
            state.userInfo = data.ops;
            state.common = data.isLogin;
            setLoc("isLogin", data.isLogin);
            setLoc("userIfo", data.ops);
      },
      _loginOut(state) {
            clearKey();
            state.userInfo = {}
            state.common = false

      },
      _setInformations(state, data) {
            state.userInfo[data.data.name]=data.data.val;
            state.userInfo[data.data.name2] = data.data.value;
            setLoc("userIfo", state.userInfo);
            

      },
      _setAlbum(state,data){
            state.userInfo.albumcount++;
            for(let k in data){
             state.userInfo.album.unshift(data[k]);
            }
            
            setLoc("userIfo", state.userInfo);
      }
}
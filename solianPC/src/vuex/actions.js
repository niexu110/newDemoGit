
export default{
      _setLogin({commit},data){
            // 可以在这里发送请求验证用户登录信息
            commit('_setUseInfo', data)
           
      },
      _setInformation({commit},data){
            commit('_setInformations', data)
      }
}
<template>
     <div v-wechat-title='$route.meta.title'>
       <div class="view">
          <img src="../../assets/image/login.png" class="logo">
          <div class="container">
               <div class="item">
                    <p class="lt">
                         <span>请输入手机号</span>
                         <input type="text" name="phone" class="intP" maxlength="11" 
                         @blur="checkBlur('phone',username)"  v-model='username'>
                         <img src="../../assets/image/icon/true.png" class=" rt" :class="intP?'showImg':'showImgs'">
                    </p>
               </div>
               <div class="item">
                    <p class="lt">
                         <span>请输入密码</span>
                         <input type="password" name="password" class="intPsd" minlength="6" maxlength="16"
                         @blur="checkBlur('password',password)"  v-model='password'>
                         <img src="../../assets/image/icon/true.png" class="rt" :class="intPsd?'showImg':'showImgs'">
                    </p>
               </div>
               <h1 class="login-title">还没有媒婆账号?<span  class="login" @click='reigter()'>立即注册</span></h1>
               <div :class="isLogin?'loginBtns':'loginBtn'"  @click='login()'>登陆</div>
               <p class="point">*搜恋用户可以直接使用搜恋账号登录</p>
          </div>
</div>
<div id="popup"></div>
     </div>
</template>
<style lang="less" scoped>
   @import '../../assets/less/login/login';
</style>
<script>
import { checkPhone, checkPsd,showEl,setLoc } from '../../assets/js/fn.js'
import { mapState,mapActions} from 'vuex';
     export default{
          name:'login',
          data(){
               return{
                  intP:false,
                  intPsd:false,
                  isLogin:false,
                  username:undefined,
                  password:undefined,
               }
          },
          methods:{
             reigter(){
                  this.$router.push('/reigter') 
               },
             checkBlur(...arg){
                  if(arg[0]=='phone'){
                     checkPhone(arg[1])?this.intP=true:(this.intP=false,showEl('手机号有误',2000));
                  }else{
                      checkPsd(arg[1])?this.intPsd=true:(this.intPsd=false,showEl('密码格式不对',2000)); 
                  }
                  this.intP&&this.intPsd?this.isLogin=true:this.isLogin=false;
                  
             },
             ...mapActions(['_setLogin']),
            async login(){
                 if(this.login){
                      let params = {
                         cmd:this.$api.login,
                         username:this.username,sorce:3,
                         type:1,password:this.password 
                       }
                      let res=await this.$htp.post(params);
                          if(res.code==200){
                               this._setLogin({
                                        ops:res.data,
                                        isLogin:this.isLogin
                                   })
                             showEl(res.message,2000);
                             setTimeout(() => {
                                 this.$router.push('/index')
                                 setLoc('findType',true)
                             }, 2000);
                               
                          }else{
                             showEl(res.message,2000);   
                          }
                 }  
             },
          }
     }
</script>

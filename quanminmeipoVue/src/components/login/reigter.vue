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
                         <span>请输入验证码</span>
                         <input type="text" name="code" class="intC"  maxlength="4" @blur="checkBlur('code',code)"  v-model='code'>
                         <i :class="isTxt?'codes':'code'" @click='codeTime()'>{{codeMsg}}</i>
                    </p>
               </div>
               <div class="item">
                    <p class="lt">
                         <span>请输入密码</span>
                         <input type="password" name="phone" class="intPsd" minlength="6" maxlength="16"
                         @blur="checkBlur('password',password)"  v-model='password'>
                         <img src="../../assets/image/icon/true.png" class="rt" :class="intPsd?'showImg':'showImgs'">
                    </p>
               </div>
               <h1 class="login-title">已注册媒婆账号?<span  class="login" @click='login()'>立即登录</span></h1>
               <div :class="isReigter?'registerBtns':'registerBtn'" @click='register()'>注册</div>
               <p class="point">*注册表示您已同意<span class="agreement">《我是媒婆用户协议》</span></p>
          </div>
</div>
<div id="popup"></div>
<div id="maps"></div>
     </div>
</template>
<style lang="less" scoped>
   @import '../../assets/less/login/reigter';
</style>
<script>
import { checkPhone, checkPsd,showEl,setLoc,getLoc } from '../../assets/js/fn.js'
import { mapState,mapActions} from 'vuex';
     export default{
          name:'reigter',
          data(){
               return{
                  intP:false,
                  intPsd:false,
                  intCode:false,
                  isReigter:false,
                  username:undefined,
                  codes:1234,
                  code:undefined,
                  password:undefined,
                  codeMsg:'发送验证码',
                  time:60,
                  isTime:false,
                  isTxt:false,
               }
          },
          methods:{
              init(){
                  const map = new AMap.Map("maps", {
                        resizeEnable: true
                    });
                    
                    map.plugin('AMap.Geolocation', function () {
                        geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true,
                            timeout: 10000,
                            buttonOffset: new AMap.Pixel(10, 20),
                            zoomToAccuracy: true
                        });
                        map.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', function(res){
                            console.log(res)
                            var code=res.addressComponent.adcode;
                            data.proCode=code.substring(0,2)+"0000";
                            data.cityCode=code.substring(0,4)+"00";


                        },false);//返回定位信息
                        AMap.event.addListener(geolocation, 'error', function(res){
                            console.log(res.position)
                            data.proCode=110000;
                            data.cityCode=110100;
                        });      //返回定位出错信息
                    });
                 },
             login(){
                  this.$router.push('/login') 
               },
             checkBlur(...arg){
                  if(arg[0]=='phone'){
                     checkPhone(arg[1])?(this.intP=true,this.isTime=true):(this.intP=false,showEl('手机号有误',2000));
                  }else if(arg[0]=='code'){
                       this.codes==arg[1]?this.intCode=true:(this.intCode=false,showEl('验证码有误',2000))
                  }else{
                      checkPsd(arg[1])?this.intPsd=true:(this.intPsd=false,showEl('密码格式不对',2000)); 
                  }
                  this.intP&&this.intPsd&&this.intCode?this.isReigter=true:this.isReigter=false;
                  
             },
            async codeTime(){
                  if(this.isTime){
                       this.isTime=false;
                        let params={
                            cmd:this.$api.phoneC,
                            tel:this.username,
                            type:0
                        }
                       let res=await this.$htp.post(params);
                        if(res.code==200){
                             this.codes=res.data.code;
                             showEl(res.message,2000)
                             let timer=setInterval(()=>{
                              this.time--;
                              if(this.time<=0){
                                   this.time=60;
                                   clearInterval(timer);
                                   this.codeMsg='发送验证码';this.isTime=true; 
                                   this.isTxt=false;            
                              }else{
                                   this.codeMsg=this.time+'s后再次发送'
                                   this.isTime=false; this.isTxt=true;  
                              }
                         },1000)
                        }else{
                            showEl(res.message,2000);
                        }
                  }
             },
             ...mapActions(['_setReiger']),
            async register(){
                 if(this.isReigter){
                      let params = {
                         cmd:this.$api.reigter,
                         username:this.username,sorce:3,
                         code:this.code,password:this.password 
                       }
                      let res=await this.$htp.post(params);
                          if(res.code==200){
                               this._setReiger({
                                        ops:res.data,
                                        isLogin:this.isReigter
                                   })
                             showEl(res.message,2000);
                             setTimeout(() => {
                                 this.$router.push('/select')
                             }, 2000);
                               
                          }else{
                             showEl(res.message,2000);   
                          }
                 }  
             },
          },
          mounted:function(){
              this.init()
          }
     }
</script>

<template>
    <div>
        <div class="nav">
            <div class="container">
                <div class='nav-bar'>
                    <div class='nav-bar-logo lt'>
                       <div class='logo lt'></div>
                       <img src="../../assets/image/logotxt.png" class='lt logo-txt'> 
                    </div>
                    <div class='nav-bar-skip lt'>
                        <span v-for="(key,index) in navLIst" class='lt' :class="{'active':index===type}" @click="sikp(index)">{{key}}</span>
                    </div>
                    <div class='nav-bar-login rt' v-if="isLogin">
                       <p @click='out()'>欢迎你,<span>{{nickName}}</span> 退出</p>  
                    </div>
                    <div class='nav-bar-login rt' v-else>
                       <em  class='login lt' @click='loginSkip()'>登陆</em>
                       <em  class='register lt' @click='registerSkip()'>新用户注册</em>
                    </div>
                </div>   
            </div>
        </div>
        <login ref='child' @refresh='showGain'></login>
    </div>
</template>
<script>
import { getLoc } from "../../assets/js/fn.js";
import { mapMutations, mapActions } from "vuex";
import login from "../login";
export default {
    name: "topNav",
    props:['type'],
    data() {
        return {
            navLIst:['首页','招商加盟','行业资讯','活动中心','下载APP'],
            isLogin:false,
            nickName:''
        };
    },
    methods:{
        sikp(index){
            if(index==0){
                this.$router.push('index')
            }else if(index==1){
                this.$router.push('investment')
            }else if(index==2){
                this.$router.push('information')
            }else if(index==3){
                this.$router.push('action')
            }else{
                this.$router.push('download')
            }
        },
        showGain(){
            if(this.$store.state.common){
                   this.isLogin=this.$store.state.common;
                   this.nickName=this.$store.state.userInfo.nickname;
            }else{
                 this.isLogin=false;this.nickName='';
            }
 
        },
        loginSkip(){
            this.$refs.child.showL();
        },
        registerSkip(){
            this.$refs.child.showReg();
        },
         ...mapMutations(["_loginOut"]),
        out() {
                this._loginOut();
                this.showGain()      
            }
    },
    mounted() {
        this.showGain();
    },
    created() {
        
    },
    components:{login}
};
</script>
<style scoped>
.nav{width:100%;height:80px;background:#fff;position: fixed;top:0;left:0;z-index:1000;box-shadow: 0px 2px 6px 0px rgba(111, 0, 0,.1)}
.nav-bar{height:80px;text-align: center;font-size:28px;line-height:80px;}
.nav-bar-logo{width:459px;height:42px;margin-top:18px;}
.logo{width:132px;height:42px;background:url('../../assets/image/logo.png')no-repeat center;background-size:132px;}
.logo-txt{margin:11px 20px;width:122px;}
.nav-bar-skip{font-size:16px;color:#333;}
.nav-bar-skip span{height:80px;line-height:80px;margin-right:50px;cursor: pointer;}
.nav-bar-skip .active{color:#f83444;}
.nav-bar-login{font-size:12px;height:32px;margin-top:24px;text-align: center;}
.login{width:55px;height:32px; line-height:32px;border:1px solid #f83444;color:#f83444;border-radius:4px; }
.register{width:84px;height:32px;line-height:32px;background:#f83444;color:#fff;border-radius:4px;margin-left:20px;   }
.nav-bar-login p{width:100%;height:32px;color:#777;font-size:14px;line-height: 32px;cursor: pointer; }
.nav-bar-login p span{padding:0 5px;color:#f83444;}
.nav-bar-login em{font-style:normal;cursor: pointer; }
</style>

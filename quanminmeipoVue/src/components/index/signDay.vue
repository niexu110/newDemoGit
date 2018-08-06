<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <router-link to="peaslist" class='jump'>领取记录</router-link>
          <div class='view'>
               <div class='head'>
                    <img src="../../assets/image/index/peas.png" alt="">
                    <div class='lt'>
                         <h1>搜恋豆豆余额：{{total}}</h1>
                         <p>单身用户可以用来开启解锁聊天</p>
                         <p>媒婆用户可参加后续的“撒豆活动”及商城兑换</p>
                    </div>
               </div>
               <div class='item'>
                    <h1>
                         <span>签到</span>+30~50经验</h1>
                    <p>连续签到时间越长，豆豆领取越多</p>
                    <div :class='ismpsign==0?"btn":"btns"' @click='mpsign()'>{{txt}}</div>
               </div>
               <div class='item'>
                    <h1>
                         <span>招募单身团</span>+100豆豆/人</h1>
                    <p>邀请单身加入自己的单身团，邀请越多</p>
                    <p>奖励越多</p>
                    <div class='btn' @click='groupup()'>{{txt1}}</div>
               </div>
               <div class='item'>
                    <h1>
                         <span>邀请好友注册</span>+100豆豆/人</h1>
                    <p>邀请好友注册成为媒婆或单身，邀请越多</p>
                    <p>奖励越多</p>
                    <div class='btn' @click='recommendup()'>{{txt2}}</div>
               </div>
               <div class='item'>
                    <h1>
                         <span>等级升级奖励</span>升级后领取</h1>
                    <p>媒婆等级越高领取豆豆越多</p>
                    <div class='btn' @click='levelup()'>{{txt3}}</div>
               </div>
               <div class='item'>
                    <h1>
                         <span>实名认证</span>+100豆豆/人</h1>
                    <p>单身资料完善度达到70%</p>
                    <div :class='iscard==0||iscard==1?"btn":"btns"' @click='card()'>{{txt4}}</div>
               </div>
               <div class='item'>
                    <h1>
                         <span>单身团成员签到</span>+50豆豆/人</h1>
                    <p>单身团成员签到，媒婆获得豆豆</p>
               </div>
               <div class='item'>
                    <h1>
                         <span>完善资料</span>+50豆豆</h1>
                    <p>完善媒婆基本资料</p>
                    <div :class='ismpperfect==0||ismpperfect==1?"btn":"btns"' @click='perfect()'>{{txt5}}</div>
               </div>
               <div class='item'>
                    <h1>
                         <span>注册成功</span>+100豆豆</h1>
                    <p>注册成功，自动添加</p>
                    <div :class='ismpreg==0?"btn":"btns"' @click='reg()'>{{txt6}}</div>
               </div>
          </div>
          <div id='popup'></div>
          <loading :load='load'></loading>
     </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn.js";
export default {
    name: "group",
    data() {
        return {
            title: "搜恋豆豆",
            show: true,
            load:true,
            total: 0,
            ismpsign:null, //签到
            isgroupup:null, //招募单身团
            isrecommendup:null, //邀请好友注册
            islevelup:null, //媒婆升级
            iscard:null,//认证
            ismpperfect:null,//完善资料
            ismpreg:null,//注册
            txt: "",
            txt1: "",
            txt2: "",
            txt3: "",
            txt4: "",
            txt5: "",
            txt6: "",
        };
    },
    methods: {
        async gins() {
            let data = {};
            let res = await this.$htp.post(data, this.$api.getPeas);
            if(res.code==200){
                this.load=false;
            this.total = res.data.num;
            this.ismpsign = res.data.ismpsign;
            this.isgroupup = res.data.isgroupup;
            this.isrecommendup = res.data.isrecommendup;
            this.islevelup = res.data.islevelup;
            this.iscard = res.data.iscard;
            this.ismpperfect = res.data.ismpperfect;
            this.ismpreg = res.data.ismpreg;
            this.ismpsign == 0 ? (this.txt = "签到") : (this.txt = "已签到");
            this.isgroupup == 1 ? (this.txt1 = "领取") : (this.txt1 = "招募");
            this.ismpreg == 0 ? (this.txt6 = "领取") : (this.txt6 = "已领取");
            this.isrecommendup == 1
                ? (this.txt2 = "领取")
                : (this.txt2 = "邀请");
            this.islevelup == 1 ? (this.txt3 = "领取") : (this.txt3 = "查看");
            this.iscard == 0? this.txt4 = "去认证" :(this.iscard==1?this.txt4 = "领取":this.txt4 = "已领取");
            this.ismpperfect == 0? this.txt5 = "去完善" :(this.iscard==1?this.txt5 = "领取":this.txt5 = "已领取");
          }else{
               showEl('网络异常',2000)
          }
        },
        // 签到
      async mpsign() {
            if (this.ismpsign == 0) {
               let data={}
               let res=await this.$htp.post(data,this.$api.MPSignIn)
               console.log(res);
               if(res.code==200){
                     this.ismpsign=1;this.txt = "已签到";
                     showEl(res.message,2000)
               }else{
                   showEl(res.message,2000)
               }
            }
        },
        //  招募
        groupup() {
            if (this.isgroupup == 0) {
                this.$router.push("enlist");
            } else {
                this.receivePeas(10);
            }
        },
        //   邀请好友注册
        recommendup() {
            if (this.isrecommendup == 0) {
                this.$router.push("#");
            } else {
                this.receivePeas(9);
            }
        },
        // 媒婆升级
        levelup() {
            if (this.islevelup == 0) {
                this.$router.push("mylevel");
            } else {
               this.receivePeas(8);
            }
        },
     //    认证
     card(){
          if(this.iscard==0){
               this.$router.push("authentication");
          }else if(this.iscard==1){
               this.receivePeas(11);
          }
     },
     // 完善资料
     perfect(){
          if(this.ismpperfect==0){
               this.$router.push("#");
          }else if(this.ismpperfect==1){
               this.receivePeas(4);
          }
     },
     // 注册
     reg(){
          if (this.ismpreg == 0) {
               this.receivePeas(2);
            }else{

         } 
     },
     async receivePeas(types){
          let data={type:types}
          let res=await this.$htp.post(data,this.$api.receivePeas)
          console.log(res);
          if(res.code==200){
               showEl(res.message,2000);
               this.gins()
          }else{
              showEl(res.message,2000); 
          }
     }
    },
    mounted() {
         this.gins();
    },
    created() {
        
    },
    components: { top,loading }
};
</script>
<style lang="less" scoped>
.view {
    padding-bottom: 0.1rem;
}
.jump {
    position: fixed;
    right: 0.3rem;
    top: 0;
    font-size: 0.28rem;
    color: #ff704f;
    z-index: 210;
    height: 0.9rem;
    line-height: 0.9rem;
}
.head {
    width: 7.5rem;
    height: 2.6rem;
    position: relative;
    background: linear-gradient(
        to left,
        rgba(253, 47, 99, 1),
        rgba(255, 145, 121, 1)
    );
    img {
        width: 1.3rem;
        float: left;
        margin: 0.65rem 0.3rem;
    }
    div {
        color: #fff;
        h1 {
            font-size: 0.4rem;
            padding: 0.6rem 0 0.1rem;
        }
        p {
            font-size: 0.24rem;
            padding-top: 0.1rem;
        }
    }
}
.item {
    width: 7.2rem;
    margin-left: 0.3rem;
    min-height: 1.5rem;
    border-bottom: solid 1px #e6e6e6;
    position: relative;
    h1 {
        font-size: 0.26rem;
        color: #ff704f;
        margin: 0.4rem 0 0.1rem;
        span {
            color: #111;
            font-size: 0.3rem;
            padding-right: 0.3rem;
            font-weight: bold;
        }
    }
    p {
        margin-top: 0.1rem;
        color: #999;
        font-size: 0.26rem;
    }
    .btn {
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        width: 1.2rem;
        display: block;
        height: 0.6rem;
        background: linear-gradient(to left, #ff704f, #fd2e63);
        font-size: 0.26rem;
        color: #ffffff;
        text-align: center;
        line-height: 0.6rem;
        border-radius: 4px;
    }
    .btns {
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        width: 1.2rem;
        display: block;
        height: 0.6rem;
        background: rgb(218, 218, 218);
        font-size: 0.26rem;
        color: #ffffff;
        text-align: center;
        line-height: 0.6rem;
        border-radius: 4px;
    }
}
</style>


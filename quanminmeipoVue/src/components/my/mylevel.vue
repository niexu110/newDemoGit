<template>
  <div v-wechat-title='$route.meta.title'>
    <top :title='title' :show='show'></top>
    <div class='view'>
      <router-link to="leveldesc" class='skipJM'>等级说明</router-link>
      <div class='headBox'>
        <img :src="list.image" alt="">
        <span>{{list.levelname}}</span>
      </div>
      <div class='progressBox'>
        <div class='granum' :style='"margin-left:"+(width*list.exp-0.3)+"rem;"+"transition:all .4s linear; "'>{{list.exp}}</div>
        <div class='progress'>
          <p :style='"width:"+width*list.exp+"rem;"+"transition:all .4s linear;"'></p>

        </div>
        <p>距离{{list.nextlevelname}}还差{{scroe}}经验
          <span class='rt'>{{list.countlevel}}</span>
        </p>
      </div>
      <div class='line'></div>
      <div class='item'>
        <div class='lt'>
          <p><em>媒婆签到</em>+10--20经验</p>
          <h1>连续签到时间越长，获得经验越多</h1>
        </div>
        <span class='rt' :class='list.issign==0?"issignBtn":"issignBtns"' @click='mpsign()'>{{txt}}</span>
      </div>
      <div class='item'>
        <div class='lt'>
          <p><em>招募单身团</em></p>
          <h1 >邀请越多,获得经验越多，自动添加</h1>
        </div>
        <span class='rt issignBtn' @click='skip()'>招募</span>
      </div>
      <div class='item'>
        <div class='lt'>
          <p><em>邀请好友注册</em>+50经验</p>
          <h1>邀请好友注册成为媒婆或单身，邀请越多,奖励越多</h1>
        </div>
      </div>
      <div class='item'>
        <div class='lt'>
          <p><em>每牵缘成功一次</em>+10经验</p>
          <h1>单身团成员解锁一次聊天，后台自动添加</h1>
        </div>
      </div>
      <div class='item'>
        <div class='lt'>
          <p><em>媒婆头像通过审核</em>+20经验</p>
          <h1>媒婆头像通过审核，自动添加</h1>
        </div>
      </div>
      <div class='item'>
        <div class='lt'>
          <p><em>注册媒婆媒婆成功</em>+100经验</p>
          <h1>注册成功，后台自动添加</h1>
        </div>
      </div>
    </div>
    <div id='popup'></div>
    <loading :load='load'></loading>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/my/mylevel";
</style>

<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn.js";
export default {
    name: "mylevel",
    data() {
        return {
            title: "媒婆等级",
            show: true,
            load:true,
            width: 0,
            scroe: 0,
            txt: "",
            list: {}
        };
    },
    methods: {
        async gian() {
            let data = {};
            let res = await this.$htp.post(data, this.$api.levelDetail);
            if (res.code == 200) {
                this.load=false;
                this.list = res.data;
                this.scroe = this.list.countlevel - this.list.exp;
                this.width = 6.3 / this.list.countlevel;
                this.list.issign == 0 ? (this.txt = "签到") : (this.txt = "已签到");
            }
        },
        async mpsign() {
            if (this.list.issign == 0) {
                let data = {};
                let res = await this.$htp.post(data, this.$api.MPSignIn);
                if(res.code==200){
                     this.list.issign=1;this.txt = "已签到";
                     this.list.exp+=res.data.exp;
                     this.scroe = this.list.countlevel - this.list.exp;
                     showEl(res.message,2000);
               }else{
                    showEl(res.message,2000)
               }
            }
        },
        skip(){
          this.$router.push('enlist')
        }
    },
    mounted() {
        this.gian();
    },
    components: { top,loading }
};
</script>


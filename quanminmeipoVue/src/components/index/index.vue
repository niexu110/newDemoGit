<template>
  <div v-wechat-title='$route.meta.title'>
    <top :title='title' :show='show'></top>
    <loading :load='load'></loading>
    <div class='view'>
      <slide></slide>
      <div class='invite-box'>
        <router-link to="#" class='lt skip'></router-link>
        <router-link to="enlist" class='rt skips'></router-link>
      </div>
      <div class='four-box'>
        <router-link to="myrelation">
          <img src="../../assets/image/index/macther.png">
          <p>我的媒婆网</p>
        </router-link>
        <router-link to="group">
          <img src="../../assets/image/index/single.png">
          <p>名下单身团</p>
        </router-link>
        <router-link to="code">
          <img src="../../assets/image/index/name.png">
          <p>分享二维码</p>
        </router-link>
        <router-link to="signDay">
          <img src="../../assets/image/index/day.png">
          <p>每日签到</p>
        </router-link>
      </div>
      <div class='mp-box'>
        <h1>
          <span>媒婆活动</span>
          <router-link to="" class='rt'>查看更多</router-link>
        </h1>
        <div class='new-box' v-for=" k in newList">
          <div class='new-item' @click='skip(k)'>
            <div class="lt newImg">
              <img :src='k.thumb' alt="">
            </div>
            <div class='rt newTxt'>
              <h2>{{k.title}}</h2>
              <p>活动时间:{{k.time}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id='popup'></div>
    <div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/index/index";
</style>
<script>
import top from "../common/top2";
import loading from "../common/loading";
import slide from "../common/slide";
import { showEl, getLoc, format } from "../../assets/js/fn.js";
export default {
    name: "index",
    data() {
        return {
            title: "我是媒婆",
            show: false,
            load: true,
            newList: []
        };
    },
    methods: {
        // 获取数据
        async gain() {
            let data = {};
            let res = await this.$htp.post(data, this.$api.new);
            if (res.code == 200) {
                this.load=false;
                res.data.activity.data.forEach(k => {
                    k.time = format(k.time, 0);
                    this.newList.push(k);
                });
            }
        },
        //  跳转信息页面带参数
        skip(data) {
            console.log(data);
            // 这里可以使用 query这里path+路径 使用params路径需要填写 name+'name
            // this.$router.push({path: 'visitingCard', query:{uid:num}})
        }
    },
    created: function() {
        this.gain();
    },
    components: { top, slide,loading }
};
</script>


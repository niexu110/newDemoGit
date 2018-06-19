<template>
  <div v-wechat-title='$route.meta.title'>
    <div class='header'>
      <span>个人中心</span>
      <div class='rt closed' @click="switchs()">
        <div class='btnTxt lt'>只做媒婆</div>
        <div id='btns' class='lt' :class='classNameA'>
          <div id='btns2' :class='classNameB'></div>
        </div>
      </div>
    </div>
    <div class='view'>
      <!-- 基本资料 -->
      <div class='user-content'>
         <img src="../../assets/image/user.png" class='lt userImg'>
         <div class='lt user-nick'>
           <h1>程曦</h1>
           <p>产品设计</p>
         </div>
         <span class='site rt'>编辑资料</span>
      </div>
      <!-- 粉丝 -->
      <div class='my-follower'>
         <div>
           <h1>0</h1>
           <p>单身团</p>
         </div>
         <div>
           <h1>0</h1>
           <p>牵缘成功</p>
         </div>
         <div>
           <h1>0</h1>
           <p>粉丝</p>
         </div>
      </div>
      <!-- 四大项 -->
      <div class='my-state'>
        <router-link to="#">
           <img src="../../assets/image/my/sugar.png" alt="">
           <p>我的喜糖</p>
        </router-link>
        <router-link to="#">
           <img src="../../assets/image/my/envelope.png" alt="">
           <p>活动红包</p>
        </router-link>
        <router-link to="#">
           <img src="../../assets/image/my/name.png" alt="">
           <p>实名认证</p>
        </router-link>
        <router-link to="#">
           <img src="../../assets/image/my/tickling.png" alt="">
           <p>问题反馈</p>
        </router-link>
      </div>
    </div>
    <pop ref='child'></pop>
    <div id='popup'></div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/my/myIndex";
</style>
<script>
import { showEl } from "../../assets/js/fn.js";
import pop from "../common/pop";
import { mapMutations, mapActions } from "vuex";
export default {
    name: "my",
    data() {
        return {
            classNameA: "close",
            classNameB: "closes",
            switchType: true
        };
    },
    methods: {
        //切换
       async switchs() {
             let data={
                cmd:this.$api.switchIdentity,
                uid:this.$store.state.userInfo.uid,
                type:3
              }
            if (this.switchType) {
                this.classNameA = "open";
                this.classNameB = "opens";
                this.switchType = false;
                this.$refs.child.isSwitchs(true);
            } else {
                this.classNameA = "close";
                this.classNameB = "closes";
                this.switchType = true;
               let res=await this.$htp.post(data);
               showEl(res.message, 1000);
            }
        },
        ...mapMutations(["_loginOut"]),
        skip(type) {
            if (type == 1) {
                this._loginOut();
                showEl("退出成功", 2000);
                this.$router.push("/login");
            }
        }
    },
    created: function() {},
    components: { pop }
};
</script>



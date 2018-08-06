<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <router-link to="blacklist" class='list'>黑名单</router-link>
               <router-link to="messagesys" class='list'>消息通知</router-link>
               <p class='line'></p>
               <router-link to="about" class='list'>关于我们</router-link>
               <router-link to="serve" class='list'>服务条款</router-link>
               <router-link to="phone" class='list'>绑定手机号</router-link>
              <div class='btn' @click="out()">退出登录</div> 
          </div>
          <div id='popup'></div>
     </div>
</template>
<style lang="less" scoped>
</style>
<script>
import { showEl } from "../../assets/js/fn.js";
import { mapMutations, mapActions } from "vuex";
import top from "../common/top";
export default {
    name: "site",
    data() {
        return {
            title: "设置",
            show: true
        };
    },
    methods: {
        ...mapMutations(["_loginOut"]),
        out() {
                this._loginOut();
                showEl("退出成功", 2000);
                setTimeout(() => {
                this.$router.push("/login");
               }, 1000); 
            }
    },
    created() {},
    components: { top }
};
</script>
<style lang="less" scoped>
  .list{
       display:block;
       width:7.2rem;height:1.1rem;line-height:1.1rem;color:#333;font-size:.3rem;
       background:url('../../assets/image/icon/right.png')no-repeat 6.9rem;
       background-size:.15rem .25rem;border-bottom:1px solid #E6E6E6;
       margin-left:.3rem;
  }
  .btn{
        position: fixed;left:.3rem;bottom:1rem;
        width:6.9rem;height:.9rem;line-height:.9rem;
        background:#ff704f;color:#fff;font-size:.3rem;text-align:center;
        border-radius:40px;
  }
</style>



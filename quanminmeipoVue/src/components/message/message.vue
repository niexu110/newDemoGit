<template>
  <div v-wechat-title='$route.meta.title'>
    <top :title='title'  :show='show'></top>
    <div class='view'>
      <div class='container'>
        <div class='msg'>
          <h1>共收到{{num}}位悬赏推荐</h1>
          <p>查看我的悬赏推荐</p>
          <img src="../../assets/image/msg/tickling.png" alt="">
        </div>
        <router-link to="#" class='list system'>
          系统消息
        </router-link>
        <router-link to="#" class='list wxAdd'>
          微信添加消息
        </router-link>
        <div class='user-box' @click='look()'>
          <img src="../../assets/image/user.png" class='lt'>
          <div class='msg-content lt'>
            <h1>小可爱</h1>
            <p>你说在这里我能找到心仪对象吗？</p>
          </div>
          <span class='msg-hint rt'>解锁聊天</span>
        </div>
      </div>
    </div>
    <pop ref="child"></pop>
  </div>
</template>
<script>
import top from "../common/top2";
import pop from "../common/pop";
export default {
    name: "message",
    data() {
        return {
            title: "消息",
            show: false,
            num: 10
        };
    },
    created: function() {},
    methods:{
      look(){
        this.$refs.child.addpop(true);
      }
    },
    components: { top,pop }
};
</script>
<style lang="less" scoped>
.container {
    width: 7.2rem;
    height: auto;
    margin-left: 0.3rem;
    .msg {
        width: 6.9rem;
        height: 2rem;
        position: relative;
        background: linear-gradient(to right, #fd2e63, #ff6f4f);
        padding-left: 0.3rem;
        color: #fff;
        border-radius: 4px;
        h1 {
            padding: 0.3rem 0 0.1rem;
            font-size: 0.32rem;
        }
        p {
            font-size: 0.28rem;
        }
        img {
            position: absolute;
            right: 0.3rem;
            top: 0.3rem;
            width: 1.2rem;
        }
    }
    .list {
        display: block;
        width: 7.2rem;
        height: 1.6rem;
        line-height: 1.6rem;
        padding-left: 1.2rem;
        color: #111;
        font-size: 0.3rem;
        font-weight: bold;
        border-bottom: 1px solid #f3f3f3;
    }
    .system {
        background: url("../../assets/image/msg/system.png") no-repeat left
            0.3rem;
        background-size: 1rem;
    }
    .wxAdd {
        background: url("../../assets/image/msg/looks.png") no-repeat left
            0.3rem;
        background-size: 1rem;
    }
    .user-box {
        width: 7.2rem;
        height: 1.6rem;
        border-bottom: 1px solid #f3f3f3;
        img {
            width: 1rem;
            margin-top: 0.3rem;
            border-radius: 50%;
        }
        .msg-content {
            margin-left: 0.2rem;
            height: 1rem;
            margin-top: 0.3rem;
            h1 {
                font-size: 0.3rem;
                color: #111;
                font-weight: bold;
                padding: 0.1rem 0;
            }
            p {
                font-size: 0.24rem;
                color: #757575;
            }
        }
        .msg-hint {
            margin-right: 0.3rem;
            height: 0.6rem;
            line-height: 0.6rem;
            margin-top: 0.6rem;
            color: #b1b1b1;
            font-size: 0.28rem;
            padding-left:.5rem;
            background:url('../../assets/image/msg/lock.png')no-repeat left;
            background-size:.33rem;
        }
    }
}
</style>


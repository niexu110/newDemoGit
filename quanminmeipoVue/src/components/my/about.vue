<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <img src="../../assets/image/login.png" alt="">
               <p>微信服务号：全民媒婆</p>
               <p>客服电话：400-6313-520</p>
               <span>版本：全民媒婆v1.4.1</span>
          </div>
     </div>
</template>
<script>
import top from "../common/top";
export default {
    name: "about",
    data() {
        return {
            title: "关于我们",
            show: true
        };
    },
    methods: {},
    mounted() {},
    components: { top }
};
</script>
<style lang="less" scoped>
.view {
    img {
        display: block;
        margin: 2rem auto 0.5rem;
        width: 1.6rem;
        height: 1.6rem;
    }
    p {
        font-size: 0.3rem;
        color: #111;
        text-align: center;
        padding-top: 0.3rem;
    }
    span {
        position: absolute;
        bottom: 1.3rem;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
    }
}
</style>


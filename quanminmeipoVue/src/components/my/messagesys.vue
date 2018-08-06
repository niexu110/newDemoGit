<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <div class='item' v-for="item in list">
                    <h1>{{item.creat_time}}</h1>
                    <div class='content'>
                         <img src="../../assets/image/login.png" class='lt'>
                         <p class='lt'>{{item.content}}</p>
                    </div>
               </div>
               <div id='pullUp'></div>
          </div>
          <div id='popup'></div> 
          <loading :load='load'></loading>
     </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl,format } from "../../assets/js/fn.js";
export default {
    name: "about",
    data() {
        return {
            title: "系统消息",
            show: true,
            load:true,
            list:[],
        };
    },
    methods: {
         async gian() {
            let data = {};
            let res = await this.$htp.post(data, this.$api.getRobotMessage);
            if (res.code == 200) {
                this.load=false;
                 res.data.forEach(k => {
                     k.creat_time=format(k.creat_time,1)
                     this.list.push(k)
                 });
               
            }
        },
    },
    mounted() {
         this.gian(); 
         let el=document.getElementById('pullUp');
         setTimeout(() => {
            document.documentElement.scrollTop = document.body.scrollTop = el.offsetTop+'rem'; 
         }, 100);
    },
    components: { top,loading}
};
</script>
<style lang="less" scoped>
.view{padding-bottom:.1rem;}
.item {
    width: 6.9rem;
    height: auto;
    margin: 0 auto;
    h1 {
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        color: #9b9b9b;
        font-size: 0.28rem;
    }
    .content {
        width: 6.3rem;
        min-height: 1.6rem;
        display: flex;
        img {
            width: 0.9rem;
            height:.9rem;
            border-radius: 50%;
        }
        p {
            width: 5.4rem;
            height: auto;
            margin-left:.2rem;
            border-radius: 6px;
            background: #f5f5f5;
            line-height: 0.4rem;
            font-size: 0.26rem;
            color: #333;
            padding: 0.2rem 0.2rem;
            position: relative;
        }
    }
}
</style>


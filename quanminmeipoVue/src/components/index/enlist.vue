<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <loading :load='load'></loading>
          <div class='view'>
               <div class='headLine'>
                    <em class='left'></em>
                    <p>我的单身团({{num}})</p>
                    <em class='right'></em>
               </div>
               <div class='container' v-if="num==0">
                    <p>您的团下暂无成员!</p>
                    <p>下面有两种方法可以邀请好友入团哦!</p>
               </div>
               <div class='container' v-else>
                    <span class='lt' v-for='k in list'>
                         <img :src="k.image" alt="">
                    </span>
                    
               </div>
               <div class='headLine'>
                    <em class='left'></em>
                    <p>招募令</p>
                    <em class='right'></em>
               </div>
               <h5 class='txt'>1.截屏保存二维码，发送分享给好友</h5>
               <div id='qrcode'> </div>
               <h5 class='txt'>2.复制下面链接，发送分享给好友</h5>
               <p class='shareurl'>{{url}}</p>
          </div>
          <div id='popup'></div>
     </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import QRCode from "qrcodejs2";
import { showEl } from '../../assets/js/fn';
export default {
    name: "reward",
    data() {
        return {
            title: "招募单身团",
            show: true,
            load:true,
            num:null,
            list:[],
            url: "https://m.quanminmeipo.com/tuan/"
        };
    },
    methods: {
        async gain() {
            let data = {
                type: 4,
                page: 0,
                tg_uid: this.$store.state.userInfo.uid
            };
            let res = await this.$htp.post(data, this.$api.myRegiment);
           
            if(res.code==200){
                  this.load=false;
                  this.num=res.data.mancount+res.data.womencount+res.data.preparativecount;
                  this.list=res.data.all;
            }else{
                 showEl('网络异常',2000)
            }
        },
     //    二维码生成
        qrcode() {
            let qrcode = new QRCode("qrcode", {
                width: 150,
                height: 150, // 高度
                text: "http://192.168.1.100:8080/#/tuan", // 二维码内容
                // render: 'canvas' ,// 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                background: "#f0f",
                foreground: "#ff0"
            });
            console.log(qrcode);
        }
    },
    created: function() {
        this.gain();
    },
    mounted: function() {
         this.qrcode()
    },
    components: { top,loading }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/index/enlist";
</style>
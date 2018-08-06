<template>
     <div v-wechat-title='$route.meta.title'>
          <div class='header'>
               <span class='lt' @click="goback()"></span>
               <em>我的二维码</em>
          </div>
          <div class='codeView'>
               <div class='myCode'>
                    <img src="../../assets/image/my/codeBg.png" class='bgImg'>
                    <div id='qrcode'></div>
               </div>
               <p>单身好友，微信扫码</p>
               <p>成为好友媒婆，快速加入单身团</p>
               <div class='codeBtn' @click='share()'>转发分享</div>
          </div>
          <pop ref='child'></pop>
     </div>
</template>
<style lang="less" scoped>
.header {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.34rem;
    background: #000;
    color: #fff;
    text-align: center;
    span {
        width: 0.5rem;
        height: 0.9rem;
        background: url("../../assets/image/icon/with_left.png") no-repeat
            center;
        margin-left: 0.3rem;
        background-size: 0.18rem;
    }
    em {
        margin-right: 0.5rem;
    }
}
.codeView {
    position: fixed;
    width: 7.5rem;
    height: 100%;
    background: #ff4349;
    top: 0.9rem;
    left: 0;
    p {
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        margin-top: 0.3rem;
    }
    .myCode {
        width: 6.9rem;
        margin: 0.6rem auto 0;
        height: auto;
        position: relative;
        .bgImg {
            width: 6.9rem;
        }
        #qrcode {
            width: 3rem;
            position: absolute;
            left: 2rem;
            top: 3.5rem;
            transform: rotateX(54deg) rotateZ(45deg);
        }
    }
    .codeBtn{
         width: 6.9rem;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    background: #fff;
    border-radius: 40px;
    font-size: .3rem;
    color: #ff704f;
    font-weight: bold;
    margin: 1.2rem auto 0;
    }
}
</style>
<script>
import wxapi from '../../mixins/wxapi'
import pop from "../common/pop";
import QRCode from "qrcodejs2";
export default {
    name: "mycode",
    data() {
        return {};
    },
    mixins: [wxapi],
    methods: {
        goback() {
            this.$router.back(-1);
        },
        share(){
             this.$refs.child.showImg(true)
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
    mounted(){
        this.qrcode()
    },
    components: { pop }
};
</script>


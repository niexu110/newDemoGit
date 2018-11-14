<template>
     <div v-wechat-title='$route.meta.title'>
          <topNav :type='type'></topNav>
          <contact></contact>
          <div class='view'>
               <div class='download-banner'>
                    <div class='contanier'>
                         <div class='download-box'>
                              <img src="../assets/image/img/phone.png" class='phone'>
                              <div class='load-ios'>
                                   <img :src="images" class='icon' :class='className'>
                                   <div class='right'>
                                        <p style='margin-bottom:20px;' class=' hover-wayra hover-inverted' @mouseover='add(0)' @mouseout="add(1)">AppStore下载</p>
                                        <p class=' hover-wayra hover-inverted' @mouseover='adds(0)' @mouseout="adds(1)">Android下载</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div class='download-main'>
                    <div class='contanier'>
                         <div class='load-box'>
                             <div class='item-code'>
                                <img src="../assets/image/img/iphoneicon.png" class='code-icon'>
                                <p class='code-txt'>APP store 下载</p>
                                <img src="../assets/image/iOSapp.png" class='code-img'>
                            </div>
                            <div class='item-code marginlr'>
                                 <img src="../assets/image/img/androidlogo.png" class='code-icon'>
                                <p class='code-txt'>Android 下载</p>
                                <img src="../assets/image/adAPP.png" class='code-img'>
                            </div>
                            <div class='item-code'>
                                 <img src="../assets/image/img/wxicon.png" class='code-icon'>
                                <p class='code-txt'>服务号关注</p>
                                <img src="../assets/image/meiCode.png" class='code-img'>
                            </div> 
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>
<script>
import topNav from "./temp/topNav";
import contact from "./temp/contact";
export default {
    name: "download",
    data() {
        return {
            type: 4,
            images:require('../assets/image/iOSapp.png'),
            className:'showImg'
        };
    },
    methods: {
         add(num) {
            num == 0
                ? (this.className = "showImgs",this.images=require('../assets/image/iOSapp.png'))
                : (this.className = "showImg");
        },
        adds(num) {
            num == 0
                ? (this.className = "showImgs",this.images=require('../assets/image/adAPP.png'))
                : (this.className = "showImg");
        },
    },
    components: { topNav, contact }
};
</script>
<style scoped>
@import "../assets/css/hover";
.download-banner {
    width: 100%;
    height: 600px;
    background: url("../assets/image/img/download.png") no-repeat center;
    background-size: 100%;
}
.download-box {
    width: 940px;
    height: 465px;
    position: relative;
    margin: 0 auto;
}
.phone {
    width: 320px;
    position: absolute;
    left: 0;
    top: 40px;
}
.load-ios {
    position: absolute;
    width: 410px;
    height: 140px;
    right: 40px;
    bottom: 0;
}
.icon{width:140px;height:140px;float:left;transition: all .2s linear;}
.showImg{transform: scale(0)}
.showImgs{transform: scale(1)}
.right{width:240px;height:140px;float:right;}
.right p {
    width: 240px;
    height: 60px;
    line-height: 60px;
    position: relative;
    background:0 0;
    z-index:1;
    color:#fff;
    cursor: pointer;
    font-size:20px;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 4px;
}
.download-main{width:100%;height:500px;}
.load-box{width:900px;height:330px;margin:190px auto 0;}
.item-code{width:180px;height:330px; float:left;}
.marginlr{margin:0 180px;}
.code-icon{display: block;width:70px;margin:0 auto 20px;}
.code-img{display: block;width:180px;height:180px; margin:40px auto 0;}
.code-txt{font-size:16px; color:#333;text-align: center;}
</style>


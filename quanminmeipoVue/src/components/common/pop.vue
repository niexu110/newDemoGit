<template>
    <div id='pop' v-if="isPop">
        <div class='showImg' v-if="show">
            <img src="../../assets/image/fenxiang/chakanfenxiang.png" alt="">
        </div>
        <div class='vod' v-if="vod">
            <p @click=' blackPull()'>拉黑</p>
            <p @click='reportHim()'>举报</p>
            <p class='active' @click='removePop()'>取消</p>
        </div>
        <div class='pop-box' v-if='addPop'>
            <h1>下载APP</h1>
            <p>聊天约会需要下载app</p>
            <p>让你的幸福之路更顺畅</p>
            <span @click="close()">确定</span>
        </div>
        <div class='pop-contanier' v-if='isSwitch'>
            <h1>提示</h1>
            <h2>在只做媒婆的模式下,您并不会以单身身份进行展示</h2>
            <p @click='iKnow()'>我知道了</p>
        </div>
    </div>
</template>
<script>
import { showEl } from "../../assets/js/fn.js";
export default {
    name: "top",
    data() {
        return {
            show: false,
            vod: false,
            isPop: true,
            isLH: true,
            addPop: false,
            isSwitch: false,
            tg_uid: 0
        };
    },
    methods: {
        // 分享显示
        showImg(msg) {
            this.show = msg;
            this.isPop = msg;
            setTimeout(() => {
                this.show = false;
                this.isPop = false;
            }, 3000);
        },
        //     举报
        vods(msg, uid) {
            this.tg_uid = uid;
            this.vod = msg;
            this.isPop = msg;
        },
        addpop(msg) {
            this.addPop = msg;
            this.isPop = msg;
        },
        //关闭
        close() {
            this.isPop = false;
        },
        // 关闭单身
        isSwitchs(msg) {
            this.isSwitch = msg;
            this.isPop = msg;
        },
        //关闭单身发请求
      async iKnow(){
          if(this.isPop){
              this.isPop=false;
              let data={
                cmd:this.$api.switchIdentity,
                uid:this.$store.state.userInfo.uid,
                type:2
            }
            let res=await this.$htp.post(data);
            showEl(res.message, 1000);
          }
            
        },
        // 取消
        removePop() {
            this.isPop = false;
        },
        //  举报
        reportHim() {
            alert("举报成功");
        },
        //
        async blackPull() {
            if (this.isLH) {
                this.isLH = false;
                let data = {
                    cmd: this.$api.defriend,
                    tg_uid: this.tg_uid,
                    uid: this.$store.state.userInfo.uid,
                    type: 1
                };
                let res = await this.$htp.post(data);
                this.isPop = false;
                showEl(res.message, 2000);
            }
        }
    },
    created: function() {
        this.vods();
    }
};
</script>
<style scoped lang='less'>
.showImg {
    width: 6.9rem;
    height: 5rem;
    margin: 0.8rem auto;
    img {
        width: 4rem;
        float: right;
    }
}
.vod {
    position: absolute;
    bottom: 0.1rem;
    left: 0.5rem;
    width: 6.5rem;
    height: auto;
    p {
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom: 1px solid #efefef;
        background: #fff;
        border-radius: 4px;
        margin-top: 0.05rem;
        font-size: 0.3rem;
        color: #ffb3a1;
        text-align: center;
    }
    .active {
        color: #333;
    }
}
.pop-box {
    width: 5.4rem;
    height: 3.1rem;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    margin: auto;
    font-size: 0.34rem;
    color: #111;
    text-align: center;
    h1 {
        padding: 0.3rem 0;
        font-weight: bold;
    }
    p {
        font-size: 0.3rem;
        color: #7d7d7b;
        padding-top: 0.1rem;
    }
    span {
        display: block;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        font-size: 0.34rem;
        background: #e83844;
        margin-top: 0.1rem;
    }
}
.pop-contanier {
    width: 5rem;
    height: 4rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    border-radius: 4px;
    background: #fff;
    text-align: center;
    color: #111;
    h1 {
        padding: 0.2rem;
        font-size: 0.36rem;
    }
    h2 {
        padding: 0.2rem;
        font-size: 0.3rem;
        color: #999;
    }
    p {
        width: 2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 1px solid #666;
        border-radius: 6px;
        margin: 0.5rem auto;
        font-size: 0.3rem;
    }
}
</style>



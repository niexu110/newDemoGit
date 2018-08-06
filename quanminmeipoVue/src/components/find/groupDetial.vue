<template>
    <div v-wechat-title='$route.meta.title'>
        <loading :load='load'></loading>
        <div class='header'>
            <span @click='goback()'></span>
            <em>选择单身成员</em>
            <div class='isOk' @click='formBtn()'>确定</div>
        </div>
        <div class='view'>
            <div class='box' v-if='len==0'>
                <img src="../../assets/image/icon/typeImg.png" alt="">
                <p>您的团里没有符合成员.快快去邀请成员入团吧！</p>
            </div>
            <div class='item' v-for='(item,index) in list' @click='selects(index,item)' v-else>
                <img :src="item.image" class='lt'>
                <em class='lt'>{{item.nickname}}</em>
                <span :class='{"active":className===index}'></span>
            </div>

        </div>
        <div id='popup'></div>
    </div>
</template>
<script>
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn.js";
export default {
    name: "groupDetial",
    data() {
        return {
            className: "",
            list: [],
            load:true,
            page: 0,
            isOk: false,
            len:null,
            uid: ""
        };
    },
    methods: {
        async gain(sex) {
            let data = {
                type: sex,
                uid: this.$store.state.userInfo.uid,
                page: this.page,
                tg_uid: this.$store.state.userInfo.uid
            };
            let res = await this.$htp.post(data,this.$api.myRegiment);
            if(res.code==200){
                this.load=false;
                if (sex == 1) {
                this.len=res.data.mancount;
                res.data.man.forEach(k => {
                    this.list.push(k);
                });
            } else {
                this.len=res.data.womencount;
                res.data.women.forEach(k => {
                    this.list.push(k);
                });
            }
            }
            
        },
        selects(index, item) {
            this.uid = item.uid;
            this.isOk = true;
            this.className = index;
        },
        goback() {
            this.$router.back(-1);
        },
        async formBtn() {
            if (this.isOk) {
                let data = {
                    uid: this.$store.state.userInfo.uid,
                    r_id: this.$route.query.id,
                    ds_uid: this.uid
                };
                let res = await this.$htp.post(data,this.$api.rewarduser);
                this.isOk = false;
                showEl(res.message, 2000);
                setTimeout(() => {
                    this.$router.back(-1);
                }, 2000);
            }else{
                showEl('请选择成员推荐',1000)
            }
        }
    },
    components:{loading},
    created() {
        this.gain(this.$route.query.sex);
    }
};
</script>
<style lang="less" scoped>
.header {
    position: fixed;
    width: 7.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
    top: 0;
    left: 0;
    font-size: 0.3rem;
    color: #333;
    text-align: center;
    z-index: 100;
    span {
        position: absolute;
        background: url("../../assets/image/icon/left.png") no-repeat center;
        background-size: 0.18rem;
        width: 0.5rem;
        height: 0.8rem;
        left: 0.1rem;
        top: 0.05rem;
    }
    .isOk {
        position: absolute;
        top: 0;
        right: 0.3rem;
        font-size: 0.3rem;
        color: #ff7051;
    }
}
.box{
    text-align: center;color:#999;font-size:.3rem;margin:2rem auto;
    img{
        width:3rem;
    }
    p{
        margin-top:.2rem;
    }
}
.item {
    width: 7.5rem;
    height: 1.6rem;
    border-bottom: 1px solid #efefef;
    position: relative;
    img {
        width: 1rem;
        height: 1rem;
        margin: 0.3rem 0.3rem;
        border-radius: 50%;
        border: 1px solid #ccc;
    }
    em {
        height: 1.6rem;
        line-height: 1.6rem;
        color: #111;
        font-size: 0.36rem;
    }
    span {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        position: absolute;
        right: 0.3rem;
        top: 0.6rem;
        border: 1px solid #666;
        background: #fff;
    }
    .active {
        background: #ff7051;
    }
}
</style>



<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title="title" :show='show'></top>
        <div class='view'>
            <div @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
                <div class='k-null' v-if="len==0">
                    <img src="../../assets/image/icon/typeImg.png" alt="">
                    <p>您的单身团成员暂无任何动态哦！</p>
                </div>
                <div class='item' v-for='item in list' else>
                    <img :src="item.dsdetail.image" class='lt'>
                    <div class='rt'>
                        <p v-if="item.type==1">
                            <span>{{item.dsdetail.nickname}}</span>很受欢迎,收到了一个聊天邀请</p>
                        <p v-else-if="item.type==2">
                            <span>{{item.dsdetail.nickname}}</span>很受欢迎,收到了一个微信添加请求</p>
                        <p v-else>
                            <span>{{item.dsdetail.nickname}}</span>很受欢迎,又有人喜欢TA了</p>
                        <h1>{{item.creat_time}}</h1>
                    </div>
                </div>
            </div>
            <div id='pullUp'>{{loadTxt}}</div>
        </div>
        <div id='popup'></div>
        <loading :load='load'></loading>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl, getLoc, format } from "../../assets/js/fn.js";
export default {
    name: "dynamic",
    data() {
        return {
            title: "单身团动态",
            show: true,
            len: null,
            load: true,
            page: 0,
            list: [],
            isOpen: false,
            loadTxt:''
        };
    },
    methods: {
        async gain() {
            let data = {
                page: this.page,
                drivers: "web"
            };
            let res = await this.$htp.post(data, this.$api.dynamic);
            if (res.code == 200) {
                this.load = false;
                this.isOpen = true;
                this.len = res.data.length;
                res.data.forEach((key, index) => {
                    key.creat_time = format(key.creat_time, 1);
                    this.list.push(key);
                });
            } else {
                showEl("网络异常", 2000);
            }
        },
        touchStart(ev) {
            ev = ev || event;
            this.startY = ev.touches[0].clientY;
            this.isOpen = true;
        },
        touchMove(ev) {
            ev = ev || event;
            if (!this.isOpen) {
                return;
            }
            if (this.$el.clientHeight > document.documentElement.clientHeight) {
                this.loadTxt = "上拉加载更多";
                this.$el.querySelector("#pullUp").style.display = "block";
            }
        },
        touchEnd(ev) {
            ev = ev || event;
            this.endY = ev.changedTouches[0].clientY;
            let bottom = this.startY - this.endY;
            if (this.isOpen) {
                if (
                    this.$el.clientHeight >
                    document.documentElement.clientHeight
                ) {
                    if (bottom > 220) {
                        this.isOpen = false;
                        this.page++;
                        this.loadMore();
                        this.$el.querySelector("#pullUp").style.display =
                            "none";
                        this.load = true;
                    } else {
                        this.isOpen = true;
                    }
                }
            }
        },
        async loadMore() {
            let data = {
                page: this.page,
                drivers: "web"
            };
            let res = await this.$htp.post(data, this.$api.dynamic);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach((key, index) => {
                        key.creat_time = format(key.creat_time, 1);
                        this.list.push(key);
                    });
                }else{
                    this.loadTxt = "暂无更多数据";
                this.$el.querySelector("#pullUp").style.display = "block";
                } 
            } else {
                this.load = false;
                
            }
        }
    },
    mounted() {
        this.gain();
    },
    components: { top, loading }
};
</script>
<style lang="less" scoped>
.view {
    padding-bottom: 0.2rem;
}
.item {
    width: 7.5rem;
    padding: 0.3rem;
    height: 1.6rem;
    border-bottom: 1px solid #e6e6e6;
    img {
        width: 1rem;
        border-radius: 50%;
    }
    div {
        width: 5.9rem;
        height: 100%;
        padding-left: 0.2rem;
        p {
            padding-top: 0.1rem;
            font-size: 0.24rem;
            color: #111;
            span {
                font-size: 0.26rem;
                font-weight: bold;
                padding-right: 0.1rem;
            }
        }
        h1 {
            font-size: 0.28rem;
            margin-top: 0.1rem;
        }
    }
}
.k-null {
    width: 6.9rem;
    height: auto;
    margin: 2rem auto;
    text-align: center;
    img {
        width: 3rem;
    }
    p {
        color: #999;
        font-size: 0.3rem;
        margin-top: 0.3rem;
    }
}
</style>


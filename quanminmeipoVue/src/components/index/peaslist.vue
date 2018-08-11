<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title="title" :show='show'></top>
        <div class='view' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
            <div class='k-null' v-if="len==0">
                <img src="../../assets/image/icon/typeImg.png" alt="">
                <p>暂无领取记录！赶快前去领取吧</p>
            </div>
            <div class='item' v-for='item in list' else>
                <h1>{{item.action}}</h1>
                <p>{{item.time}}</p>
                <div class='peas'>{{item.num}}</div>
            </div>
        </div>
        <loading :load='load'></loading>
        <div id='pullUp'>{{loadTxt}}</div>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl, format } from "../../assets/js/fn.js";
export default {
    name: "dynamic",
    data() {
        return {
            title: "豆豆记录",
            show: true,
            len: null,
            load: true,
            page: 0,
            list: [],
            loadTxt: ""
        };
    },
    methods: {
        async gain() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.getPeasLogList);
            if (res.code == 200) {
                this.load = false;
                this.len = res.data.length;
                res.data.forEach(k => {
                    k.time = format(k.time, 1);
                    this.list.push(k);
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
        }, //     加载更多
        async loadMore() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.getPeasLogList);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
                        k.time = format(k.time, 1);
                        this.list.push(k);
                    });
                } else {
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
    created() {},
    components: { top, loading }
};
</script>
<style lang="less" scoped>
.view {
    padding-bottom: 0.2rem;
}
.item {
    width: 7.2rem;
    margin-left: 0.3rem;
    height: 1.25rem;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    color: #111;
    font-size: 0.3rem;
    h1 {
        margin-top: 0.3rem;
    }
    p {
        color: #999;
        font-size: 0.26rem;
        margin-top: 0.2rem;
    }
    .peas {
        position: absolute;
        top: 0;
        right: 0.3rem;
        width: 1rem;
        height: 1.25rem;
        overflow: hidden;
        line-height: 1.25rem;
        color: #ff704f;
        font-size: 0.3rem;
        background: url("../../assets/image/index/rpeas.png") no-repeat right;
        background-size: 0.34rem;
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


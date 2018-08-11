<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class='view' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
            <div class="item" v-for='item in list' @click='skip(item)'>
                <img :src="item.image" class='lt'>
                <div class='rt'>
                    <p>{{item.nickname}}</p>
                    <span>{{item.introduction}}</span>
                    <i>{{item.industry}}</i>
                </div>
            </div>
            <div id='pullUp'>{{loadTxt}}</div>
            <div id='popup'></div>
            <loading :load='load'></loading>
        </div>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn.js";
export default {
    name: "follow",
    data() {
        return {
            title: "我关注的",
            show: true,
            load: true,
            page: 0,
            list: [],
            isOpen: false,
            loadTxt: ""
        };
    },
    methods: {
        async gian() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.myFollowMatchmaker);
            if (res.code == 200) {
                this.load = false;
                res.data.length == 10
                    ? (this.isOpen = true)
                    : (this.isOpen = false);
                res.data.forEach(k => {
                    k.introduction == ""
                        ? (k.introduction = "这家伙很懒,什么也没留下.")
                        : (k.introduction = k.introduction);
                });
                this.list = res.data;
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
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.myFollowMatchmaker);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
                        k.introduction == ""
                            ? (k.introduction = "暂未填写")
                            : (k.introduction = k.introduction);
                        this.list.push(k);
                    });
                } 
            } else {
                this.load = false;
                this.loadTxt = "暂无更多数据";
                this.$el.querySelector("#pullUp").style.display = "block";
            }
        },
        skip(item) {
            this.$router.push({
                path: "card",
                query: { uid: item.uid, nickName: item.nickname }
            });
        }
    },
    mounted() {
        this.gian();
    },
    components: { top, loading }
};
</script>
<style lang="less" scoped>
.view{padding-bottom:.1rem;}
.item {
    width: 7.2rem;
    height: 1.6rem;
    margin-left: 0.3rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid #e6e6e6;
    img {
        width: 1rem;
        border-radius: 50%;
    }
    div {
        width: 5.7rem;
        height: 1rem;
        position: relative;
        p {
            font-size: 0.3rem;
            color: #111;
            line-height: 0.5rem;
            font-weight: bold;
        }
        span {
            font-size: 0.26rem;
            color: #666666;
        }
        i {
            position: absolute;
            right: 0.3rem;
            top: 0.38rem;
            font-size: 0.24rem;
            color: #999;
        }
    }
}
</style>


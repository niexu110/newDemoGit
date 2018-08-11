<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class='view' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
            <div class='contnet' v-if="len!=0">
                <div class="contentlist" v-for='user in list' @click='jump(user)'>
                    <img :src="user.image">
                    <div>
                        <p>{{user.nickname}}</p>
                        <p class="xinxi">
                            <span>{{user.age}}岁</span>·
                            <span>{{user.height}}cm</span>·
                            <span>{{user.constellation}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class='contnet' v-else>
                <tempNull2 :text='text'></tempNull2>
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
import tempNull2 from "../common/tempNull2";
import { showEl } from "../../assets/js/fn";
export default {
    name: "fans",
    data() {
        return {
            title: "粉丝",
            show: true,
            load: true,
            text: "暂时没人成为你的粉丝！！",
            page: 0,
            len: null,
            list: [],
            isOpen: false,
            loadTxt: ""
        };
    },
    methods: {
        async gains() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.myFansList);
            if (res.code == 200) {
                this.load = false;
                res.data.forEach(k => {
                    this.list.push(k);
                });
                this.len = this.list.length;
            } else if (res.code == "-404") {
                showEl("网络异常", 2000);
            }
        },
        jump(item) {
            this.$router.push({
                path: "card",
                query: { uid: item.uid, nickName: item.nickname }
            });
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
            let res = await this.$htp.post(data, this.$api.myFansList);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
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
        this.gains();
    },
    created() {},
    components: { top, tempNull2, loading }
};
</script>
<style lang="less" scoped>
.view {
    padding-bottom: 0.1rem;
}
.contnet {
    p {
        font-size: 0.3rem;
        color: #999;
    }
    .contentlist {
        margin-left: 0.3rem;
        padding-right: 0.3rem;
        height: 1.6rem;
        border-bottom: solid 1px #e6e6e6;
        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            float: left;
            margin-top: 0.3rem;
        }
        div {
            float: left;
            margin: 0.3rem;
            p {
                font-size: 0.3rem;
                color: #4d4d4d;
                font-weight: bold;
                line-height: 0.5rem;
            }
            .xinxi {
                font-size: 0.26rem;
                color: #999;
                font-weight: normal;
            }
        }
    }
}
</style>

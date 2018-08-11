<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show' :showS='showS'></top>
        <div class="view">
            <findHead :type='findType'></findHead>
            <loading :load='load'></loading>
            <div class="content" @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
                <div class="contentlist" v-for='user in list' v-if='user.islove==1' @click.stop="jump(user)">
                    <img :src="user.image" />
                    <div class="center">
                        <span>{{user.nickname}}</span>
                        <p>
                            <span>{{user.age}}</span>岁
                            <span>{{user.height}}</span>cm
                            <span>{{user.constellation}}</span>
                            <span>{{user.industry}}</span>
                        </p>
                    </div>
                    <p class="ilbtn" @click.stop='nolike(user)'>取消喜欢</p>
                </div>
            </div>

            <div id='pullUp'>{{loadTxt}}</div>
            <div id='popup'></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/find/find";
.contentlist {
    height: 1.6rem;
    margin-left: 0.3rem;
    padding-right: 0.3rem;
    border-bottom: solid 1px #e6e6e6;
}
.contentlist img {
    float: left;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    margin: 0.3rem 0.3rem 0 0;
}
.center {
    float: left;
    margin-top: 0.3rem;
}
.center > span {
    display: block;
    line-height: 0.5rem;
    font-size: 0.28rem;
    color: #111111;
    font-weight: bold;
}
.center > p {
    font-size: 0.22rem;
    color: #666666;
    line-height: 0.5rem;
}
.center > p span {
    display: inline-block;
    margin-right: 0.15rem;
}
.ilbtn {
    float: right;
    width: 1.38rem;
    height: 0.5rem;
    border: solid 1px #ff704f;
    border-radius: 0.5rem;
    color: #ff704f;
    font-size: 0.24rem;
    line-height: 0.48rem;
    text-align: center;
    margin-top: 0.5rem;
}
</style>
<script>
import top from "../common/top2";
import findHead from "../common/findHead";
import loading from "../common/loading";
import { citySort, showEl } from "../../assets/js/fn.js";
export default {
    name: "likeme",
    data() {
        return {
            title: "我喜欢的",
            show: true,
            showS: false,
            load: true,
            findType: 3,
            page: 0,
            list: [],
            isOpen: false,
            loadTxt: ""
        };
    },
    methods: {
        async gain() {
            let data = {
                page: this.page,
                type: 2
            };
            let res = await this.$htp.post(data, this.$api.getLikeList);
            if (res.code == 200) {
                this.load = false;
                this.list = res.data;
                this.isOpen = true;
            } else {
                showEl("网络异常", 3000);
            }
        },
        async loadMore(para) {
            let data = {
                page: this.page,
                type: 2
            };
            let res = await this.$htp.post(data, this.$api.love);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    this.list.push(res.data);
                } else {
                    this.loadTxt = "暂无更多数据";
                    this.$el.querySelector("#pullUp").style.display = "none";
                }
            } else {
                this.load = false;
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
        jump(item) {
            this.$router.push({
                path: "card",
                query: { uid: item.uid, nickName: item.nickname }
            });
        }
    },
    created: function() {
        this.gain();
    },
    mounted: function() {},
    components: { top, findHead, loading }
};
</script>

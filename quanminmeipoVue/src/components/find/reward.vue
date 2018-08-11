<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class="view">
            <findHead :type='findType'></findHead>
            <loading :load='load'></loading>
            <div class='container' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
                <div class='cityHead'>
                    <span class='lt'>{{city}}</span>
                    <div class='rt' @click='switchAll()'>{{txt}}</div>
                </div>
                <div v-if='len==0' class='null'>
                    <img src="../../assets/image/icon/typeImg.png" alt="">
                    <p>暂无悬赏赶紧去发布您的悬赏去吧！</p>
                </div>
                <div class='item' v-for="item in peasList" @click.stop='skip(item)' v-else>
                    <img :src="item.image" class=' userImg'>
                    <div class='information '>
                        <p class='nick'>{{item.nickname}}</p>
                        <p class='infor'>{{item.age}}岁·{{item.height}}cm·{{item.constellation}}</p>
                        <p class='time'>{{item.update_time}}</p>
                    </div>
                    <div class='right rt' v-if='item.peas!=0'>
                        <p>×{{item.peas}}</p>
                        <span :class='className' v-if='item.ispeas==0' @click.stop='receive()'>领取</span>
                        <span v-else-if='item.ispeas==1'>已领取</span>
                        <span v-else>已领完</span>
                    </div>
                </div>
            </div>
            <div id='pullUp'>{{loadTxt}}</div>
            <div id='popup'></div>
        </div>
        <router-link to='rewardson' class='rewardBtn'>发布<br> 悬赏</router-link>
    </div>
</template>
<script>
import top from "../common/top2";
import findHead from "../common/findHead";
import loading from "../common/loading";
import { showEl, format } from "../../assets/js/fn.js";
export default {
    name: "reward",
    data() {
        return {
            city: "陕西 西安",
            txt: "查看全部",
            title: "悬赏",
            findType: 1,
            loadTxt: "上拉加载更多",
            load: true,
            className: "btns",
            show: true,
            type: 1,
            page: 0,
            singlePage: 0,
            allPage: 0,
            len: null,
            isOpen: true,
            singleList: [],
            allList: [],
            peasList: []
        };
    },
    methods: {
        async gain() {
            let data = {
                page: this.page,
                city: 610100,
                type: this.type,
                province: 610000
            };
            let res = await this.$htp.post(data, this.$api.reward);
            this.len = res.data.data.length;
            if (this.len != 0) {
                this.load = false;
                if (this.type == 1) {
                    res.data.data.forEach(k => {
                        k.update_time = format(k.update_time, 1);
                        this.singleList.push(k);
                    });
                    this.peasList = this.singleList;
                } else {
                    res.data.data.forEach(k => {
                        k.update_time = format(k.update_time, 1);
                        this.allList.push(k);
                    });
                    this.peasList = this.allList;
                }
            }
        },
        async loadMore() {
            let data = {
                page: this.page,
                city: 610100,
                type: this.type,
                province: 610000
            };
            let res = await this.$htp.post(data, this.$api.reward);
            if (res.data.data.length != 0) {
                this.load = false;
                if (this.type == 1) {
                    this.singlePage = this.page;
                    res.data.data.forEach(k => {
                        k.update_time = format(k.update_time, 1);
                        this.singleList.push(k);
                    });
                } else {
                    this.allPage = this.page;
                    res.data.data.forEach(k => {
                        k.update_time = format(k.update_time, 1);
                        this.allList.push(k);
                    });
                }
            } else {
                this.load = false;
                this.loadTxt='暂无更多数据'
                this.$el.querySelector("#pullUp").style.display = "block";
            }
        },
        receive() {},
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
            let top = this.$el.querySelector("#pullUp").offsetTop;
            if (this.$el.clientHeight>document.documentElement.clientHeight) {
                this.loadTxt = "上拉加载更多";
                this.$el.querySelector("#pullUp").style.display = "block";
            }
        },
        touchEnd(ev) {
            ev = ev || event;
            this.endY = ev.changedTouches[0].clientY;
            let bottom = this.startY - this.endY;
            if (this.isOpen) {
                if (bottom > 220) {
                    this.isOpen = false;
                    this.page++;
                    this.loadMore();
                    this.$el.querySelector("#pullUp").style.display = "none";
                    this.load = true;
                } else {
                    this.isOpen = true;
                }
            }
        },
        skip(item) {
            this.$router.push({ path: "rewardDetial", query: { id: item.id } });
        },
        switchAll() {
            if (this.type == 1) {
                this.type = 2;
                (this.txt = "查看同城"), (this.city = "全部");
                this.isOpen = true;
                this.page = this.allPage;
                this.load = true;
                this.gain();
                this.peasList = this.allList;
            } else {
                this.isOpen = true;
                (this.txt = "查看全部"), (this.city = "陕西 西安");
                this.type = 1;
                this.page = this.singlePage;
                this.peasList = this.singleList;
            }
        }
    },
    created: function() {
        this.page = this.singlePage;
        this.gain();
    },
    components: { top, findHead, loading }
};
</script>
<style lang="less" scoped>
.cityHead {
    width: 7.5rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #666;
    font-size: 0.28rem;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 0.3rem;
}
.null {
    text-align: center;
    font-size: 0.28rem;
    color: #999;
    margin-top: 1rem;
    img {
        display: block;
        width: 3rem;
        margin: 0 auto 0.3rem;
    }
}
.item {
    width: 7.2rem;
    margin-left: 0.3rem;
    height: 1.7rem;
    border-bottom: 1px solid #e6e6e6;
    .userImg {
        height: 1.1rem;
        width: 1.1rem;
        border-radius: 50%;
        margin-top: 0.3rem;
    }
    .information {
        display: inline-block;
        margin: 0.3rem 0.2rem;
        .nick {
            font-size: 0.3rem;
            color: #333;
            font-weight: bold;
        }
        .infor {
            font-size: 0.26rem;
            color: #666;
            line-height: 0.4rem;
        }
        .time {
            font-size: 0.22rem;
            color: #999;
        }
    }
    .right {
        height: 1rem;
        margin: 0.3rem 0.3rem 0 0;
        p {
            background: url("../../assets/image/find/peas.png") no-repeat left;
            background-size: 0.34rem;
            padding-left: 0.4rem;
            color: #ff704f;
            font-size: 0.32rem;
        }
        span {
            display: block;
            font-size: 0.28rem;
            text-align: center;
            line-height: 0.5rem;
            color: #ffffff;
            width: 1.1rem;
            height: 0.5rem;
            background: #dadada;
            border-radius: 4px;
            margin: 0.2rem auto 0;
        }
        .btns {
            background: #ff704f;
        }
    }
}
.rewardBtn {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    position: fixed;
    bottom: 1.3rem;
    right: 0.5rem;
    text-align: center;
    background: linear-gradient(to bottom, #ff6c55, #fd4972);
    color: #fff;
    font-size: 0.32rem;
    padding-top: 0.3rem;
}
</style>
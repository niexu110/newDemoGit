<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show' :showS='showS'></top>
        <div class="view">
            <loading :load='load'></loading>
            <findHead :type='findType'></findHead>
            <div class='find-container' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
                <div class='lt' v-for='item in useList' @click='skip(item)' :class='!item.mod?"find-item":"find-banner"'>
                    <div v-if='!item.mod'>
                        <div>
                            <img :src="item.image">
                        </div>
                        <h1>
                            <em>{{item.nickname}}</em>
                            <span :class="item.sex==1?'sexB':'sexA'">{{item.age}}</span>
                        </h1>
                        <h2>{{item.height}}cm·{{item.constellation}}</h2>
                    </div>
                    <div v-else>
                        <img :src="item.advertisement">
                    </div>
                </div>
                <p class='clear'></p>
            </div>
            <div id='pullUp'>{{loadTxt}}</div>
            <div id='popup'></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/find/find";
</style>
<script>
import top from "../common/top2";
import findHead from "../common/findHead";
import loading from "../common/loading";
import { citySort, showEl } from "../../assets/js/fn.js";
export default {
    name: "find",
    data() {
        return {
            title: "找对象",
            load: true,
            show: true,
            showS: true,
            findType: 0,
            page: 0,
            useList: [],
            startY: 0,
            endY: 0,
            isOpen: false,
            loadTxt: ""
        };
    },
    methods: {
        async gain() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.recommend);
            if (res.code == 200) {
                this.load = false;
                res.data.forEach(k => {
                    k.linked != undefined ? (k.mod = true) : (k.mod = false);
                    let citys = citySort(k.province, k.city);
                    k.province = citys.province;
                    k.city = citys.city;
                    this.useList.push(k);
                });
            } else if (res.code == "-404") {
                showEl("网络异常", 3000);
            }
        },
        async loadMore() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.recommend);
            if (res.code == 200) {
                if (res.data.length != 0) {
                    this.load = false;
                    res.data.forEach(k => {
                        k.linked != undefined
                            ? (k.mod = true)
                            : (k.mod = false);
                        let citys = citySort(k.province, k.city);
                        k.province = citys.province;
                        k.city = citys.city;
                        this.useList.push(k);
                    });
                } else {
                    this.load=false;
                    this.loadTxt = "暂无更多数据";
                    this.$el.querySelector("#pullUp").style.display = "block";
                }
            }
        },
        skip(item) {
            if (!item.mod) {
                this.$router.push({
                    path: "card",
                    query: { uid: item.uid, nickName: item.nickname }
                });
                // 传过去为'+this.$route.query.uid
            } else {
                window.location.href = item.linked;
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
        }
    },
    created: function() {
        this.gain();
    },
    components: { top, findHead, loading }
};
</script>

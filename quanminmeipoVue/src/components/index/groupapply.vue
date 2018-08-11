<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <loading :load='load'></loading>
        <div class='view' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
            <div class='item' v-for='item in list'>
                <img :src="item.dsdetail.image" class='lt'>
                <div class='lt content'>
                    <h1>{{item.dsdetail.nickname}}</h1>
                    <p v-if='item.type==1'>申请加入您的单身团</p>
                    <p v-else-if='item.type==2'>离开了您的单身团</p>
                    <p v-else>已被移除单身团</p>
                    <span>{{item.creat_time}}</span>
                </div>
                <div class='text rt' v-if='item.type==1'>
                    <span v-if='item.status==1'>已同意</span>
                    <span v-else-if='item.status==2'>已拒绝</span>
                </div>
                <div class='buttonBox' v-if='item.status==0'>
                    <span class='sucBtn' @click='succT(item)'>同意</span>
                    <span class='errBtn' @click='errorT(item)'>拒绝</span>
                </div>
            </div>
        </div>
        <div id='popup'></div>
        <div id='pullUp'>{{loadTxt}}</div>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl, format } from "../../assets/js/fn";
export default {
    name: "groupapply",
    data() {
        return {
            title: "单身团申请",
            show: true,
            load: true,
            isOpen: false,
            page: 0,
            list: [],
            loadTxt: ""
        };
    },
    methods: {
        async gian() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(
                data,
                this.$api.singleGroupApplyList
            );
            if (res.code == 200) {
                this.load = false;
                res.data.forEach(k => {
                    k.creat_time = format(k.creat_time, 1);
                    this.list.push(k);
                });
            }
        },
        //     同意
        async succT(item) {
            let data = {
                a_id: item.id,
                type: 1
            };
            let res = await this.$htp.post(data, this.$api.singleGroupApply);
            if (res.code == 200) {
                showEl(res.message, 2000);
                item.status = 1;
            } else {
                showEl(res.message, 2000);
            }
        },
        //     拒绝
        async errorT(item) {
            let data = {
                a_id: item.id,
                type: 2
            };
            let res = await this.$htp.post(data, this.$api.singleGroupApply);
            if (res.code == 200) {
                showEl(res.message, 2000);
                item.status = 2;
            } else {
                showEl(res.message, 2000);
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
        //     加载更多
        async loadMore() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(
                data,
                this.$api.singleGroupApplyList
            );
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
                        k.creat_time = format(k.creat_time, 1);
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
        this.gian();
    },
    components: { top, loading }
};
</script>
<style lang="less" scoped>
.view {
    padding-bottom: 0.1rem;
}
.item {
    width: 7.2rem;
    height: 1.6rem;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    margin-left: 0.3rem;
    padding: 0.3rem 0;
    img {
        width: 1rem;
        border-radius: 50%;
    }
    .text {
        font-size: 0.3rem;
        color: #999;
        height: 1rem;
        line-height: 1rem;
        margin-right: 0.3rem;
    }
    .content {
        padding-left: 0.2rem;
        font-size: 0.28rem;
        color: #999;
        h1 {
            font-weight: bold;
            color: #111;
        }
        p {
            font-size: 0.26rem;
            color: #666;
        }
        span {
            font-size: 0.22rem;
        }
    }
    .buttonBox {
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
        height: 1rem;
        span {
            display: inline-block;
            width: 1.1rem;
            height: 0.5rem;
            margin-top: 0.25rem;
            line-height: 0.5rem;
            padding: 0 0.2rem;
            border-radius: 20px;
            font-size: 0.24rem;
            background: #fff;
            margin-left: 0.2rem;
            text-align: center;
        }
        .sucBtn {
            border: 1px solid #458eff;
            color: #458eff;
        }
        .errBtn {
            border: 1px solid #ff704f;
            color: #ff704f;
        }
    }
}
</style>


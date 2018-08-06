<template>
    <div v-wechat-title='$route.meta.title'>
        <div class='bgView'>
            <div class='head'>
                <span @click='goback()'></span>
                我的媒婆网({{num}})
            </div>
            <div class='userBox'>
                <img :src="userInfo.image" alt="">
                <p>{{userInfo.nickname}}</p>
            </div>
            <div class='content'>
                <div class='box' v-for='item in list' :class='item.style' @click.stop='showPop(item)'>
                    <img :src="item.image">
                    <h1>{{item.nickname}}</h1>
                    <div class='popCont' v-if='item.showtype==0' :class='item.className'>
                        <div v-if='item.show'>
                            <p @click.stop='skip(item)'>TA的单身团</p>
                            <p @click.stop='ready(item)'>TA的媒婆网</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class='look' @click='looks()'>查看更多</div>
        </div>
    </div>
</template>
<script>
import { showEl } from "../../assets/js/fn";
export default {
    name: "myrelation",
    data() {
        return {
            num: 0,
            page: 0,
            userInfo: {},
            list: [],
            isShow: false,
            lenth: 0,
            isType: 1,
            showMP: true, //显示查看媒婆网
            tguid: 0,
            classList: [],
            popDiv: []
        };
    },
    methods: {
        goback() {
            this.$router.back(-1);
        },
        async gian() {
            let data = {
                page: this.page,
                tg_uid: this.tguid
            };
            let res = await this.$htp.post(data, this.$api.getFriendList);
            if (res.code == 200) {
                if (res.data.length != 0) {
                    this.length = res.data.length;
                    this.num = res.data[0].countnum;
                    res.data.forEach((k, i) => {
                        k.style = "posDiv";
                        k.className = this.popDiv[i];
                        k.show = this.isShow;
                        k.showtype = this.isType;
                        this.list.push(k);
                    });
                    setTimeout(() => {
                        this.list.forEach((k, i) => {
                            k.style = this.classList[i];
                        });
                    }, 400);
                }
            }
        },
        showPop(item) {
            if (this.showMP) {
                this.list.filter(a => {
                    if (a.style == item.style) {
                        item.showtype = 0;
                        item.show = true;
                    } else {
                        a.showtype = 1;
                        a.show = false;
                    }
                });
            } else {
                this.$router.push({
                    path: "card",
                    query: { uid: item.uid, nickName: item.nickname }
                });
            }
        },
        skip(item) {
            this.$router.push({
                path: "card",
                query: { uid: item.uid, nickName: item.nickname }
            });
        },
        ready(item) {
            item.showtype = 1;
            item.show = false;
            this.page=0;
            this.num=0;
            this.userInfo = item;
            this.tguid = item.uid;
            this.showMP = false;
            this.list.forEach(k => {
                k.style = "posDiv";
            });
            setTimeout(() => {
                this.list = [];
                this.gian();
            }, 500);
        },
        looks() {
            if (this.length == 10) {
                this.list.forEach(k => {
                    k.style = "posDiv";
                });
                this.page++;
                setTimeout(() => {
                    this.list =[];
                    this.gian();
                }, 500);
            }
        }
    },
    mounted() {
        this.userInfo = this.$store.state.userInfo;
        this.tguid = this.userInfo.tguid;
        this.gian();
        this.classList = [
            "posDiv0",
            "posDiv1",
            "posDiv2",
            "posDiv3",
            "posDiv4",
            "posDiv5",
            "posDiv6",
            "posDiv7",
            "posDiv8",
            "posDiv9"
        ];
        this.popDiv = [
            "popDiv0",
            "popDiv1",
            "popDiv2",
            "popDiv3",
            "popDiv1",
            "popDiv0",
            "popDiv0",
            "popDiv1",
            "popDiv3",
            "popDiv2"
        ];
    },
    created() {}
};
</script>
<style lang="less" scoped>
@import "../../assets/less/index/myrelation";
</style>


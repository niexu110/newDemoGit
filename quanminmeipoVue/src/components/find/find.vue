<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show' :showS='showS'></top>
        <div class="view">
            <loading :load='load'></loading>
            <findHead :type='findType'></findHead>
            <div class='find-container'>
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
                      <img :src="item.advertisement" >
                    </div>    
                </div>
                <p class='clear'></p>
            </div>
            <div id='pullUp'></div>
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
            load:true,
            show: true,
            showS: true,
            findType: 0,
            page: 0,
            useList: [],
            isOpen: false
        };
    },
    methods: {
        async gain() {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.recommend);
            console.log(res)
            if (res.code == 200) {
                this.isOpen = true;
                this.load=false;
                res.data.forEach(k => {
                    k.linked!=undefined?k.mod=true:k.mod=false;
                    let citys = citySort(k.province, k.city);
                    k.province = citys.province;
                    k.city = citys.city;
                    this.useList.push(k);
                });
            } else {
                showEl("网络异常", 3000);
            }
        },
        async loadMore(el) {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(data, this.$api.recommend);
            if (res.code == 200) {
                console.log(res)
                if (res.data.length != 0) {
                    this.page++;
                    el.innerHTML = "数据已更新...";
                    this.isOpen = true;
                    res.data.forEach(k => {
                        k.linked!=undefined?k.mod=true:k.mod=false;
                        let citys = citySort(k.province, k.city);
                        k.province = citys.province;
                        k.city = citys.city;
                        this.useList.push(k);
                    });
                } else {
                    el.innerHTML = "暂无更多数据...";
                    this.isOpen = false;
                    setTimeout(() => {
                        el.innerHTML = '';
                    }, 2000);
                }
            } else {
               showEl("网络异常", 3000);
            }
        },
        skip(item) {
            if(!item.mod){
            this.$router.push({
                path: "card",
                query: { uid: item.uid, nickName: item.nickname }
            });
            // 传过去为'+this.$route.query.uid
            }else{
               window.location.href=item.linked 
            }
        }
    },
    created: function() {
        this.gain();
    },
    mounted: function() {
        let el = document.getElementById("pullUp");
        window.addEventListener("scroll", () => {
            if (this.isOpen) {
                let docH = parseInt(
                    document.documentElement.scrollTop +
                        document.documentElement.clientHeight
                );
                let H5Top = el.offsetTop;
                if (docH >= H5Top) {
                    this.isOpen = false;
                    this.loadMore(el);
                    el.innerHTML = "数据加载中...";
                }
            }
        });
    },
    components: { top, findHead,loading }
};
</script>

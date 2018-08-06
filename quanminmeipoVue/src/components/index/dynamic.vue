<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title="title" :show='show'></top>
        <div class='view'>
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
            <div id='pullUp'></div>
        </div>
        <div id='popup'></div>
       <loading :load='load'></loading>
    </div>
</template>
<script>
import top from "../common/top";
import loading from '../common/loading'
import { showEl, getLoc, format } from "../../assets/js/fn.js";
export default {
    name: "dynamic",
    data() {
        return {
            title: "单身团动态",
            show: true,
            len: null,
            load:true,
            page: 0,
            list: [],
            isOpen: false
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
                this.load=false;
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
        async loadMore(el) {
            let data = {
                page: this.page,
                drivers: "web"
            };
            let res = await this.$htp.post(data, this.$api.dynamic);
            if (res.code == 200) {
                if (res.data.length != 0) {
                    this.page++;
                    el.innerHTML = "数据已更新...";
                    this.isOpen = true;
                    res.data.forEach((key, index) => {
                        key.creat_time = format(key.creat_time, 1);
                        this.list.push(key);
                    });
                } else {
                    el.innerHTML = "暂无更多数据...";
                    this.isOpen = false;
                    setTimeout(() => {
                        el.innerHTML =''
                    }, 2000);
                }
            } else {
                showEl("网络异常", 2000);
            }
        }
    },
    mounted() {
         this.gain();
         let el=document.getElementById('pullUp');
         window.addEventListener("scroll", () => {
            if (this.isOpen) {
                let docH = parseInt(
                    document.documentElement.scrollTop +
                        document.documentElement.clientHeight
                );
                let H5Top =el.offsetTop;
                if (docH >= H5Top) {
                    this.isOpen = false;
                    this.loadMore(el);
                    el.innerHTML = "数据加载中...";
                }
            }
        });
    },
    components: { top,loading }
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


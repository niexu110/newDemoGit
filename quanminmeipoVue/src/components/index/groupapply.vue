<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <loading :load='load'></loading>
          <div class='view'>
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
          <div id='pullUp'></div>
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
            load:true,
            isOpen: false,
            page: 0,
            list: []
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
                this.load=false;
                this.isOpen = true;
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
        //     加载更多
        async loadMore(el) {
            let data = {
                page: this.page
            };
            let res = await this.$htp.post(
                data,
                this.$api.singleGroupApplyList
            );
            if (res.code == 200) {
                if (res.data.length != 0) {
                    this.page++;
                    el.innerHTML = "数据已更新...";
                    this.isOpen = true;
                    res.data.forEach(k => {
                        k.creat_time = format(k.creat_time, 1);
                        this.list.push(k);
                    });
                } else {
                    el.innerHTML = "暂无更多数据...";
                    setTimeout(() => {
                       el.innerHTML ='';  
                    }, 2000);
                    this.isOpen = false;
                }
            } else {
                showEl("网络异常", 3000);
            }
        }
    },
    mounted() {
        this.gian();
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
    components: { top,loading }
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


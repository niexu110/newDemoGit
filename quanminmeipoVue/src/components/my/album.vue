<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class='view' @touchend='touchEnds' @touchstart='touchStarts' @touchmove='touchMoves'>
            <!-- 相册内容 -->
            <div class='imgList-content'>
                <div class='imgFile' v-if='showLoad'>
                    <input type="file" class='upLoad' @change="uploadFile">
                </div>
                <div v-for='(item,index) in list' @click='showImg(index)'>
                    <img :src="item.image" alt="">
                </div>
            </div>
            </div>
            <div class='mash-list' v-if='imgShow'>
                <div class='imgList-num'>
                    <em class='lt' @click='hideImg()'></em>
                    {{num}}/{{len}}
                </div>
                <ul :style='"width:"+len*7.5+"rem;"+slideEffect' @touchstart='touchStart' @touchend='touchEnd'>
                    <li v-for='item in list'>
                        <img :src="item.image" alt="">
                    </li>

                </ul>
            </div>
        
        <div id='pullUp'>{{loadTxt}}</div>
        <div id='popup'></div>
        <loading :load='load'></loading>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn";
import { mapMutations, mapActions } from "vuex";
import COS from "cos-js-sdk-v4";
export default {
    name: "album",
    data() {
        return {
            title: "相册",
            show: true,
            showLoad: false,
            page: 0,
            load: true,
            tguid: null,
            list: [],
            len: 0,
            num: 0,
            index: 0,
            imgShow: false,
            slide: true, //是否可以滑动
            endX: 0, //结束触摸的位置
            slideEffect: "",
            loadTxt:''
        };
    },
    methods: {
        showImg(index) {
            this.index = index;
            this.num = index + 1;
            this.imgShow = true;
            this.slideEffect =
                "marginLeft:" + -index * 7.5 + "rem;transition:all 0s linear";
        },
        hideImg() {
            this.imgShow = false;
        },
        async gian() {
            let data = {
                page: this.page,
                tg_uid: this.tguid
            };
            let res = await this.$htp.post(data, this.$api.getAlbumList);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
                        this.list.push(k);
                    });
                    this.len = this.list.length;
                }
            }else if(res.code=='-404'){
                showEl('网络异常',2000)
            }
        },
        touchStarts(ev) {
            ev = ev || event;
            this.startY = ev.touches[0].clientY;
            this.isOpen = true;
        },
        touchMoves(ev) {
            ev = ev || event;
            if (!this.isOpen) {
                return;
            }
            if (this.$el.clientHeight > document.documentElement.clientHeight) {
                this.loadTxt = "上拉加载更多";
                this.$el.querySelector("#pullUp").style.display = "block";
            }
        },
        touchEnds(ev) {
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
                page: this.page,
                tg_uid: this.tguid
            };
            let res = await this.$htp.post(data, this.$api.getAlbumList);
            if (res.code == 200) {
                this.load = false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
                        this.list.push(k);
                    });
                    this.len+= this.list.length;
                }else{
                    this.loadTxt = "暂无更多数据";
                    this.$el.querySelector("#pullUp").style.display = "block";
                }
            } else {
                this.load = false;
            }
        },
        // 图片上传
        async uploadFile(e) {
            let _this=this;
            let obj = {};
            let res = await this.$htp.post(obj, this.$api.getimgSign);
            if (res.code != 200) {
                showEl("网络异常", 1000);
            }
            let file = e.target.files[0];
            if (file) {
                fileUpLoad(res.data, file,_this);
            } else {
                showEl("文件选择有误", 1000);
            }
            function fileUpLoad(data, file,_this) {
                let img=file.type.substring(6)
                const cos = new COS({
                    appid: data.appid, // APPID 必填参数
                    bucket: data.bucket, // bucketName 必填参数
                    region: data.setRegion, // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
                    getAppSign: function(callback) {
                        //获取签名 必填参数

                        // 方法一（推荐线上使用）：搭建鉴权服务器，构造请求参数获取签名，推荐实际线上业务使用，优点是安全性好，不会暴露自己的私钥
                   
                        // 方法二（前端调试使用）：直接在浏览器前端计算签名，需要获取自己的accessKey和secretKey, 一般在调试阶段使用
                        callback(data.sign);
                    }
                });
                let successCallBack = function(result) {
                    console.log(result);
                    _this.fileLoad(data,data.directory+'/'+data.fileName+'.'+img)
                    showEl('上传成功!',2000)
                };

                let errorCallBack = function(result) {
                    result = result || {};
                    showEl('上传失败！稍后再试',2000)
                };

                let progressCallBack = function(curr, sha1) {
                    var sha1CheckProgress =
                        ((sha1 * 100).toFixed(2) || 100) + "%";
                    var uploadProgress = ((curr || 0) * 100).toFixed(2) + "%";
                    var msg =
                        "upload progress:" +
                        uploadProgress +
                        "; sha1 check:" +
                        sha1CheckProgress +
                        ".";
                };

                let lastTaskId;
                let taskReady = function(taskId) {
                    console.log(taskId)
                    lastTaskId = taskId;
                };
                
                 cos.uploadFile(successCallBack, errorCallBack, progressCallBack, data.bucket,data.directory+'/'+data.fileName+'.'+img, file,taskReady);
            }
            
        },
        ...mapActions(['_setAlbummation']),
        async fileLoad(obj,img){
            let data={
                image:obj.url+img,
            };
            let res=await this.$htp.post(data,this.$api.insertAlbum);
             
             for(var k in res.data){
                 this._setAlbummation({
                    data:res.data[k]
             })
               this.list.unshift(res.data[k])
             }
             this.len=this.list.length   
        },
        // 滑动
        touchStart(ev) {
            ev = ev || event;
            ev.preventDefault();
            if (ev.touches.length == 1) {
                this.startX = ev.touches[0].clientX;
                this.slide = true;
            }
        },
        touchEnd(ev) {
            ev = ev || event;
            ev.preventDefault();
            if (ev.changedTouches.length == 1) {
                this.endX = ev.changedTouches[0].clientX;
                if (this.slide) {
                    this.slide = false;
                    if (this.startX > this.endX && this.index < this.len - 1) {
                        this.index++;
                        this.num = this.index + 1;
                        this.slideEffect =
                            "marginLeft:" +
                            -this.index * 7.5 +
                            "rem;transition:all .4s linear";
                    } else if (this.startX < this.endX && this.index > 0) {
                        this.index--;
                        this.num = this.index + 1;
                        this.slideEffect =
                            "marginLeft:" +
                            -this.index * 7.5 +
                            "rem;transition:all .4s linear";
                    }
                }
            }
        }
    },
    mounted() {
        this.gian();
    },
    created() {
        this.tguid = this.$route.query.uid;
        this.$store.state.userInfo.uid == this.tguid
            ? (this.showLoad = true)
            : (this.showLoad = false);
    },
    components: { top, loading }
};
</script>
<style lang="less" scoped>
.view {
    padding-bottom: 0.1rem;
}
.imgList-content {
    width: 6.9rem;
    margin: 0.3rem auto 0;
    overflow-y: auto;
    overflow-x: hidden;
    .imgFile {
        position: relative;
        background: url("../../assets/image/my/upFile.png") no-repeat center;
        background-size: 2rem;
        .upLoad {
            position: absolute;
            left: 0;
            right: 0;
            z-index: 150;
            opacity: 0;
            width: 2.1rem;
            height: 2.1rem;
        }
    }
    div {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border-radius: 6px;
        margin: 0 0.1rem 0.3rem;
        overflow: hidden;
        img {
            width: 2rem;
        }
    }
}
.mash-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;
    background: rgba(0, 0, 0, 1);
    overflow: hidden;
    .imgList-num {
        width: 7.5rem;
        height: 1.2rem;
        line-height: 1.2rem;
        color: #fff;
        font-size: 0.34rem;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 300;
        background: rgba(0, 0, 0, 0.5);
        em {
            width: 1rem;
            height: 1.2rem;
            position: absolute;
            top: 0;
            left: 0;
            background: url("../../assets/image/icon/with_left.png") no-repeat
                center;
            background-size: 0.19rem;
        }
    }
    ul {
        height: 100%;
        overflow: hidden;
        transition: all 0.4s linear;
        li {
            width: 7.5rem;
            height: 100%;
            position: relative;
            float: left;
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
            }
        }
    }
}
</style>


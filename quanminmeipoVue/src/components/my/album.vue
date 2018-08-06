<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class='view'>
            <!-- 相册内容 -->
            <div class='imgList-content'>
                <div class='imgFile' v-if='showLoad'>
                    <input type="file" class='upLoad' @change="uploadFile">
                </div>
                <div v-for='(item,index) in list' @click='showImg(index)'>
                    <img :src="item.image" alt="">
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
        </div>
        <div id='pullUp'></div>
        <div id='popup'></div>
        <loading :load='load'></loading>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn";
import COS from "cos-js-sdk-v5";
export default {
    name: "album",
    data() {
        return {
            title: "相册",
            show: true,
            showLoad: false,
            page: 0,
            load:true,
            tguid: null,
            list: [],
            len: 0,
            num: 0,
            index: 0,
            imgShow: false,
            slide: true, //是否可以滑动
            endX: 0, //结束触摸的位置
            slideEffect: ""
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
            console.log(res);
            if (res.code == 200) {
                this.load=false;
                if (res.data.length != 0) {
                    res.data.forEach(k => {
                        this.list.push(k);
                    });
                    this.len = this.list.length;
                }
            }
        },
        // 图片上传
        async uploadFile(e) {
            let obj = {};
            let res = await this.$htp.post(obj, this.$api.getimgSign);
            if (res.code != 200) {
                showEl("网络异常", 1000);
            }
            let file = e.target.files[0];
            console.log(res);
            if (file) {
                test(res.data, file);
            } else {
                showEl("文件选择有误", 1000);
            }
            function test(data, file) {
                let img = file.type.substring(6);
                let cos = new COS({
                    SecretId: data.secretId,
                    SecretKey: data.secretKey
                });

                cos.putObject(
                    {
                        Bucket: "bak1-1253175695",
                        Region: "ap-beijing-1",
                        Key: data.fileName + "." + img,
                        Body: file, // 上传文件对象
                        onProgress: function(progressData) {
                            console.log("" + JSON.stringify(progressData));
                        }
                    },
                    function(err, data) {
                        console.log(err || data);
                        console.log(data);
                    }
                );
                console.log(cos);
            }
            // let imgFile = new FileReader();
            // imgFile.readAsDataURL(e.target.files[0]);
            // imgFile.onload = function() {
            //     let src = this.result; //base64数据;
            //     console.log(data)
            // };
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
    components: { top,loading }
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


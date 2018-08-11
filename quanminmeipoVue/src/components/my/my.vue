<template>
  <div v-wechat-title='$route.meta.title'>
    <div class='header'>
      <span>个人中心</span>
      <div class='rt closed' @click="switchs()">
        <div class='btnTxt lt'>只做媒婆</div>
        <div id='btns' class='lt' :class='classNameA'>
          <div id='btns2' :class='classNameB'></div>
        </div>
      </div>
    </div>
    <div class='view'>
      <!-- 基本资料 -->
      <div class='user-content'>
        <img :src="userInfo.image" class='lt userImg'>
        <div class='lt user-nick'>
          <h1>{{userInfo.nickname}}</h1>
          <p>{{userInfo.job}}&nbsp;ID:{{userInfo.uid}}</p>
        </div>
        <span class='site rt'>编辑资料</span>
      </div>
      <!-- 粉丝 -->
      <div class='my-follower'>
        <router-link to='group'>
          <h1>{{userInfo.qycount}}</h1>
          <p>单身团</p>
        </router-link>
        <router-link to='groupsuc'>
          <h1>{{userInfo.group_num}}</h1>
          <p>牵缘成功</p>
        </router-link>
        <router-link to='fans'>
          <h1>{{userInfo.follownum}}</h1>
          <p>粉丝</p>
        </router-link>
      </div>
      <!-- 四大项 -->
      <div class='my-state'>
        <router-link to="sugar">
          <img src="../../assets/image/my/sugar.png" alt="">
          <p>我的喜糖</p>
        </router-link>
        <router-link to="#">
          <img src="../../assets/image/my/envelope.png" alt="">
          <p>活动红包</p>
        </router-link>
        <router-link to="authentication">
          <img src="../../assets/image/my/name.png" alt="">
          <p>实名认证</p>
        </router-link>
        <router-link to="#">
          <img src="../../assets/image/my/tickling.png" alt="">
          <p>问题反馈</p>
        </router-link>
      </div>
      <p class='line'></p>
      <!-- 相册 -->
      <div class='my-album'>
        <div  class='album-num' @click="skipAlbum(userInfo.uid)">
          <span class='lt'>相册{{userInfo.albumcount}}</span>
        </div>
        <div class='album-box' >
          <div class='lt imgBox'>
            <input type="file" class='upload' @change="uploadFile">
          </div>
          <div  class='album-list lt' @click="skipAlbum(userInfo.uid)">
            <div v-for="item in albumList">
              <img :src="item.image" alt="">
            </div>
          </div>
        </div>
      </div>
      <p class='line'></p>
      <div class='my-list'>
        <router-link to="#">
          <span class='lt account'>我的账户</span>
        </router-link>
      </div>
      <div class='my-list'>
        <router-link to="mywoman">
          <span class='lt myMP'>我的媒婆</span>
        </router-link>
      </div>
      <div class='my-list'>
        <router-link to="mylevel">
          <span class='lt djMP'>媒婆等级</span>
        </router-link>
      </div>
      <div class='my-list'>
        <router-link to="follow">
          <span class='lt gzMP'>关注媒婆</span>
        </router-link>
      </div>
       <div class='my-list'>
        <router-link to="phone">
          <span class='lt phone'>绑定手机</span>
        </router-link>
      </div>
      <div class='my-list'>
        <router-link to="site">
          <span class='lt site'>设置</span>
        </router-link>
      </div>
    </div>
    <pop ref='child'></pop>
    <div id='popup'></div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/my/myIndex";
</style>
<script>
import { showEl } from "../../assets/js/fn.js";
import { mapMutations, mapActions } from "vuex";
import COS from "cos-js-sdk-v4";
import pop from "../common/pop";
export default {
    name: "my",
    data() {
        return {
            classNameA: "close",
            classNameB: "closes",
            switchType: true,
            userInfo: {},
            albumList: []
        };
    },
    methods: {
        //切换
        async switchs() {
            let data = {
                uid: this.$store.state.userInfo.uid,
                type: 3
            };
            if (this.switchType) {
                this.classNameA = "open";
                this.classNameB = "opens";
                this.switchType = false;
                this.$refs.child.isSwitchs(true);
            } else {
                this.classNameA = "close";
                this.classNameB = "closes";
                this.switchType = true;
                let res = await this.$htp.post(data,this.$api.switchIdentity);
                showEl(res.message, 1000);
            }
        },
        // 跳转相册
        skipAlbum(uid){
          this.$router.push({
                path: "album",
                query: { uid: uid, }
            });
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
               this.albumList.pop()
               this.albumList.unshift(res.data[k])
               
             }
        },
    },
    created: function() {
        this.userInfo = this.$store.state.userInfo;
        for (let i = 0; i < this.userInfo.album.length; i++) {
            if (i <= 2) {
                this.albumList.push(this.userInfo.album[i]);
            }
        }
    },
    components: { pop }
};
</script>



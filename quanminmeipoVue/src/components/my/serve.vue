<template>
     <div v-wechat-title='$route.meta.title'>
          <div class='header'><img src="../../assets/image/icon/close.png" @click='goback()'></div>
          <div class='view'>
               <h1>全民媒婆服务条款</h1>
               <div v-html='text'></div>
          </div>
          <loading :load='load'></loading>
     </div>
</template>
<script>
import loading from "../common/loading";
export default {
    name: "serve",
    data() {
        return {
            title: "关于我们",
            show: true,
            load:true,
            text:''
        };
    },
    methods: {
         async gian(){
              let data={}
              let res=await this.$htp.post(data,this.$api.Service)
              if(res.code==200){
                  this.load=false;
                   this.text=res.data.termsservice
              }
         },
        goback() {
            this.$router.back(-1);
        }
    },
    components:{loading},
    mounted() {
         this.gian()
    }
};
</script>
<style lang="less" scoped>
.header {
    width: 7.5rem;
    height: 0.9rem;
    position: relative;
    img {
        margin-left: 0.6rem;
        margin-top: 0.6rem;
        width: 0.3rem;
        height: 0.3rem;
    }
}
.view {
     padding:0 .6rem;
    h1 {
        margin-top: .9rem;
        font-size: 0.52rem;
        color: #111;
        font-weight: bold;
    }
}
</style>


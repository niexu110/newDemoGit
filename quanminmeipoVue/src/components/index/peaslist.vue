<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title="title" :show='show'></top>
          <div class='view'>
             <div class='k-null' v-if="len==0">
                 <img src="../../assets/image/icon/typeImg.png" alt="">
                 <p>暂无领取记录！赶快前去领取吧</p>
             </div>
             <div class='item' v-for='item in list' else>
                  <h1>{{item.action}}</h1>
                  <p>{{item.time}}</p>
                  <div class='peas'>{{item.num}}</div>
             </div>
          </div>
          <loading :load='load'></loading>
     </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import {showEl,format} from '../../assets/js/fn.js'
    export default{
         name:'dynamic',
         data(){
              return{
                   title:'豆豆记录',
                   show:true,
                   len:null,
                   load:true,
                   page:0,
                   list:[]
              }
         },
         methods:{
            async gain(){
                 let data={
                      page:this.page
                 }
                 let res=await this.$htp.post(data,this.$api.getPeasLogList)
                 if(res.code==200){
                     this.load=false;
                     this.len=res.data.length;
                     res.data.forEach(k => {
                           k.time=format(k.time,1)
                          this.list.push(k)
                     });
                 }else{
                      showEl('网络异常',2000)
                 }
            },
         },
         mounted() {
              this.gain()
         },
         created(){
              
         },
         components:{top,loading}
    } 
</script>
<style lang="less" scoped>
.view{padding-bottom:.2rem;}
.item{
     width:7.2rem;
     margin-left:.3rem;
     height: 1.25rem;
     border-bottom: 1px solid #e6e6e6;
     position: relative;color:#111;font-size:.3rem;
     h1{margin-top:.3rem;}
     p{color:#999;font-size:.26rem;margin-top:.2rem;}
     .peas{
          position: absolute;top:0;right:.3rem;width:1rem;height:1.25rem;line-height:1.25rem;color:#FF704f;font-size:.3rem;
          background:url('../../assets/image/index/rpeas.png')no-repeat right;
          background-size:.34rem;
     }
}
.k-null{
    width:6.9rem;
    height:auto;
    margin:2rem auto;
    text-align: center;
    img{
        width:3rem;
    }
    p{
        color: #999;font-size:.3rem;margin-top:.3rem; 
    }
}
</style>


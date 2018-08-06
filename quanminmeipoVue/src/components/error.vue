<template>
  <div v-wechat-title='$route.meta.title'>
       <top :title='title' :show='show'></top>
       <div class='view'>
         <div class='box'>
            <p>404！您访问的页面不存在!!!</p>
            <img src="../assets/image/icon/typeImg.png" alt="">
         </div>
       </div>
  </div>
</template>
<script>
import top from "./common/top";
     export default{
          name:'error',
          data(){
               return{
                 title: "出错啦",
                 show: true,
               }
          },
          methods:{},
          mounted(){
            
          },
          components:{top}
     }
</script>
<style lang="less" scoped>
.box{
  width:6.9rem;margin:2rem auto;color:#ff704f;font-size:.4rem;text-align:center;
  img{width:5rem;margin-top:1rem;}
}
</style>


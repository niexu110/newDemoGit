<template>
     <div>
          <div class='typeImg'>
               <img src="../../assets/image/typeImg2.png" alt="">
               <p>{{text}}</p>
          </div>
     </div>
</template>
<script>
     export default{
          name:'tempNull',
          props:['text'],
     }
</script>
<style lang="less" scoped>
   .typeImg{
        width:6.9rem;
        height:6rem;
        margin:3rem auto 0;
        font-size:.3rem; color:#999;
        text-align: center;
        img{
            width:3rem;
            margin:.3rem auto;  
        }
   }
</style>


<template>
   <div class="header">
          <span>{{title}}</span>
          <div class='rt'  v-if="show">
                <b class='lt serch' @click='skip()'></b>
                <em class='lt' v-if='showS'>筛选</em> 
          </div> 
     </div>

</template>
<script>
     export default{
          name:'top2',
          props:['title','show','showS'],
          methods:{ 
                skip(){
                   this.$router.push('search')   
                }
          },
     }
</script>
<style scoped lang='less'>
 .header{
      width:7.5rem;height:0.9rem;line-height:0.9rem;background:#fff;position: fixed;top:0;left:0; font-size:0.58rem; color:#111;z-index:100;
      span{padding-left:.3rem;}
      div{
           width:1.5rem;height:.9rem;font-size:.3rem;
           .serch{
                width:.4rem;height:.4rem;margin-top:.25rem;margin-right:.3rem; 
                background:url('../../assets/image/icon/seach.png')no-repeat center;background-size:.34rem;}
           }
                 
 }
</style>



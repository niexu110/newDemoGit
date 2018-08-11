<template>
     <div>
          <div class="section-loading-box" v-if='load'>
               <div class="g-loading">
                    <img src="../../../static/loading.gif">
               </div>
          </div>
     </div>
</template>
<script>
export default {
    name: "loading",
    props:['load'],
};
</script>
<style lang="less" scoped>
.section-loading-box{
   position: fixed;
   width:2rem;height:2rem;
   left:0;right:0;bottom:0;top:0;
   margin:auto;
}
.g-loading {
    position: absolute;
    width:.64rem;
    height: .64rem;
    z-index: 2000;
    left: 0;top:0;
    bottom:0;right:0;
    margin:auto;
    img{
        display: block;
        width:.64rem;
        margin:auto;
    }
}

</style>


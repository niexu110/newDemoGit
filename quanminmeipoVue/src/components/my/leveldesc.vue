<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <img src="../../assets/image/my/table.png" alt="">
          </div>
     </div>
</template>
<style lang="less" scoped>
.view{
     padding-bottom:.1rem;
     img{width:7.5rem;}
}
</style>
<script>
import top from "../common/top";
     export default{
          name:'leveldesc',
          data(){
               return{
                  title:'等级说明',
                  show:true,
               }
          },
          methods:{

          },
          components:{top}
     }
</script>


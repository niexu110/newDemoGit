<template>
     <div v-wechat-title='$route.meta.title'>
        <topNav></topNav>
        <div class='view'>
            pc搜恋启动啦！！！
        </div>
    </div>
</template>
<script>
import topNav from "./temp/topNav";
     export default{
          name:'server',
          data(){
               return{

               }
          },
          methods:{},
          components:{topNav}
     }
</script>

<template>
     <div v-wechat-title='$route.meta.title'>
          <div class='error'>
               <div class='container'>
                    <div class='error-box'>
                         <img src="../assets/image/error.png" alt="">
                         <div class='text'>哎呦！亲你访问的页面不存在~<router-link to="index">返回首页</router-link> </div>
                    </div>
               </div>
          </div>
     </div>
</template>
<style scoped>
.error{width:100%;height:auto;}
.error-box{width:600px;height:800px;margin:100px auto;}
.error-box img{width:600px;}
.text{font-size:24px;color:#333;text-align:center;margin-top:50px; }
.text a{font-size:24px; color:#f84333;padding-left:10px;}
</style>
<script>
     export default{
          name:'error',
          data(){
               return{
                   
               }
          },
          methods:{},
          mounted() {
          },
     }
</script>


<template>
     <div v-wechat-title='$route.meta.title'>
          <div class='head'>查看TA的单身团</div>
          <div class='view'>
               <img :src="image" class='userImg'>
               <p class='txt'>加入TA的单身朋友圈</p>
               <img src="../../assets/image/fenxiang/newuserbanner.png" class='hbImg'>
               <div class='headLine'>
                    <em class='left'></em>
                    <p>{{nickname}}身边的单身朋友({{num}})</p>
                    <em class='right'></em>
               </div>
               <div class='box'>
                    <ul :style='"width:"+len*1.6+"rem"'>
                        <li class='man lt'></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                    </ul>
               </div>
               <div class='box'>
                    <ul :style='"width:"+8*1.6+"rem"'>
                        <li class='girl lt'></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                        <li class='lt'><img src="../../assets/image/user.png" alt=""></li> 
                    </ul>
               </div>
          </div>
          <div class='share'>
               <span class='shareLook'>加入TA的单身团</span>
          </div>
     </div>
</template>
<script>
     export default{
        name:'tuan',
        data(){
             return{
                image:this.$store.state.userInfo.image,
                nickname:this.$store.state.userInfo.nickname,
                num:0,
                len:12 
             }
        },
        methods:{

        },
        mounted() {
             
        },
        created() {
        },

     }
</script>
<style lang="less" scoped>
@import "../../assets/less/share/tuan";
</style>


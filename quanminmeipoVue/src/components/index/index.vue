<template>
  <div v-wechat-title='$route.meta.title'>
       <top :title='title' :show='show'></top>
       <div class='view'>
         <slide></slide>
         <div class='invite-box'>
           <router-link to="" class='lt skip'></router-link>
           <router-link to="" class='rt skips'></router-link>
         </div>
         <div class='four-box'>
         <router-link to="" >
           <img src="../../assets/image/index/macther.png">
           <p>我的媒婆网</p>
         </router-link>
         <router-link to="" >
           <img src="../../assets/image/index/single.png">
           <p>名下单身团</p>
         </router-link>
         <router-link to="" >
           <img src="../../assets/image/index/name.png">
           <p>分享二维码</p>
         </router-link>
         <router-link to="" >
           <img src="../../assets/image/index/day.png">
           <p>每日签到</p>
           </router-link> 
         </div>
         <div class='mp-box'>
           <h1>
             <span>媒婆活动</span>
             <router-link to="" class='rt'>查看更多</router-link>
           </h1>
           <div class='new-box' v-for=" k in newList">
             <div class='new-item' @click='skip(k)'>
                <div class="lt newImg">
                  <img :src='k.thumb' alt="">
                </div>
                <div class='rt newTxt'>
                  <h2>{{k.title}}</h2>
                  <p>活动时间:{{k.time}}</p>
                </div>
             </div>
           </div>
         </div>
       </div>
       <div id='popup'></div>
  </div>
</template>
<style lang="less" scoped>
  @import '../../assets/less/index/index';
</style>
<script>
import top from '../common/top2'
import slide from '../common/slide'
import {showEl,getLoc,format} from '../../assets/js/fn.js'
     export default{
          name:'index',
          data(){
               return{
                 title:'我是媒婆',
                 show:false,
                 newList:[]
               }
          },
          methods:{
                // 获取数据
                async gain(){
                   let data={cmd:this.$api.new}
                   let res=await this.$htp.post(data);
                   let list=res.data.activity.data
                   list.forEach(k => {
                     k.time=format(k.time,0)
                    });
                   this.newList=list
                },
                  //  跳转信息页面带参数
                skip(data){
                  console.log(data)
                  // 这里可以使用 query这里path+路径 使用params路径需要填写 name+'name
                  // this.$router.push({path: 'visitingCard', query:{uid:num}})
                },
          },
          created:function(){
               this.gain()
          },
          components:{top,slide},
     }
</script>


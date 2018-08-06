<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
                  <div class='mpImg'>
                       <img :src="list.image" alt="">
                  </div>
                   <h1 class='nick'>{{list.nickname}}</h1>
                   <h2 class='job'>{{list.introduction}}</h2>
                   <div class='look' @click='skip(list)'>查看TA的主页</div>
                   <router-link to='changewoman' class='skip'>更换其他媒婆</router-link>
          </div>
          <loading :load='load'></loading>
     </div>
</template>
<script>
import top from '../common/top'
import loading from '../common/loading'
import {showEl} from '../../assets/js/fn.js'
     export default{
          name:'mywoman',
          data(){
               return{
                title:'我的媒婆',
                show:true,
                load:true,
                page:0,
                list:{}
               }
          },
          methods:{
               async gian(){
                    let data={
                    }
                    let res=await this.$htp.post(data,this.$api.myMatchmaker);
                    if(res.code==200){
                        this.load=false;
                       this.list=res.data.mps 
                    }
               },
               skip(item){
                    this.$router.push({path: 'card', query:{uid:item.uid,nickName:item.nickname}})
               }
          },
          mounted() {
               this.gian();
          },
          components:{top,loading}
     }
</script>
<style lang="less" scoped>
.view{padding-bottom:0;}
.mpImg{
    height: 3.8rem;
    width: 3.8rem;
    margin: 1.6rem auto .7rem;
    position: relative;
    background:url('../../assets/image/my/mywomen.png')no-repeat center;
    background-size:3.8rem;
    img{
          height: 1.8rem;
          border-radius:50%;
          position: absolute;
          top: 1rem;
          left: 1rem;
          border: solid 1px #cccccc;
    } 
}
.nick{    text-align: center;font-size: .48rem;color: #111;font-weight: bold;}
.job{    text-align: center;font-size:.28rem;color: #111;margin-top:.4rem;}
.look{ 
    width: 3.6rem;height: 0.9rem;margin: 2rem auto 1rem;background: linear-gradient(to right,#ff6f4f,#fd2d63);
    font-size: 0.3rem;color: #FFFFFF;line-height: 0.9rem;text-align: center;border-radius: 0.5rem;
}
.skip{
      display:block; text-align: center;font-size:.26rem;color: #666;
     }
</style>


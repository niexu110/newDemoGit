<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
            <div class='tempNull' v-if='len==0'>
                 <tempNull :text='txt'></tempNull>
            </div>
            <div v-else>
               <div class='item' v-for='item in list'  v-if='item.id_type==1' @click='removeBlack(item)'>
                    <img :src="item.image" class='lt'>
                    <div class='lt'>
                         <h1>{{item.nickname}}</h1>
                         <p>{{item.job}}</p>
                    </div>
                    <span>解除</span> 
               </div>
             </div>
          </div>
          <div id='popup'></div>
          <loading :load='load'></loading>
     </div>
</template>
<script>
import top from "../common/top";
import tempNull from "../common/tempNull";
import loading from "../common/loading";
import { showEl } from "../../assets/js/fn";
     export default{
          name:'blacklist',
          data(){
               return{
                title:'黑名单',
                show:true,
                load:true,
                len:null,
                page:0,
                txt:'没有好友进入黑名单哦!',
                list:[]
               }
                               
          },
          methods:{
               async gian(){
                    let data={
                        page:this.page
                    };
                    let res=await this.$htp.post(data,this.$api.getBlackList);
                    if(res.code==200){
                         this.load=false;
                         this.len=res.data.length
                         this.list=res.data;
                    }
               },
               async removeBlack(item){
                      let data={
                           tg_uid:item.uid
                      }
                      let res=await this.$htp.post(data,this.$api.removeBlackList)
                      console.log(res)
                      if(res.code==200){
                          item.id_type=0;
                          showEl(res.message,2000)
                      }  
               }
          },
          mounted() {
               this.gian();
          },
          components:{top,tempNull,loading}
     }
</script>
<style lang="less" scoped>
.view{
     padding-bottom:.1rem;
}
.item{
     width: 7.5rem;
     height: 1.6rem;
     padding:.3rem;
     background: #fff;
     position: relative;
     border-bottom: 1px solid #e6e6e6;
     img{
          width:1rem;height:1rem;
     }
     div{
          margin-left:.3rem;font-size:.26rem;color:#666;
          h1{font-size:.3rem;color:#111;font-weight: bold;margin-bottom:.1rem;}
     }
     span{
          position: absolute;
          right: .3rem;
          top: .5rem;
          display: block;
          width: 1.2rem;
          height: .6rem;
          border-radius: .3rem;
          font-size: .28rem;
          color: #ff704f;
          border: 1px solid #ff704f;
          text-align: center;
          line-height: .6rem;
     }

}
</style>


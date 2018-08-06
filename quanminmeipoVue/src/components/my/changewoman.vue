<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <div class="item" v-for='item in list'>
                  <img :src="item.image" class='lt'>
                  <div class='rt'>
                       <p>{{item.nickname}}</p>
                       <span>{{item.introduction}}</span>
                       <i v-if='item.stype==0' class='active' @click='showPop(item)'>加入</i>
                       <i v-else-if='item.stype==1'>已通过</i>
                       <i v-else>待通过</i>
                  </div>
               </div>
               <div id='pullUp'></div>  
               <div id='popup'></div>
               <pop ref="child"></pop>
               <loading :load='load'></loading>
          </div>
     </div>
</template>
<script>
import top from '../common/top'
import pop from '../common/pop'
import loading from '../common/loading'
import {showEl} from '../../assets/js/fn.js'
     export default{
          name:'changewoman',
          data(){
               return{
                title:'更换媒婆',
                show:true,
                page:0,
                load:true,
                list:[],
                mpName:'',
                isOpen:true
               }
          },
          methods:{
               async gian(){
                    let data={
                         page:this.page
                    }
                    let res=await this.$htp.post(data,this.$api.replaceMatchmaker);
                    if(res.code==200){
                        this.load=false;
                         res.data.forEach(k => {
                              k.introduction==""?k.introduction='这家伙很懒什么也没写':k.introduction=k.introduction
                             if(k.stype==1){
                                  this.mpName=k.nickname;
                             }
                         });
                         this.list=res.data;
                    }
               },
               async loadMore(el){
                      let data={
                              page:this.page,
                             }
                     let res=await this.$htp.post(data,this.$api.replaceMatchmaker);
                     if(res.code==200){
                         if(res.data.length!=0){
                             this.page++;
                             res.data.forEach(k => {
                              k.introduction==""?k.introduction='这家伙很懒什么也没写':k.introduction=k.introduction
                              if(k.stype==1){
                                  this.mpName=k.nickname;
                             }
                             this.list.push(k)
                         });
                             el.innerHTML='数据已更新...';
                             this.isOpen=true;
                            
                         }else{
                             el.innerHTML='暂无更多数据...';
                             this.isOpen=false;
                         }
                     }else{
                         showEl('网络异常',3000)
                     }       
                   },
           showPop(item){
               this.$refs.child.changeTuan(item,this.mpName);
           }
          },
          mounted() {
               this.gian();
               let el=document.getElementById('pullUp');
                    window.addEventListener('scroll', ()=> {
                      if(this.isOpen){
                            let docH = parseInt(document.documentElement.scrollTop+document.documentElement.clientHeight);
                            let H5Top=el.offsetTop;
                            if(docH>=H5Top){
                                this.isOpen=false;
                                this.loadMore(el);
                                el.innerHTML='数据加载中...';
                            }
                        }
                     });
          },
          components:{top,pop,loading}
     }
</script>
<style lang="less" scoped>
.view{padding-bottom:.1rem;}
.item{
    width: 7.2rem;
    height: 1.6rem;
    margin-left:.3rem;
    padding:.3rem 0;
    border-bottom: 1px solid #e6e6e6;
    img{
         width:1rem;border-radius:50%; 
    }
    div{
         width:5.7rem;height:1rem;position: relative;
         p{
              font-size: .3rem;color: #111;line-height: .5rem;font-weight: bold;
         }
         span{
              font-size: 0.26rem;color: #666666;
         }
         .active{color:#ff704f;}
         i{position: absolute;right:.3rem;top: .38rem;font-size: .26rem;color: #999;}
    }
}
</style>


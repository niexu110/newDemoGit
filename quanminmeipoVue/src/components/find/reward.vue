<template>
     <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class="view">
           <findHead :type='findType'></findHead>
           <loading :load='load'></loading>
           <div class='container'>
              <div class='cityHead'>
                   <span class='lt'>{{city}}</span>
                   <div class='rt' @click='switchAll()'>{{txt}}</div>
              </div>
              <div v-if='len==0' class='null'>
                   <img src="../../assets/image/icon/typeImg.png" alt="">
                   <p>暂无悬赏赶紧去发布您的悬赏去吧！</p>
              </div>
              <div class='item' v-for="item in peasList" @click.stop='skip(item)' v-else>
                  <img :src="item.image" class=' userImg'>
                  <div class='information '>
                       <p class='nick'>{{item.nickname}}</p>
                       <p class='infor'>{{item.age}}岁·{{item.height}}cm·{{item.constellation}}</p>
                       <p class='time'>{{item.update_time}}</p>
                  </div>
                  <div class='right rt' v-if='item.peas!=0'>
                       <p>×{{item.peas}}</p>
                       <span :class='className' v-if='item.ispeas==0' @click.stop='receive()'>领取</span>
                       <span v-else-if='item.ispeas==1'>已领取</span>
                       <span v-else>已领完</span>
                  </div> 
              </div> 
           </div>
           <div id='pullUp'></div>  
           <div id='popup'></div>  
        </div>
        <router-link to='rewardson' class='rewardBtn'>发布<br> 悬赏</router-link>
     </div>
</template>
<script>
import top from '../common/top2'
import findHead from '../common/findHead'
import loading from '../common/loading'
import {showEl,format} from '../../assets/js/fn.js'
     export default{
          name:'reward',
          data(){
               return{
                  city:'陕西 西安',
                  txt:'查看全部',
                  title:'悬赏',
                  findType:1,
                  load:true,
                  className:'btns',
                  show:true,
                  type:1,
                  page:0,
                  singlePage:0,
                  allPage:0,
                  len:null,
                  isOpen:true,
                  singleList:[],
                  allList:[],
                  peasList:[]
               }
          },
          methods:{
                    async gain(){
                         let data={
                              page:this.page,
                              city:610100,type:this.type,province:610000
                             }
                         let res=await this.$htp.post(data,this.$api.reward);
                         this.len=res.data.data.length;
                         if(this.len!=0){
                             this.load=false;
                              if(this.type==1){
                                    res.data.data.forEach(k => {
                                      k.update_time=format(k.update_time,1);
                                      this.singleList.push(k)
                                   });
                                   this.peasList=this.singleList;
                              }else{
                                 res.data.data.forEach(k => {
                                      k.update_time=format(k.update_time,1);
                                      this.allList.push(k)
                                   });
                                   this.peasList=this.allList
                              } 
                         }
                   },
               async loadMore(el){
                      let data={
                              page:this.page,
                              city:610100,type:this.type,province:610000
                             }
                     let res=await this.$htp.post(data,this.$api.reward);
                     
                         if(res.data.data.length!=0){
                             el.innerHTML='数据已更新...';
                             this.isOpen=true;
                             if(this.type==1){
                                   this.singlePage=this.page;
                                   res.data.data.forEach(k => {
                                   k.update_time=format(k.update_time,1)
                                   this.singleList.push(k) 
                              });
                             }else{
                                  this.allPage=this.page;
                                   res.data.data.forEach(k => {
                                   k.update_time=format(k.update_time,1)
                                   this.allList.push(k) 
                              }); 
                             }  
                         }else{
                             el.innerHTML='暂无更多数据...';
                             this.isOpen=false;
                         }   
                   },
                   receive(){
                       
                   },
                   skip(item){
                       this.$router.push({path: 'rewardDetial', query:{id:item.id}})
                     
                   },
                   switchAll(){
                        if(this.type==1){
                            this.type=2;this.txt='查看同城',this.city='全部';
                            this.isOpen=true;
                            this.page=this.allPage;
                            this.load=true;
                            this.gain()
                            this.peasList=this.allList     
                        }else{
                            this.isOpen=true;this.txt='查看全部',this.city='陕西 西安';
                            this.type=1;
                            this.page=this.singlePage;
                            this.peasList=this.singleList  
                        }
                   }
          },
          created:function(){
                    this.page=this.singlePage;
                    this.gain();
                   
          },
          mounted:function(){
               let el=document.getElementById('pullUp');
                    window.addEventListener('scroll', ()=> {
                      if(this.isOpen){
                            let docH = parseInt(document.documentElement.scrollTop+document.documentElement.clientHeight);
                            let H5Top=el.offsetTop;
                            if(docH>=H5Top){
                                this.isOpen=false;
                                this.page++;
                                this.loadMore(el);
                                el.innerHTML='数据加载中...';
                            }
                        }
                     });
          },
          components:{top,findHead,loading}
     }
</script>
<style lang="less" scoped>
.cityHead{
     width:7.5rem;height:.88rem;line-height:.88rem;color:#666;
     font-size:.28rem;border-bottom:1px solid #E6E6E6;padding:0 .3rem; 
}
.null{
      text-align:center;font-size:.28rem;color:#999;margin-top:1rem;
     img{display: block; width:3rem;margin:0 auto .3rem;}
}
.item{
     width:7.2rem;margin-left:.3rem;height:1.7rem;border-bottom:1px solid #E6E6E6;
     .userImg{
          height: 1.1rem; width: 1.1rem;border-radius: 50%;margin-top:.3rem; 
     }
     .information{
          display: inline-block; margin:.3rem .2rem;
          .nick{
               font-size:.3rem;color:#333;font-weight:bold; 
          }
          .infor{
              font-size:.26rem;color:#666;line-height:.4rem; 
          }
          .time{
               font-size:.22rem;color:#999; 
          }
     }
     .right{
         height:1rem; margin:.3rem .3rem 0 0;
          p{
            background:url('../../assets/image/find/peas.png')no-repeat left;
            background-size:.34rem;padding-left:.4rem;color:#FF704F;font-size:.32rem;   
          }
          span{
               display: block; font-size: .28rem;text-align: center;line-height: .5rem;
               color: #FFFFFF;width: 1.1rem;height: .5rem;
               background: #dadada;
               border-radius: 4px;
               margin: .2rem auto 0;
          }
          .btns{
                 background:#FF704F;
          }
     }
}
.rewardBtn{
    width:1.5rem;height:1.5rem;border-radius:50%;position: fixed;bottom:1.3rem;right:.5rem;text-align: center;
    background:linear-gradient(to bottom,#FF6C55,#FD4972);color:#fff;font-size:.32rem;padding-top:.3rem;  
}
</style>
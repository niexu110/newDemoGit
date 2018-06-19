<template>
     <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class="view">
           <findHead :type='findType'></findHead>
           <div class='find-container'>
              <div class='find-item lt' v-for='item in useList' @click='skip(item)'>
                <div>
                  <img :src="item.image">
                 </div>   
                <h1><em>{{item.nickname}}</em><span :class="item.sex==1?'sexB':'sexA'">{{item.age}}</span></h1>  
                <h2>{{item.height}}cm·{{item.constellation}}</h2> 
              </div>
              <p class='clear'></p>  
           </div>
           <div id='pullUp'></div>  
        </div>
     </div>
</template>
<style lang="less" scoped>
 @import '../../assets/less/find/find';
</style>
<script>
import top from '../common/top2'
import findHead from '../common/findHead'
import {citySort,showEl} from '../../assets/js/fn.js'
     export default{
          name:'find',
          data(){
               return{
                  title:'找对象',
                  findType:0,
                  show:true,
                  page:0,
                  useList:[],
                  isOpen:true,
               }
          },
          methods:{
                    async gain(){
                         let data={
                              cmd:this.$api.recommend,page:this.page,
                              uid:this.$store.state.userInfo.uid,
                             }
                         let res=await this.$htp.post(data);
                            if(res.code==200){
                                console.log(res.data)
                                res.data.forEach(key => {
                                    let citys=citySort(key.province,key.city) 
                                    key.province=citys.province;key.city=citys.city
                                });
                                this.useList=res.data;
                            }else{
                                 showEl('网络异常',3000)
                            }
                   },
               async loadMore(el){
                      let data={
                              cmd:this.$api.recommend,page:this.page,
                              uid:this.$store.state.userInfo.uid,
                             }
                     let res=await this.$htp.post(data);
                     if(res.code==200){
                         if(res.data.length!=0){
                             this.page++
                             el.innerHTML='数据已更新...';
                             this.isOpen=true;
                             res.data.forEach(key => {
                                    let citys=citySort(key.province,key.city) 
                                    key.province=citys.province;key.city=citys.city
                                    this.useList.push(key) 
                              });
                         }else{
                             el.innerHTML='暂无更多数据...';
                             this.isOpen=false;
                         }
                     }else{
                         showEl('网络异常',3000)
                     }       
                   },
                   skip(item){
                       this.$router.push({path: 'card', query:{uid:item.uid,nickName:item.nickname}})
                      // 传过去为'+this.$route.query.uid
                   }
          },
          created:function(){
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
                                this.loadMore(el);
                                el.innerHTML='数据加载中...';
                            }
                        }
                     });
          },
          components:{top,findHead}
     }
</script>

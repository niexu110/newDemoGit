<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <div class="item" v-for='item in list' @click='skip(item)'>
                  <img :src="item.image" class='lt'>
                  <div class='rt'>
                       <p>{{item.nickname}}</p>
                       <span>{{item.introduction}}</span>
                       <i>{{item.industry}}</i>
                  </div>
               </div>
               <div id='pullUp'></div>  
               <div id='popup'></div>
               <loading :load='load'></loading>  
          </div>
     </div>
</template>
<script>
import top from '../common/top'
import loading from '../common/loading'
import {showEl} from '../../assets/js/fn.js'
     export default{
          name:'follow',
          data(){
               return{
                title:'我关注的',
                show:true,
                load:true,
                page:0,
                list:[],
                isOpen:false,
               }
          },
          methods:{
               async gian(){
                    let data={
                         page:this.page
                    }
                    let res=await this.$htp.post(data,this.$api.myFollowMatchmaker);
                    if(res.code==200){
                        this.load=false;
                         res.data.length==10?this.isOpen=true:this.isOpen=false
                         res.data.forEach(k => {
                              k.introduction==""?k.introduction='这家伙很懒,什么也没留下.':k.introduction=k.introduction
                         });
                         this.list=res.data;
                    }
               },
               async loadMore(el){
                      let data={
                              page:this.page,
                             }
                     let res=await this.$htp.post(data,this.$api.myFollowMatchmaker);
                     if(res.code==200){
                         if(res.data.length!=0){
                             this.page++
                             el.innerHTML='数据已更新...';
                             this.isOpen=true;
                             res.data.forEach(k => {
                              k.introduction==""?k.introduction='暂未填写':k.introduction=k.introduction;
                              this.list.push(k)
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
          components:{top,loading}
     }
</script>
<style lang="less" scoped>
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
         i{position: absolute;right:.3rem;top: .38rem;font-size: .24rem;color: #999;}
    }
}
</style>


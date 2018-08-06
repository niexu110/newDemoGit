<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show' :showS='showS'></top>
        <div class="view">
            <findHead :type='findType'></findHead>
            <loading :load='load'></loading>
            <div class="content">
                <div class="contentlist" v-for='user in list'  v-if='user.islove==1' @click.stop="jump(user)">
					<img :src="user.image" />
					<div class="center">
						<span>{{user.nickname}}</span>
						<p><span>{{user.age}}</span>岁<span>{{user.height}}</span>cm<span>{{user.constellation}}</span><span>{{user.industry}}</span></p>
					</div>
					<p class="ilbtn" @click.stop='nolike(user)' >取消喜欢</p>
				</div>
            </div>
            
            <div id='pullUp'></div>  
            <div id='popup'></div>  
        </div>
     </div>
</template>
<style lang="less" scoped>
 @import '../../assets/less/find/find';
.contentlist{height: 1.6rem;margin-left: .3rem;padding-right: .3rem;border-bottom: solid 1px #E6E6E6;}
.contentlist img{float: left; height: 1rem;width: 1rem;border-radius: 50%;margin: .3rem .3rem 0 0;}
.center{float: left;margin-top: .3rem;}
.center>span{display: block;line-height: .5rem;font-size: .28rem;color: #111111;font-weight: bold;}
.center>p{font-size: .22rem;color: #666666;line-height: .5rem;}
.center>p span{display: inline-block;margin-right: .15rem;}
.ilbtn{float: right;width: 1.38rem;height: .5rem;border: solid 1px #FF704F;border-radius: .5rem;color: #FF704F;font-size: .24rem;line-height: .48rem;text-align: center;margin-top: .5rem;}
</style>
<script>
import top from '../common/top2'
import findHead from '../common/findHead'
import loading from '../common/loading'
import {citySort,showEl} from '../../assets/js/fn.js'
     export default{
          name:'likeme',
          data(){
               return{
                  title:'我喜欢的',
                  show:true,
                  showS:false,
                  load:true,
                  findType:3,
                  page:0,
                  list:[],
                  isOpen:false,
               }
          },
          methods:{
            async gain(){
                let data={
                    page:this.page,
                    type:2,
                    }
                let res=await this.$htp.post(data,this.$api.getLikeList);
                if(res.code==200){
                    this.load=false;
                    this.list=res.data;
                    this.isOpen=true;
                }else{
                        showEl('网络异常',3000)
                }
            },
            async loadMore(para){
                let data={
                    page:this.page,
                    type:2
                };
                let res=await this.$htp.post(data,this.$api.love);
                if(res.code==200){
                    if(res.data.length!=0){
                        this.page++
                        pullUp.innerHTML='数据已更新...';
                        this.isOpen=true;
                        this.list.push(res.data)
                    }else{
                        pullUp.innerHTML='暂无更多数据...';
                        this.isOpen=false;
                    }
                }else{
                    showEl('网络异常',3000)
                }      
            },
            jump(item) {
                this.$router.push({
                    path: "card",
                    query: { uid: item.uid, nickName: item.nickname }
                });
            }
        },
          created:function(){
            this.gain();
                   
          },
          mounted:function(){
               let pullUp=document.getElementById('pullUp');
                window.addEventListener('scroll', ()=> {
                    if(this.isOpen){
                        let docH = parseInt(document.documentElement.scrollTop+document.documentElement.clientHeight);
                        let H5Top=pullUp.offsetTop;
                        if(docH>=H5Top){
                            this.isOpen=false;
                            this.loadMore(pullUp)      
                            pullUp.innerHTML='数据加载中...';
                        }
                    }
                });
          },
          components:{top,findHead,loading}
     }
</script>

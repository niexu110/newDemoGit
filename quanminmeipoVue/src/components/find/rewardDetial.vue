<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <loading :load='load'></loading>
          <div class='view'>
            <p class='title'>据说发布悬赏的人都是超有自信,很有魅力的人</p>
            <div class='box'>
                 <div class='imgBox'>
                      <img :src="rewardData.image" alt="">
                      <div class='userMsg'>
                           <h1><span>{{rewardData.nickname}}</span><em>{{rewardData.province}}{{rewardData.city}}</em></h1>
                           <p>{{rewardData.age}}岁·{{rewardData.height}}cm·{{rewardData.constellation}}·{{rewardData.job}}</p>
                      </div>
                 </div>
                 <h1 class='rewardTitle'>他的悬赏要求</h1>
                 <p class='condition'>{{rewardData.rq_province}}{{rewardData.rq_city}}、{{rewardData.rq_age}}、{{rewardData.rq_height}}、{{rewardData.rq_income}}、{{rewardData.rq_edu}}</p>
                 <p class='describe'>{{rewardData.content}}</p>
             </div> 
             <div class='btnBox'>
               <div @click='jump()'>查看资料</div>
               <div class='active' @click='skip()'>给TA推荐</div>
               <div @click='nextDetail()'>下一个</div>
            </div>  
          </div>
          <div id='popup'></div>
     </div>
</template>
<style lang="less" scoped>
 @import '../../assets/less/find/rewardDetial';
</style>
<script>
import top from "../common/top";
import loading from "../common/loading";
import {showEl,citySort} from "../../assets/js/fn.js";
export default {
    name: "rewardDetial",
    data() {
        return {
            title: "TA的悬赏",
            show: true,
            load:true,
            rewardData:{},
        };
    },
    methods: {
        async gain(id){
            let data={
                 uid:this.$store.state.userInfo.uid,
                 r_id:id
            }
            let res=await this.$htp.post(data,this.$api.rewardDetial);
            if(res.code==200){
            this.load=false;
            this.rewardData=res.data.detail;
            this.rewardData.city=citySort(this.rewardData.province,this.rewardData.city).city;
            this.rewardData.province=citySort(this.rewardData.province,this.rewardData.city).province;
            this.rewardData.rq_city=citySort(this.rewardData.rq_province,this.rewardData.rq_city).city;
            this.rewardData.rq_province=citySort(this.rewardData.rq_province,this.rewardData.rq_city).province; 
            }else{
                showEl('网络异常',2000)
            }
       },
        jump(){
              this.$router.push({path: 'card', query:{uid:this.rewardData.uid,nickName:this.rewardData.nickname}})
        },
        nextDetail(){
             if(this.rewardData.nextid==0){
                     showEl('已经是最后一个了',2000)
             }else{
               this.load=true;
               this.gain(this.rewardData.nextid) 
             }
            
        },
        skip(){
          if(this.rewardData.sex==1){
              this.$router.push({path: 'groupDetial', query:{sex:2,id:this.rewardData.id}})
          }  else{
              this.$router.push({path: 'groupDetial', query:{sex:1,id:this.rewardData.id}})
          }
        }
    },
    created() {
         this.gain(this.$route.query.id);
    },
    components: { top,loading }
};
</script>



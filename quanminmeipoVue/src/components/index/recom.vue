<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='sucBtn' @click='subMit()'>保存</div>
          <div class='view'>
               <div class='userTxt'>
                    <span class='lt'>TA可能上得了厅堂，下得了厨房但是你不说没人知道啊!</span>
                    <img :src="this.$route.query.image" class='rt'>
               </div>
               <textarea name="recommend" rows="6" id="textarea" placeholder="快向大家介绍一下TA吧，不要太吹牛哦！" v-model="value"  maxlength="150"></textarea>
               <p class='text'>不超过150个字</p>
          </div>
          <div id='popup'></div>
     </div>
</template>
<script>
import top from "../common/top";
import { showEl } from "../../assets/js/fn";
export default {
    name: "recom",
    data() {
        return {
            title: "推荐缘由",
            show: true,
            value:'',
            isOpen:true,
        };
    },
    methods: {
        async subMit(){
             if(this.value==''){
                  showEl('没有填写任何信息！',2000)
             }else{
                if(this.isOpen){
                     let data={
                        tg_uid:this.$route.query.uid,
                        recommend:this.value
                     }
                     let res=await this.$htp.post(data,this.$api.updateRecommend);
                     console.log(res)
                     if(res.code==200){
                          showEl(res.message,2000);
                          this.isOpen=false;
                     }else{
                         showEl(res.message,2000);
                     }
                }  
             }
        }, 
    },
    mounted() {
         this.value=this.$route.query.text;
    },
    created() {},
    components: { top }
};
</script>
<style lang="less" scoped>
.sucBtn {
    position: fixed;
    top: 0;
    right: 0.3rem;
    z-index: 210;
    font-size: 0.3rem;
    color: #458eff;
    height: 0.9rem;
    line-height: 0.9rem;
}
.userTxt {
    width: 6.9rem;
    height: 1.8rem;
    margin: 0 auto;
    padding: 0.4rem 0;
    border-bottom: 1px solid #e6f6f6;
    span {
        width: 3.8rem;
        height: 100%;
        font-size: 0.26rem;
        color: #111;
        line-height: 0.5rem;
    }
    img{
         width:1rem;height:1rem;border-radius:50%; 
    }
}
#textarea{
    width: 6.9rem;
    padding-left:.3rem;
    resize: none;
    font-size: .26rem;
    color: #666;
    line-height: .5rem;
}
.text{
     width:7.2rem;
     text-align: right; 
     font-size: .24rem;
     color: #999;
}
</style>

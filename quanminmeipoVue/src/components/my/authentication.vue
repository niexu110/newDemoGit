<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
               <div class='content'>
                    <p>姓名</p>
                    <input type="text" placeholder="请输入您的真实姓名" maxlength="2" v-model="names">
                    <div class='icard'>
                         <p>身份证号</p>
                         <input type="text" maxlength="18" placeholder="请输入您的身份证号" v-model="card" @blur='checkCard(card)'>
                         <img src="../../assets/image/icon/true.png" :class='isOK?"showImg":"showImgs"'>
                    </div>
                    <h2>*实名认证的用户更容易受到其他用户的欢迎</h2>
                    <div class='sure' @click='insertCard'>确定</div>
               </div>
          </div>
          <div id='popup'></div>
     </div>
</template>
<script>
import  top from '../common/top'
import  {showEl,isIdCardNo} from '../../assets/js/fn'
     export default{
          name:'authentication',
          data(){
               return{
                  title:'实名认证',
                  show:true,
                  names:'',
                  card:'',
                  isOK:false,
                  isBtn:false
               }
          },
          methods:{
              checkCard(card){
                isIdCardNo(card)?(this.isBtn=true,this.isOK=true):(this.isBtn=false,this.isOK=false,showEl('身份证验证不通过',2000))
              },
              async insertCard(){
                   if(this.isBtn){
                       let data={
                            name:this.names,
                            idcard:this.card,
                       };
                       let res=await this.$htp.post(data,this.$api.insertIdCard) 
                       console.log(res)
                       if(res.code==200){
                            this.isBtn=false;
                       }
                   }else{
                      showEl('请输入姓名或身份证',2000)  
                   }
              }
          },
          mounted() {
               
          },
          components:{top}
     }
</script>
<style lang="less" scoped>
.content{
     width:6.9rem;
     margin:0 auto;
     .icard{position: relative;
     img{width:.35rem;position: absolute;bottom:.35rem;right:.2rem;}
       .showImg{display:block;}
       .showImgs{display: none;}
     }
     h2{
          font-size: .24rem;
          color: #ff704f;
          margin-top: .3rem;
     }
     p{
      padding-top: .6rem;
      padding-bottom: .3rem;
      font-size: .34rem;
      color: #111;
     }
     input{
          width: 6.9rem;
          height: .9rem;
          border: 1px solid #bbb;
          font-size: .3rem;
          color: #111;
          padding-left: .3rem;
     }
     .sure{
          width: 6.9rem;
          height: .94rem;
          line-height:.94rem;
          text-align: center;
          margin:4rem 0 0; 
          border-radius: .47rem;
          font-size: .32rem;
          color: #fff;
          background: #ff704f;
     }
}
</style>


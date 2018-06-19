<template>
     <div v-wechat-title='$route.meta.title'>
          <div class='view'>
            <div class='reg-head'>
                 <span class='lt' @click="goback(isGo)"><img src="../../assets/image/icon/back.png"></span>
                 <span class='rt'>{{num}}/2</span>
             </div>
             <div class='reigter-box'>
                <h1>{{title}}</h1>
                <h2>{{txt}} 
                  <span class="rt" v-if="jump" @click='jumps()'>跳过</span>
                </h2>
                <div class='reigter-one' v-if="step1">
                   <div class='sex-select'>
                       <div class='lt' :class='sexSure' @click='clckSex(1)'>
                           <img src="../../assets/image/icon/sexboy.png"> 
                           <img src="../../assets/image/icon/signsure.png" class='isSure' v-if='isSure'> 
                         </div>  
                       <div class='rt' :class='sexSure2' @click='clckSex(2)'>
                           <img src="../../assets/image/icon/sexgirl.png" > 
                           <img src="../../assets/image/icon/signsure.png" class='isSure' v-if='isSure2'> 
                       </div>  
                    </div>
                    <p>性别一旦选择,不可更改</p>
                    <div class='status-select'>
                         <span class='lt' :class='statusClass'   @click='selectStatus(3)'>我要找对象</span>
                         <span class='rt ' :class='statusClass2'  @click='selectStatus(2)'>我要当媒婆</span>
                    </div>
                     <div class='stepBtn' @click="nextStep()">下一步</div>  
                </div> 
                <div class='reigter-two' v-if="step2">
                    <div class='upLoad-box'>
                        <img src="../../assets/image/icon/upload.png" id='fileImg'>
                        <input type="file" accept="image/png,image/jpeg" @change="change($event)">
                    </div>
                    <div class='upLoad-depict'>
                        <p>(以下照片不会通过审核)</p>
                        <div class='no-load'>
                            <div>
                               <img src="../../assets/image/user.png">
                               <p>非人物照</p> 
                            </div>
                            <div>
                               <img src="../../assets/image/user.png">
                               <p>非人物照</p> 
                            </div>
                            <div>
                               <img src="../../assets/image/user.png">
                               <p>非人物照</p> 
                            </div>
                            <div>
                               <img src="../../assets/image/user.png">
                               <p>非人物照</p> 
                            </div>
                            <div>
                               <img src="../../assets/image/user.png">
                               <p>非人物照</p> 
                            </div>
                        </div>
                    </div>
                    <div class='reigterBtn' @click='reigter()'>完成</div>
                </div> 
             </div>
               
          </div>
     </div>
</template>
<style lang="less" scoped>
 @import '../../assets/less/login/select';
</style>
<script>
import { mapState, mapActions } from "vuex";
     export default{
          name:'reigter',
          data(){
               return{
                  num:1,
                  isGo:false,
                  title:'选择性别/身份',
                  txt:'请花费5秒钟让我们了解您',
                  jump:false,
                  step1:true,
                  step2:false,
                  isSure:true,
                  isSure2:false,
                  sexSure:'active',
                  sex:1,
                  mpType:3,
                  sexSure2:'',
                  statusClass:'active',
                  statusClass2:'',
                  sdkData:{}
               }
          },
          methods:{
               goback(type){
                  if(type){
                      this.step1=true;this.step2=false;
                      this.num=1;this.title='选择性别/身份';this.txt='请花费5秒钟让我们了解您'
                      this.isGo=false; this.jump=false;
                  }
               },
               jumps(){
                     alert('直接进主页')
               },
               clckSex(num){
                    if(num==1){
                              this.isSure=true;this.isSure2=false;this.sex=num;
                              this.sexSure='active';this.sexSure2=''
                    }else{
                              this.isSure=false;this.isSure2=true;this.sex=num;
                              this.sexSure='';this.sexSure2='active'             
                   }
               },
               selectStatus(num){
                    if(num==3){
                         this.statusClass='active';this.statusClass2='';this.mpType=num
                    }else{
                        this.statusClass='';this.statusClass2='active'; this.mpType=num
                    }
               },
                // 下一步
              async nextStep(){
                    this.step1=false;this.step2=true;this.isGo=true;this.jump=true;
                    this.num=2;this.title='上传图像';this.txt='请您上传图像';
                    let res=await this.$htp.post({cmd:this.$api.fileimg});
                    if(res.code==200){
                        this.sdkData=res.data;
                    }
               },
               change(event){
                    let image = document.getElementById('fileImg'); //预览对象
                        this.clip(event , {
                        resultObj : image,
                        aspectRatio : 1,
                        })
               },
               ...mapActions(["_setInformation"]),
              async reigter(){
                  let data={
                      cmd:this.$api.information,
                      uid:this.$store.state.userInfo.uid,
                      sex:this.sex,mp_type:this.mpType
                  }
                  let res=await this.$htp.post(data);
                   if(res.code==200){
                       this._setInformation({
                        data: {
                            name:'sex',
                            val:this.sex,
                            name2:'mp_type',
                            value:this.mpType
                        }
                    });
                       this.$router.push('/index');
                       
                   }
               }
          },
         
     }
</script>


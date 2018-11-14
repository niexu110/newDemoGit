<template>
     <div class='alert' v-if='isAlert'>
          <div class="alert-box" :class='className'>
               <p class='alert-title'>信息 <span class='alert-close rt' @click="close()">×</span></p>
                <div class='alert-txt'>{{txt}}</div>
                <span class='alert-btn' @click="close()">确定</span>
          </div>
     </div>
</template>
<style scoped>
.alert{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:2000;}
.alert-box{width:260px;height:170px;background:#fff;position: absolute;left:0;right:0;bottom:0;top:0;margin:auto;transition: all .2s linear;}
.alertA{transform: scale(0)}
.alertB{transform: scale(1)}
.alert-title{background:#F8F8F8;height:40px;line-height:40px;cursor:move;color:#333;font-size:14px;padding:0 10px;  }
.alert-close{font-size:26px;color:#666;cursor: pointer;}
.alert-txt{width:260px;font-size:14px;color:#333;text-align: center;margin:35px auto ;}
.alert-btn{display:block;width:50px;height:28px;line-height:28px;color:#fff;font-size:10px;cursor: pointer; background:#e50012;margin:0 auto;border-radius:4px;text-align: center;  }
</style>
<script>
     export default{
          name:'alert',
          data(){
               return{
                 className:'alertA',
                 isAlert:false,
                 txt:'提示弹窗',
               }
          },
          methods:{
              showAlert(txt){
                   this.isAlert=true;
                   this.txt=txt;
                   setTimeout(() => {
                       this.className='alertB'; 
                   }, 100);
              },
              close(){
                   this.isAlert=false;
                   this.className='alertA'
              }
          },
          mounted() {
               
          },

     }
</script>

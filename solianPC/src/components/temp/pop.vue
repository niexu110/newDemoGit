<template>
     <div id='pops'  :class='className'>
          <div class='pops-box' >
               <img src="../../assets/image/close.png" class='pops-close' @click='classFun(0)'>
               <img :src="img" class='useImg'>
          </div>
          
     </div>
</template>
<script>
     export default{
          name:'pop',
          data(){
               return{
                    className:'scale',
                    img:''
               }
          },
          methods:{
               classFun(type,num){
                   if(type==0){
                        this.className='scale'
                   }else{
                       this.className='scale1';
                       this.img=require('../../assets/image/hui/user'+num+'.png');
                   }
               },
          },
     }
</script>
<style scoped>
 #pops{position: fixed;left:0;right:0;bottom:0;top:0;z-index:200;transition:all .3s linear;}
 .scale{transform: scale(0);background:rgba(0,0,0,0);}
 .scale1{transform: scale(1);background:rgba(0,0,0,.7);}
.pops-box{width:800px;height:400px;position: absolute;left:0;right:0;bottom:0;top:0;margin:auto;}
.useImg{width:800px;}
.pops-close{position: absolute;right:15px;top:15px;z-index:300;width:20px;cursor: pointer;}
</style>


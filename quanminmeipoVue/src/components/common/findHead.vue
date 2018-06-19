<template>
     <div class='find-header'>
          <div class='find-slither'>
              <p class='lt'></p>
              <div class='slither-box lt'>
                  <div class='slither-item lt' v-for="(k,i) in slither" @click='skip(i)'>
                       <em>{{k}}</em>
                       <span :class="{ 'active':i===type }"></span>
                  </div>
             </div>  
          </div>
    </div>
</template>
<script>
     export default{
         name:'findHeader',
         props:['type'],
         data(){
              return{
                slither:['智能推荐','悬赏','恋商测试','我喜欢的','喜欢我的'],
                
              }
         },
         methods:{
              skip(type){
                console.log(type)
              }
         },
        
     }
</script>
<style lang="less" scoped>
 .find-header{
      width:7.5rem;margin:.4rem 0 ;border-bottom:1px solid #ccc;height:.8rem;overflow: hidden;
      .find-slither{
          width:7.5rem;height:.8rem;overflow-x: auto;overflow-y: hidden;
          .slither-box{
              width:9rem;height:.8rem;
            .slither-item{
                 width:1.8rem;height:.8rem;line-height:.6rem;text-align: center;color:#111;
                 font-size:.3rem;position: relative;
                 span{
                     position: absolute;bottom:0;left:.5rem;width:.5rem ;height:0;
                     z-index:1;   
                 }
                 .active{
                     border:2px solid #ff704f;
                 } 
            }
          }
       }
      }
</style>


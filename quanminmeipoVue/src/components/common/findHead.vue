<template>
     <div class='find-header'>
          <div class='find-slither'>
              <p class='lt'></p>
              <div class='slither-box lt' :style='1.8*slither.length+"rem"'>
                  <div class='slither-item lt' v-for="(k,i) in slither" @click.stop='skip(i)'>
                       <em :class="{ 'active':i===type }">{{k}}</em>
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
                slither:['智能推荐','悬赏','我喜欢的','喜欢我的'],
              }
         },
         methods:{
              skip(type){
               if(type==0){
                     this.$router.push('find')
                 }else if(type==1){
                     this.$router.push('reward')
                 }else if(type==2){
                        this.$router.push('ilike')
                 }else if(type==3){
                       this.$router.push('likeme')  
                 }else{
                     
                 }
              }
         },
         created() {
         },
        
     }
</script>
<style lang="less" scoped>
 .find-header{
      width:7.5rem;margin:.4rem auto 0;border-bottom:1px solid #ccc;height:.8rem;overflow: hidden;
      .find-slither{
          width:7.5rem;height:.8rem;overflow-x: auto;overflow-y: hidden;
          .slither-box{
              height:.8rem;
            .slither-item{
                 width:1.8rem;height:.8rem;line-height:.6rem;text-align: center;color:#111;
                 font-size:.3rem;position: relative;
                 em{
                     display: inline-block;height:.8rem;
                 }
                 
                 .active{
                     border-bottom:2px solid #ff704f;
                 } 
            }
          }
       }
      }
</style>


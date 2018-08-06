<template>
     <div v-wechat-title='$route.meta.title'>
          <top :title='title' :show='show'></top>
          <div class='view'>
             <div class='item'>
                  <span class="lt">我的手机号</span>
                  <em class='lt'>{{phone}}</em>
                  <span class='rt'>已绑定</span>
             </div>
          </div>
     </div>
</template>
<style lang="less" scoped>
.item{
    width: 7.5rem;
    height: 1.6rem;
    padding:.6rem .2rem;
    border-bottom: 1px solid #E8E8E8;
    color:#ff7051;font-size:.32rem;
    em{
         color:#111;padding-left:.3rem;
    }
}
</style>
<script>
import top from '../common/top'
     export default{
          name:'phone',
          data(){
               return{
                title:'绑定手机号',
                show:true,
                phone:''
               }
          },
          methods:{},
          mounted() {
              this.phone=this.$store.state.userInfo.mobile.substr(0, 3) + '****' + this.$store.state.userInfo.mobile.substr(7, 11);
          },
          components:{top}
     }
</script>


<template>
     <div>
          <top :title='title' :show='show'></top>
          <router-link to="#" class='skip'>明细</router-link>
          <div class="view">
              <div class='price'>
                   <h1>{{price}}</h1>
                   <p>余额喜糖</p>
              </div> 
              <div class='sugarLine'>充值</div>
              <div class="item">
                <div class='lt leftD'>20颗喜糖</div>   
                <div class='rt rightD'>2元<span>购买</span></div>   
              </div>
              <div class="item">
                <div class='lt leftD'>60颗喜糖</div>   
                <div class='rt rightD'>6元<span>购买</span></div>   
              </div>
              <div class="item">
                <div class='lt leftD'>120颗喜糖</div>   
                <div class='rt rightD'>12元<span>购买</span></div>   
              </div> 
              <div class="item">
                <div class='lt leftD'>300颗喜糖</div>   
                <div class='rt rightD'>30元<span>购买</span></div>   
              </div>
              <div class="item">
                <div class='lt leftD'>1080颗喜糖</div>   
                <div class='rt rightD'>108元<span>购买</span></div>   
              </div>  
          </div>
     </div>
</template>
<script>
import top from'../../components/common/top'
     export default{
          name:'sugar',
          data(){
               return{
                 title:'我的喜糖',
                 show:true, 
                 price:80,  
               }
          },
          methods:{},
          mounted(){},
          components:{top}

     }
</script>
<style lang="less" scoped>
.view{padding-bottom:.1rem;}
.skip{position:fixed;top:0;right:.3rem;font-size:.3rem; color:#ff704f;height:.9rem;line-height: .9rem;z-index:210;}
.price{
    text-align: center;
    width: 6.9rem;
    height: 2.7rem;
    margin: .3rem auto;
    background: linear-gradient(to right,#ff704f,#fd2d63);
    border-radius: 4px;
    padding: .5rem 0 .69rem 0;
    h1{
     font-size: .8rem;
     color: #fff;
     font-weight: bold;
    }
    p{
       font-size: .32rem;
       color: #fff;
       padding-top: .1rem;
    }
}
.sugarLine{
     width:7.5rem;
    height: .9rem;
    padding-left: .3rem;
    font-size: .32rem;
    color: #111;
    line-height: .9rem;
    background: #F3F3F3;
}
.item{
    width: 7.2rem;
    height: 1.3rem;
    line-height: 1.3rem;
    margin-left: .3rem;
    padding-right:.3rem;
    border-bottom: 1px solid #e6e6e6;
    .leftD{
     font-size: .3rem;
     color: #111;
     padding-left: .7rem;
     background:url('../../assets/image/icon/sugar.png')no-repeat left;
     background-size:.5rem;
     
    }
    .rightD{
      font-size: .3rem;
      color: #ff704f;
      span{
          display: inline-block;
          width: 1.1rem;
          height: .54rem;
          color: #ff704f;
          text-align: center;
          line-height: .54rem;
          border: 1px solid #ff704f;
          border-radius: .27rem;
          margin-left:.2rem;
      }
    }
}
</style>


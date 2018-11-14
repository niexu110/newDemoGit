<template>
     <div>
          <div class="footer">
               <div class='container'>
                   <div class='foot-bar'>
                      <div class='foot-bar-skip lt'>
                           <div>
                               <p>特色服务</p>
                               <router-link to="about">搜恋</router-link>
                               <router-link to="search">招商地区查询</router-link>
                               <router-link to="action">活动中心</router-link>
                           </div>
                            <div>
                               <p>关于我们</p>
                               <span @click='skip(0)'>公司介绍</span>
                               <span @click='skip(2)'>服务条款</span>
                               <span @click='skip(3)'>联系我们</span>
                           </div>
                            <div>
                               <p>商业合作</p>
                               <a href="https://www.didiglobal.com/" target="_blank">滴滴打车</a>
                               <a href="http://www.dtxs.cn/" target="_blank">大唐西市</a>
                               <a href="https://www.toutiao.com/" target="_blank">今日头条</a>
                           </div>
                      </div>
                      <div class='foot-bar-code rt'>
                          <div>
                              <img src="../../assets/image/iOSapp.png" alt="">
                              <p>IOS客户端二维码</p>
                          </div>
                          <div>
                              <img src="../../assets/image/adAPP.png" alt="">
                              <p>安卓客户端二维码</p>
                          </div>
                          <div>
                              <img src="../../assets/image/meiCode.png" alt="">
                              <p>微信公众号二维码</p>
                          </div>
                      </div>
                   </div>
                   <div class='foot-sl-copy'>
                       <p>Copyright  2017, solian.cc 2017-2018 All Right Reserved.搜恋网</p>
                       <p class='foot-sl-copy-ba'><span class="lt">陕ICP备20170808号-1</span><span class="rt">陕ICP证201766号</span></p>
                   </div>
               </div>  
          </div>
     </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
           skip(num){
               this.$router.push({
                   path:'about',
                   query:{type:num}
               })
           }
        },
        mounted() {
            
        },
    }
</script>
<style scoped>
/*底部*/
.footer{  width: 100%; height: 389px;  background: #f0f0f0;  overflow: hidden; }
.foot-bar{height:200px;margin-top:60px;border-bottom:1px solid #E3E3E3;}
.foot-bar-skip{width:630px;height:200px;}
.foot-bar-code{width:435px;height:180px;margin-top:20px;}
.foot-bar-skip div{float: left;width:210px;height:100%;}
.foot-bar-skip div p{font-size:16px;color:#262626;margin-bottom:5px;}
.foot-bar-skip div a{margin-top:20px;display:block; }
.foot-bar-skip div span{margin-top:20px;display:block;color:#aaa;font-size:14px;cursor: pointer; }
.foot-bar-skip div span:hover{color:#f84333; }
.foot-bar-code div{float:left;width:100px;height:100%;margin-left:45px;text-align: center;}
.foot-bar-code div img{display: block;width:100px;margin-bottom:25px;}
.foot-bar-code div p{font-size:12px;color:#686868;font-weight:bold; }
.foot-sl-copy{text-align: center;margin-top:60px;font-size: 14px;color: #999;}
.foot-sl-copy-ba{width:300px;margin:10px auto;}
</style>


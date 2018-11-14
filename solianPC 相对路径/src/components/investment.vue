<template>
     <div v-wechat-title='$route.meta.title'>
          <topNav :type='type'></topNav>
          <contact></contact>
          <div class='view'>
               <!-- 一楼banner -->
               <div class='invest-banner'>
                    <div class='container'>
                         <div class='invest-box'>
                              <h1>搜恋邀请您合作共赢</h1>
                              <p>独家合作:每个地区仅放一家搜恋加盟运营商</p>
                              <p>终生合作:第一次加盟签约三年到期自动续费</p>
                              <span  class='invest-skip hover-wayra hover-inverted' @click='scollBottm()'>立即加盟</span>
                         </div>
                    </div>
               </div>
               <!-- 二楼 -->
               <div class='invest-cost'>
                    <div class='container'>
                         <h1 class='invest-title'>加盟费用/定价机制</h1>
                         <div class='invest-cost-box'>
                              <div class='invest-cost-txt lt'>
                                   <h3>加盟费定价规则&nbsp;公开透明</h3>
                                   <p>决定加盟费价格</p>
                                   <p>市级
                                        <span>10</span>万起</p>
                                   <p>省级
                                        <span>30</span>万起</p>
                              </div>
                              <div class='invest-cost-img rt'>
                                   <img src="../assets/image/img/circle.png">
                                   <p>全国各区域数据</p>
                              </div>
                         </div>
                    </div>
               </div>
               <!-- 三楼 -->
               <div class='invest-mechanism'>
                    <div class='container'>
                         <h1 class='invest-title'>加盟机制</h1>
                         <div class='invest-mechanism-box'>
                              <div class='invest-relative bg1'>
                                   <img src="../assets/image/img/invest1.png" alt="">
                                   <div class="invest-text">
                                        <p style='height:70px;'></p>
                                        加盟时：实缴加盟费 <br/>转让完成：实缴加盟费扣除+增值部分50%分润 <br/>加盟权转让机制：保障保值 <br/>加盟权转让条件： 加盟期限届满，加盟商可申请启动转让机制<br/> 年度考核指标完成 20%以下，强制启动转让机制
                                   </div>
                              </div>
                              <div class='invest-center invest-relative bg2'>
                                   <img src="../assets/image/img/invest3.png" alt="">
                                   <div class="invest-text">
                                        培训内容：产品操作；用户、合作商户发展；钉 钉、CRM、渠道管理制度等 <br/>培训方式：线上培训第月不少于2次，线下培训按 区域上门培训扶持 <br/>培训考核：每次的培训进行考核，通不过的进行重 新学习补考 <br/>团队组建：人员建构、薪资架构、招聘方向、岗位 职责 <br/>过程管理：管理工具的开通分配，培训，业务过程 数据制定及落实 <br/>业务进阶：加盟之日起，20周的升级打怪 <br/>沟通机制：加盟商微信总群、三方服务群、钉钉、 QQ、电话
                                   </div>
                              </div>
                              <div class='invest-relative bg3'>
                                   <img src="../assets/image/img/invest2.png" alt="">
                                   <div class="invest-text">
                                        全国招商：招商技巧培训、新人培训、业务开发方 案、专业谈判技巧 <br/>市场开展：企事业单位合作、资源赞助技艺、场地 合作技巧<br/> 会员中心：客户成交技艺、客户跟单方式、多元化 产品成交案例 <br/>广告投放：搜索引擎投放、自媒体平台投放、线下 联盟商家广告投放 <br/>大会曝光：世界互联网大会、中国互联网大会、自 媒体大会等 <br/>电视曝光：与当地最有影响的电视台联合举办大型 全国相亲类婚恋节目 <br/>渠道曝光：每月搜恋总部举行全国加盟商大会，由 公司出面进行大会营销
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <!-- 四楼 -->
               <div class='invest-dimension'>
                    <div class="container">
                         <h1 class='invest-title'>两大维度</h1>
                         <div class='invest-dimension-box'>
                              <img src="../assets/image/img/mechanism.png" class='lt dimension-img'>
                              <div class='invest-dimension-txt rt'>
                                   <h1>加盟费涨价机制&nbsp;数据支撑</h1>
                                   <p>1.总部依托全国加盟商数量，全国媒婆线下实体店加盟数量，app注册用户数三大维度对加盟商加盟费用做适当的下调</p>
                                   <p>2.全国加盟数量上升10%，全民媒婆用户注册量上升40%，全国线下实体店开设数量上升30%，全国运营中心加盟费上升20%</p>
                              </div>
                         </div>
                    </div>
               </div>
               <!-- 五楼 -->
               <div class='invest-profit'>
                    <div class='container'>
                         <h1 class='invest-title'>盈利方式</h1>
                         <img src="../assets/image/img/yingli.png" class='profit-img'>
                    </div>
               </div>
               <!-- 六楼 -->
               <div class='invest-league'>
                    <div class='container'>
                         <h1 class='invest-title'>立即加盟</h1>
                         <div class='league-box'>
                              <input type="text" placeholder="请输入姓名" maxlength="6" @blur="checkBlur('username',username)" v-model="username">
                              <input type="text" placeholder="请输入电话号码(必填)" maxlength="11" @blur="checkBlur('phone',phone)" v-model="phone">
                              <p>提交信息后我们会尽快联系您,电话咨询:400-6313-520</p>
                              <div class='btn-box'>
                               <span class='lt' @click='fromInvest()'>提交信息</span>
                               <span class='rt' @click='skips()'>加盟商查询</span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <alert ref='child'></alert>
     </div>
</template>
<style scoped>
@import "../assets/css/investment";
@import "../assets/css/hover";
</style>
<script>
import topNav from "./temp/topNav";
import contact from "./temp/contact";
import alert from "./temp/alert";
import { checkPhone, checkName } from "../assets/js/fn";
export default {
    name: "investment",
    data() {
        return {
            type: 1,
            username:'',
            phone:'',
            isInvest:false,
            isName:false,
            isPhone:false
        };
    },
    methods: {
        scollBottm(){
            document.documentElement.scrollTop=document.body.clientHeight;
        },
        checkBlur(...arg){
             if (arg[0] == "username") {
                checkName(arg[1])?this.isName=true:this.isName=false;
            }else{
                checkPhone(arg[1])?this.isPhone=true:this.isPhone=false;
            }
            this.isName&&this.isPhone?this.isInvest=true:this.isInvest=false
        },
      async  fromInvest(){
            if(this.isInvest){
                let data={
                    contact:this.username,
                    phone:this.phone
                }
                let res=await this.$htp.post(data,this.$api.joinApply);
                if(res.data.isSuccess==0){
                    this.$refs.child.showAlert(res.message)
                }else{
                    this.$refs.child.showAlert(res.message)
                }
            }else{
                this.$refs.child.showAlert('请填写您的信息')
            }
        },
        skips(){
            this.$router.push('search')
        }
    },
    components: { topNav, contact,alert }
};
</script>


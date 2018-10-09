<template>
    <div v-wechat-title='$route.meta.title'>
        <topNav :type='type'></topNav>
        <contact></contact>
        <div class='view'>
            <div class='about-banner'></div>
            <div class='about-main'>
                <div class='container'>
                    <div class='about-box'>
                        <div class="about-nav">
                            <ul>
                                <li v-for='(item,index) in navList' :class='{"active":index===navType}' @click='skip(index)'>{{item}}</li>
                            </ul>
                        </div>
                        <div class='about-container' v-if='navType==0'>
                            <img src="../assets/image/img/aboutimg.png" class='about-img'>
                            <h3 class="about-title">搜恋网——基于共享社交理念打造的单身交友平台</h3>
                            <div class='about-txt'  v-html='company'>
                            </div>
                        </div>
                        <div class='agreement-container' v-else-if="navType==1">
                            <h3 class="about-title">陕西搜恋网络科技有限公司</h3>
                            <div class='agreement-text' v-html='agreement'></div>
                        </div>
                        <div class='server-container' v-else-if="navType==2">
                            <h3 class="about-title">陕西搜恋网络科技有限公司</h3>
                            <div class='about-txt' v-html='server'>
                                
                            </div>
                        </div>
                        <div class='address-container' v-else>
                            <maps></maps>
                            <h5 class='server-title'>陕西搜恋网络科技有限公司</h5>
                            <div class='address'>
                                <p>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编:710042</p>
                                <p>客服专线:400-6313-520</p>
                                <p>企业邮箱:sxslove@qinyikou.cc</p>
                                <p>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:中国.西安玉祥门蔚蓝国际创业空间4F</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import "../assets/css/about";
</style>
<script>
import topNav from "./temp/topNav";
import contact from "./temp/contact";
import maps from "./temp/maps";
export default {
    name: "about",
    data() {
        return {
            type: 0,
            navType: 0,
            navList: ["公司简介", "用户协议", "服务条款", "联系我们"],
            company: "",
            server: "",
            agreement: ""
        };
    },
    methods: {
        skip(index) {
            this.navType = index;
        },
        async getServer() {
            let data = {};
            let res = await this.$htp.post(data, this.$api.getPCConfig);
            if (res.code == 200) {
                this.company = res.data.company_profile;
                this.server = res.data.terms_service;
                this.agreement = res.data.user_agreement;
            }
        }
    },
    mounted() {
        this.getServer();
        if (this.$route.query.type != undefined) {
            this.navType = this.$route.query.type;
        } else {
            return;
        }
    },
    components: { topNav, contact, maps }
};
</script>

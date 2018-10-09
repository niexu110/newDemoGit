<template>
    <div v-wechat-title='$route.meta.title'>
        <topNav :type='type'></topNav>
        <contact></contact>
        <div class='view'>
            <div class='container'>
                <div class='search-box'>
                    <div class='city-box' v-if='showCity'>
                        <p class='city-title'>市区选择
                            <span class='rt' @click='close()'>×</span>
                        </p>
                        <div class='city-item-box'>
                            <p class='province'>{{province}}</p>
                            <ul class='city-item-ul'>
                                <li v-for="(item,index) in city" :key='index' :class="{'active':classLi===index}" @click='citySelect(item,index)'>{{item.name}}</li>
                            </ul>
                            <ul class='city-item-ul' style='margin-top:45px; border:none;'>
                                <li v-for="(item,index) in county" :key='index' :class="{'active':classLi2===index}" @click='countySelect(item,index)'>{{item.name}}</li>
                            </ul>
                            <div class='price'>加盟费:
                                <span>{{JoinPrice}}</span>元</div>
                        </div>
                    </div>
                    <div class='search-title'>
                        <div class='title-box'>
                            <select class='selects lt' v-model="code" @change="look()">
                                <option value="0">请选择省份</option>
                                <option v-for="item in provs" :value="item.code" :key="item.code">{{item.name}}</option>
                            </select>
                            <span class='search-btn rt' @click='inquiry()'>查询</span>
                        </div>
                    </div>
                    <div id="map" class='map-box'>
                    </div>
                    <div class='search-form'>
                        <div class='form-box'>
                            <h3>立即加盟</h3>
                            <input type="text" placeholder="请输入姓名" maxlength="6" @blur="checkBlur('username',username)" v-model="username">
                            <input type="text" placeholder="请输入电话号码(必填)" maxlength="11" @blur="checkBlur('phone',phone)" v-model="phone">
                            <p>提交信息后我们会尽快联系您,电话咨询:400-6313-520</p>
                            <div class='btn' @click='fromInvest()'>提交申请</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <alert ref='child'></alert>
    </div>
</template>
<style scoped>
@import "../assets/css/search";
</style>
<script>
import topNav from "./temp/topNav";
import contact from "./temp/contact";
import map from "../assets/js/map";
import china from "../../static/china";
import { citylist,checkPhone, checkName } from "../assets/js/fn";
import alert from "./temp/alert";
export default {
    name: "search",
    data() {
        return {
            type: 1,
            showCity: false,
            provs: [],
            code: 0,
            JoinPrice: 0,
            province: "",
            city: [],
            county:[],
            classLi: undefined,
            classLi2: undefined,
            isInquiry: true,
            username: "",
            phone: "",
            isInvest: false,
            isName: false,
            isPhone: false
        };
    },
    methods: {
        drawChinaMap() {
            var myChart = this.$echarts.init(document.getElementById("map"));
            myChart.setOption(map);
        },
        look() {
            this.inquiry();
            this.classLi=undefined;
            this.classLi2=undefined;
            this.JoinPrice=0;
            this.county=[]
            this.city=[]
            this.provs.forEach(key => {
                if (this.code == key.code) {
                    this.province = key.name;
                }
            });
            this.isInquiry = true;
        },
        citySelect(item, index) {
            this.classLi2=undefined;
            this.classLi = index;
            this.JoinPrice = item.money;
            this.county=item.district
        },
        countySelect(item,index) {
            this.classLi2 = index;
            this.JoinPrice = item.money;
        },
        close() {
            this.showCity = false;
        },
        async inquiry() {
            if (this.code != 0 && this.code != "900000") {
                this.showCity = true;
                if (this.isInquiry) {
                    this.isInquiry = false;
                    let data={
                        province:this.code
                    };
                    let res=await this.$htp.post(data,this.$api.joinSearch);
                    this.city=res.data.city
                } else {
                    return;
                }
            } else {
               this.$refs.child.showAlert('选择需要查询的省份')
            }
        },
        checkBlur(...arg){
             if (arg[0] == "username") {
                checkName(arg[1])?this.isName=true:this.isName=false;
            }else{
                checkPhone(arg[1])?this.isPhone=true:this.isPhone=false;
            }
            this.isName&&this.isPhone?this.isInvest=true:this.isInvest=false
        },
        // 招商信息
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
      }
    },
    mounted() {
        this.drawChinaMap();
        this.provs = citylist().provinces;
    },
    components: { topNav, contact,alert }
};
</script>


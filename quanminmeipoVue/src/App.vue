<template>
  <div id="app">
    <router-view/>
    <router-view name='bottom' class='footer' />
  </div>
</template>

<script>
import {
    format,
    showEl,
    setLoc,
    citySort,
    citylist,
    seeCity
} from "./assets/js/fn.js";
let allList = [];
export default {
    name: "App",
    data() {
        return {
            isData: true,
        };
    },
    methods: {
        // 获取后台数据
        async selectData() {
            if (this.isData) {
                let data = {};
                let res = await this.$htp.post(data, this.$api.personal);
                if (res.code == 200) {
                    this.isData = false;
                    allList = res.data;
                    allList.car = ["有车", "无车"];
                    allList.height = [];
                    allList.weight = [];
                    for (let i = 120; i < 221; i++) {
                        allList.height.push(i);
                    }
                    for (let i = 35; i < 90; i++) {
                        allList.weight.push(i);
                    }
                    let porv = citylist();
                    allList.province = porv.province;
                    allList.provinceCode = porv.proCode;
                    allList.cityCode = porv.cityCode;
                    allList.city = porv.city;
                    setLoc("allList", allList);
                } else {
                    this.isData = true;
                }
            }
        }
    },     
    created: function() {
        this.selectData();
        // if(this.$store.store.state.userInfo==0){
        //     this.$router.push('/login')
        // }else{
        //     this.$router.push('/index')
        // }
    }
};
</script>

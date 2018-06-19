<template>
    <div v-wechat-title='this.$route.query.nickName'>
        <div class='card-header'>
            <span @click='goBack()'></span>
            <em>{{userMsg.nickname}}</em>
            <div class='starts'>
                <img src="../../assets/image/icon/hfenxiang.png" @click='share()'>
                <b @click='report()'>···</b>
            </div>
        </div>
        <div class='view'>
            <div class='card-top'>
                <img :src="userMsg.img">
                <div class='user-box'>
                    <div class='user-nick'>
                        <span class='nick'>{{userMsg.nickname}}</span>
                        <span :class='idcard==0?"attestation":"attestations"'>实名认证</span>
                    </div>
                    <p class='user-msg'>ID:{{userMsg.uid}}&nbsp;&nbsp;{{constellation}}</p>
                    <p class='user-date'>最后活跃时间:{{time}}</p>
                </div>
            </div>
            <!-- 相册 -->
            <div class='card-album' v-if='isAlbum'>
                <h1 class='card-title'>TA的相册({{albumNum}})</h1>
                <div class='card-album-img'>
                    <div>
                        <img v-for="i in albumList" :src="i.image" alt="">
                    </div>
                    <span class='right-jt'></span>
                </div>
            </div>
            <div class='card-mate' v-if='isBasic'>
                <h1 class='card-title'>基本资料</h1>
                <div class='card-mate-content'>
                    <span v-for="k in basicList" :class='k.type==1?"span":"span2"' @click='select(k)'>{{k.txt}}</span>

                </div>
            </div>
            <div class='card-mate' v-if='isOther'>
                <h1 class='card-title'>其他资料</h1>
                <div class='card-mate-content'>
                    <span v-for="k in otherLsit" :class='k.type==1?"span":"span2"' @click='select(k)'>{{k.txt}}</span>
                </div>
            </div>
            <div class='card-mate' v-if='isMate'>
                <h1 class='card-title'>择偶条件</h1>
                <div class='card-mate-content'>
                    <span v-for="k in mateList" :class='k.type==1?"span":"span2"' @click='select(k)'>{{k.txt}}</span>
                </div>
            </div>
            <div class='card-proclaim'>
                <h1 class='card-title'>爱情诺曼底</h1>
                <p>{{declaration}}</p>
            </div>
            <!-- mp detail -->
            <div class='card-depict'>
                <h1 class='card-title'>媒婆描述</h1>
                <div class='card-depict-content'>
                    <div class='card-depict-box'>
                        <img :src="mpDteail.image" class='lt'>
                        <div class='lt card-depict-user'>
                            <p>{{mpDteail.nickname}}</p>
                            <p>{{mpDteail.introduction}}</p>
                        </div>
                        <h2 class='lt'>
                            {{mpDteail.describe}}
                        </h2>
                    </div>
                </div>
            </div>
            <!-- mp 详情 -->
            <div class='macther-box'>
                <h1 class='macther-title'>
                    <em class='lt'>TA的单身团</em>
                    <span class='rt' @click='instead()'>加入单身团</span>
                </h1>
                <div class='machter-stauts'>
                    <div class='machter-grade'>{{levelname}}</div>
                    <div>
                        <h2>{{group_num}}</h2>
                        <p>单身团</p>
                    </div>
                    <div>
                        <h2>{{qycount_num}}</h2>
                        <p>牵缘成功</p>
                    </div>
                    <div>
                        <h2>{{follow_num}}</h2>
                        <p>粉丝</p>
                    </div>
                </div>
                <p class='line'></p>
                <div class='introduce-main'>
                    <div class='introduce-main-sex'>
                        <div class='lt sex-line' @click='introduce(0)' :class="isWomen?'actives':'active'">
                            <span>女神{{dsgroup.womencount}}</span>
                        </div>
                        <div class='lt' @click='introduce(1)' :class="isMen?'actives':'active'">
                            <span>男神{{dsgroup.mancount}}</span>
                        </div>
                    </div>
                    <div class='introduce-box'>
                        <div class='introduce-main-item' v-if='count==0'>
                            <img src="../../assets/image/icon/typeImg.png">
                            <p>暂无人员加入单身团,团长要加油哦！</p>
                        </div>
                        <div class='introduce-main-item-box' v-else>
                            <ul>
                                <li v-for="item in dsgroupList" @click='sikp(item)'>
                                    <div>
                                        <img :src="item.image" alt="">
                                        <p>
                                            <span>{{item.city}}</span>
                                        </p>
                                    </div>
                                    <h1>{{item.nickname}}</h1>
                                    <h2>{{item.age}}岁·{{item.height}}cm·{{item.income}}</h2>
                                </li>
                            </ul>
                            <p class='clear'></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pop ref='child'></pop>
        <popSelect ref='childs' v-on:childSumbit='gain()'></popSelect>
        <div id='popup'></div>
    </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/find/card";
</style>
<script>
import pop from "../common/pop";
import popSelect from "../common/popSelect";
import {
    format,
    showEl,
    citySort,
    citylist,
    seeCity
} from "../../assets/js/fn.js";
var allList = [];
export default {
    name: "card",
    data() {
        return {
            userMsg: {},
            idcard: 0,
            constellation: null,
            time: null,
            albumList: [],
            albumNum: 0,
            isAlbum: false, //是否显示相册
            declaration: "",
            mpDteail: {},
            basicList: [],
            isBasic: false, //基本资料
            otherLsit: [],
            isOther: false,
            hobbyList: [], //兴趣爱好
            isHobby: false,
            mateList: [], //择偶条件
            isMate: false,
            levelname: "",
            group_num: 0, //单身团员
            follow_num: 0, //粉丝
            qycount_num: 0, //牵缘成功
            isInstead: true,
            isWomen: true,
            isMen: false,
            dsgroup: {},
            dsgroupList: [],
            manList: [],
            womenList: [],
            count: 0,
            type: 2,
            manType: 1,
            page: 0,
            manPage: 0,
            womenPage: 0
        };
    },
    methods: {
        // 获取后台数据
        async selectData() {
            let data = {
                cmd: this.$api.personal
            };
            let res = await this.$htp.post(data);
            if (res.code == 200) {
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
            }
        },
        // 获取当前人单身团信息
        async gains() {
            this.type == 2
                ? (this.page = this.womenPage)
                : (this.page = this.manPage);
            let data = {
                cmd: this.$api.myRegiment,
                uid: this.$store.state.userInfo.uid,
                type: this.type,
                page: this.page,
                tg_uid: this.$route.query.uid
            };
            let res = await this.$htp.post(data);
            if (res.code == 200) {
                // console.log(res.data);
                this.dsgroup = res.data;
                if (this.type == 2) {
                    this.count = res.data.womencount;
                    if (res.data.women.length != 0) {
                        this.groupCity(res.data.women);
                    }
                } else {
                    this.count = res.data.mancount;
                    if (res.data.man.length != 0) {
                        this.groupCity(res.data.man);
                    }
                }
            }
        },
        // 单身团内容城市转换
        groupCity(list) {
            if (this.type == 2) {
                list.forEach(key => {
                    key.city = seeCity(key.city);
                    this.womenList.push(key);
                });
                this.dsgroupList = this.womenList;
            } else {
                list.forEach(key => {
                    key.city = seeCity(key.city);
                    this.manList.push(key);
                });
            }
        },
        // 获取当前人数据
        async gain() {
            let data = {
                cmd: this.$api.card,
                tg_uid: this.$route.query.uid,
                uid: this.$store.state.userInfo.uid,
                type: 3
            };
            let res = await this.$htp.post(data);
            // console.log(res);
            let userInfos = this.$store.state.userInfo;
            if (res.code == 200) {
                this.userMsg.img = res.data.image;
                this.userMsg.nickname = res.data.nickname;
                this.userMsg.uid = res.data.uid;
                this.$route.meta.title = res.data.nickname;
                this.constellation = res.data.constellation;
                for (let i = 0; i < res.data.album.length; i++) {
                    if (i <= 2) {
                        this.albumList.push(res.data.album[i]);
                    }
                }
                this.albumNum = res.data.albumcount;
                this.declaration = res.data.declaration;
                this.mpDteail = res.data.mpdetail;
                this.levelname = res.data.levelname;
                this.group_num = res.data.qycount;
                this.follow_num = res.data.follownum;
                this.qycount_num = res.data.group_num;
                res.data.albumcount == 0
                    ? (this.isAlbum = false)
                    : (this.isAlbum = true);
                this.time = format(res.data.time, 1);
                res.data.idcard == "" ? (this.idcard = 0) : (this.idcard = 1);
                // 基本资料
                this.basicList = this.pushList(res.data.basic, userInfos);
                this.basicList.length == 0
                    ? (this.isBasic = false)
                    : (this.isBasic = true);
                this.otherLsit = this.pushOther(res.data.other, userInfos);
                this.otherLsit.length == 0
                    ? (this.isOther = false)
                    : (this.isOther = true);
                this.mateList = this.pushMate(res.data.criteria, userInfos);
                this.mateList.length == 0
                    ? (this.isMate = false)
                    : (this.isMate = true);
            } else {
                showEl("网络异常", 3000);
            }
        },
        //加入他的单身团
        async instead() {
            let data = {
                cmd: this.$api.insteadMP,
                tg_uid: this.$route.query.uid,
                uid: this.$store.state.userInfo.uid
            };
            if (this.isInstead) {
                this.isInstead = false;
                let res = await this.$htp.post(data);
                showEl(res.message, 2000);
            }
        },
        // 单身团切换
        introduce(type) {
            if (type == 0) {
                this.isWomen = true;
                this.isMen = false;
                this.page = this.womenPage;
                this.type = 2;
                this.dsgroupList = this.womenList;
            } else {
                this.isWomen = false;
                this.isMen = true;
                this.page = this.manPage;
                this.type = 1;
                if (this.manType == 1) {
                    this.manType = 2;
                    this.gains();
                }
                this.dsgroupList = this.manList;
            }
        },
        //单身团调转
        sikp(item) {
            this.$route.meta.title = item.nickname;
            this.$route.query.uid = item.uid;
            this.isWomen = true;
            this.isMen = false;
            this.page =0;
            this.womenList =[];
            this.manList =[];
            this.type = 2;
            this.gain();
            this.gains();
        },
        // 返回
        goBack() {
            this.$router.back(-1);
        },
        //  点击分享
        share() {
            this.$refs.child.showImg(true);
        },
        //  点击举报
        report() {
            this.$refs.child.vods(true,this.userMsg.uid);
        },
        select(item) {
            if (item.type == 1) {
                this.$refs.childs.selectSort(item, allList);
            }
        },
        pushList(obj, user) {
            let list = [];
            if (obj.age != 0) {
                if (user.age == 0) {
                    list.push({
                        name: "age",
                        type: 1,
                        txt: "查看年龄",
                        rank: 3, //联动级别 1,2,3
                        index: 1 // 1还是传值 2为索引
                    });
                } else {
                    list.push({
                        name: "age",
                        type: 2,
                        txt: obj.age + "岁",
                        rank: 3,
                        index: 1
                    });
                }
            }
            if (obj.edu != null) {
                if (user.edu == "") {
                    list.push({
                        name: "educational",
                        type: 1,
                        txt: "查看学历",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "educational",
                        type: 2,
                        txt: obj.edu,
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.income != null) {
                if (user.income == "") {
                    list.push({
                        name: "income",
                        type: 1,
                        txt: "查看收入",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "income",
                        type: 2,
                        txt: obj.income,
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.industry != "") {
                if (user.industry == "") {
                    list.push({
                        name: "industry",
                        name2: "job",
                        type: 1,
                        txt: "查看职业",
                        rank: 2,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "industry",
                        name2: "job",
                        type: 2,
                        txt: obj.industry,
                        rank: 2,
                        index: 1
                    });
                }
            }
            if (obj.job != "") {
                if (user.job == "") {
                    list.push({
                        name: "industry",
                        name2: "job",
                        type: 1,
                        txt: "查看工作",
                        rank: 2,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "industry",
                        name2: "job",
                        type: 2,
                        txt: obj.job,
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.height != 0) {
                if (user.height == 0) {
                    list.push({
                        name: "height",
                        type: 1,
                        txt: "查看身高",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "height",
                        type: 2,
                        txt: obj.height + "cm",
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.weight != 0) {
                if (user.weight == 0) {
                    list.push({
                        name: "weight",
                        type: 1,
                        txt: "查看体重",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "weight",
                        type: 2,
                        txt: obj.weight + "kg",
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.city != "") {
                if (user.city == "") {
                    list.push({
                        name: "province",
                        name2: "city",
                        type: 1,
                        txt: "查看地址",
                        rank: 2,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "province",
                        name2: "city",
                        type: 2,
                        txt: citySort(obj.province, obj.city).city,
                        rank: 2,
                        index: 1
                    });
                }
            }
            return list;
        },
        pushOther(obj, user) {
            let list = [];
            if (obj.belief != null) {
                if (user.belief == -1) {
                    list.push({
                        name: "belief",
                        type: 1,
                        txt: "查看信仰",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "belief",
                        type: 2,
                        txt: allList.belief[obj.belief],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.car != null) {
                if (user.car == -1) {
                    list.push({
                        name: "car",
                        type: 1,
                        txt: "查看有车",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "car",
                        type: 2,
                        txt: allList.car[obj.car],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.diet != null) {
                if (user.diet == -1) {
                    list.push({
                        name: "diet",
                        type: 1,
                        txt: "饮食习惯",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "diet",
                        type: 2,
                        txt: allList.diet[obj.diet],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.drink != null) {
                if (user.drink == -1) {
                    list.push({
                        name: "drink",
                        type: 1,
                        txt: "是否喝酒",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "drink",
                        type: 2,
                        txt: allList.drink[obj.drink],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.familybg != null) {
                if (user.familybg == -1) {
                    list.push({
                        name: "familybg",
                        type: 1,
                        txt: "家庭背景",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "familybg",
                        type: 2,
                        txt: allList.familybg[obj.familybg],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.house != null) {
                if (user.house == -1) {
                    list.push({
                        name: "house",
                        type: 1,
                        txt: "是否有房",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "house",
                        type: 2,
                        txt: allList.house[obj.house],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.nation != "") {
                if (user.nation == "") {
                    list.push({
                        name: "nation",
                        type: 1,
                        txt: "查看民族",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "nation",
                        type: 2,
                        txt: obj.nation,
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.hometown != "") {
                if (user.hometown == "") {
                    list.push({
                        name: "province",
                        type: 1,
                        txt: "查看家乡",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "province",
                        type: 2,
                        txt: obj.hometown,
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.pet != null) {
                if (user.pet == -1) {
                    list.push({
                        name: "pet",
                        type: 1,
                        txt: "宠物",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "pet",
                        type: 2,
                        txt: allList.pet[obj.pet],
                        rank: 1,
                        index: 2
                    });
                }
            }
            if (obj.smoking != null) {
                if (user.smoking == -1) {
                    list.push({
                        name: "smoking",
                        type: 1,
                        txt: "是否吸烟",
                        rank: 1,
                        index: 2
                    });
                } else {
                    list.push({
                        name: "smoking",
                        type: 2,
                        txt: allList.smoking[obj.smoking],
                        rank: 1,
                        index: 2
                    });
                }
            }
            return list;
        },
        pushMate(obj, user) {
            let list = [];
            if (obj.rq_age != "") {
                if (user.rq_age == "") {
                    list.push({
                        name: "rq_age",
                        type: 1,
                        txt: "查看年龄段",
                        rank: 4,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "rq_age",
                        type: 2,
                        txt: obj.rq_age,
                        rank: 4,
                        index: 1
                    });
                }
            }
            if (obj.rq_edu != "") {
                if (user.rq_edu == "") {
                    list.push({
                        name: "rq_educational",
                        type: 1,
                        txt: "查看学历",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "rq_educational",
                        type: 2,
                        txt: obj.rq_edu,
                        rank: 1,
                        index: 1
                    });
                }
            }
            if (obj.rq_height != "") {
                if (user.rq_height == "") {
                    list.push({
                        name: "rq_height",
                        type: 1,
                        txt: "查看身高",
                        rank: 4,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "rq_height",
                        type: 2,
                        txt: obj.rq_height,
                        rank: 4,
                        index: 1
                    });
                }
            }
            if (obj.rq_income != "") {
                if (user.rq_income == "") {
                    list.push({
                        name: "rq_income",
                        type: 1,
                        txt: "查看月收入",
                        rank: 1,
                        index: 1
                    });
                } else {
                    list.push({
                        name: "rq_income",
                        type: 2,
                        txt: obj.rq_income,
                        rank: 1,
                        index: 1
                    });
                }
            }
            return list;
        }
    },
    created: function() {
        this.gain();
        this.gains();
        this.selectData();
    },
    components: { pop, popSelect }
};
</script>


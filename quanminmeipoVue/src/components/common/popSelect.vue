<template>
    <div class='popSelect' :class='className'>
        <div class='slider-box'>
            <div class='sliderTxt'>
                <p>基于公平原则</p>
                <p>完善自己的相应信息后</p>
                <p>才可以查看对方的相应信息</p>
            </div>
            <div class='slider'>
                <ul class='oneUl' v-if="oneShow">
                    <li v-for="(item,index) in oneList" @click="oneAdd(index,item)" :class="{'active':classLi===index}">{{item}}</li>
                </ul>
                <ul class='twoUl' v-if="twoShow">
                    <li v-for="(item,index) in twoList" @click="twoAdd(index,item)" :class="{'active':classLi===index}">{{item}}</li>
                </ul>
                <ul class='twoUl' v-if="twoShow">
                    <li v-for="(item,index) in twoLists" @click="twoAdd2(index,item)" :class="{'active':classLi2===index}">{{item}}</li>
                </ul>
                <ul class='twoUl' v-if="rqShow">
                    <li v-for="(item,index) in rq_list" @click="rqAdd(index,item)" :class="{'active':classLi===index}">{{item}}</li>
                </ul>
                <ul class='twoUl' v-if="rqShow">
                    <li v-for="(item,index) in rq_list2" @click="rqAdd2(index,item)" :class="{'active':classLi2===index}">{{item}}</li>
                </ul>
                <ul class='threeUl' v-if="threeShow">
                    <li v-for="(item,index) in yearList" @click="threeAdd(index,item)" :class="{'active':classLi===index}">{{item}}年</li>
                </ul>
                <ul class='threeUl' v-if="threeShow">
                    <li v-for="(item,index) in mouthList" @click="threeAdd2(index,item)" :class="{'active':classLi2===index}">{{item}}月</li>
                </ul>
                <ul class='threeUl' v-if="threeShow">
                    <li v-for="(item,index) in dayList" @click="threeAdd3(index,item)" :class="{'active':classLi3===index}">{{item}}日</li>
                </ul>
            </div>
            <div class='option'>
                <span @click='close()'>取消</span>
                <span class='active' @click='submitSelect()'>确定</span>
            </div>
        </div>
    </div>
</template>
<script>
import { format, showEl } from "../../assets/js/fn.js";
import { mapState, mapActions } from "vuex";

export default {
    name: "popSelect",
    data() {
        return {
            className: "selectUp",
            oneShow: false,
            classLi: "",
            classLi2: "",
            classLi3: "",
            twoShow: false,
            threeShow: false,
            rqShow: false,
            isBtn: false, //是否可提交
            oneList: [],
            twoList: [],
            twoList2: [],
            twoLists: [],
            key: null,
            key2: null,
            val: null, //值
            val2: null, //值
            indexs: 1, //索引
            yearList: [],
            mouthList: [],
            dayList: [],
            years: { year: null, mouth: null, day: null },
            rq_list: [],
            rq_list2: [],
            minRq: "",
            maxRq: "",
            sucData: {}
        };
    },
    methods: {
        // 1级选择
        oneAdd(index, item) {
            this.classLi = index;
            this.isBtn = true;
            if (this.indexs == 1) {
                this.val = item;
                this.key == "educational"
                    ? (this.key = "edu")
                    : (this.key = this.key);
                this.key == "rq_educational"
                    ? (this.key = "rq_edu")
                    : (this.key = this.key);
                this.key == "province"
                    ? (this.key = "hometown")
                    : (this.key = this.key);
                this.sucData = {
                    [this.key]: item,
                    uid: this.$store.state.userInfo.uid,
                    cmd: this.$api.information
                };
            } else {
                this.val = index;
                this.sucData = {
                    [this.key]: index,
                    uid: this.$store.state.userInfo.uid,
                    cmd: this.$api.information
                };
            }
        },
        // 2级联动
        twoAdd(index, item) {
            this.classLi = index;
            this.classLi2 = "";
            this.twoLists = this.twoList2[index];
            this.indexs == 1 ? (this.val = item) : (this.val = index);
        },
        twoAdd2(index, item) {
            this.classLi2 = index;
            if (this.val != null || this.val != "") {
                this.isBtn = true;
                if (this.indexs == 1) {
                    this.val2 = item;
                    this.sucData = {
                        [this.key]: this.val,
                        [this.key2]: item,
                        uid: this.$store.state.userInfo.uid,
                        cmd: this.$api.information
                    };
                } else {
                    this.val2 = index;
                    this.sucData = {
                        [this.key]: this.val,
                        [this.key2]: index,
                        uid: this.$store.state.userInfo.uid,
                        cmd: this.$api.information
                    };
                }
            }
        },
        // 两级rq选择
        rqAdd(index, item) {
            this.classLi = index;
            this.classLi2 = "";
            this.minRq = item;
            this.val = item;
            this.rq_list2 = [];
            this.sortRq(this.minRq + 1, this.maxRq);
        },
        rqAdd2(index, item) {
            this.classLi2 = index;
            if (this.val != null || this.val != "") {
                this.isBtn = true;
                this.val = this.val + "-" + item;
                this.sucData = {
                    [this.key]: this.val,
                    uid: this.$store.state.userInfo.uid,
                    cmd: this.$api.information
                };
            } else {
                this.isBtn = false;
            }
        },
        // 三级联动
        threeAdd(index, item) {
            this.classLi = index;
            this.classLi2 = "";
            this.classLi3 = "";
            this.years.year = item;
        },
        threeAdd2(index, item) {
            this.dayList = [];
            this.classLi2 = index;
            this.classLi3 = "";
            this.years.mouth = item;
            this.day(item);
        },
        threeAdd3(index, item) {
            if (this.years.year == null || this.years.mouth == null) {
                this.isBtn = false;
                showEl("选择年月", 2000);
            } else {
                this.isBtn = true;
                this.classLi3 = index;
                let time =
                    this.years.year + "/" + this.years.mouth + "/" + item;
                let t = Date.parse(new Date(time)) / 1000;
                this.key = "birthday";
                this.key2 = "age";
                (this.val = t),
                    (this.val2 = new Date().getFullYear() - this.years.year);
                this.sucData = {
                    birthday: t,
                    uid: this.$store.state.userInfo.uid,
                    cmd: this.$api.information
                };
            }
        },
        // 父组件传过来的类型选择
        selectSort(obj, list) {
            this.className = "selectDown";
            this.indexs = obj.index;
            if (obj.rank === 1) {
                this.oneShow = true;
                this.twoShow = false;
                this.threeShow = false;
                this.rqShow = false;
                this.oneList = list[obj.name];
                this.key = obj.name;
            } else if (obj.rank === 2) {
                this.oneShow = false;
                this.twoShow = true;
                this.threeShow = false;
                this.rqShow = false;
                this.key = obj.name;
                this.key2 = obj.name2;
                this.twoList = list[obj.name];
                this.twoList2 = list[obj.name2];
                this.twoLists = this.twoList2[0];
            } else if (obj.rank === 3) {
                this.oneShow = false;
                this.twoShow = false;
                this.threeShow = true;
                this.rqShow = false;
                let time = new Date().getFullYear();
                let lastYear = time - 18,
                    endYear = time - 70;
                for (let i = endYear; i < lastYear + 1; i++) {
                    this.yearList.push(i);
                }
                for (let i = 1; i < 13; i++) {
                    this.mouthList.push(i);
                }
                this.day(1);
            } else {
                this.oneShow = false;
                this.twoShow = false;
                this.threeShow = false;
                this.rqShow = true;
                this.key = obj.name;
                if (obj.name == "rq_age") {
                    this.minRq = 18;
                    this.maxRq = 70;
                    for (let i = this.minRq; i < this.maxRq; i++) {
                        this.rq_list.push(i);
                    }
                    this.sortRq(19, this.maxRq);
                } else {
                    this.minRq = 120;
                    this.maxRq = 221;
                    for (let i = this.minRq; i < this.maxRq; i++) {
                        this.rq_list.push(i);
                    }
                    this.sortRq(121, this.maxRq);
                }
            }
        },
        sortRq(min, max) {
            for (let i = min; i < max; i++) {
                this.rq_list2.push(i);
            }
        },
        day(num) {
            if (num == 2) {
                for (var i = 1; i < 29; i++) {
                    this.dayList.push(i);
                }
            } else if (num == 4 || num == 6 || num == 9 || num == 11) {
                for (var i = 1; i < 31; i++) {
                    this.dayList.push(i);
                }
            } else {
                for (var i = 1; i < 32; i++) {
                    this.dayList.push(i);
                }
            }
        },
        close() {
            this.className = "selectUp";
            this.isBtn = false;
            this.classLi = "";
            this.classLi2 = "";
            this.classLi3 = "";
        },
        ...mapActions(["_setInformation"]),
        async submitSelect() {
            if (this.isBtn) {
                this.isBtn = false;
                let res = await this.$htp.post(this.sucData);
                if (res.code == 200) {
                    showEl("修改成功", 2000);
                    this._setInformation({
                        data: {
                            name: this.key,
                            val: this.val,
                            name2: this.key2,
                            value: this.val2
                        }
                    });
                    this.$emit("childSumbit");
                    this.className = "selectUp";
                    this.classLi = "";
                    this.classLi2 = "";
                    this.classLi3 = "";
                    console.log(this.$emit("childSumbit"));
                } else {
                    showEl("修改失败", 2000);
                }
            } else {
                showEl("请选择条件", 2000);
            }
        }
    },
    created: function() {
        console.log(this.$store.state.userInfo);
    }
};
</script>
<style scoped lang='less'>
.selectUp {
    top: -100%;
}
.selectDown {
    top: 0;
}
.popSelect {
    width: 7.5rem;
    height: 100%;
    position: fixed;
    left: 0;
    background: rgba(255, 255, 255, 0.6);
    z-index: 250;
    transition: all 0.3s linear;
    .slider-box {
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        width: 7.5rem;
        height: 7.8rem;
        .sliderTxt {
            background: #ff704f;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            height: 1.8rem;
            p {
                line-height: 0.5rem;
            }
        }
        .slider {
            width: 7.5rem;
            height: 5rem;
            overflow-y: auto;
            .oneUl {
                width: 7.5rem;
                height: auto;
                z-index: 200;
                .active {
                    background: rgb(255, 112, 75);
                }
                li {
                    width: 100%;
                    height: 1rem;
                    line-height: 1rem;
                    border-bottom: 1px solid #f2f2f2;
                    text-align: center;
                    font-size: 0.3rem;
                }
            }
            .twoUl {
                width: 3.75rem;
                height: 5rem;
                z-index: 200;
                float: left;
                overflow-y: auto;
                .active {
                    background: rgb(255, 112, 75);
                }
                li {
                    width: 100%;
                    height: 1rem;
                    line-height: 1rem;
                    border-bottom: 1px solid #f2f2f2;
                    text-align: center;
                    font-size: 0.3rem;
                }
            }
            .threeUl {
                width: 2.5rem;
                height: 5rem;
                z-index: 200;
                float: left;
                overflow-y: auto;
                .active {
                    background: rgb(255, 112, 75);
                }
                li {
                    width: 100%;
                    height: 1rem;
                    line-height: 1rem;
                    border-bottom: 1px solid #f2f2f2;
                    text-align: center;
                    font-size: 0.3rem;
                }
            }
        }
        .option {
            width: 7.5rem;
            height: 1rem;
            border-bottom: 1px solid #f2f2f2;
            z-index: 300;
            span {
                float: left;
                width: 3.75rem;
                height: 1rem;
                line-height: 1rem;
                font-size: 0.32rem;
                color: #666;
                text-align: center;
            }
            .active {
                color: #ff704f;
                border-left: 1px solid #f2f2f2;
            }
        }
    }
}
</style>



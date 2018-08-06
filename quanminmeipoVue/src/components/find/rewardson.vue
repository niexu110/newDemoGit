<template>
	<div>
		<loading :load='load'></loading>
		<div class='header'>
			<span @click='goback'></span>
			<em>{{title}}</em>
			<img @click="clipro" src="../../assets/image/find/d_problem.png">
		</div>
		<div class="d_total">
			<div class="d_box">
				<p class="d_mintitle">我的悬赏条件：</p>
				<div class="d_condition" @click="changetj">
					<div>
						<p class="d_conditionp ">1、
							<span>{{maddress}}</span>
						</p>
						<p class="d_conditionp ">2、
							<span>{{mage}}</span>
						</p>
						<p class="d_conditionp ">3、
							<span>{{mheight}}</span>
						</p>
						<p class="d_conditionp ">4、
							<span>{{minc}}</span>
						</p>
						<p class="d_conditionp ">5、
							<span>{{medu}}</span>
						</p>
					</div>
					<img src="../../assets/image/icon/right.png" />
					<p class="clear"></p>
				</div>
				<p class="d_mintitle">我想说的话：</p>
				<div style="position: relative;">
					<textarea class="d_mysay" v-model="yousay" :disabled="isdisabled" placeholder="我是一个性格开朗的人，喜欢…………(最少10个字)" minlength="10" maxlength="200"></textarea>
					<p class="d_num">
						<span>0</span>/200</p>
				</div>
				<div class="d_clickdui">
					<p>给用户发见面礼(选填，回复度高)</p>
					<div @click="cliduino">
						<img v-if="duino" src="../../assets/image/find/d_clickduino.png">
						<img v-else src="../../assets/image/find/d_clickduiok.png">
					</div>

				</div>
				<p class="d_doye">豆豆余额：
					<span>{{peasyue}}</span>
				</p>
				<p class="d_dots">您可以使用搜恋豆豆免费给用户发放见面礼，优先点击 悬赏信息的用户可随机领取到您发放的豆豆礼物</p>
				<div class="d_relezh" v-if="yudou">
					<div class="d_ffsl">
						<span>发放数量</span>
						<p v-for="(item,index) in arr1" @click="clickpeas(index)" :class="{'active':ind1 === index}">{{item}}</p>

					</div>
					<div class="d_mannum">
						<p>自定义数量</p>
						<input type="number" placeholder="自定义数量必须≥100" v-model="peas" />
					</div>
					<div class="d_ffnum">
						<span>发放人数</span>
						<p v-for="(item,index) in arr2" @click="clickpeanums(index)" :class="{'active':ind2 === index}">
							<span>{{item}}</span>人</p>
					</div>
					<div class="d_ppnum">
						<p>自定义数量</p>
						<input type="number" placeholder="自定义数量5~100" v-model="peas_num" />
					</div>
				</div>
			</div>
			<div class="d_bottom2" v-if="btnshow">
				<p class="d_btnRelease2" @click="releasere">发布悬赏</p>
			</div>
			<div class="d_gomodify" v-else>
				<span>悬赏正在发布中…………</span>
				<p class="d_btn1" style="margin: 0 .5rem 0 .3rem;" @click="changerew()">修改悬赏</p>
				<p class="d_btn2" @click="stoprew()">停止悬赏</p>
			</div>
		</div>
		<!-- 选择条件 -->
		<div class="d_pop" v-if="changpop">
			<img class="d_pleft" @click="pleft" src="../../assets/image/icon/left.png" />
			<p class="d_ptitle">您的择偶条件</p>
			<p style="font-size: .28rem;line-height: .3rem;color: #666666;margin:0 0 .3rem .6rem;">选择您的择偶条件</p>
			<div class="d_pminbox d_paddress" @click='add(2,"province")'>
				<span>地区</span>
				<p>{{province}}</p>
			</div>
			<div class="d_pminbox d_page" @click='add(2,"age")'>
				<span>年龄</span>
				<p>{{age}}</p>
			</div>
			<div class="d_pminbox d_pheight" @click='add(2,"height")'>
				<span>身高</span>
				<p>{{height}}</p>
			</div>
			<div class="d_pminbox d_pinc" @click='add(1,"rq_income")'>
				<span>月收入</span>
				<p>{{rq_income}}</p>
			</div>
			<div class="d_pminbox d_pedu" @click='add(1,"rq_educational")'>
				<span>学历</span>
				<p>{{rq_educational}}</p>
			</div>
			<p class="d_psave" @click="psave">保存</p>
		</div>
		<!-- 悬赏说明弹框 -->
		<div class="d_problemBox" v-if="problem">
			<span class="d_prtitle">悬赏说明</span>
			<p>1.全民媒婆的悬赏现为免费发布。</p>
			<p>2.请详细填写您的择偶条件以及您相对另一半说的话或自己的感言，当然越详细越好。</p>
			<p>3.您可以在发布悬赏的时候，使用“搜恋豆豆”给其他的用户发送见面礼包。这样您受关注和回复程度会大大提高哦！</p>
			<img class="d_xx" @click='close' src="../../assets/image/find/d_xx.png" />
		</div>
		<doubleListPop ref='child' v-on:childVal="childVal"></doubleListPop>
		<div id='popup'></div>
	</div>
</template>

<script>
import loading from "../common/loading";
import doubleListPop from "../common/doubleListPop";
import { showEl, citySort } from "../../assets/js/fn.js";

export default {
    name: "rewardson",
    data() {
        return {
            arr1: [100, 500, 1000, "自定义"],
            arr2: [5, 10, 20, "自定义"],
            title: "发布悬赏",
            num: null,
            load: true,
            list: [],
            xuanze: require("../../assets/image/find/d_clickduino.png"),
            problem: false,
            duino: true,
            yudou: false,
            changpop: false,
            province: "北京-北京",
            cityCode: "110100",
            provinceCode: "110000",
            age: "25-30岁",
            height: "165-173cm",
            rq_income: "4000元以上",
            rq_educational: "本科以上",
            obj: {},
            maddress: "所在地",
            mage: "年龄",
            mheight: "身高",
            minc: "收入",
            medu: "学历",
            yousay: "",
            type: 1,
            peas: 0, //发布豆豆
            thanks_price: 0, //答谢金
            peas_num: "", //人数
            btnshow: true,
            isreward: 1,
            isdisabled: false,
            ind1: "",
            ind2: "",
            r_id: "", //发布悬赏的id
            peasyue: 0 //豆豆余额
        };
    },
    methods: {
        add(num, mold) {
            if (num == 2) {
                this.obj = { text: mold };
                this.$refs.child.selectDset(this.obj);
            } else if (num == 1) {
                this.obj = { text: mold };
                this.$refs.child.selectdan(this.obj);
            }
        },
        goback() {
            this.$router.back(-1);
        },
        clipro() {
            this.problem = true;
        },
        close() {
            this.problem = false;
        },
        cliduino() {
            if (this.duino == true) {
                this.duino = false;
                this.yudou = true;
            } else if (this.duino == false) {
                this.duino = true;
                this.yudou = false;
            }
        },
        changetj() {
            if (this.isreward == 0) {
                this.changpop = true;
            }
        },
        pleft() {
            this.changpop = false;
        },
        //停止悬赏
        async stoprew() {
            let data = {
                r_id: this.r_id
            };
            let res = await this.$htp.post(data, this.$api.rewardStop);
            this.isdisabled = false;
            this.btnshow = true;
            this.isreward = 0;
        },
        //修改悬赏
        changerew() {
            this.isdisabled = false;
            this.btnshow = true;
            this.isreward = 0;
        },
        childVal(data) {
            if (data.province) {
                this.province = data.province;
                this.cityCode = data.cityCode;
                this.provinceCode = data.provinceCode;
            } else if (data.age) {
                this.age = data.age + "岁";
            } else if (data.height) {
                this.height = data.height + "cm";
            } else if (data.rq_income) {
                this.rq_income = data.rq_income;
            } else if (data.rq_educational) {
                this.rq_educational = data.rq_educational;
            }
        },
        //点击发放数量
        clickpeas(index) {
            this.ind1 = index;
            this.peas = this.arr1[index];
        },
        //点击发放人数
        clickpeanums(index) {
            this.ind2 = index;
            this.peas_num = this.arr2[index];
        },
        // 点击保存
        psave() {
            this.maddress = this.province;
            this.mage = this.age;
            this.mheight = this.height;
            this.minc = this.rq_income;
            this.medu = this.rq_educational;
            this.changpop = false;
        },
        //点击发布
        async releasere() {
            if (
                this.maddress == "所在地" ||
                this.mage == "年龄" ||
                this.mheight == "身高" ||
                this.minc == "收入" ||
                this.medu == "学历"
            ) {
                showEl("请完善您的悬赏条件", 1500);
            } else if (this.yousay.length < 10) {
                showEl("请输入您想说的话", 1500);
            } else if (this.peas > this.peasyue) {
                showEl("您的豆豆余额不足", 1500);
            } else if (this.peas < 100 && this.peas > 0) {
                showEl("自定义数量必须≥100", 1500);
            } else if (
                (this.peas_num < 5 && this.peas_num > 0) ||
                this.peas_num > 100
            ) {
                showEl("人数为5~100人", 1500);
            } else {
                let data = {
                    type: this.type,
                    rq_city: this.cityCode,
                    rq_province: this.provinceCode,
                    rq_income: this.rq_income,
                    rq_height: this.height,
                    rq_edu: this.rq_educational,
                    content: this.yousay,
                    rq_age: this.age,
                    peas_num: this.peas_num,
                    thanks_price: this.thanks_price,
                    peas: this.peas,
                    r_id: this.r_id
                };
                let res = await this.$htp.post(
                    data,
                    this.$api.rewardReleaseOrUpdate
                );
                this.$router.back(-1);
            }
        },
        async gain() {
            let data = {
                uid: this.$store.state.userInfo.uid
            };
            let res = await this.$htp.post(data, this.$api.getRewardDetail);
            if (res.code == 200) {
			  this.load=false;
                if (res.data.isreward == 0) {
                    this.isreward = 0;
                    this.btnshow = true;
                    this.isdisabled = false;
                } else if (res.data.isreward == 1) {
                    this.isreward = 1;
                    this.btnshow = false;
                    this.isdisabled = "disabled";
                    this.mage = res.data.detail.rq_age;
                    this.mheight = res.data.detail.rq_height;
                    this.minc = res.data.detail.rq_income;
                    this.medu = res.data.detail.rq_edu;
                    this.yousay = res.data.detail.content;
                    this.r_id = res.data.detail.id;
                    this.peas = res.data.detail.peas;
                    this.peas_num = res.data.detail.peas_num;
                    this.type = 2;
                    this.maddress = this.province =
                        citySort(res.data.detail.province, res.data.detail.city)
                            .province +
                        "-" +
                        citySort(res.data.detail.province, res.data.detail.city)
                            .city;
                }
                this.peasyue = res.data.peas;
            } else {
                showEl("网络异常", 3000);
            }
        }
    },
    created() {
        this.gain();
    },
    components: { doubleListPop,loading }
};
</script>
<style lang="less" scoped>
.header {
    position: fixed;
    width: 7.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
    top: 0;
    left: 0;
    font-size: 0.3rem;
    color: #333;
    text-align: center;
    z-index: 100;
    span {
        position: absolute;
        background: url("../../assets/image/icon/left.png") no-repeat center;
        background-size: 0.18rem;
        width: 0.5rem;
        height: 0.8rem;
        left: 0.1rem;
        top: 0.05rem;
    }
    img {
        float: right;
        width: 0.34rem;
        height: 0.34rem;
        margin-right: 0.3rem;
        margin-top: 0.28rem;
    }
}

.d_box {
    margin-top: 0.9rem;
    padding: 0 0.6rem 0.2rem;
    border-bottom: solid 1px #e6e6e6;
    .d_mintitle {
        padding: 0.5rem 0 0.3rem 0;
        font-size: 0.28rem;
        color: #ff704f;
        font-weight: bold;
    }
    .d_condition {
        border: solid 1px #e6e6e6;
        border-radius: 6px;
        min-height: 1.4rem;
        width: 100%;
        img {
            float: right;
            height: 0.4rem;
            margin: 0.5rem 0.2rem;
        }
        div {
            float: left;
            width: 5.4rem;
            min-height: 1.4rem;
        }
    }
}
.d_conditionp {
    float: left;
    font-size: 0.28rem;
    color: #ff704f;
    margin: 0 0.2rem;
    line-height: 0.7rem;
    span {
        color: #111111;
    }
}
.d_mysay {
    border: solid 1px #e6e6e6;
    border-radius: 6px;
    height: 3rem;
    width: 100%;
    padding: 0.2rem;
    line-height: 0.4rem;
}
.d_num {
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.24rem;
    color: #cccccc;
}
.d_rewmoney {
    height: 1.4rem;
    margin-bottom: 0.3rem;
}
.d_rewmoney p {
    float: left;
    margin-right: 0.22rem;
    height: 1.4rem;
    width: 1.4rem;
    border: solid 1px #cccccc;
    border-radius: 6px;
    text-align: center;
    line-height: 1.4rem;
    font-size: 0.3rem;
    color: #999999;
}
.d_custom {
    height: 0.8rem;
}
.d_custom p {
    float: left;
    font-size: 0.28rem;
    color: #999999;
    line-height: 0.8rem;
}
.d_custom div {
    float: right;
    height: 0.8rem;
    width: 4.8rem;
    border: solid 1px #cccccc;
    border-radius: 6px;
}
.d_custom input {
    float: left;
    margin-left: 0.1rem;
    height: 0.76rem;
    width: 4rem;
    font-size: 0.3rem;
    color: #ff704f;
    line-height: 0.8rem;
    padding-left: 0.2rem;
}
.d_custom span {
    float: right;
    line-height: 0.8rem;
    margin-right: 0.2rem;
    color: #111111;
}
.d_lovemoney {
    height: 0.8rem;
    border: solid 1px #cccccc;
    border-radius: 6px;
}
.d_lovemoney input {
    float: left;
    font-size: 0.3rem;
    color: #ff704f;
    line-height: 0.76rem;
    width: 5.2rem;
    margin-left: 0.2rem;
}
.d_lovemoney p {
    float: right;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #111111;
    margin-right: 0.2rem;
}
.d_bottom,
.d_bottom2 {
    height: 1.34rem;
}
.d_btnRelease,
.d_btnRelease2 {
    height: 0.94rem;
    width: 4.2rem;
    border-radius: 0.5rem;
    background: #ff704f;
    text-align: center;
    line-height: 0.94rem;
    font-size: 0.32rem;
    color: #ffffff;
    margin: 0.3rem 0 0.3rem 1.65rem;
}
.d_success {
    height: 2.36rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #ffffff;
}
.d_success span {
    display: block;
    text-align: center;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #ff704f;
}
.d_success p {
    float: left;
    width: 3.2rem;
    height: 0.94rem;
    text-align: center;
    color: #ffffff;
    line-height: 0.94rem;
    background: #ff704f;
    border-radius: 0.5rem;
    font-size: 0.32rem;
}
.d_pleft {
    width: 0.18rem;
    margin: 0.6rem 0.6rem 0 0.6rem;
}
.d_ptitle {
    font-size: 0.5rem;
    color: #111111;
    font-weight: bold;
    line-height: 1.5rem;
    margin: 0 0.6rem;
}
.d_pminbox {
    height: 1.58rem;
    border-bottom: solid 1px #cccccc;
    margin: 0 0.6rem;
}
.d_pminbox span {
    display: block;
    line-height: 0.86rem;
    font-size: 0.26rem;
    color: #999999;
}
.d_pminbox p {
    text-align: center;
    font-size: 0.3rem;
    color: #111111;
}
.d_psave {
    margin: 0.5rem 0.6rem 0.6rem;
    background: #ff704f;
    height: 0.94rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 0.94rem;
    color: #ffffff;
    font-size: 0.32rem;
}
.d_pop {
    width: 100%;
    height: 100%;
    z-index: 500;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
}
.d_pleft {
    width: 0.18rem;
    margin: 0.6rem 0.6rem 0 0.6rem;
}
.d_ptitle {
    font-size: 0.5rem;
    color: #111111;
    font-weight: bold;
    line-height: 1.5rem;
    margin: 0 0.6rem;
}
.d_pminbox {
    height: 1.58rem;
    border-bottom: solid 1px #cccccc;
    margin: 0 0.6rem;
}
.d_pminbox span {
    display: block;
    line-height: 0.86rem;
    font-size: 0.26rem;
    color: #999999;
}
.d_pminbox p {
    text-align: center;
    font-size: 0.3rem;
    color: #111111;
}
.d_psave {
    margin: 0.5rem 0.6rem 0.6rem;
    background: #ff704f;
    height: 0.94rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 0.94rem;
    color: #ffffff;
    font-size: 0.32rem;
}
.d_gosave {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
}
/*悬赏说明*/
.d_problemBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 110;
}
.d_prtitle {
    margin-top: 2.4rem;
    display: block;
    margin-bottom: 0.68rem;
    font-size: 0.4rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.4rem;
}
.d_problemBox p {
    font-size: 0.32rem;
    color: #ffffff;
    line-height: 0.56rem;
    margin: 0 0.6rem;
}
.d_xx {
    height: 0.9rem;
    width: 0.9rem;
    margin-top: 1.5rem;
    margin-left: 3.3rem;
}

.d_clickdui {
    margin-top: 0.5rem;
    height: 0.4rem;
    p {
        float: left;
        color: #ff704f;
        font-size: 0.26rem;
        font-weight: bold;
        line-height: 0.4rem;
    }
    img {
        float: right;
        height: 0.4rem;
        width: 0.4rem;
    }
}
.d_doye {
    color: #ff704f;
    font-size: 0.26rem;
    line-height: 0.6rem;
}
.d_dots {
    color: #999999;
    font-size: 0.24rem;
    line-height: 0.4rem;
}
.d_ffsl,
.d_ffnum {
    height: 0.6rem;
    margin: 0.2rem 0;
}
.d_ffsl > span,
.d_ffnum > span {
    float: left;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.6rem;
}
.d_ffsl p,
.d_ffnum p {
    float: left;
    overflow: hidden;
    margin-left: 0.29rem;
    height: 0.6rem;
    width: 1rem;
    line-height: 0.6rem;
    text-align: center;
    border: solid 1px #ff704f;
    border-radius: 4px;
    color: #ff704f;
    background: #ffffff;
    font-size: 0.28rem;
}
.d_addnum {
    color: #ffffff !important;
    background: #ff704f !important;
}
.d_ffsl h2,
.d_ffnum h2 {
    float: right;
    height: 0.6rem;
    width: 1rem;
    line-height: 0.6rem;
    text-align: center;
    border: solid 1px #ff704f;
    border-radius: 4px;
    color: #ff704f;
    font-size: 0.28rem;
}
.d_mannum p,
.d_ppnum p {
    float: left;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #333333;
}
.d_mannum input,
.d_ppnum input {
    float: right;
    padding: 0 0.2rem;
    width: 4.8rem;
    height: 0.8rem;
    border: solid 1px #cccccc;
    border-radius: 4px;
}
.d_mannum,
.d_ppnum {
    margin: 0.4rem 0;
    height: 0.8rem;
}
.d_gomodify {
    height: 2.36rem;
    background: #ffffff;
}
.d_gomodify span {
    display: block;
    text-align: center;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #ff704f;
}
.d_gomodify p {
    float: left;
    width: 3.2rem;
    height: 0.94rem;
    text-align: center;
    color: #ffffff;
    line-height: 0.94rem;
    background: #ff704f;
    border-radius: 0.5rem;
    font-size: 0.32rem;
}
.active {
    background: rgb(255, 112, 75) !important;
    color: #fff !important;
}
</style>
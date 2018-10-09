<template>
    <div id='pop' v-if='isPop'>
        <!-- 登陆 -->
        <div class='pop-box' v-if='showLogin'>
            <img src="../assets/image/login.png" class='lt login-img'>
            <div class='content lt'>
                <span class='close' @click='closes()'></span>
                <div class='login-box'>
                    <div class="login-item">
                        <p class='use-txt user'>用户名&nbsp;Admin</p>
                        <input type="text" placeholder="请输入您的手机号" @blur="checkBlur('phone',phone)" maxlength="11" class='intP' v-model="phone">
                    </div>
                    <div class="login-item">
                        <p class='use-txt password'>密码&nbsp;Password</p>
                        <input type="password" placeholder="请输入您的密码" @blur="checkBlur('password',password)" minlength="4" maxlength="16" class='intPsd' v-model="password">
                    </div>
                    <p class='hint' v-if='hint'>{{hintTxt}}</p>
                    <div class='btn' @click='loginSuc()'>登&nbsp;录</div>
                    <div class='reg-txt' >还没有搜恋账户?
                        <span @click='skipReg()'>立即注册</span>
                        <!-- <p class='rt'>忘记密码?</p> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 注册 -->
        <div class='pop-box' v-if='showReigter'>
            <img src="../assets/image/register.png" class='lt login-img'>
            <div class='content lt'>
                <span class='close' @click='closes()'></span>
                <div class='login-box regiter-box'>
                    <div class="login-item">
                        <p class='use-txt regUser'>手机注册&nbsp;Phone</p>
                        <input type="text" placeholder="请输入您的手机号" @blur="checkBlur('regPhone',regPhone)" maxlength="11" class='intP' v-model="regPhone">
                    </div>
                    <div class="login-item">
                        <p class='use-txt code'>验证码&nbsp;Code</p>
                        <input type="text" placeholder="请输入验证码" @blur="checkBlur('regCode',reg_code)" maxlength="4" class='intPsd' v-model="reg_code">
                        <span :class='codeClass' @click='codeTime()'>{{codeMsg}}</span>
                    </div>
                    <div class="login-item">
                        <p class='use-txt password'>密码&nbsp;Password</p>
                        <input type="password" placeholder="请输入您的密码" @blur="checkBlur('regPassword',regPsd)" minlength="4" maxlength="16" class='intPsd' v-model="regPsd">
                    </div>
                    <div class="login-item">
                        <p class='use-txt sex'>选择性别&nbsp;Sex</p>
                        <div class='sex-box'>
                            <p class='lt' :class="{'active':sex===1}" @click='sexSel(1)'>
                                <span></span>男</p>
                            <p class='lt' :class="{'active':sex===2}" @click='sexSel(2)'>
                                <span></span>女</p>
                        </div>
                    </div>
                    <p class='hint' v-if='hint'>{{hintTxt}}</p>
                    <div class='btn' @click='regiterSuc()'>注&nbsp;册</div>
                    <div class='reg-txt'>已有搜恋账户直接
                        <span @click='skipLogin()'>登陆</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { checkPhone, checkPsd } from "../assets/js/fn";
import { mapState, mapActions } from "vuex";
export default {
    name: "login",
    data() {
        return {
            isPop: false,
            showLogin: false,
            showReigter: false,
            isLogin: false, //是否登陆
            login_phone: false, //手机号验证
            login_psd: false,
            reg_phone: false,
            reg_psd: false, //注册密码验证
            isReg: false, //是否注册
            isTime: false, //是否发送验证码
            time: 60,
            phone: undefined,
            password: undefined,
            regPhone: undefined,
            regPsd: "",
            sex: 1,
            code: undefined,
            reg_code: undefined,
            codeClass: "codeBtns",
            hint: false,
            codeMsg: "发送验证",
            hintTxt: "请输入用户名或密码"
        };
    },
    methods: {
        showL() {
            this.isPop = true;
            this.showLogin = true;
            this.showReigter = false;
        },
        showReg() {
            this.isPop = true;
            this.showLogin = false;
            this.showReigter = true;
        },
        checkBlur(...arg) {
            if (arg[0] == "phone") {
                checkPhone(arg[1])
                    ? ((this.hint = false), (this.login_phone = true))
                    : ((this.hint = true),
                      (this.login_phone = false),
                      (this.hintTxt = "请输入手机号"));
            } else if (arg[0] == "password") {
                checkPsd(arg[1])
                    ? ((this.hint = false), (this.login_psd = true))
                    : ((this.hint = true),
                      (this.login_psd = false),
                      (this.hintTxt = "请输入密码"));
            } else if (arg[0] == "regPhone") {
                checkPhone(arg[1])
                    ? ((this.hint = false),
                      (this.reg_phone = true),
                      (this.isTime = true),
                      (this.codeClass = "codeBtn"))
                    : ((this.hint = true),
                      (this.reg_phone = false),
                      (this.isTime = false),
                      (this.codeClass = "codeBtns"),
                      (this.hintTxt = "手机格式不正确"));
            } else if (arg[0] == "regPassword") {
                checkPsd(arg[1])
                    ? ((this.hint = false), (this.reg_psd = true))
                    : ((this.hint = true),
                      (this.reg_psd = false),
                      (this.hintTxt = "请输入4-16位密码"));
            } else if (arg[0] == "regCode") {
                this.code == this.reg_code
                    ? (this.hint = false)
                    : ((this.hint = true), (this.hintTxt = "验证码输入错误"));
            }
        },
        // 登陆
        ...mapActions(["_setLogin"]),
        async loginSuc() {
            this.login_phone && this.login_psd
                ? (this.isLogin = true)
                : ((this.isLogin = false),
                  (this.hint = true),
                  (this.hintTxt = "登陆新不完整"));
            if (this.isLogin) {
                this.isLogin = false;
                let data = {
                    type: 1,
                    drivers: 3,
                    username: this.phone,
                    password: this.password
                };
                let res = await this.$htp.post(data, this.$api.login);
                if (res.code == 200) {
                    this._setLogin({
                        ops: res.data,
                        isLogin: true
                    });
                    this.$emit("refresh");
                    this.isPop = false;
                } else {
                    this.isLogin = true;
                    this.hint = true;
                    this.hintTxt = res.message;
                }
            }
        },
        skipReg(){
            this.showLogin=false;
            this.showReigter=true;
        },
        skipLogin(){
            this.showLogin=true;
            this.showReigter=false;
        },
        // 发送验证码
        async codeTime() {
            if (this.isTime) {
                this.isTime = false;
                let params = {
                    tel: this.regPhone,
                    type: 0
                };
                let res = await this.$htp.post(params, this.$api.phoneC);
                if (res.code == 200) {
                    this.code = res.data.code;
                    let timer = setInterval(() => {
                        this.time--;
                        if (this.time <= 0) {
                            this.time = 60;
                            clearInterval(timer);
                            this.codeMsg = "发送验证";
                            this.isTime = true;
                            this.codeClass = "codeBtn";
                        } else {
                            this.codeMsg = this.time + "s后再次发送";
                            this.isTime = false;
                            this.codeClass = "codeBtns";
                        }
                    }, 1000);
                } else {
                    this.hint = true;
                    this.hintTxt = res.message;
                }
            }
        },
        sexSel(num) {
            this.sex = num;
        },
        // 注册
        ...mapActions(["_setLogin"]),
        async regiterSuc() {
            if (this.reg_phone && this.reg_psd && this.code == this.reg_code) {
                this.isReg = true;
            } else {
                this.isReg = false;
                this.hint = true;
                this.hintTxt = "注册信息不完善";
            }
            if (this.isReg) {
                let params = {
                    username: this.regPhone,
                    sorce: 3,
                    sex: this.sex,
                    code: this.code,
                    password: this.regPsd
                };
                let res = await this.$htp.post(params, this.$api.reigter);
                console.log(res);
                if (res.code == 200) {
                    this._setLogin({
                        ops: res.data,
                        isLogin:true
                    });
                    this.$emit("refresh");
                    this.isPop = false;
                } else {
                    this.isReg = true;
                    this.hint = true;
                    this.hintTxt = res.message;
                }
            }
        },
        closes() {
            this.isPop = false;
        }
    }
};
</script>
<style scoped>
#pop {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 200;
}
.pop-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 900px;
    height: 600px;
    border-radius: 8px;
    overflow: hidden;
    margin: auto;
}
input::-webkit-input-placeholder {
    color: #f83444;
}
.login-img {
    width: 400px;
    height: 600px;
}
.content {
    width: 500px;
    height: 600px;
    background: #fff;
    position: relative;
}
div.regiter-box {
    margin-top: 80px;
}
.close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 30px;
    cursor: pointer;
    background: url("../assets/image/close.png") no-repeat center;
    background-size: 20px;
}
.login-box {
    width: 300px;
    min-height: 320px;
    margin: 140px auto 0;
}
.login-item {
    width: 300px;
    height: 75px;
    position: relative;
}
.codeBtn {
    position: absolute;
    right: 5px;
    top: 35px;
    font-size: 12px;
    cursor: pointer;
    color: #f83444;
    padding: 5px 15px;
    border-radius: 30px;
    border: 1px solid #f83444;
}
.codeBtns {
    position: absolute;
    right: 5px;
    top: 35px;
    font-size: 12px;
    cursor: not-allowed;
    color: #999;
    padding: 5px 15px;
    border-radius: 30px;
    border: 1px solid #999;
}
.use-txt {
    width: 100%;
    height: 20px;
    padding-left: 20px;
    font-size: 15px;
    color: #888;
    margin-top: 5px;
}
.sex-box {
    width: 100%;
    height: 40px;
    color: #666;
    font-size: 16px;
    margin-top: 10px;
}
.sex-box p {
    width: 40%;
    height: 40px;
    line-height: 40px;
}
.sex-box p span {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 10px;
    position: relative;
    border: 1px solid #666;
}
.active {
    color: #f83444;
}
.sex-box p.active span {
    border: 1px solid #f83444;
}
.active span::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #f83444;
    border-radius: 50%;
    position: absolute;
    left: 6px;
    top: 6px;
}
.user {
    background: url("../assets/image/use.png") no-repeat left;
    background-size: 14px;
}
.regUser {
    background: url("../assets/image/tellphone.png") no-repeat left;
    background-size: 14px;
}
.code {
    background: url("../assets/image/code.png") no-repeat left;
    background-size: 14px;
}
.sex {
    background: url("../assets/image/sex.png") no-repeat left;
    background-size: 14px;
}
.hint {
    width: 100%;
    height: 20px;
    padding-left: 25px;
    font-size: 14px;
    color: #f83444;
    margin-top: 20px;
    background: url("../assets/image/hint.png") no-repeat left;
    background-size: 15px;
}
.password {
    background: url("../assets/image/password.png") no-repeat left;
    background-size: 15px;
}
.login-item input {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    color: #444;
    font-size: 14px;
    background: #fff;
    border-bottom: 1px solid #ddd;
}
.btn {
    width: 300px;
    height: 46px;
    line-height: 46px;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    background: #f83444;
    text-align: center;
    margin: 20px auto 0;
    border-radius: 40px;
}
.reg-txt {
    margin-top: 20px;
    color: #999;
    font-size: 12px;
    height: 30px;
    cursor: pointer;
}
.reg-txt span {
    padding: 0 10px;
    color: #f83444;
}
</style>


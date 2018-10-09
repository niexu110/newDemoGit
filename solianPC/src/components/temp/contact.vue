<template>
     <div>
          <div class='contact-fixd'>
               <div class='qq'>
                    <a href="tencent://Message/?Uin=2769718227&amp;websiteName=www.quanminmeipo.com=&amp;Menu=yes"></a>
               </div>
               <div class='wx' @mouseover='add(0)' @mouseout="add(1)">
                    <img src="../../assets/image/meiCode.png" :class='className' @mouseover='add(0)' @mouseout="add(1)">
               </div>
               <div class='phone' @mouseover='adds(0)' @mouseout="adds(1)">
                    <p :class='classPhone' @mouseover='adds(0)' @mouseout="adds(1)">400-6313-520</p>
               </div>
               <div class='top' v-if="showTop" @click='backTop()'></div>
          </div>
     </div>
</template>
<script>
export default {
    name: "contact",
    data() {
        return {
            className: "wx-img",
            classPhone: "phoneNumber",
            showTop: false
        };
    },
    methods: {
        add(num) {
            num == 0
                ? (this.className = "wx-imgs")
                : (this.className = "wx-img");
        },
        adds(num) {
            num == 0
                ? (this.classPhone = "phoneNumbers")
                : (this.classPhone = "phoneNumber");
        },
        backTop() {
             this.scrollToTop(1)
        },
        scrollToTop(type) {
            if (type == 1) {
                 let top=document.documentElement.scrollTop||
                    document.body.scrollTop;
                 let timer=setInterval(function(){
                      top-=100;
                      document.documentElement.scrollTop=top
                      if(top<0){
                           clearInterval(timer)
                      }
                 },10)
                 this.showTop = false;
            } else {
                let top =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                if (top > 500) {
                    this.showTop = true;
                } else {
                    this.showTop = false;
                }
            }
        }
    },
    mounted() {
        window.addEventListener("scroll", this.scrollToTop);
    }
};
</script>
<style scoped>
.contact-fixd {
    width: 76px;
    height: 304px;
    position: fixed;
    bottom: 50px;
    right: 50px;
}
.contact-fixd div {
    width: 76px;
    height: 76px;
    position: relative;
    cursor: pointer;
}
.qq {
    background: url("../../assets/image/qqicon.png") no-repeat center;
    background-size: 76px;
}
.qq a {
    display: block;
    width: 76px;
    height: 76px;
}
.wx {
    background: url("../../assets/image/wx.png") no-repeat center;
    background-size: 76px;
}
.phone {
    background: url("../../assets/image/phone.png") no-repeat center;
    background-size: 76px;
}
.top {
    background: url("../../assets/image/top.png") no-repeat center;
    background-size: 76px;
}
.wx-img {
    width: 130px;
    position: absolute;
    left: 0;
    top: -20px;
    display: none;
}
.wx-imgs {
    width: 130px;
    position: absolute;
    left: -140px;
    top: -20px;
    display: block;
}
.phoneNumber {
    width: 140px;
    height: 60px;
    position: absolute;
    left: -140px;
    top: 10px;
    line-height: 60px;
    background: #f83444;
    color: #fff;
    text-align: center;
    font-size: 16px;
    display: none;
}
.phoneNumbers {
    width: 140px;
    height: 60px;
    position: absolute;
    left: -140px;
    top: 10px;
    line-height: 60px;
    background: #f83444;
    color: #fff;
    text-align: center;
    font-size: 16px;
    display: block;
}
</style>


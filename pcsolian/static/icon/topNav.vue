<template>
    <div>
        <div class="nav">
            <div class="container">
                <div class="header-left lt">
                    <img src="../../assets/image/icon.png" class="mt20">
                    <img src="../../assets/image/logo.png" class="mt20 mL10">
                </div>
                <div class="header-middle lt">
                    <ul class="sl-ul">
                        <li class="mt20 actives li">
                            <a href="#">首页</a>
                        </li>
                        <li class="mt20 li">
                            <a href="#main">特色约会</a>
                        </li>
                        <li class="mt20">
                            <a href="src/vipIndex.html">牵缘计划</a>
                        </li>
                        <li class="mt20">
                            <a href="src/aboutUS.html">关于我们</a>
                        </li>
                        <li class="mt20">
                            <a href="src/server.html">服务条款</a>
                        </li>
                    </ul>
                </div>
                <div class="header-right lt">
                    <p class="mt20 rt userMsg">
                        <span class="sl-user">欢迎你,执着的承诺</span>
                        <span class="quit pL30">退出</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
 .nav{width:100%;height:110px;background:rgba(255,255,255,.8);position: fixed;top:0;left:0;z-index:100;}
.container{width:1200px;height:auto;margin:0 auto;overflow: hidden;}
.container div{height:110px;}
.header-middle{width:720px;}
.sl-ul li{float:left;width:120px;height:70px;line-height:70px;font-size: 18px;}
.sl-ul li a{display:inline-block;height:70px;width:auto;position: relative;margin-left:40px;}
.sl-ul li a:after{content:"";width:0;height:3px;background:#5793dd; position: absolute;bottom:0;left:50%;transition:all .3s; }
.sl-ul li a:hover:after{width:100%;left:0;}
.sl-ul li.actives a:hover:after{width:0;}
.sl-ul li.actives a  {color:#5793dd;border-bottom:3px solid #5793dd;}
.header-right{width:260px;}
.header-right>p{width:auto;height:70px;line-height: 70px;}
.sl-user{color:#878484;font-size: 14px;}
.quit{color:#5793dd;font-size: 14px; cursor: pointer;}
</style>

<script>
export default {
    name: "topNav",
    data() {
        return {};
    }
};
</script>

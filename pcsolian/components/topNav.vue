<template>
        <div class="nav">
            <div class="container">
                <div class="header-left lt">
                    <img src="~/static/icon/icon.png" class="mt20">
                    <img src="~/static/icon/logo.png" class="mt20 mL10">
                </div>
                <div class="header-middle lt">
                    <ul class="sl-ul">
                        <li class=" actives li">
                            <nuxt-link to="/">首页</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/">特色约会</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="#">牵缘计划</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/about">关于我们</nuxt-link>
                        </li>
                        <li >
                            <nuxt-link to="*">服务条款</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>
<style scoped>
/* 头部 */
 .nav{width:100%;height:110px;background:rgba(255, 255, 255, 0.8);position: fixed;top:0;left:0;z-index:100;}
.header-left img{margin:20px 0 0 10px; }
.container div{height:110px;}
.header-middle{width:720px;}
.sl-ul li{float:left;width:120px;height:70px;line-height:70px;font-size: 18px;margin-top:20px;}
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



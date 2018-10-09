<template>
    <div v-wechat-title='$route.meta.title'>
        <topNav :type='type'></topNav>
        <contact ></contact>
        <div class='view'>
            <!-- 1层banner -->
            <div class='index-banner'>
                <div class='container'>
                    <div class='index-banner-new'>
                        <div class='banner-new-box'>
                            <div class='new-txt'></div>
                            <router-link to="about" class='index-skip hover-wayra hover-inverted'>了解更多</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!--2层 corporate 企业文化-->
            <div class='index-corporate'>
                <div class='container'>
                    <div class='index-corporate-culture'>
                        <h1 class='index-title'>为什么在搜恋找对象</h1>
                        <div class='index-corporate-box'>
                            <div class='active rgb1'>
                                <span class='index-corporate-line'></span>
                                <img src="../assets/image/img/integrity.png">
                                <h3>诚信</h3>
                                <p>内诚于心&nbsp;外信于人</p>
                                <p>诚实无欺&nbsp;信守诺言</p>
                            </div>
                            <div class='rgb2'>
                                <span class='index-corporate-line2'></span>
                                <img src="../assets/image/img/devote.png">
                                <h3>专注</h3>
                                <p>坚持助单身快速脱单</p>
                                <p>坚持成就天下美好姻缘</p>
                            </div>
                            <div class='rgb3'>
                                <span class='index-corporate-line3'></span>
                                <img src="../assets/image/img/safe.png">
                                <h3>安全</h3>
                                <p>谈恋爱更靠谱</p>
                                <p>好有背书&nbsp;朋友的朋友</p>
                            </div>
                            <div class='rgb4'>
                                <span class='index-corporate-line4'></span>
                                <img src="../assets/image/img/highly.png">
                                <h3>高效</h3>
                                <p>互通有无&nbsp;及时解锁聊天</p>
                                <p>精准快速&nbsp;多方式找对象</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 3层优质会员展示 user -->
            <div class='index-user'>
                <div class='container'>
                    <div class='index-user-box'>
                        <h1 class='index-title'>优质会员展示</h1>
                        <!-- <div class='index-user-select'>
                            <span class='lt' :class="{'active':classIndex===0}">单身</span>
                            <span class='rt' :class="{'active':classIndex===1}">媒婆</span>
                        </div> -->
                        <div class='index-user-img-box' >
                            <div class='index-user-hover clearml '>
                                <div class='user-hover-div1 mb6 item'>
                                    <img src="../assets/image/hui/man1.png" alt="">
                                    <div class='hover-acitve-div1 hidden' @click='lookUser(1)'>
                                        <p class='hover-look'>查看资料</p>
                                    </div>
                                </div>
                                <div class='user-hover-div2 ml6 mb6 item'>
                                    <img src="../assets/image/hui/girl1.png" alt="">
                                    <div class='hover-acitve-div2 hidden' @click='lookUser(2)'>
                                        <h5>有始有终</h5>
                                        <p>25岁/162cm</p>
                                        <p>金融/3001-6000元</p>
                                    </div>
                                </div>
                                <div class='user-hover-div4 item'>
                                    <img src="../assets/image/hui/man2.png" alt="">
                                    <div class='hover-acitve-div4 hidden' @click='lookUser(3)'>
                                        <h5>布拉格的广场</h5>
                                        <p>24岁/180cm</p>
                                        <p>IT互联网/7001-10000元</p>
                                    </div>
                                </div>
                                <div class='user-hover-div3 ml6 item'>
                                    <img src="../assets/image/hui/girl2.png" alt="">
                                    <div class='hover-acitve-div3 hidden' @click='lookUser(4)'>
                                        <p class='hover-looks'>查看资料</p>
                                    </div>
                                </div>
                            </div>
                            <div class='index-user-hover'>
                                <div class='user-hover-div3 mb6 item'>
                                    <img src="../assets/image/hui/girl3.png" alt="">
                                     <div class='hover-acitve-div3 hidden' @click='lookUser(5)'>
                                        <p class='hover-looks'>查看资料</p>
                                    </div>
                                </div>
                                <div class='user-hover-div4 ml6 mb6 item'>
                                    <img src="../assets/image/hui/man3.png" alt="">
                                    <div class='hover-acitve-div4 hidden' @click='lookUser(6)'>
                                        <h5>北极以北</h5>
                                        <p>24岁/183cm</p>
                                        <p>国企/6001-8000元</p>
                                    </div>
                                </div>
                                <div class='user-hover-div2 item'>
                                    <img src="../assets/image/hui/girl4.png" alt="">
                                    <div class='hover-acitve-div2 hidden' @click='lookUser(7)'>
                                        <h5>红牡丹</h5>
                                        <p>25岁/160cm</p>
                                        <p>能源环保/4001-8000元</p>
                                    </div>
                                </div>
                                <div class='user-hover-div1 ml6 item'>
                                    <img src="../assets/image/hui/girl5.png" alt="">
                                    <div class='hover-acitve-div1 hidden' @click='lookUser(8)'>
                                        <p class='hover-look'>查看资料</p>
                                    </div>
                                </div>
                            </div>
                            <div class='index-user-hover'>
                                <div class='user-left'>    
                                    <div class='user-hover-div1 mb6 item'>
                                        <img src="../assets/image/hui/girl6.png" alt="">
                                        <div class='hover-acitve-div1 hidden' @click='lookUser(9)'>
                                        <p class='hover-look'>查看资料</p>
                                    </div>
                                    </div>
                                    <div class='user-hover-div3 item'>
                                        <img src="../assets/image/hui/man4.png" alt="">
                                         <div class='hover-acitve-div3 hidden' @click='lookUser(11)'>
                                        <p class='hover-looks'>查看资料</p>
                                    </div>
                                    </div>
                                </div>
                                <div class='user-right '>
                                    <div class='user-hover-div4 ml6 mb6 item'>
                                    <img src="../assets/image/hui/girl7.png" alt="">
                                    <div class='hover-acitve-div4 hidden' @click='lookUser(10)'>
                                        <h5>玉儿</h5>
                                        <p>26岁/168cm</p>
                                        <p>行政人事/4001-8000元</p>
                                    </div>
                                    </div>
                                    <div class='user-hover-div2 ml6 item'>
                                        <img src="../assets/image/hui/girl8.png" alt="">
                                        <div class='hover-acitve-div2 hidden' @click='lookUser(12)'>
                                        <h5>忘忧草</h5>
                                        <p>24岁/163cm</p>
                                        <p>会计/4001-8000元</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 4层 activity 活动 -->
            <div class="index-activity">
                <div class='container'>
                    <div class='index-activity-box'>
                        <h1 class='index-title'>搜恋活动中心</h1>
                        <div class='activity-container'>
                            <div class='activity-item ' v-for='(item,index) in lists ' :class='{"active":index===0}' :key='index'>
                                <div class='activity-item-img'>
                                    <img :src="item.image" >
                                </div>
                                <p class='activity-item-title'>{{item.title}}</p>
                                <p class='activity-item-txt'>{{item.des}}</p>
                                <span class='activity-look hover-wayras hover-inverteds' 
                                @click='openAction(2,item.activityId)'>查看详情</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 5层 行业资讯 information -->
            <div class="index-information">
                <div class='container'>
                    <div class='index-information-box'>
                        <h1 class='index-title'>行业资讯</h1>
                        <div class='information-box'>
                            <div class='information-box-left lt ' @click='openAction(1,newOne.newsid)'>
                                <img :src="newOne.image" alt="">
                                <p>{{newOne.title}}</p>
                            </div>
                            <div class='information-box-right rt'>
                                <div class=' information-right-div' v-for='(item,index) in list' :class='{"information-right-top":index===0}' :key='index' @click='openAction(1,item.newsid)'>
                                    <div class='information-left-img lt '>
                                        <img :src="item.image" alt="">
                                        <p>{{item.title}}</p>
                                    </div>
                                    <div class='information-text-box lt'>
                                        <h5>{{item.title}}</h5>
                                        <p>{{item.des}}</p>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 6层 加入搜恋 solove -->
            <div class='index-solove'>
                <div class="container">
                    <div class='solove-code-contanier'>
                        <h1 class='index-title'>加入搜恋</h1>
                        <div class='code-box'>
                            <div class='item-code'>
                                <img src="../assets/image/img/iphoneicon.png" class='code-icon'>
                                <p class='code-txt'>APP store 下载</p>
                                <img src="../assets/image/iOSapp.png" class='code-img'>
                            </div>
                            <div class='item-code marginlr'>
                                 <img src="../assets/image/img/androidlogo.png" class='code-icon'>
                                <p class='code-txt'>Android 下载</p>
                                <img src="../assets/image/adAPP.png" class='code-img'>
                            </div>
                            <div class='item-code'>
                                 <img src="../assets/image/img/wxicon.png" class='code-icon'>
                                <p class='code-txt'>服务号关注</p>
                                <img src="../assets/image/meiCode.png" class='code-img'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pop ref='childs'></pop>
            <activities ref="child"></activities>
    </div>
</template>
<style scoped>
@import "../assets/css/index";
@import "../assets/css/hover";
</style>
<script>
import topNav from "./temp/topNav";
import contact from "./temp/contact";
import activities from "./activities";
import pop from "./temp/pop";
import { mapMutations, mapActions } from "vuex";
export default {
    name: "index",
    data() {
        return {
            type:0,
            list:[],
            newOne:{},
            lists:[]
        };
    },
    methods: {
        // 行业列表
       async gainNewsList() {
            let data={
                page:0,
                pageSize:3
            }
           let res= await this.$htp.post(data,this.$api.getNewsList);
           if(res.code==200){
               this.newOne=res.data[0];
               this.list.push(res.data[1])
               this.list.push(res.data[2])  
           }
        },
        // 活动列表
         async gainActivityList() {
            let data={
                page:0,
                pageSize:3
            }
           let res= await this.$htp.post(data,this.$api.getActivityListForPc);
           if(res.code==200){
               res.data.forEach(key => {
                  this.lists.push(key) 
               });
           }
        },
        lookUser(num){
            this.$refs.childs.classFun(1,num)
        },
        openAction(type,id){
            this.$refs.child.showAction(type,id)
        },
        
    },
    mounted() {
        this.gainNewsList();
        this.gainActivityList();
    },
    components: { topNav,contact,pop,activities }
};
</script>

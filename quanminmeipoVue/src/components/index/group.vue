<template>
    <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <loading :load='load'></loading>
        <div class='view'>
            <!-- <router-link to="enlist" class='red-paper-box'>
                <span :class='isLing?"ling":"lings"'></span>
            </router-link> -->
            <div class='single-box'>
                <router-link to="groupapply">
                    <img src="../../assets/image/index/rutuan.png" class='lt'>
                    <div class='lt'> 
                        <p>新入团申请</p>
                        <span>查看单身团申请</span>
                    </div>
                </router-link>
                <router-link to="dynamic">
                    <img src="../../assets/image/index/dongtai.png" class='lt'>
                    <div class='lt'>
                        <p>单身团动态</p>
                        <span>查看最新动态</span>
                    </div>
                </router-link>
            </div>
            <div class='single-main'>
                <div class='single-main-sex'>
                    <div class='sex-line' @click="addLine(0)">
                        <span :class='{"active":classA===0}'>美女{{womenCount}}</span>
                    </div>
                    <div class='sex-line' @click="addLine(1)">
                        <i class='l-line'></i>
                        <span :class='{"active":classA===1}'>帅哥{{manCount}}</span>
                        <i class='r-line'></i>
                    </div>
                    <div class='sex-line' @click="addLine(2)">
                        <span :class='{"active":classA===2}'>预备团{{preparativeCount}}</span>
                    </div>
                </div>
                <div class='single-main-box' v-if="count==0">
                    <img src="../../assets/image/icon/typeImg.png" class='typeImg'>
                    <p class='typeP'>暂无人员加入单身团,团长要加油哦！</p>
                    <router-link to="#" class='btn'>招募我的单身团</router-link>
                </div>
                <div class='single-main-box' v-else>
                    <div class='single-items' v-for="item in list">
                        <div class='single-user lt' @click='skip(item,1)'>
                            <img :src="item.image" alt="">
                            <span class='rt'>
                                <h1>{{item.nickname}}</h1>
                                <p>{{item.age}}岁·{{item.height}}cm·{{item.constellation}}</p>
                            </span>
                        </div>
                        <div class=' rt' :class='item.isdes==0?"single-tj":"single-tjs"'  @click='skip(item,2)' v-if="isMM">
                            <span v-if='item.isdes==0'>媒妁之言</span>
                            <span v-else>修改</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import "../../assets/less/index/group";
</style>
<script>
import top from "../common/top";
import loading from "../common/loading";
export default {
    name: "group",
    data() {
        return {
            title: "单身团成员",
            show: true,
            isLing: true,
            load:true,
            classA: 0,
            type:2,
            manType:true,
            preparativeType:true,
            count:null,
            manCount:0,
            womenCount:0,
            preparativeCount:0,
            list:[],
            manList:[],
            womenList:[],
            isMM:true,
            preparativeList:[],
        };
    },
    methods: {
        async gains() {
            let data = {
                type:this.type,
                page:0,
                tg_uid:this.$store.state.userInfo.uid
            };
            let res = await this.$htp.post(data,this.$api.myRegiment);
            if (res.code == 200) {
                this.load=false;
                this.manCount=res.data.mancount;
                this.womenCount=res.data.womencount;
                this.preparativeCount=res.data.preparativecount;
                this.count=this.womenCount;
                if(this.type==1){
                    this.pushList(1,res.data.man)
                    
                }else if(this.type==2){
                    this.pushList(2,res.data.women)
                    
                }else{
                    this.pushList(3,res.data.preparative)
                    
                }    
            }
        },
        pushList(type,list){
            if(type==1){
                  for(let k in list){
                  this.manList.push(list[k]) 
                } 
            }else if(type==2){
               for(let k in list){
                  this.womenList.push(list[k]) 
               } 
               this.list=this.womenList;
            }else{
               for(let k in list){
                  this.preparativeList.push(list[k]) 
               } 
            }
        },
        // receiveAnimation() {
        //     setInterval(() => {
        //         if (this.isLing) {
        //             this.isLing = false;
        //         } else {
        //             this.isLing = true;
        //         }
        //     }, 250);
        // },
        addLine(index) {
            this.classA = index;
            if(index==0){
                this.isMM=true;
                this.type=2;
                this.count=this.womenCount;
                this.list=this.womenList;
            }else if(index==1){
                this.type=1;
                this.count=this.manCount;
                this.list=this.manList;
                this.isMM=true;
                if(this.manType){
                    this.load=true;
                    this.manType=false;
                    this.gains()
                }
            }else{
                this.type=5;
                this.count=this.preparativeCount;
                this.list=this.preparativeList;
                this.isMM=false;
                if(this.preparativeType){
                    this.preparativeType=false;
                    this.load=true;
                    this.gains()
                }
            }
        },
        skip(item,type){
            if(type==1){
                this.$router.push({path: 'card', query:{uid:item.uid,nickName:item.nickname}})
            }else{
                this.$router.push({path: 'recom', query:{uid:item.uid,image:item.image,text:item.mpdescribe}})
            }
        }
    },
    mounted() {
        // this.receiveAnimation();
    },
    created() {
        this.gains()
    },
    components: { top,loading}
};
</script>


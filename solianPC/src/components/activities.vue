<template>
    <div id='actions' :class='actionCalss'>
        <div class='action-scoll' >
            <div class='action-container ' id='actionScoll' :class='classNames'>
                <span class='close' @click='closeAction()'></span>
                <div class='action-img'>
                    <img :src="list.image" alt="">
                </div>
                <h1 class='action-title'>{{list.title}}</h1>
                <p class='action-date'>
                    <span class='date'>日期:{{list.createtime}}</span>
                    <span>发布人:{{list.publisher}}</span>
                </p>
                <div class='action-text' v-html="list.content" > 
                </div>
                <div class='action-foot'>
                    <p class='lt' @click='preNext(pre.newsId)'>上一篇:{{pre.title}}</p>
                    <p class='rt' style='text-align:right;' @click='preNext(pre.newsId)'>下一篇:{{next.title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
 <style scoped>
@import "../assets/css/activities";
</style>
<script>
export default {
    name: "activities",
    data() {
        return {
            actionCalss: "action-pop",
            list:{},
            pre:{},
            next:{},
            activeType:1,
            div:'',
            classNames:'frames'
        };
    },
    methods: {
        closeAction() {
            this.actionCalss = "action-pop";
            this.list={};
            this.pre={};
            this.next={};
            this.classNames='frames'
        },
        async showAction(staut, id) {
            this.actionCalss = "action-pops";
            this.activeType=staut;
            if (staut == 1) {
                let data = {
                    newsId: id
                };
                let res = await this.$htp.post(data,this.$api.getNewsDetail);
                if(res.code==200){
                   this.list=res.data.current;
                   this.pre=res.data.previous;
                   this.next=res.data.next;
                }
            }else{
                let data = {
                    activityId: id
                };
                let res = await this.$htp.post(data,this.$api.getActivityDetailForPc);
                if(res.code==200){
                   this.list=res.data.current;
                   this.pre=res.data.previous;
                   this.next=res.data.next;
                   
                } 
            }
        },
        preNext(newsId){
            this.classNames='frame'
            setTimeout(() => {
                this.scrollItem(1);
                this.classNames='frames';
                if(this.activeType==1){
                this.showAction(this.activeType,newsId)
               }
            }, 200);  
        },
        scrollItem(num){
           if(num==1){
               this.div.scrollTop=0;
           }
        }
        
    },
    mounted() {
        this.div=document.getElementById('actionScoll');
        this.div.addEventListener('scroll',this.scrollItem)
    },
    components: {}
};
</script>

<template>
     <div v-wechat-title='$route.meta.title'>
          <topNav :type='type'></topNav>
          <contact></contact>
          <div class='view'>
               <div class='action-banner'></div>
               <div class='action-box'>
                    <div class='container'>
                         <div class='action-container'>
                              <div class='action-item' v-for='(item,index) in list' :key='index' >
                                   <div class='action-img'>
                                        <img :src="item.image">
                                   </div>
                                   <div class='action-txt'>
                                        <h2>{{item.title}}</h2>
                                        <p>{{item.des}}</p>
                                        <span class='activity-look hover-wayras hover-inverteds' @click='openAction(2,item.activityId)'>查看详情</span>
                                   </div>
                              </div>
                             <div id='pageAll'>
                                    <ul class="pagination">
                                          <li @click="gotos(1)">
                                                <span>＜</span>
                                          </li>
                                          <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                                                <span>{{index}}</span>
                                          </li>
                                          <li @click=" gotos(2)">
                                                <span>＞</span>
                                          </li>
                                          <li>共{{allpage}}页</li>
                                    </ul>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <activities ref="childs"></activities>
          <alert ref='child'></alert>
     </div>
</template>
<style scoped>
@import "../assets/css/actions";
@import "../assets/css/hover";
</style>
<script>
import topNav from "./temp/topNav";
import alert from "./temp/alert";
import contact from "./temp/contact";
import activities from "./activities";
export default {
    name: "actions",
    data() {
        return {
            type: 3,
            current: 1,
            showItem: 5,
            allpage:0,
            list:[]
        };
    },
    methods: {
        // 行业列表
        async gainActivityList(num) {
            let data = {
                page: num - 1,
                pageSize:3
            };
            let res = await this.$htp.post(data, this.$api.getActivityListForPc);
            if (res.code == 200) {
                this.allpage = parseInt(res.dataCount /3) + 1;
                this.list = res.data;
            }
        },
        openAction(type, id) {
            this.$refs.childs.showAction(type, id);
        },
        goto(index) {
            this.current = index;
            this.list = [];
            this.gainActivityList(this.current);
        },
        gotos(type) {
            if (type == 1) {
                this.current--;
                if (this.current == 0) {
                    this.current = 1;
                    this.$refs.child.showAlert("已经是第一页");
                } else {
                    this.list = [];
                    this.gainActivityList(this.current);
                }
            } else {
                this.current++;
                if (this.current > this.allpage) {
                    this.current = this.allpage;
                    this.$refs.child.showAlert("已经是最后一页");
                } else {
                    this.list = [];
                    this.gainActivityList(this.current);
                }
            }
        }
    },
    computed: {
            pages: function() {
                var pag = [];
                if (this.current < this.showItem) {
                    //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else {
                    //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if (middle > this.allpage - this.showItem) {
                        middle = this.allpage - this.showItem + 1;
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                return pag;
            }
     },
    mounted() {
       this.gainActivityList(this.current); 
    },
    components: { topNav, contact,activities,alert }
};
</script>
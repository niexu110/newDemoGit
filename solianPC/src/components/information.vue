<template>
      <div v-wechat-title='$route.meta.title'>
            <topNav :type='type'></topNav>
            <contact></contact>
            <activities ref="childs"></activities>
            <div class='view'>
                  <div class='information-banner'>
                  </div>
                  <div class='information-new'>
                        <div class="container">
                              <div class='information-content'>
                                    <div class='item-news' v-for='(item,index) in list' :class='{"mro":(index+1)%3===0}' :key='index' @click='openAction(1,item.newsid)'>
                                          <div class='new-img'>
                                                <img :src="item.image">
                                          </div>
                                          <h6 class='new-time'>
                                                {{item.createtime}}
                                                <span class='rt'>{{item.readtotal}}</span>
                                          </h6>
                                          <h2 class='new-title'>{{item.title}}</h2>
                                          <p class='new-text'>{{item.des}}</p>
                                    </div>
                              </div>
                              <p class='clear'></p>
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
            <alert ref='child'></alert>
      </div>
</template>
<style scoped>
@import "../assets/css/information";
</style>
<script>
import topNav from "./temp/topNav";
import contact from "./temp/contact";
import alert from "./temp/alert";
import activities from "./activities";
export default {
    name: "information",
    data() {
        return {
            type: 2,
            current: 1,
            showItem: 5,
            allpage: 0,
            list: []
        };
    },
    methods: {
        // 行业列表
        async gainNewsList(num) {
            let data = {
                page: num - 1,
                pageSize: 6
            };
            let res = await this.$htp.post(data, this.$api.getNewsList);
            if (res.code == 200) {
                this.allpage = parseInt(res.dataCount / 6) + 1;
                this.list = res.data;
            }
        },
        openAction(type, id) {
            this.$refs.childs.showAction(type, id);
        },
        goto(index) {
            this.current = index;
            this.list = [];
            this.gainNewsList(this.current);
        },
        gotos(type) {
            if (type == 1) {
                this.current--;
                if (this.current == 0) {
                    this.current = 1;
                    this.$refs.child.showAlert("已经是第一页");
                } else {
                    this.list = [];
                    this.gainNewsList(this.current);
                }
            } else {
                this.current++;
                if (this.current > this.allpage) {
                    this.current = this.allpage;
                    this.$refs.child.showAlert("已经是最后一页");
                } else {
                    this.list = [];
                    this.gainNewsList(this.current);
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
        this.gainNewsList(this.current);
    },
    components: { topNav, contact, alert, activities }
};
</script>

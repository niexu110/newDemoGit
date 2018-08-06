<template>
     <div v-wechat-title='$route.meta.title'>
        <top :title='title' :show='show'></top>
        <div class='view'>
            <div class='contnet' v-if="len!=0" >
                <div class="item" v-for='user in list' @click='jump(user)'>
                    <img :src="user.image" class='lt'>
                    <div class='lt'>
                        {{user.nickname}}
                    </div>
                    <span>牵缘成功{{user.qycount}}次</span>
                </div>
            </div>
            <div class='contnet' v-else>
                 <tempNull2 :text='text'></tempNull2>
            </div>
        </div>
        <div id='popup'></div>
        <div id='pullUp'></div>
        <loading :load='load'></loading>
    </div>
</template>
<script>
import top from "../common/top";
import loading from "../common/loading";
import tempNull2 from "../common/tempNull2";
import { showEl } from "../../assets/js/fn";
export default {
  name: "groupsuc",
  data() {
    return {
      title: "牵缘成功",
      show: true,
      load:true,
      text:'暂无牵缘成功的，继续加油哦!',
      page: 0,
      list: [],
      len:null,
    };
  },
  methods: {
    async gains() {
      let data = {
        page: this.page
      };
      let res = await this.$htp.post(data, this.$api.makeFateList);
      if (res.code == 200) {
        this.load=false;
        this.list = res.data;
        this.len=this.list.length
      } else if (res.code == "-404") {
        showEl("网络异常", 2000);
      }
    },
    jump(item) {
      this.$router.push({
        path: "card",
        query: { uid: item.uid, nickName: item.nickname }
      });
    },
    
  },
  mounted() {
    this.gains();
    
  },
  created() {},
  components: { top,tempNull2,loading }
};
</script>
<style lang="less" scoped>
.item{
         width: 7.2rem;
    height: 1.65rem;
    margin-left: .3rem;
    border-bottom: 1px solid #F2F2F2;
    position: relative;
    img{
             width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-top: .3rem;
    }
    div{
             width: auto;
    height: 1.65rem;
    line-height: 1.65rem;
    margin-left: .3rem;
    font-size: .28rem;
    font-weight: bold;
    color: #111;
    }
    span{
         position: absolute;
         display: block;
     right: .3rem;
     width: auto;
     height: .65rem;
     line-height: .65rem;
     top: .5rem;
     color: #FF7C5E;
    }
}
</style>

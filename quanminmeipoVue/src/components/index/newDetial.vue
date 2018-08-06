<template>
  <div v-wechat-title='$route.meta.title'>
    <top :title='title'  :show='show'></top>
    <div class='view'>
    </div>
  </div>
</template>
<script>
import top from "../common/top2";
export default {
    name: "newDetial",
    data() {
        return {
            title: "活动详情",
            show: false,
            num: 10
        };
    },
    created: function() {},
    methods:{
      
    },
    components: { top}
};
</script>
<style lang="less" scoped>
</style>


<template>
  <div>
    <top-nav/>
    <div class='view'>
      <div class='container'>
        <ul>
          <li v-for="(item, index) in obj" :key="index" class='list'>
             {{item.url}}
          </li>
        </ul>
      </div>
    </div>
    <bottom-foot/>
  </div>
</template>
<script>
import topNav from "~/components/topNav.vue";
import bottomFoot from "~/components/bottomFoot.vue";
import htp from "~/plugins/http.js";
export default {
    data() {
        return {
            name: "hello World"
        };
    },
    methods: { 
    },
    async asyncData() {
        let data = {};
        let res = await htp.post(data, "allIndex");
        if (res.code == 200) {
            return { obj: res.data.activity.data };
        } else {
            console.log("没有更多数据");
        }
    },
    mounted() {
        console.log(this.obj);
    },
    components: {
        topNav,
        bottomFoot
    }
};
</script>
<style scoped>
</style>



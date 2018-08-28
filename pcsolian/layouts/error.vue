<template>
     <div class='view '>
          <div class='container'>
               <h2 v-if='error.statusCode==404' class='pp'>404页面，你需要的页面没有找到</h2>
               <h2 v-else class='pp'>500页面，服务器错误</h2>
               <ul>
                    <li>
                         <nuxt-link to="/">HOME</nuxt-link>
                    </li>
               </ul>
          </div>
     </div>
</template>
<script>
export default {
    props: ["error"]
};
</script>
<style scoped>
.pp {
    font-size: 36px;
    color: #999;
    text-align: center;
}
.container {
    background: #f9f9f9;
}
</style>

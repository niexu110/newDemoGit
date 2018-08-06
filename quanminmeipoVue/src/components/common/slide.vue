<template>  
  <div class="slide">  
    <div class="slideshow">  
      <ul>  
        <transition-group tag="ul" name="image">  
        <li v-for="(img, index) in imgArray" v-show="index===mark" :key="index">  
          <router-link to='*'>  
            <img :src='img'>  
          </router-link>  
        </li>  
      </transition-group>  
      </ul>  
    </div>  
    <div class="bar">  
      <span v-for="(item, index) in imgArray" :class="{ 'active':index===mark }" :key="index"></span>  
    </div>  
  </div>  
</template> 
<script>
     export default{
          name:'slide',
          data () {  
               return { 
                    mark: 0, //比对图片索引的变量   
                    imgArray: [
                      require('../../assets/image/demo2.jpg'),
                      require('../../assets/image/demo2.jpg'),
                      require('../../assets/image/demo2.jpg'),
                    ]  
               }  
            },
            created(){
                 this.play();
                 this.banner()
            },
            methods: {  
               autoPlay () {  
                     this.mark++;  
                     if (this.mark ===3) { //当遍历到最后一张图片置零  
                     this.mark = 0  
                  }  
               },  
               play () {  
                    setInterval(this.autoPlay, 2500)  
               },  
               change (i) {  
                    this.mark = i  
               },
               async banner(){
                    let params={
                         type:2
                         }
                    let res=await this.$htp.post(params,this.$api.banner);
               }  
            }
     }
</script> 
<style lang="less" scoped>
 .slide {  
    width: 6.9rem;  
    height: 2.8rem;  
    margin: .1rem auto;  
    overflow: hidden;  
    position: relative;  
  }  
  .slideshow {  
    width: 6.9rem;  
    height: 2.8rem;  
  }  
  li {  
    position:absolute;  
  }  
  img {  
    width: 6.9rem;   
  }  
  .bar {  
    position: absolute;  
    width: 100%;  
    bottom: .1rem;  
    margin: 0 auto;  
    z-index: 10;  
    text-align: center;  
  }  
  .bar span {  
    width: .2rem;  
    height: .05rem;   
    background: #fff;  
    display: inline-block;  
    margin-right: .1rem;  
  }  
  .active {  
    background: red !important;  
  }
  .image-enter-active {  
    transform: translateX(0);  
    transition: all 1.5s ease;  
  }  
  .image-leave-active {  
    transform: translateX(-100%);  
    transition: all 1.5s ease;  
  }  
  .image-enter {  
    transform: translateX(100%);  
  }  
  .image-leave {  
    transform: translateX(0);  
  }   
</style>

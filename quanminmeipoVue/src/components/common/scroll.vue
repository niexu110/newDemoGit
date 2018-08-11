<template>
     <div>
          <div class='container' @touchend='touchEnd' @touchstart='touchStart' @touchmove='touchMove'>
          </div>
          <div id='pullUp'>{{loadTxt}}</div>
     </div>
</template>
<script>
export default {
    name: "scroll",
    data() {
        return {
            loadTxt: "上拉加载更多",
            endY: 0,
            startY: 0,
            isOpen: false
        };
    },
    methods: {
        touchStart(ev) {
            ev = ev || event;
            this.startY = ev.touches[0].clientY;
            this.isOpen = true;
            console.log(123)
        },
        touchMove(ev) {
            ev = ev || event;
            if (!this.isOpen) {
                return;
            }
            this.loadTxt = "上拉加载更多";
        },
        touchEnd(ev) {
            ev = ev || event;
            this.endY = ev.changedTouches[0].clientY;
            let bottom = this.startY - this.endY;
            let scrollTop =
                this.$el.scrollTop || document.documentElement.scrollTop;
            let top = parseInt(this.$el.querySelector("#pullUp").offsetTop);
            console.log(this.$el);
            if (this.isOpen) {
                if (scrollTop >= top - 800) {
                    if (bottom > 200) {
                        this.isOpen = false;
                        this.$emit('loadMore');
                        this.load = true;
                    } else {
                        this.isOpen = true;
                    }
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
  .container
</style>


<template>
     <div>
          <div class='map-box' id='maps'></div>
     </div>
</template>
<script>
export default {
    name: "maps",
    data() {
        return {};
    },
    methods: {
        loadmap() {
            const map = new AMap.Map("maps", {
                resizeEnable: true,
                zoom: 20,
                center: [108.921186, 34.270418]
            });
            map.plugin(["AMap.ToolBar"], function() {
                map.addControl(new AMap.ToolBar());
            });
            new AMap.Marker({
                map: map,
                position: [108.921186, 34.270418],
                icon: new AMap.Icon({
                    size: new AMap.Size(40, 50), //图标大小
                    image: require("../../assets/image/address.png"),
                    imageOffset: new AMap.Pixel(0, -60)
                })
            });
        }
    },
    mounted() {
        this.loadmap();
    }
};
</script>
<style scoped>
.map-box {
    width: 1000px;
    height: 400px;
    margin: 0 auto 40px;
    overflow: hidden;
}
</style>


$(function(){
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
            image:"http://img.qinyikou.cc/pc/image/address.png",
            imageOffset: new AMap.Pixel(0, -60)
        })
    });
    var num=getQueryString("num");
    if(num==null){
    	num=0;
    }
    $(".about-box>div").eq(num).show().siblings().hide();
    $(".about-nav li").eq(num).addClass("active").siblings().removeClass("active");
    $(".about-nav li").on("click",function(){
    	var index=$(".about-nav li").index(this);
    	$(".about-box>div").eq(index).show().siblings().hide();
    	$(".about-nav li").eq(index).addClass("active").siblings().removeClass("active");
    })
})

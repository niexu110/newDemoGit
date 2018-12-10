$(function(){
     var current=1,showItem=5,allpage=0,pageHtml='';
     _ajax.post(api.getNewsList, { page: current,pageSize: 6},function(res){
          if (res.code == 200) {
               allpage = parseInt(res.dataCount / 6) + 1;
               pages();
                for (var j = 0; j < pages().length; j++) {
                      pageHtml += "<li class='pageIndex' alt=" + pages()[j] + "><span>" + pages()[j] + "</span></li>"
                }
              $('.pagination').append('<li class="nexts"><span>＜</span></li>' + pageHtml + '<li class="pre"><span>＞</span></li><span>共' + allpage + '页</span>')
               res.data.forEach(function(key,index){
                    $('.information-content').append("<div class='item-news'><div class='new-img'>"+
                         "<img src=" + key.image +"></div>"+
                         "<h6 class='new-time'>" + key.createtime + "<span class='rt'>" + key.readtotal + "</span></h6>"+
                          "<h2 class='new-title'>"+key.title+"</h2>"+
                          "<p class='new-text'>"+key.des+"</p></div>")
                     if ((index+1)%3===0){
                          $('.information-content').find('.item-news').eq(index).addClass('mro') 
                     }  
               });
                $('.item-news').click(function(){
                    skipInformation(res.data[$(this).index()])
               })
                $('.pagination').on('click','.nexts',function(){
                      console.log(123)
                })
          }
     })
      function skipInformation(item){
           skip('information.html?id='+item.newsid)
      }
     // 分页
     function pages() {
          var pag = [];
          if (current < showItem) {
               //如果当前的激活的项 小于要显示的条数
               //总页数和要显示的条数那个大就显示多少条
               var i = Math.min(showItem, allpage);
               while (i) {
                    pag.unshift(i--);
               }
          } else {
               //当前页数大于显示页数了
               var middle = current - Math.floor(showItem / 2), //从哪里开始
                    i = showItem;
               if (middle > allpage - showItem) {
                    middle = allpage - showItem + 1;
               }
               while (i--) {
                    pag.push(middle++);
               }
          }
          return pag;
     }
      
})

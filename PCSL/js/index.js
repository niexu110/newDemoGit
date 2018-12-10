$(function(){
     var newHtml,actHtml,id=0;
     // 行业资讯
     _ajax.post(api.getNewsList, {page: 1,pageSize: 3},function(res){
          if(res.code==200){
               res.data.forEach((key,index) => {
                    if(index==0){
                         $('.information-box-left').append(
                              "<img src="+key.image+"><p>"+key.title+"</p>"
                         )
                         id = key.newsid
                    }else{
                         $('.information-box-right').append(
                              "<a href='html/information.html?id=" + key.newsid +"' class='information-right-div'><div class= 'information-left-img lt '>"+
                              "<img src=" + key.image + " ><p>" + key.title + "</p></div>"+
                              "<div class='information-text-box lt'>"+
                              "<h5>" + key.title + "</h5><p>"+key.des+"</p></div></a>"
                         )
                    }
               });
          }
          $('.information-box-left').click(function(){
               skip('html/information.html?id='+id)
          })
     })
     // 搜恋活动
     _ajax.post(api.getActivityListForPc, { page: 1, pageSize: 3 }, function (res) {
          if(res.code==200){
               res.data.forEach(key => {
                    actHtml = "<div class='activity-item'><div class='activity-item-img'>"+
                         "<img src=" + key.image +" ></div>"+
                         "<p class='activity-item-title'>" + key.title+"</p>"+
                         "<p class='activity-item-txt'>"+key.des+"</p>"+
                         "<a href='html/action.html?id=" + key.activityId +"' class='activity-look hover-wayras hover-inverteds'> 查看详情</a></div >" 
                     $('.activity-container').append(actHtml)
               });
          }
     })
})
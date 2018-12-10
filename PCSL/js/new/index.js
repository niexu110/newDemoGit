$(function(){
     var id =getQueryString('id');
      if(id==null){
            skip('https://www.solian.cc/')
      }else{
            _ajax.post(api.getNewsDetail, { newsId: id }, function (res) {
                  if (res.code == 200) {
                        $('.action-title').html(res.data.current.title)
                        $('.date').html('日期:' + res.data.current.createtime)
                        $('.user').html('发布人:' + res.data.current.publisher)
                        $('.action-text').html(res.data.current.content)
                  }
            })
      }
     
})
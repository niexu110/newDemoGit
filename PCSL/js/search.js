$(function(){
     var htmlM, code = 0, citys = [],cityPrice=[], proper=[],price,pName;
     var myChart = echarts.init(document.getElementById("map"));
     myChart.setOption(maps)
     $.ajax({
          url:'../city.json',
          type:"GET",
          data:{},
          success:function(res){
               citys=res.citylist
               citys.forEach(key => {
                    htmlM = '<option value=' + key.code+'>'+key.name+'</option>'
                    $('.selects').append(htmlM)
               });
               $('.selects').change(function(){
                    code=$(this).val();
                    $('.citys').html('')
                    $('.proper').html('')
                    citys.forEach(function(key){
                         if(key.code==code){
                              pName = key.name
                         }
                    })
                    if(code!=0){
                         _ajax.post(api.joinSearch, { province: code },function(res){
                              $('.city-box').css('display','block');
                              $('.province').html(pName)
                              price = res.data.provinceMoney
                              $('.prices').html(price)
                              res.data.city.forEach(function(key){
                                   proper.push(key.district);
                                   cityPrice.push(key.money)
                                   citys.push(key.name);
                                   $('.citys').append(
                                        '<li>'+key.name+'</li>'
                                   )
                              })
                              $('.citys li').click(function () {
                                  var index=$(this).index();
                                   $('.prices').html(cityPrice[index]);
                                   $(this).addClass('active').siblings().removeClass('active')
                                   sortProper(proper[index])
                              })
                         }) 
                    }  
               }) 
               
          }
     })
     $('.closed').click(function(){
          $('.city-box').css('display','none')
     })
     function sortProper(item){
          $('.proper').html('')
          item.forEach(function (key) {
               $('.proper').append(
                    '<li  alt='+ key.money+'>' + key.name + '</li>'
               )
          })
          $('.proper li').click(function(){
               $(this).addClass('active').siblings().removeClass('active')
               $('.prices').html($(this).attr('alt'));
          })
     }
    var username = '', phone = '', isInvest = false, isName = false, isPhone = false;
    $('.league-box input').blur(function () {
        var _this = $(this);
        if (_this.attr('name') == 'username') {
            checkName(_this.val()) ? (username = _this.val(), isName = true) : isName = false;
        } else {
            checkPhone(_this.val()) ? (phone = _this.val(), isPhone = true) : isPhone = false;
        }
        isName && isPhone ? isInvest = true : isInvest = false
    })
    $('.subInvest').click(function () {
        if (isInvest) {
            _ajax.post(api.joinApply, { contact: username, phone: phone }, function (res) {
                if (res.code == 200) {
                    $('.alert').fadeIn(100);
                    $('.alert-box').removeClass('alertA').addClass('alertB');
                    $('.alert-txt').html(res.message)
                }
            })
        } else {
            $('.alert').fadeIn(100);
            $('.alert-box').removeClass('alertA').addClass('alertB');
            $('.alert-txt').html('请填写信息');
        }
    });
    $('.alert-close,.alert-btn').click(function () {
        $('.alert').fadeOut(100);
        $('.alert-box').removeClass('alertB').addClass('alertA');
    })
})
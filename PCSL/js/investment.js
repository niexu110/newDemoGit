$(function(){
     var  username= '',phone='',isInvest=false,isName=false,isPhone=false;
     $('.league-box input').blur(function(){
          var _this=$(this)
          if (_this.attr('name') =='username'){
               checkName(_this.val()) ? (username = _this.val(), isName = true) :isName = false;
          }else{
               checkPhone(_this.val()) ? (phone=_this.val(),isPhone = true ): isPhone = false;   
          }
          isName && isPhone ? isInvest = true :isInvest = false
     }) 
     $('.subInvest').click(function(){
          if (isInvest){
               _ajax.post(api.joinApply, {contact:username,phone:phone},function(res){
                   if(res.code==200){
                        $('.alert').fadeIn(100);
                        $('.alert-box').removeClass('alertA').addClass('alertB');
                        $('.alert-txt').html(res.message) 
                   }
               })
          }else{
               $('.alert').fadeIn(100);
               $('.alert-box').removeClass('alertA').addClass('alertB');
               $('.alert-txt').html('请填写信息');  
          }
     });
     $('.alert-close,.alert-btn').click(function(){
          $('.alert').fadeOut(100);
          $('.alert-box').removeClass('alertB').addClass('alertA');
     })
    $('.skipT').click(function(){
        skip('addsearch.html')
    })
})
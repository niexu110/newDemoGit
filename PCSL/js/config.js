
$(function () {
     const useInfo = getLoc('useInfo');
     if (useInfo == null) {
          $('.nav-bar-logins').show()
          $('.nav-bar-login').hide()
     } else {
          $('.nav-bar-login').show()
          $('.nav-bar-logins').hide()
          $('.userName').html(useInfo.nickname)
     }
     $('.out').click(function () {
          clearKey('useInfo');
          $('.nav-bar-logins').show()
          $('.nav-bar-login').hide()
     })
     $('.wx,.wxImg').hover(function () {
          $('.wxImg').removeClass('wx-img').addClass('wx-imgs')
     }, function () {
          $('.wxImg').removeClass('wx-imgs').addClass('wx-img')
     });
     $('.phone,.pNumber').hover(function () {
          $('.pNumber').removeClass('phoneNumber').addClass('phoneNumbers')
     }, function () {
          $('.pNumber').removeClass('phoneNumbers').addClass('phoneNumber')
     });
     $('.top').click(function(){
          var top = document.documentElement.scrollTop ||
               document.body.scrollTop;
          var timer = setInterval(function () {
               top -= 100;
               document.documentElement.scrollTop = top
               if (top < 0) {
                    clearInterval(timer)
               }
          }, 10)
     })
     window.addEventListener("scroll",function(){
          var top =
               document.documentElement.scrollTop ||
               document.body.scrollTop;
          if (top > 500) {
               $('.top').css('display','block')
          } else {
               $('.top').css('display', 'none')
          }
     });
})
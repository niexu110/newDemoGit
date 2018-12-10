$(function () {
     var current = 1, showItem = 5, allpage = 0, pageHtml = '';
     _ajax.post(api.getActivityListForPc, { page: current, pageSize: 6 }, function (res) {
          if (res.code == 200) {
               allpage = parseInt(res.dataCount / 6) + 1;
               pages();
               res.data.forEach(function (key, index) {
                    $('.action-container').append("<div class='action-item'><div class= 'action-img' >" +
                         "<img src=" + key.image + "></div>" +
                         "<div class='action-txt'>" +
                         "<h2>" + key.title + "</h2><p>" + key.des + "</p>" +
                         "<span class='activity-look hover-wayras hover-inverteds'>查看详情</span></div></div >")
               });
               $('.action-item').click(function () {
                    skipInformation(res.data[$(this).index()])
               });
          }
     })
     function skipInformation(item) {
          skip('action.html?id=' + item.activityId)
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
          for (var j = 0; j < pag.length; j++) {
               pageHtml += "<li class='pageIndex' alt=" + pag[j] + "><span>" + pag[j] + "</span></li>"
          }
          $('.pagination').append('<li class="next"><span>＜</span></li>' + pageHtml + '<li class="pre"><span>＞</span></li><span>共' + (allpage) + '页</span>')
          $('.pagination').find('li').eq(current).addClass('active').siblings().removeClass('active')
          $('.pagination').on('click', '.next', function () {
               current--;
               if (current > 0) {
                    $('.pagination').find('li').eq(current).addClass('active').siblings().removeClass('active')
               } else {
                    $('.alert').fadeIn(100);
                    $('.alert-box').removeClass('alertA').addClass('alertB');
                    $('.alert-txt').html('已经是第一页')
               }
          })
          $('.pagination').on('click', '.pre', function () {
               if (current <allpage) {
                    current++;
                    $('.pagination').find('.pageIndex').eq(current).addClass('active').siblings().removeClass('active')
                    pushHtml(current)
                    if (current >= 5) {
                         $('.pagination').find('li').eq(5).addClass('active').siblings().removeClass('active')
                         $('.pagination').html('');
                         pageHtml = '';
                         pages();
                    }
               } else  {
                    if (current > allpage){
                         $('.alert').fadeIn(100);
                         $('.alert-box').removeClass('alertA').addClass('alertB');
                         $('.alert-txt').html('已经是最后一页')
                    }
               }
          })
          $('.pageIndex').click(function () {
               current = $(this).attr('alt');
               $(this).addClass('active').siblings().removeClass('active');
               $('.action-container').html('')
               pushHtml(current)
          })
     }
     function pushHtml(id) {
          _ajax.post(api.getActivityListForPc, { page: id, pageSize: 6 }, function (res) {
               if (res.code == 200) {
                    $('.action-container').html('')
                    allpage = parseInt(res.dataCount / 6) + 1;
                    res.data.forEach(function (key, index) {
                         $('.action-container').append("<div class='action-item'><div class= 'action-img' >" +
                              "<img src=" + key.image + "></div>" +
                              "<div class='action-txt'>" +
                              "<h2>" + key.title + "</h2><p>" + key.des + "</p>" +
                              "<span class='activity-look hover-wayras hover-inverteds'>查看详情</span></div></div >")
                    });
                    $('.action-item').click(function () {
                         skipInformation(res.data[$(this).index()])
                    });
               }
          })
     }
     $('.alert-close,.alert-btn').click(function () {
          $('.alert').fadeOut(100);
          $('.alert-box').removeClass('alertB').addClass('alertA');
     })
})
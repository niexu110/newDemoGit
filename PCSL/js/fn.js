var _ajax = {
    get: function (urls, data, success) {
        $.ajax({
            type: "GET",
            url: 'http://192.168.1.22:8080/solianjava/' + urls,
            data: data,
            success: function (res) {

                success ? success(res) : function () { };
            }
        })
    },
    post: function (urls, data, success) {
        // https://mpj.solian.cc/solianjava/
        $.ajax({
            type: "POST",
            url: 'https://mpj.solian.cc/solianjava/' + urls,
            data: data,
            crossDomain: true == !(document.all),
            success: function (res) {
                success ? success(res) : function () { };
            }
        })
    },
};
function getQueryString(name) {
    var reg = new RegExp('(^|[&|?])' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function skip(url) {
    window.location.href = url;
};
// 验证手机号
 function checkPhone(phone) {
     return !!/^1[3578]\d{9}$/.test(phone);
}
 function checkName(username) {
     return !!/^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,8}$))/.test(username);
}

// 验证密码
 function checkPsd(psd) {
     return !!/^([!-~]){4,18}$/.test(psd);
}
 function showEl(txt, ms) {
     const el = document.getElementById('popup');
     el.style.display = 'block'
     el.innerHTML = txt;
     return setTimeout(() => {
          el.style.display = 'none'
     }, ms);
}
 function showPop() {
     const el = document.getElementById('pop');
     el.style.display = 'block'
}
// 向localStorage存入数据
 function setLoc(k, val) {
     if (typeof val == 'string') {
          localStorage.setItem(k, val);
          return val;
     } else {
          localStorage.setItem(k, JSON.stringify(val));
          return val;
     }
}
// 从localStorage里面获得数据
 function getLoc(k) {
     let uu = localStorage.getItem(k);
     try {
          if (typeof JSON.parse(uu) != 'number') {
               uu = JSON.parse(uu);
          }
     } catch (e) { }
     return uu;
}
// 删除
 function clearKey(k) {
     if (k) {
          localStorage.removeItem(k)
     } else {
          localStorage.clear();
     }
}
function add0(m) {
     return m < 10 ? '0' + m : m
}
// 时间戳
 function format(timer, type) {
     var time = new Date(timer * 1000);
     var y = time.getFullYear();
     var m = time.getMonth() + 1;
     var d = time.getDate();
     var h = time.getHours();
     var mm = time.getMinutes();
     var s = time.getSeconds();
     // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
     var times;
     if (type == 0) {
          times = y + '/' + add0(m) + '/' + add0(d) + '';
     } else if (type == 1) {
          times = y + '-' + add0(m) + '-' + add0(d);
     }

     return times
}
 function citySort(proNum, cityNum) {
     var  citys = {};
     proNum ? proNum = proNum : proNum = 110000;
     cityNum ? cityNum = cityNum : cityNum = 110100;
     $.ajax({
         url:'../city.json',
         type:'GET',
         data:'',
         success:function(res){
             res.citylist.forEach(key => {
                 if (proNum == key.code) {
                     citys.province = key.name;
                     key.city.forEach(keys => {
                         if (cityNum == keys.code) {
                             citys.city = keys.name
                         }
                     })
                 }
             });
         }
     })
     return citys;

}
 function seeCity(cityNum) {
     cityNum ? cityNum = cityNum : cityNum = 110100;
     var city = '';
     $.ajax({
         url: '../city.json',
         type: 'GET',
         data: '',
         success: function (res) {
             res.citylist.forEach(key => {
                 key.city.forEach(keys => {
                     if (cityNum == keys.code) {
                         city = keys.name
                     }
                 })
             });
         }
     })
     return city;

}
 function citylist() {
     var citys = {}, cityObj = [], codeObj = [];
     citys.province = [];
     citys.provinces = [];
     citys.proCode = []
     citys.cityCode = []
     citys.city = [];
     $.ajax({
         url: '../city.json',
         type: 'GET',
         data: '',
         success: function (res) {
             res.citylist.forEach((key, index) => {
                 citys.province.push(key.name)
                 citys.provinces.push(key)
                 citys.proCode.push(key.code)
                 cityObj.push(key.city)
                 codeObj.push(key.city)
             });
             cityObj.forEach((key, index) => {
                 citys.city.push([])
                 citys.cityCode.push([])
                 cityObj[index].forEach(val => {
                     citys.city[index].push(val.name)
                     citys.cityCode[index].push(val.code)
                 })
             })
         }
     })
     console.log(citys)
     return citys;
}
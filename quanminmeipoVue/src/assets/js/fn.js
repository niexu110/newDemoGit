
// 验证手机号
export function checkPhone(phone) {
     return !!/^1[3578]\d{9}$/.test(phone);
}
// 验证密码
export function checkPsd(psd) {
     return !!/^([!-~]){6,18}$/.test(psd);
}
export function showEl(txt,ms) {
     const el = document.getElementById('popup');
      el.style.display='block'
      el.innerHTML=txt;
      return setTimeout(() => {
          el.style.display='none' 
      }, ms);
}
export function showPop() {
    const el = document.getElementById('pop');
    el.style.display = 'block'   
}
// 向localStorage存入数据
export function setLoc(k, val) {
    if (typeof val == 'string') {
        localStorage.setItem(k, val);
        return val;
    } else {
        localStorage.setItem(k, JSON.stringify(val));
        return val;
    }
}
// 从localStorage里面获得数据
export function getLoc(k) {
    let uu = localStorage.getItem(k);
    try {
        if (typeof JSON.parse(uu) != 'number') {
            uu = JSON.parse(uu);
        }
    } catch (e) { }
    return uu;
}
// 删除
export function clearKey(k) {
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
export function format(timer,type) {
    var time = new Date(timer * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    var times;
    if(type==0){
        times = y + '/' + add0(m) + '/' + add0(d) + '';
    }else if(type==1){
        times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }
    
    return times
}

export function citySort(proNum,cityNum){
    const cityJson = require('../../../static/city.json');
    proNum ? proNum = proNum : proNum =110000;
    cityNum ? cityNum = cityNum : cityNum =110100;
    let citys={};
    cityJson.citylist.forEach(key => {
        if (proNum==key.code){
            citys.province=key.name;
             key.city.forEach(keys=>{
                 if (cityNum == keys.code){
                     citys.city=keys.name
                 }
            }) 
        }
    });
    return citys;

}
export function seeCity(cityNum) {
    const cityJson = require('../../../static/city.json');
    cityNum ? cityNum = cityNum : cityNum = 110100;
    let city='';
    cityJson.citylist.forEach(key => {
            key.city.forEach(keys => {
                if (cityNum == keys.code) {
                     city = keys.name
                }
            })
    });
    return city;

}
export function citylist() {
    const cityJson = require('../../../static/city.json');
    let citys = {}, cityObj = [], codeObj = [];
        citys.province=[];
        citys.proCode=[]
        citys.cityCode=[]
        citys.city=[]
    cityJson.citylist.forEach((key,index) => {
        citys.province.push(key.name)
        citys.proCode.push(key.code)
        cityObj.push(key.city)
        codeObj.push(key.city)
    });
    cityObj.forEach((key,index)=>{
        citys.city.push([])
        citys.cityCode.push([])
        cityObj[index].forEach(val=>{
            citys.city[index].push(val.name)
            citys.cityCode[index].push(val.code)
        })
    })
    return citys;
}
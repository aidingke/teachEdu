import Vue from 'vue';

Vue.prototype.isIos = () => { //判断设备
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) { //false一律为安卓机型 安卓机型五花八门 型号众多 
      return false 
    } else if( isiOS ) { //为true都是苹果设备苹果内核单一
      return true 
    }  
}
Vue.prototype.getUrlParams = () =>{
    var getStrArr = window.location.href.split("?");  //取得Get参数
    var getParamArr = {};
    if(getStrArr.length > 1){
        var paramArr = getStrArr[1].split("&");
        for(var i=0, n=paramArr.length; i<n; i++){
            var paramKey = paramArr[i].split("=");  //分离key与Value+
            getParamArr[paramKey[0]] = paramKey[1];
        }
    }
    return getParamArr;
}
Vue.prototype.isDevice = () => {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return 'mobile'
    }else{
        return 'pc'
    }
}


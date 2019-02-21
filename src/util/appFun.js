export default{
    appToken () {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) { //false一律为安卓机型 安卓机型五花八门 型号众多 
            //android.orderlist('')
            console.log('android','++')
            
        } else if( isiOS ) { //为true都是苹果设备苹果内核单一

            console.log('ios','--')
        }  
    }
}
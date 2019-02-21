/* 
* name: api请求配置
* author: gxr
* time: 2018-8-28
*/

const java_api = 'http://192.168.1.200'; //java接口
// const uploadimgs_api = 'http://192.168.1.200/edu/teach/uploadImg'; //上传图片接口
// const upcourseware_api = 'http://192.168.1.200/edu/teach/courseWare/upload'; //上传课件接口

export default {
    java_api,
    uploading_courseware: location.hostname === 's.laijingedu.cn' ? 'https://s.laijingedu.cn' : 'http://192.168.1.200', //上传课件
    php_api: location.hostname === 's.laijingedu.cn' ? 'https://api.wanguoqiche.com/': 'http://devapi.demo.com', //php接口
    circuitry_api: location.hostname === 's.laijingedu.cn' ? 'https://circuitry.wanguoqiche.com/': 'http://192.168.1.200:8001',//php电路图
    img_api: location.hostname === 's.laijingedu.cn' ? 'https://s.laijingedu.cn/eduFiles/': 'http://192.168.1.200/eduFiles/',//前端图片URL前缀
    //uploadimgs_api,
    //upcourseware_api
}
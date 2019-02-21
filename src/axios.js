/* 
* name: api请求地址
* author: 
* time: 2018-8-28
* remark: axios基本请求用java_api，PHP的接口用php_api
*/
import $http from 'axios'
import qs from 'qs'
// import { dialog } from './common/warningDialog'
import appFun from './util/appFun.js'
import baseURL from './apiconfig'
import router from './router/index.js';
import { dialog } from './common/dialog.js';

// if (process.env.NODE_ENV == 'production') {
//     $http.defaults.baseURL= 'https://s.laijingedu.cn/';
// }

$http.interceptors.response.use(response => {
    const {code,message} = response.data;
    /* if(code!==1000 && code !== 20000 && code !== 20400 && response.data.error_code != 0){            //如果返回不成功的信息 就提示警告信息
        dialog(message) //20000是PHP接口成功的状态码, error_code = 0是电路图接口成功的状态码
    } */
    console.log(response.config.url,'***');
    if(code===100){     //java token过期需要重新登录
        if (response.config.url !== '/edu/comm/permission/list') {
            if (!document.querySelector('.warning-dialog')) {
                dialog('登录超时，请重新登录')
            }
            //alert(3)
            router.push({ 
                path:'Login'
            })
            return Promise.reject(); 
        }
    }

    if(code===40100){
        $http.post('/edu/comm/php/token',qs.stringify({
            vtrId:sessionStorage.getItem('iosFlag')===true?'99e40ec93f2d7440761769ccf5a382bc':'f6a9027f4e9d4c2019f28b55983db501'
        })).then(data =>{
            resolve(data)
        })
    }

    if(code===1100 && message==='该设备已经绑定过，无需在绑定'){
        location.href = '/#/Home';
    }
    return response.data;
});

//拦截token判断
$http.interceptors.request.use(function (config) {
    if(config.url.indexOf('edu') > -1){         //Java接口才需要加accessToken
        config.headers.accessToken = localStorage.getItem("accessToken")//将接口返回的token信息配置到接口请求中
    }
    // if(config.url.indexOf(baseURL.php_api) == -1){
        
    // } else if (config.url.indexOf(baseURL.circuitry_api) == -1) {

    // } else {
    //     config.headers.accessToken = sessionStorage.getItem("accessToken")//将接口返回的token信息配置到接口请求中
    // }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default {
    //登录
    getLogin(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/login',params).then(data => {
                resolve(data)
            })
        })
    },
    //绑定设备号
    getBind(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/device/bind',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取老师版比赛列表
    getTeachMatchList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/list',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //添加比赛
    editTeachMath(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/match/edit', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取教师版比赛组列表
    getMatchGroupList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/groupList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取教师版比赛组详情
    getMatchDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/detail',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //添加教师版比赛组
    editMatchGroup(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/editGroup', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取教师版比赛分组获取成员列表
    getGroupStuList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/groupStuList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取教师版比赛考核列表
    getMatchResultList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/resultList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //导出教师版比赛结果
    exportMatchResult(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/exportExcel',qs.stringify(params), {responseType: 'blob'}).then(data => {
                resolve(data)
            })
        })
    },
    //获取班级列表
    getClassList(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/class/list',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //题库-获取该老师所教班级列表
    getQuestBankClassList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/questBank/classList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取课件综合排序
    getCourSewareIndex(params){
        return new Promise(resolve => {
            $http.get('/Common/Helper/index',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //学生比赛考试答题列表
    getMatchTestList(params){
        return new Promise(resolve => {
            $http.get('/edu/match/testList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取科目列表
    getSubjectList(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/subject/list',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //科目管理-新增/编辑科目
    getSubjectEdit(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/subject/edit',params).then(data => {
                resolve(data)
            })
        })
    },
    //科目管理-删除科目
    getSubjectDele(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/subject/delete',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //角色管理-获取角色列表
    getRoleList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/role/list',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //角色管理-获取角色信息
    getRoleDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/role/detail',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //角色管理-新增/编辑角色
    getRoleEdit(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/role/edit',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //角色管理-删除角色
    getRoleDele(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/role/delete',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取权限列表
    getPermission(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/permission/list',params).then(data => {
                resolve(data)
            })
        })
    },
    //师资管理-老师列表
    getTeacherList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/list',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })  
    },
    //师资管理-新增/编辑老师
    getTeacherEdit(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/editStu', params).then(data => {
                resolve(data)
            })
        })  
    },
    //师资管理-获取老师详情
    getTeacherDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/detail',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })  
    },
    //新增教师/学生时 自动生成密码
    getGenerPwd(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/generPwd',params).then(data => {
                resolve(data)
            })
        })  
    },
    //获取老师班比赛管理列表
    getTeachMatchList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/list',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //上传教师课件
    addCourWare(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/courseWare/upload', params).then(data => {
                resolve(data)
            })
        })
    },
    //新增/编辑比赛成员
    editMatchStu(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/match/editStu', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取比赛个人资料
    getMatchPersonInfo(params) {
        return new Promise(resolve => {
            $http.post('/edu/stu/match/personInfo', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //上传各类试题
    addKind(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/quest/addKind', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取题库列表
    getKindList(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/quest/kindList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
  //比赛管理-添加比赛成员(在校学生)
    addMathSchoolStu(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/match/addSchoolStu', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //比赛管理-删除比赛分组
    delGroup(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/match/delGroup', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取班级课程表下的故障现象
    getFaultsAdd(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/fault/add', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取班级课程表下的故障现象
    getFaultsList(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/fault/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取所有老师信息
	getTeachList(params){
		return new Promise(resolve => {
            $http.post('/edu/comm/teach/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //班级管理-新增/编辑班级
	classEdit(params){
		return new Promise(resolve => {
            $http.post('/edu/teach/class/edit', params).then(data => {
                resolve(data)
            })
        })
    },
    //班级管理-新增/编辑班级
	getClassDetail(params){
		return new Promise(resolve => {
            $http.post('/edu/teach/class/detail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //比赛管理-删除比赛组成员
    delMatchStu(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/match/delStu', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //班级管理-删除学生
    delClassStu(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/class/delStu', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取班级学生列表
    getStuList(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/stu/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //视频管理列表
    getVideoList(params) {
        return new Promise(resolve => {
            $http.post('/edu/teach/video/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取学生-比赛管理列表
    getStuMatchList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/match/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },

    //获取某班级的课程表信息
    getCourseList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/course/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //新增某班级的课程表信息
    addCourse(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/course/add', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //删除某班级的课程表信息
    courseDelete(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/course/delete', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取课件列表
    getCourseWareList(params) {
        return new Promise(resolve => {
            $http.post('/edu/comm/teach/courseList', params).then(data => {
                resolve(data)
            })
            
        })
    },
    //比赛管理-实操评分
    addOperResult(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/addOperResult', params).then(data => {
                resolve(data)
            })
        })
    },
    //个人资料 信息
    personInfo(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/person/info', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //个人资料 修改
    personMod(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/person/mod', params).then(data => {
                resolve(data)
            })
        })
    },
    //我的简介 获取信息
    getResume(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/resume/detail', params).then(data => {
                resolve(data)
            })
        })
    },
    //我的简介 修改
    editResume(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/resume/addOrEdit', params).then(data => {
                resolve(data)
            })
        })
    },
    //我的简历 投递
    getJob(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/resume/getJob', params).then(data => {
                resolve(data)
            })
        })
    },   
    //获取PHP云帮手token
    getPHPToken(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/php/token', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //比赛管理-比赛实操详情
    getPracticalDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/match/practicalDetail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    }, 
    //比赛管理-获取学生版比赛组列表
    getStuMatchGroupList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/match/group', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //比赛管理-获取学生版比赛组成员列表
    getStuGroupStuList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/match/groupStuList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //比赛管理-学生版-比赛考试答题列表
    getStuMatchTestList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/match/testList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //班级管理-新增/编辑学生
    getStuEdit(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/class/editStu', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取视频详情
    getVideoDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/video/detail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取视频播放许可
    getVideoPlayAuth(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/OwnShopMng/ServantInfo/getVideoPlayAuth', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取车品牌列表
    getBrandList(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Common/Car/getBrandList', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取车系列表
    getLineList(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Common/Car/getLineList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取排量列表
    getCcList(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Common/Car/getCcList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取生产年份列表
    getProduceYearList(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Common/Car/getProduceYearList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取云帮手列表
    getHelperIndex(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Common/Helper/index',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //城市
    getAreaList(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Common/Region/getAreaList',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取电路图列表
    getCircuitList(params){
        return new Promise(resolve => {
            $http.get(baseURL.circuitry_api+ '/circuit/getListByYun', {'params': params}).then(data => {
                resolve(data)
            })
        })
    },
    //新增试题
    addTestPaper(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/quest/add', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取题库列表
    getTestPaperList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/questBank/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取考核信息列表(学生版的)
    getExamEduList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/exam/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取考核信息列表(教师版的)
    getExamList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/exam/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //导出教师版 考试成绩
    exportExamResult(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/exam/exportExcel',qs.stringify(params), {responseType: 'blob'}).then(data => {
                resolve(data)
            })
        })
    },
    //获取作业信息列表 老师
    getHomeworkList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/homework/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
     //获取作业信息列表 学生
     getStuHomeworkList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/task/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取试题详情
    getTestPaperDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/qc/detail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //老师版获取试题详情，只做查看不能修改
    getTeachPaperDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/quest/detail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取电路图详情
    getCircuit(params){
        return new Promise(resolve => {
            $http.get(baseURL.circuitry_api+ '/circuit/getCircuit', {'params': params}).then(data => {
                resolve(data)
            })
        })
    },
    //获取云帮手菜单
    getHelperMenu(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/Helper/index', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取机油信息
    getHelperOil(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/HelperOil/index', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取波箱油信息
    getHelperGearbox(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/HelperGearbox/index', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取电池信息
    getHelperCell(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/HelperCell/index', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取维修案列表
    getHelperRepairCase(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/HelperRepairCase/index', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取维修案列列表详情
    getHelperRepairCaseDetail(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/HelperRepairCase/getDetail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取复位教程
    getOilReset(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Helper/HelperOil/getOilReset', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    
     //诊断列表
    getDitList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/dig/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取教师版诊断列表
    getTeachDitList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/diagnose/stuList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //诊断列表--录入检测数据
    DitAdd(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/dig/add', params).then(data => {
                resolve(data)
            })
        })
    },
    //教师版数据诊断详情---新增教师评语 
    TeachDigAddComment(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/diagnose/addComment', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //教师版数据诊断详情---新增教师评分 
    TeachDigAddScore(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/diagnose/addScore', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //数据诊断详情
    DitDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/dig/detail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //诊断项目列表
    getDitItemList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/dig/itemList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //教师版数据诊断列表
    getTeachDiagnoseList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/diagnose/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //诊断科目判断是否有课
    getDitCheck(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/dig/check', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //登录用户修改密码
    changePwd(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/person/changePwd', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //学生提交试卷
    studentSubmitAnswers(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/qc/submitAnswer', params).then(data => {
                resolve(data)
            })
        })
    },
    //ExerciseList 学生做的练习题列表
    ExerciseList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/qc/praticeList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //老师课程表
    getTeachCourseList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/course/teachCourseList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    // 学生已提交的试题(已交卷) 
    getCommitExamInfo(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/commitExamInfo', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //登陆者的权限列表
    getPersonPermiss(params){
        return new Promise(resolve => {
            $http.post('/edu/comm/permission/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //考核/作业对应班级学生列表
    getTeachTaskDetails(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/examwork/classList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    // 新增批卷评分评语
    addExamComment(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/examComment/add', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取技术培训教师列表
    getTeachTrainList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/train/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取技术培训学生列表
    getStuTrainList(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/train/list', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
   //获取技术培训学生或教师详情
   getTeachTrainDetail(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/train/detail', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //新增教师技术培训
   TeachTrainAdd(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/train/add', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //技术培训学生列表
   getTeachTrainStuList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/train/stuList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
     //技术培训学生列表
   stuTrainJoin(params){
        return new Promise(resolve => {
            $http.post('/edu/stu/train/join', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    // 考核/作业-老师评卷提交
    addExamworkComment(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/examwork/commit', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //技术培训学生列表
    teachClassCouresList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/class/couresList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取比赛校外学生列表
    getMathOtherStuList(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/match/otherStuList', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //课件管理-删除课件 https://www.mhace.com/edu/teach/courseWare/delete
    delCourWare(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/courseWare/delete',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //删除试题 https://www.mhace.com/edu/teach/quest/delete  questId	是	string	试题id
    deleAnswers(params){
        return new Promise(resolve => {
            $http.post('/edu/teach/quest/delete',qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    //获取社会实践列表内容
    getStuSocialPractice(params){
        return new Promise(resolve => {
            $http.post(baseURL.php_api + '/Servant/CommonServant/userInfo', qs.stringify(params)).then(data => {
                resolve(data)
            })
        })
    },
    
}
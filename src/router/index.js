import Vue from 'vue'
import Router from 'vue-router'
import CourseWare from '@/components/technology/CourseWare'
Vue.use(Router)

export default new Router({
  routes: [
    /**
     * [公共组件=>头部]
     */
    {
        path: '/Header',
        name: 'Header',
        component: resolve => require(['@/common/Header'],resolve)
    },
    /**
     * [公共组件=>成功提示]
     */
    {
        path: '/SuccessDialog',
        name: 'SuccessDialog',
        component: resolve => require(['@/common/SuccessDialog'],resolve)
    },
    /**
     * [公共组件=>确认框]
     */
    {
        path: '/ConfirmDialog',
        name: 'ConfirmDialog',
        component: resolve => require(['@/common/ConfirmDialog'],resolve)
    },
    /**
     * [公共组件=>底部按钮]
     */
    {
        path: '/FixedButton',
        name: 'FixedButton',
        component: resolve => require(['@/common/FixedButton'],resolve)
    },
    /**
     * [公共组件=>成功并确认框]
     */
    {
        path: '/SuccessConfirmDialog',
        name: 'SuccessConfirmDialog',
        component: resolve => require(['@/common/SuccessConfirmDialog'],resolve)
    },
    /**
     * [公共组件=>知道了确认框]
     */
    {
        path: '/SuccessTip',
        name: 'SuccessTip',
        component: resolve => require(['@/common/SuccessTip'],resolve)
    },
    {
        path: '/PDF_demo',
        name: 'PDF_demo',
        component: resolve => require(['@/components/PDF_demo'],resolve)
    },
    /**
     * [公共组件=>错误警告弹框]
     */
    {
        path: '/WarningDialog',
        name: 'WarningDialog',
        component: resolve => require(['@/common/WarningDialog'],resolve)
    },
    /**
     * [公共组件=>暂无相关信息]
     */
    {
        path: '/NotInfo',
        name: 'NotInfo',
        component: resolve => require(['@/common/NotInfo'],resolve)
    },
    /**
     * [重新登录]
     */
    {
        path: '/ReLogin',
        name: 'ReLogin',
        component: resolve => require(['@/components/ReLogin'],resolve)
    },
    {
        path: '/Demo',
        name: 'Demo',
        component: resolve => require(['@/components/Demo'],resolve)  
    },
    /**
     * [启动页]
     */
    {
        path: '/',
        name: 'StartPage',
        component: resolve => require(['@/components/StartPage'],resolve)
    },
    /**
     * [绑定设备号]
     */
    {
        path: '/BindDevice',
        name: 'BindDevice',
        component: resolve => require(['@/components/BindDevice'],resolve)
    },
    /**
     * [登录页]
     */
    {
        path: '/Login',
        name: 'Login',
        component: resolve => require(['@/components/Login'],resolve)
    },
    /**
     * [首页]
     */
    {
        path: '/Home',
        name: 'Home',
        component: resolve => require(['@/components/Home'],resolve)
    },
    /**
     * [广告页]
     */
    {
        path: '/Advertisement',
        name: 'Advertisement',
        component: resolve => require(['@/components/Advertisement'],resolve)
    },
    /**
     * [班级课程表]
     */
    {
        path: '/ClassTableData',
        name: 'ClassTableData',
        component: resolve => require(['@/components/ClassTableData'],resolve)
    },
    /**
     * [数据诊断]
     */
    {
        path: '/DataDiagnosis',
        name: 'DataDiagnosis',
        component: resolve => require(['@/components/DataDiagnosis'],resolve)
    },
    /**
     * [教师版数据诊断---详情]
     */
    {
        path: '/TeachDiagnosticDetail',
        name: 'TeachDiagnosticDetail',
        component: resolve => require(['@/components/TeachDiagnosticDetail'],resolve)
    },
    /**
     * [诊断列表]
     */
    {
        path: '/DiagnosticList',
        name: 'DiagnosticList',
        component: resolve => require(['@/components/DiagnosticList'],resolve)
    },
    /**
     * [教师版数据诊断列表]
     */
    {
        path: '/TeachDiagnosticList',
        name: 'TeachDiagnosticList',
        component: resolve => require(['@/components/TeachDiagnosticList'],resolve)
    },
    /**
     * [录入检测数据]
     */
    {
        path: '/EntryTestData',
        name: 'EntryTestData',
        component: resolve => require(['@/components/EntryTestData'],resolve)
    },
    /**
     * [检测数据]
     */
    {
        path: '/TestData',
        name: 'TestData',
        component: resolve => require(['@/components/TestData'],resolve)
    },
    /** 
     * [课程表]
     */
    {
        path: '/ClassTable',
        name: 'ClassTable',
        component: resolve => require(['@/components/ClassTable'],resolve)
    },
    /**
     *  [选择班级]
     */
    {
        path: '/SelectClass',
        name: 'SelectClass',
        component: resolve => require(['@/components/SelectClass'],resolve)
    },
    /**
     *  [师资管理 => 师资管理页面]
     */
    {
        path: '/TeacherManage',
        name: 'TeacherManage',
        component: resolve => require(['@/components/TeacherManage/TeacherManage'],resolve)
    },
    /**
     *  [师资管理 => 个人资料]
     */
    {
        path: '/TeacherInfo',
        name: 'TeacherInfo',
        component: resolve => require(['@/components/TeacherManage/TeacherInfo'],resolve)
    },
    /**
     *  [师资管理 => 教师详情]
     */
    {
        path: '/TeacherDetail',
        name: 'TeacherDetail',
        component: resolve => require(['@/components/TeacherManage/TeacherDetail'],resolve)
    },
    /**
     *  [学生]
     */
    {
        path: '/Student',
        name: 'Student',
        component: resolve => require(['@/components/Student'],resolve)
    },
    /**
     *  [科目管理]
     */
    {
        path: '/SubjectManage',
        name: 'SubjectManage',
        component: resolve => require(['@/components/SubjectManage'],resolve)
    },
    /**
     *  [角色管理]
     */
    {
        path: '/RoleManage',
        name: 'RoleManage',
        component: resolve => require(['@/components/RoleManage'],resolve)
    },
    /**
     * [培训与考核]
     */
    {
        path: '/TrainingAndassessment',
        name: 'TrainingAndassessment',
        component: resolve => require(['@/components/TrainingAndassessment'],resolve)
    },
    /**
     * [比赛管理]
     */
    {
        path: '/MatchManage',
        name: 'MatchManage',
        component: resolve => require(['@/components/matchManage/MatchManage'],resolve)
    },
    /**
     * [比赛管理]
     * [比赛组]
     */
    {
        path: '/GroupList',
        name: 'GroupList',
        component: resolve => require(['@/components/matchManage/GroupList'],resolve)
    },
    /**
     * [比赛管理]
     * [比赛组成员]
     */
    {
        path: '/GroupMembers',
        name: 'GroupMembers',
        component: resolve => require(['@/components/matchManage/GroupMembers'],resolve)
    },
    /**
     * [比赛管理]
     * [选择组成员]
     */
    {
        path: '/SelectTeamMembers',
        name: 'SelectTeamMembers',
        component: resolve => require(['@/components/matchManage/SelectTeamMembers'],resolve)
    },
    /**
     * [比赛管理]
     * [比赛考核]
     */
    {
        path: '/AssessmentGame',
        name: 'AssessmentGame',
        component: resolve => require(['@/components/matchManage/AssessmentGame'],resolve)
    },
    /**
     * [比赛管理]
     * [比赛评分]
     */
    {
        path: '/SpeakingScore',
        name: 'SpeakingScore',
        component: resolve => require(['@/components/matchManage/SpeakingScore'],resolve)
    },
    /**
     * [比赛管理]
     * [个人信息]
     */
    {
        path: '/AddGroupMenbers',
        name: 'AddGroupMenbers',
        component: resolve => require(['@/components/matchManage/AddGroupMenbers'],resolve)
    },
    /**
     * [比赛管理]
     * [校外学生列表]
     */
    {
        path: '/OutsideSchoolStudentList',
        name: 'OutsideSchoolStudentList',
        component: resolve => require(['@/components/matchManage/OutsideSchoolStudentList'],resolve)
    },
    /**
     * [数字化教学资源]
     */
    {
        path: '/DigitalTeachingResources',
        name: 'DigitalTeachingResources',
        component: resolve => require(['@/components/digitalTeachingResources/DigitalTeachingResources'],resolve)
    },
    /**
     * [数字化教学资源]
     * [视频]
     */
    {
        path: '/VideoList',
        name: 'VideoList',
        component: resolve => require(['@/components/digitalTeachingResources/VideoList'],resolve)
    },
    /**
     * [数字化教学资源]
     * [视频详情]
     */
    {
        path: '/VideoDetails',
        name: 'VideoDetails',
        component: resolve => require(['@/components/digitalTeachingResources/VideoDetails'],resolve)
    },
    /**
     * [数字化教学资源]
     * [维修案例]
     */
    {
        path: '/MaintainCaseLibrary',
        name: 'MaintainCaseLibrary',
        component: resolve => require(['@/components/digitalTeachingResources/MaintainCaseLibrary'],resolve)
    },
    /**
     * [数字化教学资源]
     * [维修案例]
     * [故障点详情]
     */
    {
        path: '/MaintainCaseDetails',
        name: 'MaintainCaseDetails',
        component: resolve => require(['@/components/digitalTeachingResources/MaintainCaseDetails'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     */
    {
        path: '/IntegratedQuery',
        name: 'IntegratedQuery',
        component: resolve => require(['@/components/digitalTeachingResources/IntegratedQuery'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [选车型]
     */
    {
        path: '/SelectCarModels',
        name: 'SelectCarModels',
        component: resolve => require(['@/components/digitalTeachingResources/SelectCarModels'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [电路图详情]
     */
    {
        path: '/CircuitDetails',
        name: 'CircuitDetails',
        component: resolve => require(['@/components/digitalTeachingResources/CircuitDetails'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询详情]
     */
    {
        path: '/StreamingDetails',
        name: 'StreamingDetails',
        component: resolve => require(['@/components/digitalTeachingResources/StreamingDetails'],resolve)
    },
    /**
     * [个人中心]
     */
    {
        path: '/PerCenter',
        name: 'PerCenter',
        component: resolve => require(['@/components/Person/PerCenter'],resolve)
      },
    /**
     * [修改密码]
     */
    {
        path: '/PassWord',
        name: 'PassWord',
        component: resolve => require(['@/components/Person/PassWord'],resolve)
    },
    /**
     * [教师版 个人资料]
     */
    {
        path: '/PerTeachInfo',
        name: 'PerTeachInfo',
        component: resolve => require(['@/components/Person/PerTeachInfo'],resolve)
    },
    /**
     * [教师版 新增/编辑]
     */
    {
        path: '/TeaEditor',
        name: 'TeaEditor',
        component: resolve => require(['@/components/Person/TeaEditor'],resolve)
    },
    /**
     * [学生版 个人资料]
     */
    {
        path: '/PerStuInfo',
        name: 'PerStuInfo',
        component: resolve => require(['@/components/Person/PerStuInfo'],resolve)
    },
    /**
     * [学生版 新增/编辑]
     */
    {
        path: '/StuEditor',
        name: 'StuEditor',
        component: resolve => require(['@/components/Person/StuEditor'],resolve)
    },
    /**
     * [我的简历]
     */
    {
        path: '/StuResume',
        name: 'StuResume',
        component: resolve => require(['@/components/Person/StuResume'],resolve)
    },
    /**
     * [我的简历 新增/编辑]
     */
    {
        path: '/ResumeEditor',
        name: 'ResumeEditor',
        component: resolve => require(['@/components/Person/ResumeEditor'],resolve)
    },
    /**
     * [课件]
     */
    {
        path: '/CourseWare',
        name: 'CourseWare',
        //component: resolve => require(['@/components/technology/CourseWare'],resolve)
        component: CourseWare
    },
    /**
     * [题库]
     */
    {
        path: '/Questions',
        name: 'Questions',
        component: resolve => require(['@/components/technology/Questions'],resolve)
    },
    /**
     * [试卷]
     */
    {
        path: '/TestPaper',
        name: 'TestPaper',
        component: resolve => require(['@/components/technology/TestPaper'],resolve)
    },
    /**
     * [教师管理考核]
     */
    {
        path: '/TeachPass',
        name: 'TeachPass',
        component: resolve => require(['@/components/technology/teacher/TeachPass'],resolve)
    },
    /**
     * [教师管理作业详情]
     */
    {
        path: '/TeachTaskDetails',
        name: 'TeachTaskDetails',
        component: resolve => require(['@/components/technology/teacher/TeachTaskDetails'],resolve)
    },
     /**
     * [教师管理考核详情]
     */
    {
        path: '/TeachPassDetails',
        name: 'TeachPassDetails',
        component: resolve => require(['@/components/technology/teacher/TeachPassDetails'],resolve)
    },
     /**
     * [单选题]
     */
    {
        path: '/Single',
        name: 'Single',
        component: resolve => require(['@/components/technology/Single'],resolve)
    },
     /**
     * [多选题库]
     */
    {
        path: '/MultipleChoice',
        name: 'MultipleChoice',
        component: resolve => require(['@/components/technology/MultipleChoice'],resolve)
    },
     /**
     * [判断题库]
     */
    {
        path: '/Judge',
        name: 'Judge',
        component: resolve => require(['@/components/technology/Judge'],resolve)
    },
     /**
     * [填空题库]
     */
    {
        path: '/Completion',
        name: 'Completion',
        component: resolve => require(['@/components/technology/Completion'],resolve)
    },
    /**
     * [论述题库]
     */
    {
        path: '/Discussion',
        name: 'Discussion',
        component: resolve => require(['@/components/technology/Discussion'],resolve)
    },
    /**
     * [练习列表]
     */
    {
        path: '/ExerciseList',
        name: 'ExerciseList',
        component: resolve => require(['@/components/technology/ExerciseList'],resolve)
    },
    /**
     * [作业(学生)]
     */
    {
        path: '/Task',
        name: 'Task',
        component: resolve => require(['@/components/technology/Task'],resolve)
    },
    /**
     * [作业管理(教师)]
     */
    {
        path: '/TeachTask',
        name: 'TeachTask',
        component: resolve => require(['@/components/technology/teacher/TeachTask'],resolve)
    },
    /**
     * [技术培训]
     */
    {
        path: '/Training',
        name: 'Training',
        component: resolve => require(['@/components/technology/Training'],resolve)
    },
    /**
     * [培训列表]
     */
    {
        path: '/TrainList',
        name: 'TrainList',
        component: resolve => require(['@/components/technology/TrainList'],resolve)
    },
    /**
     * [培训详情页]
     */
    {
        path: '/TrainingDetail',
        name: 'TrainingDetail',
        component: resolve => require(['@/components/technology/TrainingDetail'],resolve)
    },
    /**
     * [报名学生]
     */
    {
        path: '/TeachTrainDetails',
        name: 'TeachTrainDetails',
        component: resolve => require(['@/components/technology/teacher/TeachTrainDetails'],resolve)
    },
    /**
     * [老师答题答案显示 改卷]
     */
    {
        path: '/AnsderDetail',
        name: 'AnsderDetail',
        component: resolve => require(['@/components/technology/AnsderDetail'],resolve)
    },
    /**
     * [学生答题答案显示]
     */
    {
        path: '/AnsderStuDetail',
        name: 'AnsderStuDetail',
        component: resolve => require(['@/components/technology/AnsderStuDetail'],resolve)
    },
    /**
     * [技术培训(教师)]
     */
    {
      path: '/TeachTraining',
      name: 'TeachTraining',
      component: resolve => require(['@/components/technology/teacher/TeachTraining'],resolve)
    },
    /**
     * [培训与考核索引]
     */
    {
      path: '/TrainExamIndex',
      name: 'TrainExamIndex',
      component: resolve => require(['@/components/technology/TrainExamIndex'],resolve)
    },
     /**
     * [课件详情]
     */
    {
        path: '/CourseWareDetail',
        name: 'CourseWareDetail',
        component: resolve => require(['@/components/technology/CourseWareDetail'],resolve)
      },
    /**
     * [新增试卷]
     */
    {
        path: '/AddTestPaper',
        name: 'AddTestPaper',
        component: resolve => require(['@/components/technology/teacher/AddTestPaper'],resolve)
    },
    //班级管理 新增学生/编辑学生
    {
        path: '/ClassStuEdit',
        name: 'ClassStuEdit',
        component: resolve => require(['@/components/ClassStuEdit'],resolve)
    },
    //班级管理 获取学生信息
    {
        path: '/ClassStuInfo',
        name: 'ClassStuInfo',
        component: resolve => require(['@/components/ClassStuInfo'],resolve)
    },
     /**
     * [老师版获取试题详情，只做查看不能修改]
     */
    {
        path: '/TeachPaperDetail',
        name: 'TeachPaperDetail',
        component: resolve => require(['@/components/technology/teacher/TeachPaperDetail'],resolve)
    },
    /**
     * [社会实践]
     */
    {
        path: '/SocialPractice',
        name: 'SocialPractice',
        component: resolve => require(['@/components/SocialPractice'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--机油详情]
     */
    {
        path: '/OilMessage',
        name: 'OilMessage',
        component: resolve => require(['@/components/digitalTeachingResources/OilMessage'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--波箱油详情]
     */
    {
        path: '/WaveBoxOilMessage',
        name: 'WaveBoxOilMessage',
        component: resolve => require(['@/components/digitalTeachingResources/WaveBoxOilMessage'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--电池型号详情]
     */
    {
        path: '/BatteryMessage',
        name: 'BatteryMessage',
        component: resolve => require(['@/components/digitalTeachingResources/BatteryMessage'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--防冻液详情]
     */
    {
        path: '/Antifreeze',
        name: 'Antifreeze',
        component: resolve => require(['@/components/digitalTeachingResources/Antifreeze'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--复位教程详情]
     */
    {
        path: '/ResetTutorial',
        name: 'ResetTutorial',
        component: resolve => require(['@/components/digitalTeachingResources/ResetTutorial'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--维修案例列表]
     */
    {
        path: '/MaintenanceCase',
        name: 'MaintenanceCase',
        component: resolve => require(['@/components/digitalTeachingResources/MaintenanceCase'],resolve)
    },
    /**
     * [数字化教学资源]
     * [综合查询]
     * [流媒体查询--维修案例详情]
     */
    {
        path: '/MaintenanceCaseDetails',
        name: 'MaintenanceCaseDetails',
        component: resolve => require(['@/components/digitalTeachingResources/MaintenanceCaseDetails'],resolve)
    },
  ],
  linkActiveClass:"active"
})



<!-- 
* name: 我的简历编辑
* author: lp
* time: 2018-10-30
-->
<template lang="pug">
    .resume-editor
        Header(title="我的简历",@goBack="goBack")
        .container
            nav
                span.left 基本信息
            ul
                li
                    .attribute 姓名
                        i *
                    .content
                        el-input(v-model="studentInfo.stdName",placeholder="姓名")
                        |
                        span(v-if="validate.name.isNull",class="validate") {{validate.name.textNull}}
                li
                    .attribute 手机号码
                        i *
                    .content
                        el-input(v-model="studentInfo.stdMobile",placeholder="手机号码",maxlength='11')
                        |
                        span(v-if="validate.mobile.isNull",class="validate") {{validate.mobile.textNull}}
                        span(v-if="!validate.mobile.isOK",class="validate") {{validate.mobile.textError}}
                li
                    .attribute 出生年月
                        i *
                    .content
                        el-date-picker(v-model="studentInfo.stdBirthday",
                        placeholder="出生年月",
                        type="date",
                        format="yyyy-MM-dd")
                        |
                        span(v-if="validate.birthday.isNull",class="validate") {{validate.birthday.textNull}}
                li
                    .attribute 性别
                        i *
                    .content
                        <el-radio v-model="studentInfo.stdGender" label="m" >男</el-radio>
                        <el-radio v-model="studentInfo.stdGender" label="f" >女</el-radio>
                        |
                        span(v-if="validate.gender.isNull",class="validate") {{validate.gender.textNull}}
                li
                    .attribute 学历
                        i *
                    .content
                        el-select(v-model="studentInfo.stdEducationLv" placeholder="学历")
                            el-option(v-for="item in eduOptions"
                            :key="item"
                            :label="item"
                            :value="item")
                        |
                        span(v-if="validate.educationLv.isNull",class="validate") {{validate.educationLv.textNull}}    
                li
                    .attribute 专业
                        i *
                    .content
                        el-input(v-model="studentInfo.stdMajor",placeholder="专业")
                        |
                        span(v-if="validate.major.isNull",class="validate") {{validate.major.textNull}}
                li
                    .attribute 毕业时间
                        i *
                    .content
                        el-date-picker(v-model="studentInfo.stdGraduationTime",
                        placeholder="毕业时间",
                        type="date",
                        format="yyyy-MM-dd")
                        |
                        span(v-if="validate.graduation.isNull",class="validate") {{validate.graduation.textNull}}        
                li
                    .attribute 照片
                        i *
                    .content(:style="{width:'110px',height:'110px'}")
                        el-upload(class="avatar-uploader"
                        name="imgFile"
                        :headers="{accessToken: this.accessToken}"
                        :action="postImgUrl" 
                        :show-file-list="false" 
                        :on-success="handleAvatarSuccess"
                        :data="{imgType:3}"
                        :before-upload="beforeAvatarUpload")
                            img(v-if="studentInfo.stdHeadImg",:src="avatarSrc" class="avatar")
                            i(v-else,class="el-icon-plus avatar-uploader-icon")
                        <input type="hidden" v-model="studentInfo.stdHeadImg">
                        span.addTip(v-if="!fileImgUrl")
                            | 请上传一张清晰的个人照片 
                            br
                            | 大小不超过2M
                        |
                        span(v-if="validate.headImg.isNull",class="validate") {{validate.headImg.textNull}}    
                li
                    .attribute 微信号
                    .content
                        el-input(v-model="studentInfo.stdWxId" placeholder="微信号")
                li
                    .attribute QQ
                    .content
                        el-input(v-model="studentInfo.stdQq" placeholder="qq号码")
                        |
                        span(v-if="!validate.qq.isOK",class="validate") {{validate.qq.textError}}
                li
                    .attribute 民族
                    .content
                        el-input(v-model="studentInfo.stdNation" placeholder="民族")
                li
                    .attribute 政治面貌
                    .content
                        el-input(v-model="studentInfo.stdPolitics" placeholder="政治面貌")
                li
                    .attribute 联系地址
                    .content
                        .area-select
                            el-select(v-model="provinceName"
                                placeholder="省份")
                                el-option(v-for="item in areaList.province"
                                    :key="item.id"
                                    :label="item.regionName"
                                    :value="item.regionName"
                                    @click.native="getAreaListCity(item.id)")
                            span &nbsp;—&nbsp;             
                            el-select(v-model="cityName"
                                no-data-text="请先选择省份"
                                placeholder="县/市")
                                el-option(v-for="item in areaList.city"
                                    :key="item.id"
                                    :label="item.regionName"
                                    :value="item.regionName"
                                    @click.native="getAreaListArea(item.id)")
                            span &nbsp;—&nbsp;            
                            el-select(v-model="areaName"
                                no-data-text="请先选择县/市"
                                placeholder="区")
                                el-option(v-for="item in areaList.area"
                                    :key="item.id"
                                    :label="item.regionName"
                                    :value="item.regionName"
                                    @click.native="saveStdArea(item.id)")
                        .area-input            
                            el-input(v-model="studentInfo.stdAddr" placeholder="详细地址")

            nav
                span.left 求职意向  
            ul
                li
                    .attribute 意向城市
                        i *
                    .content
                        el-input(v-model="studentInfo.stdIntentCity",placeholder="有多个意向城市时请用“,”隔开")
                        |
                        span(v-if="validate.intentCity.isNull",class="validate") {{validate.intentCity.textNull}}
                li
                    .attribute 应聘岗位
                        i *
                    .content
                        el-input(v-model="studentInfo.stdJob",placeholder="应聘多个岗位时请用“,”隔开")
                        |
                        span(v-if="validate.job.isNull",class="validate") {{validate.job.textNull}} 
                li
                    .attribute 薪资要求
                        i *
                    .content
                        .salary
                            el-input(v-model.number="minSalary",placeholder="0" :disabled="formSalaryFlag")
                            span &nbsp;—&nbsp;             
                            el-input(v-model.number="maxSalary",placeholder="0" :disabled="formSalaryFlag")
                            span &nbsp;元
                            .salary-flag
                                el-checkbox(v-model="formSalaryFlag") 面议
                            |
                            span(v-if="validate.salary.isNull",class="validate") {{validate.salary.textNull}} 
                            span(v-if="!validate.salary.isOK",class="validate") {{validate.salary.textError}}   
                li
                    .attribute 到岗时间
                        i *
                    .content
                        el-select(v-model="studentInfo.stdArriveTime" placeholder="到岗时间")
                            el-option(v-for="item in arriveTimeOptions"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id") 
                        |
                        span(v-if="validate.arriveTime.isNull",class="validate") {{validate.arriveTime.textNull}}                       
            nav
                span.left 教育经历
                span.right(@click="addEducation") +
            ul
                li(v-for="(item,index) in studentInfo.eduExpList" :key="index")
                    .attribute 学历{{item.orderNum}}
                        i *
                    .content
                        .education
                            div(style="margin-bottom:20px;")
                                .date
                                    el-date-picker(v-model="item.startTime"
                                        type="date"
                                        placeholder="开始日期")
                                span &nbsp;—&nbsp;
                                .date
                                    el-date-picker(v-model="item.endTime"
                                        type="date"
                                        placeholder="结束日期")
                            div(style="margin-bottom:20px;")
                                el-input(v-model="item.gradeDesc",placeholder="学历")
                                span &nbsp;—&nbsp;
                                el-input(v-model="item.major",placeholder="专业名称")
                            .school
                                el-input(v-model="item.school",placeholder="毕业院校")
                                .dele(@click="deleEducation(index)")
                                    img(src="static/img/dele-item.png")
                        |
                        span(v-if="item.isNull && validate.eduExpList.isNull",class="validate") {{validate.eduExpList.textNull}}            
            nav
                span.left 经验
                span.right(@click="addExperience") +
            ul
                li(v-for="(item,index) in studentInfo.jobExpList" :key="index")
                    .attribute 经验{{item.orderNum}}
                        i *
                    .content
                        .experience
                            div(style="margin-bottom:20px;")
                                .date
                                    el-date-picker(v-model="item.startTime"
                                        type="date"
                                        placeholder="开始日期")
                                span &nbsp;—&nbsp;
                                .date
                                    el-date-picker(v-model="item.endTime"
                                        type="date"
                                        placeholder="结束日期")
                            .company
                                el-input(v-model="item.companyName",placeholder="公司名称" class='company-name')
                                el-input(v-model="item.jobDesc",placeholder="岗位职责")
                                .dele(@click="deleExperience(index)")
                                    img(src="static/img/dele-item.png") 
                        |
                        span(v-if="item.isNull && validate.jobExpList.isNull",class="validate") {{validate.jobExpList.textNull}}                                   
            FixedButton(buttonText='保存', @listenToChildEvent="save")      
</template> 
<script>
import baseUrl from '@/apiconfig'
export default {
	name: 'ResumeEditor',
	data() {
		return {
            avatarSrc: '',    //图片路径
            eduNum: '0',      //教育经历数
            expNum: '0',      //工作经验数
            resumeId: '',    //修改简历时需要的resumeId
            userType:       '',
            fileImgUrl:     '', // 临时图片地址
            postImgUrl:     '/edu/teach/uploadImg',  // 上传图片地址
            studentInfo:    {       //简历表单数据
                eduExpList: [],
                jobExpList: [],
                stdProvince: '',
                stdCity: '',
                stdArea: '',
                stdMajor: '',
            },
            errorNum: 5,
            formSalaryFlag: false,
            accessToken:    '',
            eduOptions:     ['本科', '大专', '中专', '高中', '初中'],       // 学历下拉框数据
            areaList:       {       // 省市区下拉框数据
                province: [],
                city:[],
                area:[]
            },     
            minSalary:      '',      //最低薪资
            maxSalary:      '',      //最高薪资
            provinceName:   '',
            cityName:   '',
            areaName:   '',
            arriveTimeOptions:  [
                    {value:'随时到岗', id:'3'},
                    {value:'一周内到岗', id:'1'},
                    {value:'一个月到岗', id:'2'},
                    {value:'另议', id:'4'}
                ],
            validate:   {
                name: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写姓名',
                },
                mobile: {
                    isNull: false,
                    textNull: '请填写手机号码',
                    isOK: true,
                    textError: '填写手机号码有误'
                },
                birthday: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写出生年月'
                },
                gender: {
                    isOK: true,
                    isNull: false,
                    textNull: '请选择性别'
                },
                educationLv: {
                    isOK: true,
                    isNull: false,
                    textNull: '请选择学历'
                },
                major: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写专业'
                },
                graduation: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写毕业时间'
                },
                headImg: {
                    isOK: true,
                    isNull: false,
                    textNull: '请上传个人照片'
                },
                intentCity: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写意向城市'
                },
                job: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写应聘岗位'
                },
                salary: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写薪资要求',
                    textError: '请输入数字'
                },
                arriveTime: {
                    isOK: true,
                    isNull: false,
                    textNull: '请填写到岗时间'
                },
                qq: {
                    isOK:true,
                    isNull: false,
                    textError: '填写QQ号有误'
                },
                eduExpList: {
                    isOK:true,
                    isNull: false,
                    textNull: '请完整填写学历',
                },
                jobExpList: {
                    isOK:true,
                    isNull: false,
                    textNull: '请完整填写经验'
                }
            },
            img_api: baseUrl.img_api
		}
    },
    computed: {
        salaryRequire() {
            return `${this.minSalary},${this.maxSalary}`;
        },
    },
	watch: {
        //必填项有输入时，关闭提示
        'studentInfo.stdName'() {
            this.validate.name.isNull = false
        },
        'studentInfo.stdBirthday'() {
            this.validate.birthday.isNull = false
        },
        'studentInfo.stdGender'() {
            this.validate.gender.isNull = false
        },
        'studentInfo.stdEducationLv'() {
            this.validate.educationLv.isNull = false
        },
        'studentInfo.stdMajor'() {
            this.validate.major.isNull = false
        },
        'studentInfo.stdGraduationTime'() {
            this.validate.graduation.isNull = false
        },
        'studentInfo.stdIntentCity'() {
            this.validate.intentCity.isNull = false
        },
        'studentInfo.stdJob'() {
            this.validate.job.isNull = false
        },
        minSalary() {
            this.validate.salary.isNull = false
        },
        maxSalary() {
            this.validate.salary.isNull = false
        },
        formSalaryFlag(val) {
            this.validate.salary.isNull = false
            if (val) {
                this.studentInfo.stdSalaryFlag = '1'
                // 选择面议时清空薪水区间
                this.minSalary = ''
                this.maxSalary = ''
            } else {
                this.studentInfo.stdSalaryFlag = '0'
            }
        },
        'studentInfo.stdArriveTime'() {
            this.validate.arriveTime.isNull = false
        },   
        'studentInfo.stdMobile'(val) {
            this.validate.mobile.isNull = false
            let re=/^1\d{10}$/
            if (re.test(val)) {                                   
                this.validate.mobile.isOK  = true             
            } 
        },
        'studentInfo.stdQq'(val) {
            let qqPattern = /^[1-9][0-9]{4,10}$/
            if (qqPattern.test(val)) {                            
                this.validate.qq.isOK = true
            } 
        },  
        'studentInfo.eduExpList':{
            handler:function(val) {
                for(let item of val) {
                    if (!item.startTime || !item.endTime || !item.gradeDesc || !item.school) {
                        this.$set(item, 'isNull', true);            // 控制单个学历是否出现提示 
                    } else {
                        this.$set(item, 'isNull', false);
                    }
                }    
            },
            deep:true
        },
        'studentInfo.jobExpList':{
            handler:function(val) {
                for(let item of val) {
                    if (!item.startTime || !item.endTime || !item.companyName || !item.jobDesc) {
                        this.$set(item, 'isNull', true);            // 控制单个经验是否出现提示 
                    } else {
                        this.$set(item, 'isNull', false);
                    }
                }  
            },
            deep:true
        }
	},
	methods: {
            goBack() {
                this.$router.push({
                    path:'StuResume'
                })
            },
            async resumeEditroInit() {
                let res = await this.$axios.getAreaList();      // 获取所有省名称
                if (res.code === 20000) {
                    this.areaList.province = res.data.province;
                } 
                await this.getResume();         // 获取简历信息

                this.avatarSrc = this.img_api + this.studentInfo.stdHeadImg   // 服务器图片路径拼接前缀
                
                if (this.studentInfo.stdProvince) {             // 省ID转化为省名称
                    let regionName = this.getRegionName(this.studentInfo.stdProvince, this.areaList.province);
                    if (regionName) {
                        this.provinceName = regionName 
                    }
                }
                    
                if (this.studentInfo.stdProvince) {         // 市ID转化为市名称
                    await this.getAreaListCity(this.studentInfo.stdProvince)
                    let regionName = this.getRegionName(this.studentInfo.stdCity, this.areaList.city);
                    if (regionName) {
                        this.cityName = regionName 
                    } else {
                        this.studentInfo.stdCity = ''
                        this.studentInfo.stdArea = ''
                    }
                }

                if (this.studentInfo.stdCity) {         // 区ID转化为区名称
                    await this.getAreaListArea(this.studentInfo.stdCity)
                    let regionName = this.getRegionName(this.studentInfo.stdArea, this.areaList.area);
                    if (regionName) {
                        this.areaName = regionName 
                    } else {
                        this.studentInfo.stdArea = ''
                    }
                }
            },

            async getAreaListCity(id) {         //选择省后获取省内城市名称
                let params = {
                    id: id
                }
                let res = await this.$axios.getAreaList(params);     
                if (res.code === 20000) {
                    this.areaList.city = res.data.city;
                } 
                this.studentInfo.stdProvince = id

                this.cityName = '';
                this.areaName = '';
            },

            async getAreaListArea(id) {         //选择市后获取市内区名称
                let params = {
                    id: id
                }
                let res = await this.$axios.getAreaList(params);     
                if (res.code === 20000) {
                    this.areaList.area = res.data.area;
                } 
                this.studentInfo.stdCity = id

                this.areaName = '';
            },

            saveStdArea(id) {
                this.studentInfo.stdArea = id
            },

            getRegionName(searchId, areaArray) {
                let res = areaArray.find((item) => {
                    return item.id == searchId
                })
                if (res) {
                    return res.regionName
                }
            },

            //请求简历信息
            async getResume() {
                let params = {}  
                const res = await this.$axios.getResume();
                if (res.code === 1000) {
                    this.studentInfo = res.data
                    this.resumeId = res.data.resumeId
                    // 是否面议 字符串转布尔值
                    if (this.studentInfo.stdSalaryFlag === '1') {
                        this.formSalaryFlag = true
                    } else {
                        this.formSalaryFlag = false
                    }

                    // 最小最大薪资
                    let salaryArray = this.studentInfo.stdSalaryRequire.split(",");
                    this.minSalary = salaryArray[0];    //最小薪资
                    this.maxSalary = salaryArray[1];    //最大薪资

                    // 目前教育经历和工作经历总数
                    this.eduNum = this.studentInfo.eduExpList.length;
                    this.expNum = this.studentInfo.jobExpList.length;
                }
            },

            addEducation(){
                this.eduNum++;                     //添加教育经历
                this.studentInfo.eduExpList.push({
                    orderNum: this.eduNum+'',
                    startTime:'',
                    endTime:'',
                    gradeDesc:'',
                    major:'',
                    school:''
                })
            },
            deleEducation(index){                           //删除当前教育经历
                this.studentInfo.eduExpList.splice(index,1);
                this.eduNum--;
            },

            addExperience(){
                this.expNum++;                     //添加工作经历
                this.studentInfo.jobExpList.push({
                    orderNum: this.expNum+'',
                    startTime:'',
                    endTime:'',
                    gradeDesc:'',
                    major:'',
                    school:''
                })
            },
            deleExperience(index){                           //删除当前工作经历
                this.studentInfo.jobExpList.splice(index,1);
                this.expNum--;
            },

            handleAvatarSuccess(res, file) {
                if(res.code == 1000) {
                    this.validate.headImg.isNull = false 
                    this.avatarSrc = URL.createObjectURL(file.raw);     // 预览用本地缓存图片
                    this.studentInfo.stdHeadImg = res.data.imgName;        
                }
            },

            beforeAvatarUpload(file) {
                const isFormat= file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isFormat) {
                    this.dialog('请上传正确的图片格式!');
                }
                if (!isLt2M) {
                    this.dialog('图片大小不能超过 2M!');
                }
                return isFormat && isLt2M;
            },

            // 简历表单校验
            check() {
                let res = this.studentInfo,
                re=/^1\d{10}$/,//手机号码正则
                emailExp=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,//邮件正则
                qqPattern = /^[1-9][0-9]{4,10}$/,//QQ正则
                identity=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/,//身份证正则
                numPattern = /^[0-9]*$/;  //薪水正整数正则
                

                this.validate.name.isNull = res.stdName ? false : true
                this.validate.birthday.isNull = res.stdBirthday ? false : true
                this.validate.gender.isNull = res.stdGender ? false : true
                this.validate.educationLv.isNull = res.stdEducationLv ? false : true
                this.validate.major.isNull = res.stdMajor ? false : true
                this.validate.graduation.isNull = res.stdGraduationTime ? false : true
                this.validate.headImg.isNull = res.stdHeadImg ? false : true
                this.validate.intentCity.isNull = res.stdIntentCity ? false : true
                this.validate.job.isNull = res.stdJob ? false : true
                this.validate.salary.isNull = (this.minSalary || this.maxSalary || this.formSalaryFlag == '1') ? false : true
                this.validate.arriveTime.isNull = res.stdArriveTime ? false : true

                // 手机号码验证
                if (!res.stdMobile) {
                    this.validate.mobile.isNull = true
                } else {
                    this.validate.mobile.isNull  = false
                    if (!re.test(res.stdMobile)) {                                   
                        this.validate.mobile.isOK  = false             
                    } else {
                        this.validate.mobile.isOK  = true
                    }                            
                }
                // qq号验证
                if (res.stdQq) {
                    if (!qqPattern.test(res.stdQq)) {                            
                        this.validate.qq.isOK = false
                    } else {
                        this.validate.qq.isOK = true
                    }
                } else{
                    this.validate.qq.isOK = true
                } 

                // 最小薪水验证
                if (this.minSalary) {
                    if (!numPattern.test(this.minSalary)) {                            
                        this.validate.salary.isOK = false
                    } else {
                        this.validate.salary.isOK = true
                    }
                } else{
                    this.validate.salary.isOK = true
                } 

                // 最大薪水验证
                if (this.maxSalary) {
                    if (!numPattern.test(this.maxSalary)) {                            
                        this.validate.salary.isOK = false
                    } else {
                        this.validate.salary.isOK = true
                    }
                } else{
                    this.validate.salary.isOK = true
                } 

                // 教育经历必填项验证
                if (res.eduExpList.length !== 0) {
                    this.validate.eduExpList.isNull = false;        
                    for(let item of res.eduExpList) {
                        if (!item.startTime || !item.endTime || !item.gradeDesc || !item.school) {
                            this.validate.eduExpList.isNull = true;     // 存在空值 校验无法通过
                            this.$set(item, 'isNull', true);            // 控制单个学历是否出现提示 
                        } else {
                            this.$set(item, 'isNull', false);
                        }
                    }
                } else {
                    this.validate.eduExpList.isNull = false
                }

                // 工作经历必填项验证
                if (res.eduExpList.length !== 0) {
                    this.validate.jobExpList.isNull = false;        
                    for(let item of res.jobExpList) {
                        if (!item.startTime || !item.endTime || !item.companyName || !item.jobDesc) {
                            this.validate.jobExpList.isNull = true;     // 存在空值 校验无法通过
                            this.$set(item, 'isNull', true);            // 控制单个经验是否出现提示 
                        } else {
                            this.$set(item, 'isNull', false);
                        }
                    }
                } else {
                    this.validate.jobExpList.isNull = false
                }
            },

            // 创建或编辑简历
		    async save() {
                this.check();
                let canSave = Object.values(this.validate).every(item => {
                    if (item.isOK && !item.isNull) {
                        return true;
                    } else {
                        return false;
                    }
                })
                if (canSave) {
                    let params = {};
                    Object.assign(params, this.studentInfo);
                    //上传前
                    if (this.resumeId) {
                        params.resumeId = this.resumeId
                    }
                    params.stdSalaryRequire = this.salaryRequire            //薪酬最小最大值转成字符串
                    params.stdSalaryFlag = this.formSalaryFlag  ? '1' : '0'           //是否面议，布尔值转字符串    
                    const result = await this.$axios.editResume(params);  
                    if (result.code==1000) {
                        this.successMsg('操作成功');
                        let pcaName = {
                            provinceName: this.provinceName,
                            cityName: this.cityName,
                            areaName: this.areaName 
                        }
                        localStorage.setItem('pcaName', JSON.stringify(pcaName))
                        this.$router.push(
                            {
                                path: '/StuResume'
                            }
                        );
                    } else{
                        this.dialog(result.message)
                    }
                } else {
                    this.dialog('请正确完整填写信息')
                }
            }      
	},
	created(){
		this.userType = localStorage.getItem('userType');
    },
    mounted(){
        this.resumeEditroInit();
        this.accessToken = localStorage.getItem("accessToken");
    }
}

</script>
<style lang="stylus">
    .resume-editor
        margin-bottom 120px
        .container 
            height 100%
            background #efefef
            nav
                height 88px
                line-height 88px
                font-size 30px
                padding 15px 30px
                background #fff
                border-bottom 1px solid #efefef
                span.left 
                    float left
                    color #909399
                span.right
                    float right
                    font-size 60px
                    color #138BE7
            ul 
                font-size 28px
                overflow auto
                margin-bottom 40px
                li
                    padding 30px 30px
                    background #fff
                    overflow hidden
                    display flex
                    div.attribute
                        flex 1
                        height 60px
                        line-height 60px
                        font-size 30px
                        display inline-block
                        i
                            color #f56c6c
                    div.content
                        flex 3
                        line-height 60px
                        display inline-block
                        .area-select    //省市区
                            display flex
                            margin-bottom 40px
                            .el-input
                                width 240px
                        .area-input
                            .el-input
                                width 100%
                                

                        .salary    //薪资
                            display flex
                            margin-bottom 40px
                            .el-input
                                width 240px
                            .salary-flag
                                margin-left 80px
                                .el-checkbox__label
                                    font-size 30px    

                        .education
                            display flex
                            flex-direction row
                            flex-wrap wrap
                            .school
                                flex 1
                                .el-input
                                    width 758px
                                    float left
                                .dele
                                    border 1px solid #dcdfe6
                                    margin-left 20px
                                    width 65px
                                    height 70px
                                    text-align center
                                    float left
                                    img
                                        max-width 100%
                                        vertical-align middle
                            .el-input
                                width 400px
                        .experience
                            display flex
                            flex-direction row
                            flex-wrap wrap
                            .company
                                flex 1
                                .el-input
                                    width 758px
                                    float left
                                .company-name
                                    margin-bottom 20px
                                    width 848px           
                                .dele
                                    border 1px solid #dcdfe6
                                    margin-left 20px
                                    width 65px
                                    height 70px
                                    text-align center
                                    float left
                                    img
                                        max-width 100%
                                        vertical-align middle
                            .el-input
                                width 400px    
                        .avatar-uploader
                            display inline-block
                            .el-upload
                                border 1px solid #dcdfe6
                                border-radius 8px
                                .avatar 
                                    width 200px
                                    height 200px
                                    display block
                                    border 2px dashed #dcdfe6
                                &:active
                                    border 1px solid #1F7FC8
                                .avatar-uploader-icon
                                    width 200px
                                    height 200px
                                    line-height 200px
                                    text-align center
                                    font-size 100px
                                    color #dcdfe6
                        .addTip
                            display inline-block
                            margin-left 50px
                            color #c0c4cc
                        .el-input
                            width 560px
                        .validate
                            color #E46969
                            margin-left 20px
                        .date
                            display inline-block
                            .el-date-editor
                                width 400px
                                height 70px
                                line-height 70px
                                .el-range__icon
                                    margin-left 10px
                                    margin-right 10px
                                .el-range-separator
                                    line-height 60px
                                .el-range__close-icon
                                    line-height 65px
</style>

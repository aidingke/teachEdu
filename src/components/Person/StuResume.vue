<!-- 
* name: 我的简历
* author: lp
* time: 2018-10-30
-->
<template lang="pug">
    .per-student-resume
        Header(title="我的简历",@goBack="goBack")
        SuccessTip(:dialogTableVisible="successTip.showDialogTableVisible" 
            @successDone="closeSuccessTip" 
            :tip="successTip.tip" 
            :hint="successTip.hint"
            :width="successTip.width")
            div(slot="stuResume-tip") {{successTip.moretip}}
        .container
            NotInfo(v-if="!studentInfo" notClass="暂无相关简历" defaultImg="static/img/not-class-default.png" elButton="创建简历" @start="createResume")
            .myresume(v-else)
                //- 简历个人信息
                .student-info
                    .name {{studentInfo.stdName}}
                    ul.concat
                        li 
                            img.icon-tel(src="static/img/resume-tel.png") 
                            span {{studentInfo.stdMobile}}
                        li
                            img.icon-local(src="static/img/resume-local.png")
                            span {{provinceName}}
                            span {{cityName}}
                            span {{areaName}}
                            span {{studentInfo.stdAddr}}
                    .otherinfo 
                        span.item {{studentInfo.stdGender | genderFilter}}
                        span.item {{studentInfo.stdEducationLv}}
                        span.item {{studentInfo.stdBirthday}} 
                        span.item {{studentInfo.stdMajor | majorFilter}}  
                        span.item {{studentInfo.stdGraduationTime | graduationFilter}}
                        span.item(v-if="studentInfo.stdQq")
                            img.icon-qq(src="static/img/resume-qq.png") 
                            span {{studentInfo.stdQq}}
                        span.item(v-if="studentInfo.stdWxId")
                            img.icon-wechat(src="static/img/resume-wechat.png") 
                            span {{studentInfo.stdWxId}}  
                        span.item(v-if="studentInfo.stdPolitics") {{studentInfo.stdPolitics}} 
                    img.resume-avatar(:src="img_api+studentInfo.stdHeadImg", v-if="studentInfo.stdHeadImg") 

                //- 简历求职意向
                .item-container
                    nav
                        span.title 求职意向 
                    ul.findwork
                        li.item
                            img.icon-area(src="static/img/resume-area.png") 
                            span {{studentInfo.stdIntentCity}}
                        li.item
                            img.icon-job(src="static/img/resume-job.png") 
                            span {{studentInfo.stdJob}} 
                        li.item
                            img.icon-salary(src="static/img/resume-money.png") 
                            span(v-if="studentInfo.stdSalaryFlag == '1'") {{studentInfo.stdSalaryFlag | salaryFlag}}
                            span(v-else) {{studentInfo.stdSalaryRequire | salaryRequire}}
                        li.item
                            img.icon-arriveTime(src="static/img/resume-arriveTime.png") 
                            span {{studentInfo.stdArriveTime | jobFilter}}  

                //- 简历教育经历 
                .item-container
                    nav
                        span.title 教育经历 
                    .no-text(v-if="studentInfo.eduExpList.length == 0") 暂未填写    
                    ul.education
                        li.item(v-for="(item,index) in studentInfo.eduExpList") 
                            span.ordernum 学历{{item.orderNum}}
                            span {{item.startTime}}
                            | 至
                            span {{item.endTime}}
                            span.divide(v-if="(item.startTime || item.endTime) && item.gradeDesc")
                            span {{item.gradeDesc}}
                            span.divide(v-if="item.gradeDesc")
                            span {{item.major}}
                            span.divide(v-if="item.major && item.school")
                            span {{item.school}}        

                //- 简历经验
                .item-container
                    nav
                        span.title 经验
                    .no-text(v-if="studentInfo.jobExpList.length == 0") 暂未填写     
                    ul.experience 
                        li.item(v-for="(item,index) in studentInfo.jobExpList" :key="index") 
                            .ordernum 经验{{item.orderNum}}
                            .exp
                                .exp-address
                                    span {{item.startTime}}
                                    | 至
                                    span {{item.endTime}}
                                    span.divide(v-if="(item.startTime || item.endTime) && item.companyName")
                                    span {{item.companyName}}
                                .exp-describe {{item.jobDesc}}                               
                .resume-fixed-footer
                    el-button(type="primary" @click="createResume") 编辑
                    el-button(@click="getJob") 投递简历  
</template>
<script>
import baseUrl from '@/apiconfig'
import SuccessTip from "../../common/SuccessTip.vue"
export default {
    name: 'StuResume',
    components: {
        SuccessTip
    },
	data() {
        return {
            studentInfo:  ''  ,   // 简历数据，无数据时呈现NotInfo页面                  
            img_api: baseUrl.img_api,
            provinceName:   '',
            cityName:   '',
            areaName:   '',
            areaList:       {       // 省市区总数据
                province: [],
                city:[],
                area:[]
            },    
            successTip:     {       // 投递简历成功后提示
                tip:    '投递成功静候佳音',
                moretip:    '您可以继续完善相关信息或继续投递简历',
                hint:    '我的简历' ,
                showDialogTableVisible: false,
                width:  '6.6rem'    // tip框宽度，手动使用rem单位
            }
        }
    },
    filters:{
        genderFilter(value) {
            if (value == 'm') {
                return '男';
            } else {
                return '女';
            }
        },
        majorFilter(value) {
            if (value) {
                return `${value}专业`;
            } 
        },
        graduationFilter(value) {
            if (value) {
                return `${value}毕业`;
            }
        },
        salaryFlag(value) {
            if (value == '1') {
                return '面议'
            }
        },
        salaryRequire(value) {
            if (value) {
                let salaryArray = value.split(",");
                let minSalary = salaryArray[0];    //最小薪资
                let maxSalary = salaryArray[1];    //最大薪资
                if (minSalary && maxSalary) {
                    return `${minSalary}-${maxSalary}`
                } else {
                    return `${minSalary}${maxSalary}`
                }
            }
        },
        jobFilter(value) {
            if (value == '1') {
                return '一周内到岗';
            } else if (value == '2') {
                return '一个月到岗';
            } else if (value == '3') {
                return '随时到岗';
            } else if (value == '4') {
                return '另议'
            }
        }
    },
    methods:{
        goBack() {
            this.$router.push({
                path:'PerCenter'
            })
        },
        // 请求简历信息
        async getResume() {        
            const res = await this.$axios.getResume();
            if (res.code === 1000) {
                this.studentInfo = res.data;
                let pcdName = JSON.parse(localStorage.getItem('pcaName'))
                if (pcdName) {      // 省市区名称优先从本地存储获取
                    this.provinceName = pcdName.provinceName
                    this.cityName = pcdName.cityName
                    this.areaName = pcdName.areaName 
                    return;   
                } else {        // 无本地存储则请求服务器数据
                    this.turnAreaName();
                }       
            }
        },
        // 投递简历
        async getJob() {
            if (!this.hasQx('stu:resume:getJob')) {
                this.dialog('您无权进行该操作')
                return false
            }
            let res = await this.$axios.getJob();
            if (res.code === 1000) {
                this.successTip.showDialogTableVisible = true
            } else {
                this.dialog(res.message)
            }
        },
        // 创建或修改简历
        createResume() {
            if (!this.hasQx('stu:resume:addOrEdit')) {
                this.dialog('您无权进行该操作')
                return false
            }
            this.$router.push({
		    	path:'/ResumeEditor'
            })
        },

        // 将地址id转化为地址名称
        async turnAreaName() {
            let res = await this.$axios.getAreaList();      // 获取所有省名称
            if (res.code === 20000) {
                this.areaList.province = res.data.province;
            }

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
                } 
            }

            if (this.studentInfo.stdCity) {         // 区ID转化为区名称
                await this.getAreaListArea(this.studentInfo.stdCity)
                let regionName = this.getRegionName(this.studentInfo.stdArea, this.areaList.area);
                if (regionName) {
                    this.areaName = regionName 
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
        },
        async getAreaListArea(id) {         //选择市后获取市内区名称
            let params = {
                id: id
            }
            let res = await this.$axios.getAreaList(params);     
            if (res.code === 20000) {
                this.areaList.area = res.data.area;
            } 
        },
        getRegionName(searchId, areaArray) {
            let res = areaArray.find((item) => {
                return item.id == searchId
            })
            if (res) {
                return res.regionName
            }
        },

        closeSuccessTip() {
            this.successTip.showDialogTableVisible = false;
        }


    },
    created(){
		this.userType = localStorage.getItem("userType") //0-老师 1-学生
    },
    mounted(){
        this.getResume();
    }
}
</script>
<style lang="stylus">
    .per-student-resume
        margin-bottom 120px
        height 100%
        background #efefef
        .container 
            height 100%
            .myresume
                background #fff
                display flex
                flex-direction column
                // 简历个人信息
                .student-info
                    width 100%
                    padding 40px 60px
                    box-sizing border-box
                    border-bottom 1px solid #c6cad1;/*no*/
                    display flex
                    flex-direction column
                    position relative
                    .name
                        width 100%
                        height 50px
                        font-size 50px
                        line-height 50px
                        font-weight bold
                        color #303133
                        margin-top 35px
                        margin-bottom 77px
                    .concat
                        color #303133
                        font-size 30px
                        li
                            margin-bottom 33px
                            .icon-tel
                                width 28px
                                height auto
                                margin-right 27px
                            .icon-local
                                width 22px
                                height auto
                                margin-right 30px                                                              
                    .otherinfo
                        font-size 26px
                        color #909399
                        .item
                            height 26px
                            line-height 180%
                            padding 0 19px
                            border-right 1px solid #909399 
                            margin-bottom 10px
                            box-sizing border-box 
                            &:first-child
                                padding-left 0px  
                            &:last-child
                                padding-right 0px
                                border-right none     
                            .icon-qq
                                width 24px
                                height auto
                                vertical-align middle
                                margin-right 10px 
                            .icon-wechat  
                                width 28px
                                height auto 
                                margin-right 12px             
                    .resume-avatar
                        width 240px
                        height 240px
                        position absolute
                        right 60px
                        top 40px
                .item-container
                    padding 0 60px
                    color #303133
                    border-bottom 1px solid #c6cad1;/*no*/
                    .no-text
                        font-size 26px
                        color #909399         
                    nav
                        padding-top 48px
                        padding-bottom 70px
                        .title
                            font-size 33px
                            font-weight  bold
                    ul.findwork
                        padding-bottom 44px
                        display flex
                        .item
                            height 32px
                            line-height 32px
                            font-size 30px
                            margin-right 80px 
                            .icon-area
                                width 30px
                                height auto 
                                margin-right 15px
                            .icon-job
                                width 24px
                                height auto 
                                margin-right 24px
                            .icon-salary
                                width 25px
                                height auto 
                                margin-right 28px
                            .icon-arriveTime
                                width 28px
                                height auto 
                                margin-right 27px
                    ul.education
                        padding-bottom 50px
                        display flex
                        flex-direction column
                        .item
                            height 28px
                            line-height 28px
                            font-size 30px
                            margin-bottom 52px
                            .ordernum
                                margin-right 106px
                            .divide
                                display inline-block
                                height 4px
                                width 20px
                                background-color #707070
                                vertical-align middle
                                margin-left 22px
                                margin-right 22px
                    ul.experience
                        padding-bottom 50px
                        display flex
                        flex-direction column
                        .item
                            font-size 30px
                            margin-bottom 52px
                            display flex
                            .ordernum
                                margin-right 106px
                            .exp-address
                                margin-bottom 33px    
                            .divide
                                display inline-block
                                height 4px
                                width 20px
                                background-color #707070
                                vertical-align middle
                                margin-left 22px
                                margin-right 22px
        .resume-fixed-footer
            width 100%
            height 120px
            line-height 120px
            margin 0 auto 0 auto
            text-align center
            background #fff
            position fixed
            bottom 0
            left 0
            right 0
            .el-button
                font-size 28px
                padding 30px 40px
                width 48%                                     
                    
</style>

<template lang="pug">
    .student-editor
        Header(title="个人资料",@goBack="goBack")
        .container
            nav
                span.left 班级信息
            ul
                li
                    .attribute 学号
                        i *
                    .content
                        el-input(v-model="studentInfo.stdNum",:disabled="true")
                li
                    .attribute 系别
                        i *
                    .content
                        el-input(v-model="studentInfo.grade",:disabled="true")
                li
                    .attribute 专业班级
                        i *
                    .content
                        el-input(v-model="studentInfo.className",:disabled="true")
                li
                    .attribute 入学时间
                        i *
                    .content
                        el-input(v-model="studentInfo.learnTime",:disabled="true")
                li
                    .attribute 班主任
                        i *
                    .content
                        el-input(v-model="studentInfo.teacher",placeholder="班主任",:disabled="true")
            nav
                span.left 基本信息
            ul
                li
                    .attribute 姓名
                        i *
                    .content
                        el-input(v-model="studentInfo.userName",:disabled="true")
                li
                    .attribute 手机号码
                        i *
                    .content
                        el-input(v-model="studentInfo.mobile",placeholder="手机号码",maxlength='11',@input="check")
                        |
                        span(v-if="!validate.mobile.isOK",class="validate") {{validate.mobile.text}}
                li
                    .attribute 出生年月
                        i *
                    .content
                        el-date-picker(v-model="studentInfo.birthday",
                        placeholder="选择日期",
                        type="date",
                        format="yyyy-MM-dd",
                        @change="check")
                li
                    .attribute 性别
                        i *
                    .content
                        <el-radio v-model="studentInfo.gender" label="m" disabled>男</el-radio>
                        <el-radio v-model="studentInfo.gender" label="f" disabled>女</el-radio>
                li
                    .attribute 身份证号码
                        i *
                    .content
                        el-input(v-model="studentInfo.idCard",:disabled="true")
                li
                    .attribute 照片
                    .content(:style="{width:'110px',height:'110px'}")
                        el-upload(class="avatar-uploader"
                        name="imgFile"
                        :headers="{accessToken: this.accessToken}"
                        :action="postImgUrl" 
                        :show-file-list="false" 
                        :on-success="handleAvatarSuccess"
                        :data="{imgType:3}"
                        :before-upload="beforeAvatarUpload")
                            img(v-if="studentInfo.pic",:src="fileImgUrl" class="avatar")
                            i(v-else,class="el-icon-plus avatar-uploader-icon")
                        <input type="hidden" v-model="studentInfo.pic" value="">
                        span.addTip(v-if="!fileImgUrl")
                            | 请上传一张清晰的个人照片 
                            br
                            | 大小不超过2M
                li
                    .attribute 微信号
                    .content
                        el-input(v-model="studentInfo.wx")
                li
                    .attribute QQ
                    .content
                        el-input(v-model="studentInfo.qq",@input="check")
                        |
                        span(v-if="!validate.qq.isOK",class="validate") {{validate.qq.text}}
                li
                    .attribute 民族
                    .content
                        el-input(v-model="studentInfo.nation")
                li
                    .attribute 政治面貌
                    .content
                        el-input(v-model="studentInfo.politics")
                li
                    .attribute 联系地址
                    .content
                        el-input(v-model="studentInfo.addr")
            nav
                span.left 教育经历
                span.right(@click="addEducation") +
            ul(v-if="studentInfo.eduExpList")
                li(v-for="(item,index) in studentInfo.eduExpList" :key="index")
                    .attribute 学历{{index+1}}
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
            FixedButton(buttonText='保存', @listenToChildEvent="save")      
</template> 
<script>
import baseUrl from '@/apiconfig'
export default {
	name: 'StuEditor',
	data() {
		return {
            orderNum:0,
            userType:       '',
            fileImgUrl:     '', //临时图片地址
            postImgUrl:     '/edu/teach/uploadImg',  //上传图片地址,
            studentInfo:    {},
            accessToken:    '',
            validate:       {
                mobile:{
                    isOK:true,
                    text:'请填写手机号'
                },
                birthday:{
                    isOK:true,
                    text:'请填写出生年月'
                },
                qq:{
                    isOK:true,
                    text:'填写QQ号有误'
                }
            },
            img_api: baseUrl.img_api
		}
	},
	watch:{
	},
	methods: {
            goBack(){
                this.$router.push({
                    path:'PerCenter'
                })
            },
            async getPersonInfo(){          //请求学生信息
                let params = {
                    type:1
                }
                const res = await this.$axios.personInfo(params);
                if(res.code===1000){
                    this.studentInfo = res.data
                    this.studentInfo[`eduExpList`] = []
                    this.fileImgUrl = this.img_api + this.studentInfo.pic
                }
            },
            addEducation(){
                this.orderNum++;                     //添加教育经历
                this.studentInfo.eduExpList.push({
                    orderNum:this.orderNum+'',
                    startTime:'',
                    endTime:'',
                    gradeDesc:'',
                    major:'',
                    school:''
                })
            },
            deleEducation(index){                           //删除当前教育经历
                this.educationalExperience.splice(index,1);
            },
            handleAvatarSuccess(res, file) {
                if(res.code == 1000) {
                    console.log(res,'res');
                    this.fileImgUrl = URL.createObjectURL(file.raw);
                    this.studentInfo.pic = res.data.imgName;
                }
            },
            beforeAvatarUpload(file) {
                const isFormat= file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isFormat) {
                    this.dialog('请上传正确的图片格式!');
                }
                if (!isLt2M) {
                    this.dialog('上传头像图片大小不能超过 2MB!');
                }
                return isFormat && isLt2M;
            },
            check(){
                let res = this.studentInfo,
                    re=/^1\d{10}$/,//手机号码正则
                    emailExp=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,//邮件正则
                    qqPattern = /^[1-9][0-9]{4,10}$/,//QQ正则
                    identity=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;//身份证正则
                    if(!res.mobile){
                        this.validate.mobile.isOK = false
                        this.validate.mobile.text = '请填写手机号码';
                    } else if(!re.test(res.mobile)){                                   // 手机号码验证
                        this.validate.mobile.isOK  = false                      
                        this.validate.mobile.text = '填写手机号码有误';
                    } else{
                        this.validate.mobile.isOK  = true                      
                    }

                    if(!res.birthday){
                        this.validate.birthday.isOK = false
                    }else{
                        this.validate.birthday.isOK = true
                    }
                    
                    if(res.qq){
                        if(!qqPattern.test(res.qq)){                            // QQ号验证
                            this.validate.qq.isOK = false
                        }else{
                            this.validate.qq.isOK = true
                        }
                    }else{
                        this.validate.qq.isOK = true
                    }
                    
            },
		    async save(){
                this.check();
                if(Object.values(this.validate).every(x=>x.isOK)){
                    let params = {}
                    params.mobile = this.studentInfo.mobile;
                    params.pic = this.studentInfo.pic;
                    params.wx = this.studentInfo.wx;
                    params.qq = this.studentInfo.qq;
                    params.nation = this.studentInfo.nation;
                    params.politics = this.studentInfo.politics;
                    params.addr = this.studentInfo.addr;
                    params.eduExpList = this.studentInfo.eduExpList.length>0?this.studentInfo.eduExpList:null;
                    const result = await this.$axios.personMod(params);
                    if(result.code==1000){
                        this.successMsg('操作成功');
                        this.$router.push(
                            {
                                path: '/PerCenter'
                            }
                        );
                    }else{
                        this.dialog(result.message)
                    }
                }
		    }
	},
	created(){
		this.userType = localStorage.getItem('userType');
    },
    mounted(){
        this.getPersonInfo();
        this.accessToken = localStorage.getItem("accessToken");
    }
}

</script>
<style lang="stylus">
    .student-editor
        padding-bottom 120px
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
                    position relative
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
                        .address    //地址
                            height auto
                            .detail
                                margin-top 50px
                                .el-input
                                    width 100%
                            .el-input
                                width 300px
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
                            width 400px
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

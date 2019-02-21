<!-- 
* name: 班级管理 -新增编辑学生
* author: cgc
* time: 2018-8-24
-->
<template lang="pug">
    .class-stu-edit
        Header(title="个人资料",@goBack="goBack")
        .container
            nav
                span.left 基本信息
            ul
                li
                    .attribute 专业班级
                        i *
                    .content
                        el-input(v-model="studentInfo.className",:disabled="true")
                li
                    .attribute 学号
                        i *
                    .content
                        el-input(v-model="studentInfo.stdNum",placeholder="学号",@input="check")
                        |
                        span(v-if="!validate.stdNum.isOK",class="validate") {{validate.stdNum.text}}
                li
                    .attribute 姓名
                        i *
                    .content
                        el-input(v-model="studentInfo.userName",placeholder="姓名",@input="check")
                        |
                        span(v-if="!validate.userName.isOK",class="validate") {{validate.userName.text}}
                li
                    .attribute 手机号码
                        i *
                    .content
                        el-input(v-model="studentInfo.mobile",placeholder="手机号码",maxlength='11',@input="check")
                        |
                        span(v-if="!validate.mobile.isOK",class="validate") {{validate.mobile.text}}
                li
                    .attribute 登录帐号
                        i *
                    .content
                        el-input(v-model="studentInfo.loginNme",:disabled="true")
                //- li
                //-     .attribute 角色
                //-         i *
                //-     .content
                //-         el-checkbox-group(v-model="studentInfo.roleIds")
                //-             el-checkbox(class="role-checkbox",v-for="item in roleList",:key="item.roleId",:label="item.roleId") {{item.roleName}}
                //-         |
                //-         span(v-if="!validate.roleIds.isOK",class="validate") {{validate.roleIds.text}}
                li
                    .attribute 密码
                        i *
                    .content
                        el-input(v-model="studentInfo.pwd",type="text",placeholder="密码",style="width:200px;",@input="check")
                        |
                        span(v-if="!validate.pwd.isOK && !inputUserId",class="validate") {{validate.pwd.text}}
                        |
                        span.generate(@click="generateFun") 自动生成
                li
                    .attribute 出生年月
                        i *
                    .content
                        el-date-picker(v-model="studentInfo.birthday",
                        placeholder="选择日期",
                        type="date",
                        format="yyyy-MM-dd",
                        @change="check")
                        |
                        span(v-if="!validate.birthday.isOK",class="validate") {{validate.birthday.text}}
                li
                    .attribute 性别
                        i *
                    .content
                        <el-radio-group v-model="studentInfo.gender" @change="check">
                            <el-radio label="m">男</el-radio>
                            <el-radio label="f">女</el-radio>
                        </el-radio-group>
                        |
                        span(v-if="!validate.gender.isOK",class="validate") {{validate.gender.text}}
                li
                    .attribute 身份证号码
                        i *
                    .content
                        el-input(v-model="studentInfo.idCard",@input="check")
                        |
                        span(v-if="!validate.idCard.isOK",class="validate") {{validate.idCard.text}}
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
                        span.addTip(v-if="!studentInfo.pic")
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
            ul
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
	name: 'ClassStuEdit',
	data() {
		return {
            orderNum:       0,
            userType:       '',
            fileImgUrl:     '', //临时图片地址
            postImgUrl:     '/edu/teach/uploadImg',  //上传图片地址,
            studentInfo:    {
                stdNum      :  '',
                userName    :  '',
                mobile      :  '',
                className   :  '',
                pwd         :  '',
                roleIds     :  [],
                birthday    :  '',
                gender      :  '',
                idCard      :  '',
                pic         :  '',
                wx          :  '',
                qq          :  '',
                nation      :  '',
                politics    :  '',
                addr        :  '',
                eduExpList  :  [] 
            },
            inputUserId:    '',
            classId:        '',
            roleList:[],
            accessToken:    '',
            validate:{
                stdNum:{
                    isOK:true,
                    text:'请填写学号'
                },
                userName:{
                    isOK:true,
                    text:'请填写姓名'
                },
                mobile:{
                    isOK:true,
                    text:''                     
                },
                pwd:{
                    isOK:true,
                    text:'请输入6到12位字母或数字'
                },
                birthday:{
                    isOK:true,
                    text:'请填写出生年月'
                },
                gender:{
                    isOK:true,
                    text:'请选择性别'
                },
                idCard:{
                    isOK:true,
                    text:''
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
                this.$router.push(
                    {
                        path:'/Student',
                        query:{
                            classId:this.classId,
                            stu:'add'
                        }
                    }
                );
            },
            check(){
                let res = this.studentInfo,
                    hybrid = /^[a-zA-Z\d]{6,12}$/,//6到12位字母或数字
                    re=/^1\d{10}$/,//手机号码正则
                    emailExp=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,//邮件正则
                    qqPattern = /^[1-9][0-9]{4,10}$/,//QQ正则
                    identity=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;//身份证正则
                    if(!res.mobile){
                        this.validate.mobile.isOK = false
                        this.validate.mobile.text = '请填写手机号码';
                    }else if(!re.test(res.mobile)){                                   // 手机号码验证
                        this.validate.mobile.isOK  = false                      
                        this.validate.mobile.text = '填写手机号码有误';
                    }else{
                        this.validate.mobile.isOK  = true                      
                    }

                    if(!res.stdNum){
                        this.validate.stdNum.isOK = false
                    }else{
                        this.validate.stdNum.isOK = true
                    }

                    if(!res.userName){
                        this.validate.userName.isOK = false
                    }else{
                        this.validate.userName.isOK = true
                    }


                    if(!res.birthday){
                        this.validate.birthday.isOK = false
                    }else{
                        this.validate.birthday.isOK = true
                    }


                    if(!hybrid.test(res.pwd) && !this.inputUserId){
                        this.validate.pwd.isOK = false
                    }else{
                        this.validate.pwd.isOK = true
                    }

                    if(!res.gender){
                        this.validate.gender.isOK = false
                    }else{
                        this.validate.gender.isOK = true
                    }

                    if(!res.idCard){
                        this.validate.idCard.isOK = false
                        this.validate.idCard.text = '请填写身份证号码'
                    }else{
                        this.validate.idCard.isOK = true
                    }

                    if(!identity.test(res.idCard)){
                        this.validate.idCard.isOK = false
                        this.validate.idCard.text = '身份证号码格式不正确'
                    }else{
                        this.validate.idCard.isOK = true
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
            async getPersonInfo(){          //请求学生信息
                let params = {}
                params.type = '1',
                params.inputUserId = this.inputUserId
                const res = await this.$axios.personInfo(params);
                if(res.code===1000){
                    this.studentInfo = res.data
                    if(!Array.isArray(res.data.eduExpList)){
                        this.studentInfo.eduExpList = [];
                    }
                    // this.$set(this.studentInfo, 'eduExpList', []);
                    this.$set(this.studentInfo, 'pwd','');
                    //this.studentInfo.eduExpList = res.data.eduExpList;
                    this.fileImgUrl = this.img_api + this.studentInfo.pic
                }
            },
            async generateFun(){                //生成密码
                const res = await this.$axios.getGenerPwd();
                if(res.code===1000){
                    this.$set(this.studentInfo, 'pwd', res.data.password);
                    console.log('MD5：',this.$md5(this.studentInfo.pwd).toUpperCase());
                }else{
                    this.dialog(res.message);
                }
            },
            addEducation(){
                this.orderNum++;  
                const len = this.studentInfo.eduExpList.length;
                this.$set(this.studentInfo.eduExpList, len, {
                    orderNum:this.orderNum.toString(),
                    startTime:'',
                    endTime:'',
                    gradeDesc:'',
                    major:'',
                    school:''
                })     
            },
            deleEducation(index){                           //删除当前教育经历
                this.studentInfo.eduExpList.splice(index,1);
            },
            async getRoleList(){
                const res = await this.$axios.getRoleList();
                if(res.code===1000){
                    this.roleList = res.data;
                    console.log(this.roleList,'this.roleList');
                }else{
                    this.dialog(res.message);
                }
            },
            handleAvatarSuccess(res, file) {
                if(res.code == 1000) {
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
		    async save(){
                this.check();
                if(Object.values(this.validate).every(x=>x.isOK)){
                    var params = {}
                    params.stuId = this.inputUserId;
                    params.stdNum = this.studentInfo.stdNum;
                    params.classId = this.classId;
                    params.userName = this.studentInfo.userName;
                    params.mobile = this.studentInfo.mobile;
                    params.loginName = this.studentInfo.loginNme;
                    params.birthday = this.dayjs(this.studentInfo.birthday).format('YYYY-MM-DD');
                    params.gender = this.studentInfo.gender;
                    params.idCard = this.studentInfo.idCard;
                    params.pwd = !this.studentInfo.pwd?'':this.$md5(this.studentInfo.pwd).toUpperCase();
                    params.pic = this.studentInfo.pic;
                    params.roleIds = "87673587519062016";
                    params.wx = this.studentInfo.wx;
                    params.qq = this.studentInfo.qq;
                    params.nation = this.studentInfo.nation;
                    params.politics = this.studentInfo.politics;
                    params.addr = this.studentInfo.addr;
                    params.eduExpList = this.studentInfo.eduExpList.length>0?this.studentInfo.eduExpList:null;
                    const result = await this.$axios.getStuEdit(params);
                    if(result.code==1000){
                        this.successMsg('操作成功');
                        this.$router.push(
                            {
                                path:'/Student',
                                query:{
                                    classId:this.classId,
                                    stu:'add'
                                }
                            }
                        );
                    }else{
                        this.dialog(result.message)
                    }
                }
                    
            },
	},
	created(){
        this.userType = localStorage.getItem('userType');
        if(this.$route.query.inputUserId){
            this.inputUserId = this.$route.query.inputUserId;
            this.getPersonInfo();
        }
        if(this.$route.query.classId){
            this.classId = this.$route.query.classId;
        }
    },
    mounted(){
        this.getRoleList();
        this.accessToken = localStorage.getItem('accessToken');
        this.studentInfo.className = sessionStorage.getItem('className')
    },
    watch:{
        'studentInfo.mobile'(val){
            this.studentInfo.loginNme = val;
        }
    }
}

</script>
<style lang="stylus">
    .class-stu-edit
        .container 
            height 100%
            background #efefef
            padding-bottom 50px; /*no*/
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
                        .role-checkbox
                            margin 0 30px 0 0
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
                                border 1px solid #dcdfe6;/*no*/
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
                        .generate
                            margin-left 20px
                            color #138BE7
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

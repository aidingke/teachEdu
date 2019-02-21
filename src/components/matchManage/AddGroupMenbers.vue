<!-- 
* name: 添加校外人员
* author: gxr
* time: 2018-8-20
-->
<template lang='pug'>
    .addGroupMenbers
        Header(title="个人资料", @goBack="goBack")
        .container
            nav
                span.left 基本信息
            <el-form v-if="editStatus == 1" :model="ruleForm" :rules="rules" ref="formName" label-width="130px" class="formBox">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="ruleForm.mobile" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="loginName">
                    <el-input v-model="ruleForm.loginName" :disabled="true" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    p.passTip 手机号码后6位
                </el-form-item>
                <el-form-item label="学校" prop="school">
                    <el-input v-model="ruleForm.school"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="ruleForm.gender">
                        <el-radio label="m">男</el-radio>
                        <el-radio label="f">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="照片">
                    <el-upload class="avatar-uploader" :headers="headersSet" :action="postImgUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="imgFile" :data="{imgType: 1}" accept="image/jpg,image/jpeg,image/png">
                        <img v-if="uploadImgSrc" :src="uploadImgSrc" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <input type="hidden"  v-model="ruleForm.imgName" value="">
                    span.addTip
                            | 请上传一张清晰的个人照片 
                            br
                            | 大小不超过2M
                </el-form-item>
            </el-form>
            ul(v-if="editStatus == 2")
                li
                    span.attribute 姓名
                    span.content {{ruleForm.username}}
                li
                    span.attribute 手机号码
                    span.content {{ruleForm.mobile}}
                li
                    span.attribute 学校
                    span.content {{ruleForm.school}}
                li
                    span.attribute 性别
                    span.content {{ruleForm.gender == 'f' ? '女':'男'}}
                li(v-if="ruleForm.imgName")
                    span.attribute 照片
                    span.content 
                        a
                            img(:src="'http://192.168.1.200/eduFiles/'+ruleForm.imgName")
            .fixed-footer(v-if="showEditBool")
                el-button(type="primary" @click="addMatchPerson('formName')") {{editStatusTxt}}
</template>
<script>
export default {
	name: 'AddGroupMenbers',
	data() {
        return {
            ruleForm: {
                groupId: '',
                stuId: '',
                username: '',
                mobile: '',
                loginName: '',
                school: '',
                gender: 'm',
                imgName: '',
            },
            uploadImgSrc: '', //上传临时图片路径
            editStatus: 1, //编辑状态, 1:保存，2:编辑
            editStatusTxt: '保存',
            showEditBool: true,
            postImgUrl: '/edu/teach/uploadImg', //上传图片地址
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'change'}
                ],
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'change'},
                    { validator: this.checkMobile,message:'手机号码格式不正确',trigger: 'change'},
                ],
                loginName: [
                    { required: true, message: '登录账号不能为空', trigger: 'change'},
                ],
                school: [
                    { required: true, message: '请填写学校', trigger: 'change'},
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change'},
                ],
            }
        }
    },
    computed:{
        headersSet() {
            return {
                'accessToken': localStorage.getItem("accessToken")
            }
        }
    },
    watch: {
        'ruleForm.mobile': function (val) { //检测手机号码赋值给登录账号
            this.ruleForm.loginName = val;
        },
    },
    methods:{
        goBack() { //返回按钮
            if(this.$route.query.groupId) {
                this.$router.push({
                    path: './GroupMembers?groupId='+this.$route.query.groupId+'&matchStatus='+this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId 
                });
            } else {
                this.$router.back(-1);
            }
        },
        async getMatchStuInfo() { //获取比赛个人信息
            let params = {};
            params.stuId = this.$route.query.stuId;
            const res = await this.$axios.getMatchPersonInfo(params);
            if(res.code == 1000) {
                this.ruleForm.username = res.data.userName;
                this.ruleForm.mobile = res.data.mobile;
                this.ruleForm.school = res.data.school;
                this.ruleForm.gender = res.data.gender;
                this.ruleForm.imgName = res.data.pic;
            }
            
        },
        checkMobile(rule, value, callback){ //验证手机号码
            if (!/^1\d{10}$/.test(value) ) {
                callback(new Error());
            } else {
                callback();
            }
        },
        handleAvatarSuccess(res, file) {
            this.uploadImgSrc = URL.createObjectURL(file.raw);
            if(res.code === 1000) {
                this.ruleForm.imgName = res.data.imgName;
            }
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        addMatchPerson(formName){
            if(this.editStatus == 2) {
                this.editStatusTxt = '保存编辑';
                this.editStatus = 1;
                return false;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = Object.assign({}, this.ruleForm);
                    const res = this.$axios.editMatchStu(params).then(data => {
                        console.log(data);
                        if(data.code == 1000) {
                            this.editStatus = 2;
                            this.editStatusTxt = '编辑';
                            this.ruleForm.stuId = data.data.stuId;
                            this.successMsg('添加成功', () => {
                                this.$router.push({
                                    path: './GroupMembers?groupId='+this.$route.query.groupId+'&matchStatus='+this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId  
                                });
                            });
                        } else {
                            this.dialog(data.message);
                        }
                    });
                }
            });
        }
    },
    mounted(){
        if(this.$route.query.stuId) { //判断是否是查看个人资料还是添加资料
            this.showEditBool = false;
            this.editStatus = 2;
            this.getMatchStuInfo();
        } else {
            this.showEditBool = true;
            this.editStatus = 1;
            this.ruleForm.groupId = this.$route.query.groupId;
        }
    }
}
</script>
<style lang="stylus">
    .addGroupMenbers
        .container 
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
            .formBox
                padding-bottom 200px
                .el-form-item
                    margin 50px 0 0
                    .el-form-item__label
                        text-align center
                        font-size 30px
                        line-height 80px
                    .el-input
                        width 55%
                    .el-form-item__content
                        line-height 80px
                    .el-checkbox
                        margin-right 30px
                    .passTip
                        font-size 30px
                        color #939393
                    .el-form-item__error
                        font-size 28px
                        padding-top 5px
                    .avatar-uploader
                        display inline-block
                        .el-upload
                            border 1px solid #dcdfe6
                            border-radius 8px
                            &:active
                                border 1px solid #1F7FC8
                            .avatar-uploader-icon
                                width 200px
                                height 200px
                                line-height 200px
                                text-align center
                                font-size 100px
                                color #dcdfe6
                            img
                                display block
                                max-width 200px
                    .addTip
                        display inline-block
                        margin-left 50px
                        line-height 2
                        color #c0c4cc
            ul 
                li 
                    display flex
                    margin 50px 0 0
                    padding 0 30px
                    font-size 30px
                    span.attribute
                        float left
                        height 80px
                        line-height 80px
                        box-sizing border-box
                    span.content
                        box-sizing border-box
                        line-height 80px
                        margin-left 30px
                        a
                            display block
                            width 200px
                            height 200px
                            img
                                max-width 100%
            .fixed-footer
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
                    width 90%
                    background-color #138BE7 !important
</style>

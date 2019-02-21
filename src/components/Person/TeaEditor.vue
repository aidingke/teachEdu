<template lang='pug'>
    .tea-editor
        Header(title="个人资料",@goBack="goBack")
        .container
            nav
                span.left 基本信息
            ul
                li
                    .attribute 姓名
                        i *
                    .content
                        el-input(v-model="teacherInfo.userName",:disabled='true')
                li
                    .attribute 手机号码
                        i *
                    .content
                        el-input(v-model="teacherInfo.mobile",placeholder="手机号码",maxlength='11',@input="check")
                        |
                        span(v-if="!validate.mobile.isOK",class="validate") {{validate.mobile.text}}
                li
                    .attribute 职务
                        i *
                    .content
                        el-input(v-model="teacherInfo.job" :disabled="true")
                li
                    .attribute 性别
                        i *
                    .content
                        <el-radio v-if="teacherInfo.gender" v-model="teacherInfo.gender" label="m">男</el-radio>
                        <el-radio v-if="teacherInfo.gender" v-model="teacherInfo.gender" label="f">女</el-radio>
                li
                    .attribute 邮箱
                        i *
                    .content
                        el-input(v-model="teacherInfo.email" :disabled="true")
                li
                    .attribute 入职时间
                    .content
                        el-date-picker(v-model="teacherInfo.learnTime",
                        placeholder="选择日期",
                        type="date",
                        format="yyyy-MM-dd")
                li
                    .attribute 出生年月
                    .content
                        el-date-picker(v-model="teacherInfo.birthday",
                        placeholder="选择日期",
                        type="date",
                        format="yyyy-MM-dd")
                li
                    .attribute 照片
                    .content(:style="{width:'110px',height:'110px'}")
                        el-upload(class="avatar-uploader" 
                        name="imgFile"
                        :headers="{accessToken: this.accessToken}"
                        :action="postImgUrl" 
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess" 
                        :data="{imgType:0}"
                        :before-upload="beforeAvatarUpload")
                            img(v-if="teacherInfo.pic",:src="fileImgUrl" class="avatar")
                            i(v-else class="el-icon-plus avatar-uploader-icon")
                        input(type="hidden" v-model="teacherInfo.pic" value="")
                        span.addTip(v-if="!fileImgUrl")
                            | 请上传一张清晰的个人照片 
                            br
                            | 大小不超过2M
                li
                    .attribute 微信号
                    .content
                        el-input(v-model="teacherInfo.wx")
                li
                    .attribute QQ
                    .content
                        el-input(v-model="teacherInfo.qq",@input="check")
                        |
                        span(v-if="!validate.qq.isOK",class="validate") {{validate.qq.text}}
            FixedButton(buttonText='保存', @listenToChildEvent="save")
</template>
<script>
import baseUrl from '@/apiconfig'
export default {
	name: 'TeaEditor',
	data() {
        return {
            imageUrl:       '',
            fileImgUrl:     '',                      //临时图片地址
            postImgUrl:     '/edu/teach/uploadImg',  //上传图片地址,
            userType:       '',
            teacherInfo:    {},
            accessToken:    '',
            validate:       {
                mobile:{
                    isOK:true,
                    text:'请填写手机号'
                },
                qq:{
                    isOK:true,
                    text:'填写QQ号有误'
                }
            },
            img_api: baseUrl.img_api
        }
    },
    methods:{
        goBack(){
            this.$router.push({
                path:'PerCenter'
            });
        },
        async getPersonInfo(){              //请求教师信息
            let params = {
                type:0
            }
            const res = await this.$axios.personInfo(params);
            if(res.code===1000){
                this.teacherInfo = res.data;
                this.fileImgUrl = this.img_api + this.teacherInfo.pic
            }
        },
        edit(){
            this.$router.push({
		    	path:'/TeacherDeditor'
            })
        },
        handleAvatarSuccess(res, file) {
            if(res.code == 1000) {
                console.log(res,'res');
                this.fileImgUrl = URL.createObjectURL(file.raw);
                this.teacherInfo.pic = res.data.imgName;
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
            let res = this.teacherInfo,
                re=/^1\d{10}$/,
                emailExp=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                qqPattern = /^[1-9][0-9]{4,10}$/;
            if(!res.mobile){     
                this.validate.mobile.isOK = false
				this.validate.mobile.text = '请填写手机号码';
            }else if(!re.test(res.mobile)){                   // 手机号码验证
                this.validate.mobile.isOK = false
                this.validate.mobile.text = '填写手机号码有误';
            }else{
                this.validate.mobile.isOK = true
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
                params.mobile = this.teacherInfo.mobile
                params.pic = this.teacherInfo.pic
                params.wx = this.teacherInfo.wx
                params.qq = this.teacherInfo.qq
                params.politics = this.teacherInfo.politics
                params.addr = this.teacherInfo.addr
                const result = await this.$axios.personMod(params);
                if(result.code==1000){
                    this.successMsg('操作成功');
                    this.$router.push(
                        {
                            path: '/PerCenter'
                        }
                    );
                }else{
                    this.dialog(result.message);
                }
            }
		    
        }
    },
    created(){
		this.userType = localStorage.getItem('userType');
    },
    mounted(){
        this.getPersonInfo();
        this.accessToken = localStorage.getItem('accessToken');
    }
}
</script>
<style lang="stylus">
    .tea-editor
        .container 
            height 100%
            background #fff
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
            ul 
                font-size 28px
                overflow auto
                padding-bottom 120px
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
                        i
                            color #f56c6c
                    div.content
                        flex 3
                        height 60px
                        line-height 60px
                        .avatar-uploader
                            display inline-block
                            .el-upload
                                border 1px dashed #dcdfe6;/*no*/
                                border-radius 8px
                                .avatar 
                                    width 200px
                                    height 200px
                                    display block
                                    border 1px dashed #dcdfe6;/*no*/
                                &:active
                                    border 1px dashed #1F7FC8;/*no*/
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
                        a
                            width 200px
                            height 200px
                            img
                                max-width 100%
</style>

<template lang="pug">
    .teacher-info
        Header(title="个人资料",@goBack="goBack")
        .container
            nav
                span.left 基本信息
            ul
                li
                    .attribute 姓名
                        i *
                    .content
                        el-input(v-model="personObj.name",@input="check")
                        |
                        span(v-if="!validate.name.isOK",class="validate") {{validate.name.text}}
                li
                    .attribute 手机号码
                        i *
                    .content
                        el-input(v-model="personObj.mobile",maxlength="11",@input="check")
                        |
                        span(v-if="!validate.mobile.isOK",class="validate") {{validate.mobile.text}}
                li
                    .attribute 登录帐号
                        i *
                    .content
                        el-input(v-model="personObj.loginName" :disabled="true")
                        
                li
                    .attribute 密码
                        i *
                    .content
                        el-input(v-model="personObj.pwd",type="text",placeholder="密码",@input="check",style="width:200px;")
                        |
                        span(v-if="!validate.pwd.isOK",class="validate") {{validate.pwd.text}}
                        |
                        span.generate(@click="generateFun") 自动生成
                li
                    .attribute 职务
                        i *
                    .content
                        el-input(v-model="personObj.teachJob",@input="check")
                        |
                        span(v-if="!validate.teachJob.isOK",class="validate") {{validate.teachJob.text}}
                li
                    .attribute 角色
                        i *
                    .content
                        el-checkbox-group(v-model="personObj.roleIds",@change="check")
                            el-checkbox(v-if="!item.isDefault",class="role-checkbox",v-for="item in roleList",:key="item.roleId",:label="item.roleId") {{item.roleName}}
                        |
                        span(v-if="!validate.roleIds.isOK",class="validate") {{validate.roleIds.text}}
                li
                    .attribute 邮箱
                        i *
                    .content
                        el-input(v-model="personObj.email",@input="check")
                        |
                        span(v-if="!validate.email.isOK",class="validate") {{validate.email.text}}
                li
                    .attribute 入职时间
                    .content
                        el-date-picker(v-model="personObj.joinTime",
                        placeholder="选择日期",
                        type="date",
                        format="yyyy-MM-dd")
                li
                    .attribute 出生年月
                    .content
                        el-date-picker(v-model="personObj.bornTime",
                        placeholder="选择日期",
                        type="date",
                        format="yyyy-MM-dd")
                li
                    .attribute 性别
                        i *
                    .content
                        <el-radio-group v-model="personObj.gender" @change="check">
                            <el-radio label="m">男</el-radio>
                            <el-radio label="f">女</el-radio>
                        </el-radio-group>
                        |
                        span(v-if="!validate.gender.isOK",class="validate") {{validate.gender.text}}
                li(v-if="hasQx('teach:uploadImg')")
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
                            //- img(v-if="fileImgUrl",:src="fileImgUrl",class="avatar")
                            img(v-if="personObj.imgName",:src="fileImgUrl",class="avatar")
                            i(v-else,class="el-icon-plus avatar-uploader-icon")
                        <input type="hidden" v-model="personObj.imgName" value="">
                        span.addTip(v-if="!personObj.imgName")
                            | 请上传一张清晰的个人照片 
                            br
                            | 大小不超过2M
                li
                    .attribute 职称
                    .content
                        el-input(v-model="personObj.jobTitle")
                li
                    .attribute 微信号
                    .content
                        el-input(v-model="personObj.wechat")
                li
                    .attribute QQ
                    .content
                        el-input(v-model="personObj.qq",@input="check")
                        |
                        span(v-if="!validate.qq.isOK",class="validate") {{validate.qq.text}}
            
            FixedButton(buttonText='保存', @listenToChildEvent="save()",v-if="hasQx('teach:editStu')")
</template>
<script>
import baseUrl from '@/apiconfig'
export default {
	name: 'TeacherInfo',
	data() {
        return {
            personObj:{
                name:'',
                mobile:'',
                loginName:'',
                pwd:'',
                teachJob:'',
                roleIds: [],
                email:'',
                joinTime:'',
                bornTime:'',
                gender:'',
                imgName:'',
                jobTitle:'',
                wechat:'',
                qq:''
            },
            postImgUrl:'/edu/teach/uploadImg',  //上传图片地址',
            roleList:[],
            accessToken:    '',
            fileImgUrl:     '',                 //临时图片地址
            warningText:    '',
            validate:{
                name:{
                    isOK:true,
                    text:'请填写姓名'
                },
                mobile:{
                    isOK:true,
                    text:''                     //动态修改
                },
                teachJob:{
                    isOK:true,
                    text:'请填写职务'
                },
                roleIds:{
                    isOK:true,
                    text:'请选择角色'
                },
                pwd:{
                    isOK:true,
                    text:'请输入6到12位字母或数字'
                },
                email:{
                    isOK:true,                  //动态修改
                    text:''
                },
                gender:{
                    isOK:true,
                    text:'请选择性别'
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
                path:'TeacherManage'
            });
        },
        handleAvatarSuccess(res, file) {
            if(res.code == 1000) {
                this.fileImgUrl = URL.createObjectURL(file.raw);
                this.personObj.imgName = res.data.imgName;
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
        async generateFun(){                //生成密码
            const res = await this.$axios.getGenerPwd();
            if(res.code===1000){
                this.personObj.pwd = res.data.password;
                console.log('MD5：',this.$md5(this.personObj.pwd).toUpperCase());
            }
        },
        check(){
            let res = this.personObj,
                hybrid = /^[a-zA-Z\d]{6,12}$/,//6到12位字母或数字
                re=/^1\d{10}$/,
                emailExp=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                qqPattern = /^[1-9][0-9]{4,10}$/;
            if(!res.name){    
                this.validate.name.isOK = false                      // 姓名
                this.validate.name.text = '请填写姓名';
            }else{
                this.validate.name.isOK  = true                    
            }

            if(!res.mobile){    
                this.validate.mobile.isOK  = false                      // 手机号
                this.validate.mobile.text = '请填写手机号码';
            } else if(!re.test(res.mobile)){                                   // 手机号码验证
                this.validate.mobile.isOK  = false                      
                this.validate.mobile.text = '填写手机号码有误';
   			} else{
                this.validate.mobile.isOK  = true                      
            }

            if(!hybrid.test(res.pwd) && !this.teachId){
                this.validate.pwd.isOK = false
            }else{
                this.validate.pwd.isOK = true
            }


            if(!res.teachJob){                                          // 职务
                this.validate.teachJob.isOK = false
            }else{
                this.validate.teachJob.isOK = true
            }

            if(res.roleIds.length==0){                                  //  角色
                this.validate.roleIds.isOK = false
            }else{
                this.validate.roleIds.isOK = true
            }

            if(!res.gender){                                            // 性别
                this.validate.gender.isOK = false
            }else{
                this.validate.gender.isOK = true
            }

            if(!res.email){                                             //  邮箱
                this.validate.email.isOK  = false
                this.validate.email.text = '请填写邮箱';
            }else{
                this.validate.email.isOK = true
            }

   			if(!emailExp.test(res.email)){                              // 邮箱验证
                this.validate.email.isOK = false
                this.validate.email.text = '填写邮箱有误';
            }else{
                this.validate.email.isOK = true
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
            if(Object.values(this.validate).every(x=>x.isOK)){      //验证通过完毕后
                const params = Object.assign({}, this.personObj);
                params.roleIds = params.roleIds.toString();//
                params.pwd = !params.pwd?'':this.$md5(params.pwd).toUpperCase();
                params.joinTime = this.dayjs(params.joinTime).format('YYYY-MM-DD');
                params.bornTime = this.dayjs(params.bornTime).format('YYYY-MM-DD');
                if(this.teachId) { // 存在则是编辑保存
                    params.teachId = this.teachId   //编辑的话 传教师id
                    delete params.loginName //老师登陆名(与手机号一致，修改的时候 不用传，新增必传)
                }
                const result = await this.$axios.getTeacherEdit(params);
                if(result.code==1000) {
                    this.teachId = result.data.teachId || this.teachId;     //教师Id
                    this.successMsg('操作成功');
                    this.$router.push(
                        {
                            path: '/TeacherManage'
                        }
                    )
                }else{
                    this.dialog(result.message);
                }
            }
        },
        async getRoleList(){
            const res = await this.$axios.getRoleList();
            if(res.code===1000){
                this.roleList = res.data;
            }
        },
        async getDetail(){          //获取教师详情接口
            let params = {
                teachId: this.teachId
            }
            const res = await this.$axios.getTeacherDetail(params);
            console.log(res.data);
            this.personObj["qq"] = res.data.qq;
            this.personObj["gender"] = res.data.gender;
            this.personObj["joinTime"] = res.data.joinTime;
            this.personObj["jobTitle"] = res.data.jobTitle;
            this.personObj["mobile"] = res.data.mobile;
            this.personObj["wechat"] = res.data.wechat;
            this.personObj["imgName"] = res.data.imgName;
            this.personObj["bornTime"] = res.data.bornTime;
            this.personObj["roleIds"] = res.data.roleIds ? res.data.roleIds.split(','): [];
            this.personObj["name"] = res.data.name;
            this.personObj["roleNames"] = res.data.roleNames;
            this.personObj["teachJob"] = res.data.job;
            this.personObj["email"] = res.data.email;
            this.fileImgUrl = this.img_api + this.personObj.imgName;
        }

    },
    created (){
        window.scrollTo(0, 0);
        if (this.$route.query.teachId) {
            this.teachId = this.$route.query.teachId;
            this.getDetail();
        }
        this.getRoleList();
        
    },
    mounted(){
        this.accessToken = localStorage.getItem("accessToken");
    },
    watch:{
        'personObj.mobile'(val){
            this.personObj.loginName = val;
        }
    }
}
</script>
<style lang="stylus">
    .teacher-info
        .container 
            height 100%
            background #fff
            nav
                height 88px
                line-height 88px
                font-size 30px
                padding 15px 30px
                background #fff
                border-bottom 1px solid #efefef;/*no*/
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
                        display inline-block
                        i
                            color #f56c6c
                    div.content
                        flex 3
                        line-height 60px
                        display inline-block
                        .role-checkbox
                            margin 0 30px 0 0
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
                            width 500px
                        .generate
                            margin-left 20px
                            color #138BE7
                        .validate
                            color #E46969
                            margin-left 20px
                        a
                            width 200px
                            height 200px
                            img
                                max-width 100%
</style>


<template lang="pug">
    .teacher-info
        Header(title="个人资料",@goBack="goBack")
        .container
            nav
                span.left 基本信息
            ul
                li
                    .attribute 姓名
                    .content {{detail.name}}
                li
                    .attribute 手机号码
                    .content {{detail.mobile}}
                li
                    .attribute 职务
                    .content {{detail.job}}
                li
                    .attribute 角色
                    .content {{detail.roleNames}}
                li
                    .attribute 邮箱
                    .content {{detail.email}}
                li
                    .attribute 入职时间
                    .content {{detail.joinTime}}
                li
                    .attribute 出生年月
                    .content {{detail.bornTime}}
                li
                    .attribute 性别
                    .content {{detail.gender==='m'?'男':'女'}}
                li
                    .attribute 照片
                    .content
                        img(:src="detail.imgName")
                li
                    .attribute 职别
                    .content {{detail.jobTitle}}
                li
                    .attribute 微信号
                    .content {{detail.wechat}}
                li
                    .attribute QQ
                    .content {{detail.qq}}
            FixedButton(buttonText='编辑', @listenToChildEvent="save()")
</template>
<script>
export default {
	name: 'TeacherInfo',
	data() {
        return {
            warningText:'',
            teachId: '', 
            detail:{}
        }
    },
    methods:{
        goBack(){
            this.$router.back(-1);
        },
        save (){
            this.$router.push({ path: '/TeacherInfo', query: { teachId: this.teachId } });
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
            this.detail = Object.assign({},res.data);
        }
    },
    created (){
        this.teachId = this.$route.query.id;
        this.getRoleList();
        this.getDetail();
    },
    watch:{
        'personObj.mobile'(val){
            console.log(val);
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
                                border 1px dashed #dcdfe6
                                border-radius 8px
                                .avatar 
                                    width 200px
                                    height 200px
                                    display block
                                    border 2px dashed #dcdfe6
                                &:active
                                    border 1px dashed #1F7FC8
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


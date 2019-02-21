<!-- 
* name: 班级管理 -学生信息
* author: cgc
* time: 2018-8-24
-->
<template lang="pug">
    .class-stu-info
        Header(title="个人资料",@goBack="goBack")         
        .container
            nav
                .left 基本信息
            ul
                li
                    span.attribute 专业班级
                    span.content {{studentInfo.className}}
                li
                    span.attribute 学号
                    span.content {{studentInfo.stdNum}}
                li
                    span.attribute 姓名
                    span.content {{studentInfo.userName}}
                li
                    span.attribute 手机号码
                    span.content {{studentInfo.mobile}}
                li
                    span.attribute 登陆帐号
                    span.content {{studentInfo.loginNme}}
                li
                    span.attribute 出生年月
                    span.content {{studentInfo.birthday}}
                li
                    span.attribute 性别
                    span.content {{studentInfo.gender=='m'?'男':'女'}}
                li
                    span.attribute 身份证号码
                    span.content {{studentInfo.idCard}}
                li
                    span.attribute 照片
                    span.content(:style="studentInfo.pic!=null?imgSize:''")
                        a(href="javascript:void(0)",v-if="studentInfo.pic")
                            img(:src="studentInfo.pic")
                li
                    span.attribute 微信号
                    span.content {{studentInfo.wx}}
                li
                    span.attribute QQ
                    span.content {{studentInfo.qq}}
                li
                    span.attribute 民族
                    span.content {{studentInfo.nation}}
                li
                    span.attribute 政治面貌
                    span.content {{studentInfo.politics}}
                li
                    span.attribute 联系地址
                    span.content {{studentInfo.addr}}
            nav
                span.left 教育经历
            ul(v-if="studentInfo.eduExpList")
                li(v-for="(item,index) in studentInfo.eduExpList" :key="index")
                    span.attribute 学历 {{item.orderNum}}
                    span.content {{item.startTime}}至{{item.endTime}} —— {{item.gradeDesc}} —— {{item.major}} —— {{item.school}}
            FixedButton(buttonText='编辑', @listenToChildEvent="edit")
</template>
<script>
export default {
	name: 'PerStuInfo',
	data() {
		return {
            imgSize:{
                height:'130px',
                lineHeight:'130px'
            },
            userType:'',
            studentInfo:{},
            inputUserId:''
		}
	},
	methods: {
        goBack(){
            this.$router.back(-1);
        },
        edit(){
            this.$router.push({
                path:'/ClassStuEdit',
                query:{
                    inputUserId:this.inputUserId,
                    className:this.studentInfo.className,
                    classId:this.classId
                }
            })
        },
        async getPersonInfo(){          //请求学生信息
            let params = {}
            params.type = this.userType;
            params.inputUserId = this.inputUserId
            const res = await this.$axios.personInfo(params);
            if(res.code===1000){
                this.studentInfo = res.data
            }
        }
	},
	created(){
        this.userType = localStorage.getItem("userType"); //0-老师 1-学生
        if(this.$route.query.inputUserId){ 
            this.inputUserId = this.$route.query.inputUserId;
        }
        if(this.$route.query.classId){
            this.classId = this.$route.query.classId;
        }
    },
    mounted(){
        this.getPersonInfo();
    }
}
</script>
<style lang="stylus">
    .class-stu-info
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
                    color #000
                    span.attribute
                        flex 1
                        height 0.6rem
                        line-height 0.6rem
                    span.content
                        flex 3
                        height 0.6rem
                        line-height 0.6rem
                        a
                            width:200px;
                            height:200px;
                            img
                                max-width:100%
</style>

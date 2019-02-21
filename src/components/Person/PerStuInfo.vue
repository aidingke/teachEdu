<!-- 
* name: 学生信息
* author: cgc
* time: 2018-8-24
-->
<template lang="pug">
    .per-stu-info
        Header(title="个人资料",@goBack="goBack")         
        .container
            nav
                .left 班级信息
            ul
                li
                    span.attribute 学号
                    span.content {{studentInfo.stdNum}}
                li
                    span.attribute 系别
                    span.content {{studentInfo.grade}}
                li
                    span.attribute 班级
                    span.content {{studentInfo.className}}
                li
                    span.attribute 入学时间
                    span.content {{studentInfo.learnTime}}
                li
                    span.attribute 班主任
                    span.content {{studentInfo.teacher}}
            nav
                .left 基本信息
            ul
                li
                    span.attribute 姓名
                    span.content {{studentInfo.userName}}
                li
                    span.attribute 手机号码
                    span.content {{studentInfo.mobile}}
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
                            img(:src="img_api+studentInfo.pic")
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
            FixedButton(buttonText='编辑', @listenToChildEvent="edit",v-if="userType!='2'")
</template>
<script>
import baseUrl from '@/apiconfig'
export default {
	name: 'PerStuInfo',
	data() {
		return {
            imgSize:{
                height:'110px',
            },
            userType:       '',
            studentInfo:    {},
            img_api:        baseUrl.img_api
		}
	},
	methods: {
        goBack(){
            this.$router.back(-1);
        },
        errorTip(content){
            this.$alert(content, '提示', {
                confirmButtonText: '知道了',
                callback: action => {

                }
            });
        },
        edit(data){
            console.log(data);
            this.$router.push({
                path:'/StuEditor'
            })
        },
        async getPersonInfo(){          //请求学生信息
            let params = {
                type:1
            }
            const res = await this.$axios.personInfo(params);
            if(res.code===1000){
                this.studentInfo = res.data
            }
        }
	},
	created(){
		this.userType = localStorage.getItem("userType") //0-老师 1-学生
    },
    mounted(){
        this.getPersonInfo();
    }
}
</script>
<style lang="stylus">
    .per-stu-info
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
                        height 60px
                        line-height 60px
                        font-size 30px
                    span.content
                        flex 3
                        height 60px
                        line-height 60px
                        a
                            display inline-block
                            img
                                width 110px
                                height 110px
</style>

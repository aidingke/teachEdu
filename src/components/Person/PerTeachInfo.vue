<!-- 
* name: 老师信息
* author: cgc
* time: 2018-8-24
-->
<template lang="pug">
    .per-teach-info
        Header(title="个人资料",@goBack="goBack")
        .container
            nav
                span.left 基本信息
            ul
                li
                    span.attribute 姓名
                    span.content {{teachInfo.userName}}
                li
                    span.attribute 手机号码
                    span.content {{teachInfo.mobile}}
                li
                    span.attribute 职务
                    span.content {{teachInfo.job}}
                li
                    span.attribute 邮箱
                    span.content {{teachInfo.email}}
                li
                    span.attribute 入职时间
                    span.content {{teachInfo.learnTime}}
                li
                    span.attribute 出生年月
                    span.content {{teachInfo.birthday}}
                li
                    span.attribute 性别
                    span.content {{teachInfo.gender=='m'?'男':'女'}}
                li
                    span.attribute 照片
                    span.content(:style="teachInfo.pic!=null?imgSize:''")
                        a(href="javascript:void(0)",v-if="teachInfo.pic")
                            img(:src="img_api+teachInfo.pic")
                li
                    span.attribute 微信号
                    span.content {{teachInfo.wx}}
                li
                    span.attribute QQ
                    span.content {{teachInfo.qq}}
                    
            FixedButton(buttonText='编辑', @listenToChildEvent="edit")
</template>
<script>
import baseUrl from '@/apiconfig'
export default {
	name: 'PerTeachInfo',
	data() {
        return {
            imgSize:{
                height:'110px',
            },
            userType:       '',
            teachInfo:      {},
            img_api:        baseUrl.img_api
        }
    },
    methods:{
        goBack(){
            this.$router.back(-1);
        },
        async getPerTeachInfo(){        //请求老师信息
            let params = {
                type:this.userType
            }
            const res = await this.$axios.personInfo(params);
            if(res.code===1000){
                this.teachInfo = res.data
            }
        },
        edit(){
            this.$router.push({
		    	path:'/TeaEditor'
            })
        }
    },
    created(){
		this.userType = localStorage.getItem("userType") //0-老师 1-学生
    },
    mounted(){
        this.getPerTeachInfo();
    }
}
</script>
<style lang="stylus">
    .per-teach-info
        .container 
            height: 100%
            background: #fff
            nav 
                height: 88px
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
                                width 110px;/*no*/
                                height 110px;/*no*/
</style>

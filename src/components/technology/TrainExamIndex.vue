<!-- 
* name: 培训与考核首页引导
* author: fjd
* time: 2018-7-27
-->
<template lang="pug">
    .TrainExamIndex
        Header(title="培训与考核",@goBack="goBack")
        .container
            .col-wrap
                .col(@click="onLinkHandle(1)")
                    .col-item
                        a(href="javascript:void(0)")
                            img(src="static/img/Courseware.png",:class="{imgRow}") 
                        span(:class="{spanRow}") 课件

                .col(@click="onLinkHandle(2)")
                    .col-item
                        a(href="javascript:void(0)")
                            img(src="static/img/Questions.png",:class="{imgRow}") 
                        span(:class="{spanRow}") 题库

                .col(@click="onLinkHandle(3)",v-if="hasQx('stu:exam:list,teach:exam:list')")
                    .col-item
                        a(href="javascript:void(0)")
                            img(src="static/img/examine.png",:class="{imgRow}") 
                        span(:class="{spanRow}") 考核

                .col(@click="onLinkHandle(4)",v-if="hasQx('stu:task:list,teach:homework:list')")
                    .col-item
                        a(href="javascript:void(0)")
                            img(src="static/img/work.png",:class="{imgRow}") 
                        span(:class="{spanRow}") 作业

                .col(@click="onLinkHandle(5)",v-if="hasQx('teach:diagnose:list')")
                    .col-item
                        a(href="javascript:void(0)")
                            img(src="static/img/data-diagnosis.png",:class="{imgRow}") 
                        span(:class="{spanRow}") 数据诊断

                .col(@click="onLinkHandle(6)")
                    .col-item
                        a(href="javascript:void(0)")
                            img(src="static/img/technology.png",:class="{imgRow}") 
                        span(:class="{spanRow}") 技术培训    
</template>
<script>
    export default {
        name: 'TrainExamIndex',
        data () {
            return {
                userType:   '',
                spanRow:    false,
                imgRow:     false,
            }
        },
        methods:{
            goBack(){
                this.$router.push({
                    path:'/Home'
                })
            },
            onLinkHandle (type) {
                if(type == 1) {
                    this.$router.push({
                        path:'/CourseWare'
                    });
                } else if (type == 2) {        
                    if(this.hasQx('comm:questBank:list')){
                        this.$router.push({
                            path:'/Questions'
                        });
                    }else{
                        this.dialog('您无权进行该操作');/*  */
                    }
                } else if (type == 3) {
                    this.$router.push({
                        path:'/TeachPass'
                    });
                }else if (type == 4) {
                    this.$router.push({
                        path:'/TeachTask'
                    });
                }else if (type == 5) {
                    // if(this.hasQx('teach:diagnose:list')){
                    //     this.$router.push({
                    //         path:'/TeachDiagnosticList'
                    //     });
                    // }else{
                    //     this.dialog('您无权进行该操作');/*  */
                    // }
                    this.$router.push({
                        path:   'TeachDiagnosticList' 
                    });
                }else if (type == 6) {
                    let userType = window.localStorage.getItem("userType");
                    if(userType==="0" || userType==="4"){ // 老师
                        if(this.hasQx('teach:train:list')){
                            this.$router.push({
                                path:'/TeachTraining'
                            });
                        }else{
                            this.dialog('您无权进行该操作');
                        }
                    }else if(userType==="1"){ // 学生
                        if(this.hasQx('stu:train:list')){
                            this.$router.push({
                                path:'/Training'
                            });
                        }else{
                            this.dialog('您无权进行该操作');
                        }
                    }  
                }
            }
        },
        mounted(){
            this.userType = localStorage.getItem('userType'); 
            //判断手机横竖屏状态：
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", () => {
                if (window.orientation === 180 || window.orientation === 0) { 
                    console.log('竖屏状态！');
                    this.spanRow = false;
                    this.imgRow = false;
                } 
                if (window.orientation === 90 || window.orientation === -90 ){ 
                    console.log('横屏状态！');
                    this.spanRow = true;
                    this.imgRow = true
                    
                }  
            }, false)
        }
    }
</script>
<style lang="stylus">
.TrainExamIndex
    .container
        background #efefef
        position fixed
        left 0
        right 0
        height 100%
        overflow scroll
        .col-wrap
            display flex
            justify-content flex-start
            flex-wrap wrap
            padding 20px 15px
            margin 0 0 80px 0
            .col
                width 33.33%
                border-radius 10px
                text-align center
                box-sizing border-box
                .col-item
                    margin 20px
                    background #fff
                    border 1px solid #e3e3e3;/*no*/
                    a 
                        width 130px
                        height 130px
                        img 
                            max-width 130px
                            max-height 130px
                            margin-top 80px
                    span 
                        display block
                        font-size 30px
                        padding 82.8px 0
                    /*横*/
                    .spanRow
                        padding 151.96px 0
</style>

<!-- 
* name: 首页
* author: cgc
* time: 2018-8-2 
-->
<template lang="pug">
    .home
        Header(title="首页")
        .container
            .banner-container(v-if="isShowBanner")
                el-carousel(:interval="0" arrow="never" ref="carousel")
                    el-carousel-item(v-for="(item, index) in bannerList" :key="index")
                        .banner
                            img(:src="img_api+item.bannerPic" class="banner-img" @click="goBannerUrl(item.bannerUrl, item.bannerName)")
            .col-wrap
                .col(v-for="item of modules", @click="getPHPToken(item.path)" v-if='hasQx(item.qx) && !item.isLimit')
                    .col-item
                        a(href="javascript:void(0)")
                            img(:src="item.image",:class="{imgRow}") 
                        span(:class="{spanRow}") {{item.name}}
</template>
<script>
import baseUrl from '@/apiconfig'
export default {
    name: "Home",
    data() {
        return {
        userType:     "",
        img_api: baseUrl.img_api+'ad/',
        bannerList:   [],   // 首页banner图
        carouselPlay:  "",  // 轮播图手动计时器
        limitFlag:    "",   // 学生受限版标识
        isMac:        "",
        phpToken:     "", //php token
        androidId:    "f6a9027f4e9d4c2019f28b55983db501", //安卓 渠道标识
        iosId:        "99e40ec93f2d7440761769ccf5a382bc", //IOS 渠道标识
        iosFlag:      null, //判断是否iIOS
        // 例如这是权限列表
        spanRow:      false,
        imgRow:       false,
        modules: [
            {
                path: "DataDiagnosis",
                image: "static/img/data-diagnosis.png",
                name: "数据诊断",
                qx: 'stu:dig:list'
            },
            {
                path: "SocialPractice",
                image: "static/img/social-practice.png",
                name: "社会实践",
                qx: "comm:php:token",
                isLimit: false          // 后台相同权限，但学生受限版限制访问
            },
            {
                path: "TrainExamIndex",
                image: "static/img/training-and-assessment.png",
                name: "培训与考核",
                qx: 'teach:train:list,stu:train:list'
            },
            {
                path: "DigitalTeachingResources",
                image: "static/img/digital-teaching-resources.png",
                name: "数字化教学资源",
                qx: "comm:php:token"
            },
            {
                path: "MatchManage",
                image: "static/img/match-manage.png",
                name: "比赛管理",
                qx: "teach:match:list,stu:match:list"
            },{
                path: "ClassTableData",
                image: "static/img/class-manage.png",
                name: "课程管理",
                qx: 'teach:course:list'
            },{
                path: "SelectClass",
                image: "static/img/class-course.png",
                name: "班级管理",
                qx: 'teach:class:list'
            },{
                path: "TeacherManage",
                image: "static/img/teachers-manage.png",
                name: "师资管理",
                qx: 'teach:list'
            },{
                path: "VideoList",
                image: "static/img/video-manage.png",
                name: "视频管理",
                qx: 'comm:video:list'
            },{
                path: "ClassTable",
                image: "static/img/teacher-course.png",
                name: "我的课程",
                qx: 'teach:course:teachCourseList'
            },{
                path: "SubjectManage",
                image: "static/img/subject-manage.png",
                name: "科目管理",
                qx: 'teach:subject:edit'
            },{
                path: "RoleManage",
                image: "static/img/role-manage.png",
                name: "角色管理",
                qx: 'teach:role:list'
            }
        ]
        };
    },
    computed: {
        isShowBanner() {
            let bannerList = JSON.parse(sessionStorage.getItem('bannerList')); 
            if (bannerList.length === 0) {
                return false;
            }   

            if (this.userType === "1" && bannerList.length > 0) {    // 当学生登录且没有绑定设备，同时后台有返回广告图，则显现广告banner
                this.bannerList = bannerList;
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        async getPHPToken(path){
            console.log(path,'path');
            if(path=="SocialPractice" || path=="DigitalTeachingResources"){ //社会实践与数字化教学资源
                if(this.userType === "1"){     //不是校外学生的话才去请求phpToken
                    const res = await this.$axios.getPHPToken({                    
                        vtrId: this.iosFlag === true ? this.iosId : this.androidId
                    });
                    if(res.code === 1000){
                        this.phpToken = res.data.phpToken;
                        localStorage.setItem("phpToken", this.phpToken);
                        try{
                            if(this.iosFlag){
                                window.location="objc://"+"doFunc"+"/"+"loginCallBack"+"/" + "?username="+this.userName+"&password="+this.password+"&token="+this.phpToken
                            }else{
                                android.orderlist('loginCallBack',this.phpToken);
                            }
                        }catch(e){
                            console.log(e)
                        }
                        
                    }else{
                        this.dialog(res.message);
                    }
                }
            }
            this.$router.push(path);
        },

        isLimit() {     // 若学生登录，判断是否访问受限版
            let bannerList = JSON.parse(sessionStorage.getItem('bannerList'));
            if (bannerList.length == 0) {
                return false;
            } 
            this.limitFlag = true;
            this.beginCarouse();            // 手动开启轮播图
            for (let item of this.modules) {        // 学生受限版隐藏社会实践
                if (item.path == "SocialPractice") {
                    if (this.limitFlag) {
                        item.isLimit = true;
                    }
                    return 
                }     
            }
        },

        beginCarouse() {
            this.carouselPlay = setInterval(() => {     // 手动计时器解决element的bug
                this.$refs.carousel.next(); 
            }, 3000);
        },

        goBannerUrl(url, title) {     // 广告跳转
            if (url) {
                this.$router.push({
                    path: '/Advertisement',
                    query: {
                        adTitle: title,
                        adUrl: url
                    }
                })
            } 
        }
    },
    mounted() {
        // 把要操作的事件写到第二个参数
        //this.dialog('123', () => { alert('执行了吗？') })
        //this.successMsg('123', () => { alert('执行了吗？') })
        this.userType = localStorage.getItem("userType");
        this.isMac = localStorage.getItem("isMac");
        this.userName = sessionStorage.getItem('userName');
        this.password = sessionStorage.getItem('password');
        this.iosFlag = this.isIos();    // 判断是否ios系统
        this.isLimit();                 // 判断是否功能受限版
        if(this.userType === "1") {
            this.modules = this.modules.filter((v, i) => {
                return v.path != "VideoList";
            });
        }
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
    },
    beforeRouteLeave(to, from, next) {      // 离开组件清除计时器
        if (this.carouselPlay) {
            clearInterval(this.carouselPlay);
        }
        next();  
    }
};
</script>
<style lang="stylus">
.home 
    .container 
        background #efefef
        position fixed
        left 0
        right 0
        height 100%
        overflow auto
        .banner-container
            width 100%
            padding-bottom 56.25%
            height 0
            .el-carousel__container
                width 100%
                padding-bottom 56.25%
                height 0
                .banner
                    width 100%
                    padding-bottom 56.25%
                    height 0
                    position relative
                    .banner-img
                        width 100%
                        height 100%
                        position absolute
        .col-wrap
            display flex
            justify-content flex-start
            flex-wrap wrap
            padding 20px 15px
            margin 0 0 80px 0
            .col 
                box-sizing border-box
                width 33.33%
                border-radius 10px
                text-align center
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
                        .imgRow
                            margin-top 100px
                    span 
                        display block
                        font-size 30px
                        padding 82.8px 0
                    /*横*/
                    .spanRow
                        padding 151.96px 0

</style>

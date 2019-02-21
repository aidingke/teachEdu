<!-- 
* name: 比赛考核组件
* author: gxr
* time: 2018-8-3
-->
<template lang="pug">
    .assessmentGame
        Header(title="比赛考核", @goBack="goBack")
        .teacher(v-if="roles===1")
            <el-row class="tab-cont" v-if="showTable">
                <el-col :span="12"><div class="tab" :class="postData.theoryFlag ==0?'on':''" @click="tabChange(0)">实操</div></el-col>
                <el-col :span="12"><div class="tab" :class="postData.theoryFlag ==1?'on':''" @click="tabChange(1)">理论</div></el-col>
            </el-row>
            ul.match-list(v-if="renderList.length > 0")
                li.item(v-for="(item,index) of renderList" :key="item.stuId" @click="onTeachleLink(item)")
                    .match-name
                        span {{item.stuName}}
                        span.time {{item.groupName}}
                    .check-group(v-if="item.examStatus == 0 && item.stuScore == '0'")
                        <el-button plain round>尚未开始</el-button>
                    .check-group(v-else)
                        .stuScore(v-if="item.stuScore && item.stuScore != 0")
                            strong {{item.stuScore}}
                            em 分
                        <el-button v-else-if="postData.theoryFlag==0 && hasQx('teach:match:addOperResult')"  plain round>评分</el-button>
                        <el-button v-else  plain round>批卷</el-button>
        .student(v-else)
            ul.match-list(v-if="renderList.length > 0")
                li.item(v-for="(item,index) of renderList" :key="index" @click="onStuLink(item)")
                    .match-name
                        span {{item.title}}
                        span.time {{item.startTime}} - {{item.endTime}}
                        span.matchDesc {{item.matchDesc}}
                    .check-group(v-if="item.score && item.score != '0.00' && item.score != '0'")
                        .stuScore
                            strong {{item.score}}
                            em 分
                    .check-group(v-else-if="item.isStart == 1 && isMatchType && item.stuStatus != 1 && item.type == 1")
                        <el-button plain round>开始考试</el-button>
                    .type
                        span {{item.type == 1 ? '理论' : '实操'}}
        NotInfo(v-if="renderList.length === 0" notClass="暂无相关数据" defaultImg="static/img/not-data-default.png")
</template>
<script>
    export default {
        name: 'AssessmentGame',
        data () {
            return {
                tabValue: 1,
                roles: '',       //角色
                postData: { //请求参数 
                    groupId: '',
                    theoryFlag: sessionStorage.getItem("AssessmentGameTheoryFlag") || 0,
                    pageNo: 1,
                    pageSize: 10
                },
                showTable: true,//是否展示tab头部
                isMatchType: true,//比赛是否结束
                renderList: [],
                matchId: ""
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.push({
                    path: './MatchManage'
                });
                sessionStorage.setItem("AssessmentGameTheoryFlag", "");
                sessionStorage.removeItem('matchId');
                sessionStorage.removeItem('theoryFlag');
            },
            async getMatchResultList(){ //教师版获取数据
                const res = await this.$axios.getMatchResultList(this.postData);
                if(res.code == 1000) {
                    this.renderList = res.data || [];
                }
            },
            async getStuMatchTestList(){ //学生版获取数据
                let params = {};
                params.matchId = sessionStorage.getItem('matchId')//this.$route.query.matchId;
                const res = await this.$axios.getStuMatchTestList(params);
                if(res.code == 1000) {
                    this.renderList = res.data || [];
                }
            },
            tabChange(type) { //切换比赛状态
                this.postData.theoryFlag = type;
                sessionStorage.setItem("AssessmentGameTheoryFlag", type);
                if(this.postData.pageNo != 1) { //如果页面数改变了，需重置
                    this.postData.pageNo = 1;
                }
                this.getMatchResultList();
            },
            onTeachleLink(item){ //老师版--考核成绩跳转
                if(this.postData.theoryFlag == 1) { //理论
                    if(!item.stuScore || item.stuScore == 0 || item.stuScore == '0.00') {  //前往批卷
                        this.$router.push({
                            path: './AnsderDetail?questType=4&qbId=' + item.qbId + '&stuId=' + item.stuId
                        });
                    } else { //查看学生答卷
                        this.$router.push({
                            path: './AnsderDetail?questType=4&qbId=' + item.qbId + '&stuId=' + item.stuId
                        });
                    }
                } else { //实操
                    if(!this.hasQx('comm:match:practicalDetail')) { //   teach:match:addOperResult(教师-比赛管理-实操评分) 
                        this.dialog("您无权进行该操作");
                        return false;
                    }
                    let status = 1;//区分是查看评分:1,还是详情:2
                    if(!item.stuScore || item.stuScore == 0 || item.stuScore == '0.00') { 
                        let tempObj = {};
                        tempObj.groupName = item.groupName;
                        tempObj.stuName = item.stuName;
                        sessionStorage.setItem("groupMembersInfo", JSON.stringify(tempObj));
                    } else {
                        status = 2;
                        sessionStorage.setItem("groupMembersInfo", '');
                    }
                    this.$router.push({
                        path: './SpeakingScore?matchId=' + sessionStorage.getItem('matchId') + '&groupId=' + this.postData.groupId + '&stuId=' + item.stuId + '&satues='+status
                    });
                }
            },
            onStuLink(item) { //学生版--考核成绩跳转
                if(item.type == 1) { //理论
                    if(item.score && item.score != '0.00') { //查看试卷
                        this.$router.push({
                            path: './AnsderDetail?questType=4&qbId=' + item.id
                        });
                    } else { //前往考试
                        if(!this.isMatchType) { //比赛结束,还没出分数时
                            return false;
                        }
                        if(item.isStart == 0) {
                            this.dialog('比赛还没开始');
                            return false;
                        }
                        if(Date.parse(item.endTime) < Date.now()) {
                            this.dialog('比赛已经结束，无法进去答题');
                            return false;
                        }
                        if(item.stuStatus == 1) {
                            this.dialog('您已经提交过试卷');
                            return false;
                        }
                        this.$router.push({
                            path: './TestPaper?questType=4&qbId=' + item.id
                        });
                    }
                } else { //实操
                    if(item.score && item.score != '0.00') { 
                        this.$router.push({
                            path: './SpeakingScore?matchId=' + sessionStorage.getItem('matchId') + '&matchType=' + this.$route.query.matchType + '&satues=2'
                        });
                    }
                }
            }
        },
        mounted(){
            if(this.$route.query.matchId){
                sessionStorage.setItem('matchId',this.$route.query.matchId);
            }
            if(this.$route.query.theoryFlag){
                sessionStorage.setItem('theoryFlag',this.$route.query.theoryFlag);
            }
            if(this.hasQx("teach:match:resultList")) { 
                this.roles = 1; //老师
                this.postData.groupId = this.$route.query.groupId;
                this.getMatchResultList();
                if(sessionStorage.getItem('theoryFlag') == 1) {
                    this.showTable = true;
                } else {
                    this.showTable = false;
                }
            } else if(this.hasQx("stu:match:testList")) { 
                this.roles = 2;  //学生 
                this.getStuMatchTestList();
                if(this.$route.query.matchType) { 
                    this.isMatchType = false; //结束的比赛
                } else {
                    this.isMatchType = true;
                }
            } else {
                this.dialog("您无权进行该操作", () => {
                    this.$router.push({
                        path: 'Home'
                    });
                });
            }
            
        }
    }
</script>
<style lang="stylus">
.assessmentGame
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background #efefef
    overflow-y auto
    -webkit-overflow-scrolling touch
    z-index 3
    .tab-cont
        height 130px
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #d3d6db
        background #fff
        .tab
            text-align center
            font-size 36px
            line-height 130px
            margin 0 100px
        .on
            border-bottom 3px solid #138be7
    .match-list
        margin-bottom 30px
        .item
            display flex
            align-items center
            justify-content space-between
            margin-top 30px
            padding 40px 30px
            background #fff
            font-size 35px
            position relative
            .match-name
                display flex
                flex-direction column
                flex 1
                .time
                    margin-top 20px
                    color #95989e
                    font-size 20px
            .check-group
                margin-left 20px
                button
                    min-width 240px
                    font-size 35px
                    margin 0 10px
                    padding 30px 50px
                    border-radius 50px
                .stuScore
                    margin-right 20px
                    color #f56c6c
                    font-size 60px
                    em 
                        font-size 20px
                        font-style normal
                        margin-left 5px
    .student
        .match-list
            .match-name
                .time 
                    color #e6a23c
                    margin-top 40px
                .matchDesc
                    margin-top 10px
                    font-size 26px
            .type
                span
                    transform rotate(45deg)
                    position absolute
                    right 0px
                    top 18px
                    color #fff
                    font-size 28px
                    z-index 3
                &:after
                    display block
                    content ''
                    width 0
                    height 0
                    border-width 0 110px 110px 0
                    border-style solid
                    border-color transparent #e6a23c transparent transparent
                    position absolute
                    right 0
                    top 0
    .not-info
        margin 20px 20px 0
</style>

<!-- 
* name: 题库
* author: fjd
* time: 2018-8-13
-->
<template>
    <div class="Questions">
        <!-- 导航 --> 
        <Header :title='headTitle' @goBack="goBack"></Header>  
        <!-- 导航 -->
        <!-- <appNav :nameNumber="nameNumber" v-on:tabValue="updateTabValue($event)"></appNav> -->
        <div class="tab-cont">
            <div class="tab" :class="tabValue ==1?'on':''" @click="updateTabValue(1)" >日常练习<i class="line"></i></div>
            <div class="tab" :class="tabValue ==2?'on':''" @click="updateTabValue(2)" >技能考证<i class="line"></i></div>			
		</div>

        <div class="group-div">
            <el-input placeholder="老师名称或关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="filterInput">
                <el-button slot="append" @click="onsearchHandle">搜索</el-button>
            </el-input>
        </div>
        <!-- 复选框 -->
        <div class="sort-div" v-if="this.tabValue===1">
            <div class="sort-title" style="width:26%">科目</div>
            <div style="height:70px;overflow: hidden;" ref="showtag">
                <el-checkbox-group v-model="subCheckList">
                    <el-checkbox :label="itec.id" @change="searchObj" v-for="(itec,ii) in SubjectsList" :key="ii">{{itec.subjectName}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>    
        <div class="sort-div" v-if="this.tabValue===2">
            <div class="sort-title">题目类别</div>
            <div style="width:81%">
                <el-checkbox-group v-model="bigCheckList">
                    <el-checkbox :label="itec.bankType" @change="searchObj" v-for="(itec,ii) in BigList" :key="ii">{{itec.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div> 

        <div class="sortBox">
            <div v-show="SubjectsList.length>6" class="headBox" @click="showAllSubject" style="text-align: center;margin: 0 auto;overflow: hidden;" v-if="this.tabValue===1">
                <div style="height:35px;line-height:35px;color:#bbb">查看更多...</div>
            </div>

            <div class="noInfo" v-if="resData.length<=0||total<=0">
                <div class="default">
                    <img src="static/img/not-add-default.png"/>
                    <div class="not-class">
                        暂无数据
                    </div>
                </div>
            </div>

            <div class="bodyBox">
                <ul class="el-row">
                    <li class="el-col el-col-6" v-for="(item,index) in resData" :key="index">
                        <router-link v-bind:to="'/TeachPaperDetail?qbId='+item.qbId+'&questType='+questType" v-if="status===0">
                            <div class="kejianBox">
                                <img src="static/img/testquestions.png" />
                            </div>
                        </router-link>  
                        <a @click="stuListFun(item.qbId)" v-if="status===1">
                            <div class="kejianBox">
                                <img src="static/img/testquestions.png" />
                            </div>
                        </a>
                        <h5> {{item.courWareName}}</h5>
                        <p> <i>{{item.courWareTime}}</i></p>
                        <p><span>{{item.teachName}}</span></p>
                    </li>
                </ul>
            </div>
            <!-- v-if="total>12" -->
            <el-pagination class="page-div" :page-size="12" v-if="total>0" @current-change="currentChange" :current-page.sync="pageNo" background layout="prev, pager, next" :total="total"></el-pagination>
        </div>

        <template v-if="hasQx('teach:quest:add')">
            <section class="uploadBtn" @click="addTestPaper()" v-if="status===0">
                <div class="prel">
                    <div class="upBox">
                        <p>+</p>
                        <a href="javascript:" class="itemBtn" style="display: inline-block;">新增试题</a>
                    </div>
                </div>   
            </section>
        </template>

    </div>

</template>
<script>
// import Nav from '@/components/technology/Qnav'
// import Nav from '@/components/technology/Tnav'

    export default {
        name: 'questions',
        // components:{
        //     "appNav":Nav
        // },
        data () {
            return {
                headTitle:              '',
                status:                 '',
                filterInput:            '',
                total:                  0,
                tabValue:               1,//切换值
                pageNo:                 1,//默认页码为1
                selectType:             0,      
                nameNumber:             7,//日常练习 技能考证。questType是string  0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题 
                questType:              0,//0-日常练习 1-技能考证                                 
                checkAll:               false,                                                
                subCheckList:           [],//选中的科目ID
                bigCheckList:           [],//选中的等级ID
                SubjectsList:           [],//科目数组
                allNum:                 0,
                targi:                  0,
                BigList:                [{//考核
                    "bankType":"1",//中级
                    "name":"中级"
                },
                {
                    "bankType":"2",//高级
                    "name":"高级"
                }],
                resData :[
                    // {
                    //     "tit": "汽车空调的运行原理以及空调结构解析",
                    //     "author": "1张敬涛",
                    //     "time": "2018-05-15"
                    // }, {
                    //     "tit": "2汽车空调的运行原理以及空调结构解析",
                    //     "author": "2张敬涛",
                    //     "time": "2018-05-15"
                    // } 
                ]
            }
        },
        methods: {
            goBack(){
                this.$router.push({
                    path:'/TrainExamIndex'
                })
                sessionStorage.setItem("tabValueQues", '')
            },
            showAllSubject(){
                if(this.targi==0){
                    this.targi++
                    event.target.innerHTML = '收起更多'
                    this.$refs.showtag.style.height= "auto"
                      
                }else{
                    event.target.innerHTML = '查看更多...'
                    this.$refs.showtag.style.height= "70px"
                    this.targi--
                }
            },
            stuListFun(x){
                // v-bind:to="'/ExerciseList?qbId='+item.qbId+'&questType='+questType"
                if(this.hasQx('stu:qc:praticeList')){
                    this.$router.push({
                        path: './ExerciseList?qbId='+x+'&questType='+this.questType
                    })
                }else{
                    this.dialog('您无权限查看列表操作');/*  */
                }
            },
            onsearchHandle() {
                this.pageNo=1
                //获取试题列表
                this.searchObj()
            },
            updateTabValue(type) { //切换考试状态
                this.tabValue = type
                sessionStorage.setItem("tabValueQues", this.tabValue)
                this.questType = type-1
                this.pageNo = 1
                //获取试题列表
                this.searchObj()
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            handleCheckedSubjectsChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            currentChange(val) { //切换分页
                this.pageNo = val
                this.searchObj()
            },
            // selectTypeFn(type){ //实现切换TAB
            //     this.selectType = type
            // },
            //传参数，questType	是string	0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
            addTestPaper(){
                this.$router.push({
                    path: './AddTestPaper?questType='+this.questType
                })
            },
            filterBy(resData,value){
                if(value.length===0){
                    this.total = this.allNum
                    
                    return this.resData
                }else{
                    resData = resData.filter(function(info){
                        if(info.teachName.match(value)){
                            return info.teachName.match(value);
                        }
                    })
                    this.total = resData.length
                    return resData
                }
            },
            // 分页列表
            async searchObj(){
                let subjectId = '',bankType=''
                //科目
                this.subCheckList.forEach((v,i) => {
                  subjectId += v+','  
                })
                //等级
                this.bigCheckList.forEach((v,i) => {
                  bankType += v+','  
                })

                if(this.questType==0){ //练习
                    subjectId = subjectId.substring(0,subjectId.length-1)
                    bankType = ''
                }else if(this.questType==1){ //考证
                    subjectId = ''
                    bankType = bankType.substring(0,bankType.length-1)
                }
                
                let params = {
                    questType:this.questType,
                    subjectId:subjectId,
                    bankType:bankType,
                    searchName:this.filterInput,
                    pageNo: this.pageNo,
                    pageSize: 12
                }
                const res = await this.$axios.getTestPaperList(params)
                if(res.code===1000){
                    this.resData=res.data.dataList
                    if(res.data.total>12){
                        this.total = res.data.total-3
                    }else{
                        this.total = res.data.total
                    }
                    if(this.resData.length<=0){
                        this.pageNo=1
                    }
                    
                }else if(res.code===1100){
                    this.resData=''
                    this.total = 0
                    // this.$message({
                    //     showClose: true,
                    //     message: '暂无数据',
                    //     duration:1000,
                    //     type: 'warning'
                    // })
                }
            },
            async getList(){
                //获取题库列表
                let params = {
                    pageNo: 1,
                    pageSize: 12,
                    questType:this.tabValue-1
                }
                const res = await this.$axios.getTestPaperList(params)
                if(res.code===1000){
                    this.resData=res.data.dataList
                    this.total = res.data.total
                    return false
                }    
                // console.log(this.resData)     
            },
            //获取科目
            async getSubjectList(){
                let params = {
                    pageNo: 1,
                    pageSize: 100
                }
                const res1 = await this.$axios.getSubjectList(params)
                if(res1.code===1000){
                    this.SubjectsList=res1.data
                }
            }
        },
        mounted(){
            this.tabValue = Number(sessionStorage.getItem("tabValueQues")) || 1 //用于标识切换
            this.questType = this.tabValue-1
            if(localStorage.getItem("userType") == 0 || localStorage.getItem("userType") == 4) { //老师 管理员
                this.status = 0
                this.headTitle ='题库'           
            }else{
                this.headTitle ='题库'
                this.status = 1
            }

            if(this.hasQx('comm:questBank:list')){
                
            }else{
                this.dialog('您无权进行该操作')
                this.$router.back(-1)
            } 
            
            //获取日常练习试题
            this.getList()
            //获取科目
            this.getSubjectList()
        }       
    }
</script>
<style lang="stylus">
.Questions
    .SeachBox
        background :#eee
    .tab-cont
        height 130px
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #d3d6db
        background #fff
        .tab
            text-align center
            font-size 35px
            line-height 130px
            color #555
            margin 0 100px
        .on
            border-bottom 3px solid #138be7	
            color #138be7
            font-weight 900    
    .group-div
        padding 30px
        background #efefef
        input 
            width 100%
            height 90px
            font-size 35px
            text-indent 65px
        button
            width 180px
            height 90px
            font-size 35px
            color #fff
            background #138be7
        .el-input__icon
        .el-input__prefix
            font-size 50px
            width 70px 
    .sort-div
        display flex
        padding 30px 0 0 0
        font-size 30px
        border-bottom 1px solid #d3d6db
        .sort-title
            width 15%
            text-align center
        .el-checkbox-group
            display inline
            flex 1
            .el-checkbox
                font-size 20px
                margin-left 50px
                margin-bottom 15px
                // width 260px
                .el-checkbox__label
                    font-size 28px
                    padding-left 30px
                    color #303133
                .el-checkbox__inner
                    width 50px
                    height 50px
                .el-checkbox__inner::after
                        border-width 3px
                        height 32px
                        left 16px
                        width 13px
    .sortBox
        clear both
        overflow hidden
        .headBox
            border-bottom 1px solid #ccc
            font-size 30px
        .tit
            display: inline-block;
            width: 17%;
            height: 100px;
            line-height:100px;
            text-align: center;
            float: left;
        .BoxChoic
            display inline-block
            height 100px
            line-height 100px
            margin-left 50px
            span 
                width :165px;
                height :65px;
                line-height:65px;
                text-align:center;
                color:#555;
                display inline-block;
            span.active
                background  #138BE7;
                color:#fff;
                border-radius:10px;   
        .bodyBox
            clear both
            padding 30px
            overflow hidden        
            li
                padding 0 10px 40px 
               .kejianBox
                    border-radius 10px
                    background #E7F3FC 
                    text-align center
                    padding 8%
                    img
                        width 50%
                        margin-top 8%
                h5
                    color #666
                    font-size 12px
                    padding 10px 0 10px 0
                    width 93%
                    height 45px
                    font-weight 300
                    font-size 28px
                    line-height 45px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                p
                    margin-top 10px
                    clear both
                    span
                        color #67C23A
                        font-size 24px
                        font-weight 900
                    i 
                        font-style normal
                        font-size 24px
                        color #999
        .page-div
            padding 30px 30px 100px 30px
            text-align center
            font-weight normal
            li, button, span:not([class*=suffix])
                font-size 30px
                height 70px
                line-height 70px
            .btn-next .el-icon, .btn-prev .el-icon
                font-size 30px
            .btn-next, .btn-prev, .el-pager li
                min-width 60px
            .el-button:focus,el-button:hover 
                color #409EFF
                border-color #c6e2ff
                background-color transparent
        .noInfo		
            overflow hidden
            margin-top 1.5%
            .default
                width 100%
                padding 8% 0
                img
                    width: 30%;
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                .not-class
                    font-size 40px
                    text-align center
                    color #9b9b9b
                    margin 30px 0 0 0
                .add-text
                    font-size 20px
                    text-align center
                    color #a5a5a5
                    margin 30px 0 50px 0
                .el-button
                    width 100%
                    padding 30px 20px
                    font-size 30px 
    .uploadBtn
        position fixed
        right  2%
        bottom  2%
        font-size  14px
        z-index 500
        border-radius  150px
        .prel
            position relative
            width  170px
            height  170px
            color  #fff
            background  #148ce8
            z-index  500
            border-radius  150px
            border 12px solid #bcdef8
            .upBox
                width  150px
                height  150px
                // background #148ce8
                border-radius 150px
                position absolute
                top 50%
                left 50%
                margin -43% 0 0 -45%
                text-align  center
                p
                    text-align center
                    font-size 80px
                    line-height 97%
                .itemBtn
                    color #fff
                    text-decoration none
                    font-size 28px

</style>

<!-- 
* name: 比赛管理组件
* author: gxr
* time: 2018-8-2
-->
<template lang="pug">
    .matchManage
        Header(title="比赛管理", @goBack="goBack")
        .contentDiv
            <el-row class="tab-cont" v-if="roles === 1">
                <el-col :span="8"><div class="tab" :class="postData.matchType ==0?'on':''" @click="tabChange(0)">待开始</div></el-col>
                <el-col :span="8"><div class="tab" :class="postData.matchType ==1?'on':''" @click="tabChange(1)">进行中</div></el-col>
                <el-col :span="8"><div class="tab" :class="postData.matchType ==2?'on':''" @click="tabChange(2)">已结束</div></el-col>
            </el-row>
            <el-row class="tab-cont" v-if="roles === 2">
                <el-col :span="12"><div class="tab" :class="postData.matchType ==0?'on':''" @click="tabChange(0)">进行中</div></el-col>
                <el-col :span="12"><div class="tab" :class="postData.matchType ==1?'on':''" @click="tabChange(1)">已结束</div></el-col>
            </el-row>
            .scroll-div(v-if="renderList.length>0")
                ul.teach.match-list(v-if="roles==1")
                    li.item(v-for="(item,key) of renderList" :key="item.matchId" @click="onLinkGroupList(item.matchId)")
                        .match-name
                            span {{item.matchTitle}}
                            span.time {{item.matchTime}}
                        .check-group
                            <el-button v-if="item.matchStatus == 0 && hasQx('teach:match:edit')" plain round>编辑比赛</el-button>
                            <el-button v-if="item.matchStatus == 2 && hasQx('teach:match:exportExcel')" plain round @click.stop="downloadResult(item.matchId, item.matchTitle)">导出比赛结果</el-button>
                ul.stu.match-list(v-else)
                    li.item(v-for="(item,key) of renderList" :key="item.matchId")
                        .match-name
                            span {{item.matchTitle}}
                            span.time {{item.matchTime}}
                        .check-group
                            <el-button v-if="postData.matchType==0 || hasQx('stu:match:group')" @click="onLinkGroupList(item.matchId)" plain round>比赛分组</el-button>
                            <el-button v-if="postData.matchType==0 && hasQx('stu:match:testList')" @click="onLinkTestList(item.matchId)" plain round>考试答题</el-button>
                            <el-button v-if="postData.matchType==1 && hasQx('stu:match:testList')" @click="onLinkTestList(item.matchId)" plain round>查看结果</el-button>
            NotInfo(v-if="renderList.length === 0" notClass="暂无相关数据" defaultImg="static/img/not-data-default.png")
        .addMatch-cont(v-if="hasQx('teach:match:edit')" @click="centerDialogVisible=true")
            .add-btn
                span.el-icon-plus.avatar-uploader-icon
                span 新增比赛
        .dialogBox(v-if="hasQx('teach:match:edit')")
            <el-dialog title="添加比赛" :visible.sync="centerDialogVisible" width="50%" center>
                <el-form ref="form" label-position="top" :model="form" label-width="80px">
                    <el-form-item label="比赛时间">
                        <el-col :span="11">
                            <el-date-picker v-model="form.startTime" @change="onChangeTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerOptions"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">至</el-col>
                        <el-col :span="11">
                            <el-date-picker v-model="form.endTime" @change="onChangeTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerOptions"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="主题">
                        <el-input v-model="form.matchName"></el-input>
                    </el-form-item>
                    <el-form-item class="theory-item" label="理论考试">
                        <el-checkbox v-model="form.theoryFlag" label="有" true-label="1" false-label="0"></el-checkbox>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addMatchManage">新 增</el-button>
                    <el-button @click="resetForm()">取 消</el-button>
                </span>
            </el-dialog>
</template>
<script>
    export default {
        name: 'MatchManage',
        data () {
            return {
                centerDialogVisible: false,
                roles: 1, //用户类型 0-老师 1-学生 2-校外人员
                postData: { //请求参数
                    matchType: '', //比赛状态 0-进行中，1-已结束
                    pageNo: 1,
                    pageSize: 30
                },
                form: {
                    startTime: '',
                    endTime: '',
                    matchName: '',
                    theoryFlag: 0,
                },
                renderList: [
                ],
                pickerOptions: {
                    disabledDate(time) { //设置日期可选项
                        return time.getTime() < Date.now() - 86400000;
                    },
                }
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.push({
                    path: './Home'
                });
                sessionStorage.setItem("MatchManageType", '');
            },
            async getTeachMatchList() { //获取老师版数据
                const params = Object.assign({}, this.postData);
                const res = await this.$axios.getTeachMatchList(params);
                if(res.code == 1000) {
                    this.renderList = res.data ? res.data : [];
                } else {
                    this.renderList = [];
                }
            },
            async getStuMatchList() { //获取学生版数据
                let params = {};
                params.status = this.postData.matchType;
                params.pageNum = this.postData.pageNo;
                params.pageSize = this.postData.pageSize;
                const res = await this.$axios.getStuMatchList(params);
                if(res.code == 1000) {
                    this.renderList = res.data ? res.data : [];
                } else {
                    this.renderList = [];
                }
            },
            onLinkTestList(matchId){ //查看考核结果
                let status = '';
                if(this.postData.matchType == 1) {
                    status = '&matchType='+this.postData.matchType; 
                }
                this.$router.push({
                    path: './AssessmentGame?matchId='+matchId + status
                });
            },
            onLinkGroupList(matchId) {//查看分组
                if( this.hasQx("teach:match:groupList") || this.hasQx("stu:match:group") ) {
                    this.$router.push({
                        path: './GroupList?matchId='+matchId
                    });
                } else {
                    this.dialog("您无权进行该操作");
                }
            },
            tabChange(type) { //切换比赛状态
                this.postData.matchType = type;
                sessionStorage.setItem("MatchManageType", type); 
                if(this.roles == 1) {
                    this.getTeachMatchList();
                } else {
                    this.getStuMatchList();
                }
            },
            async addMatchManage() { //添加比赛
                if(this.form.startTime == '') {
                    this.dialog("开始时间不能为空");
                    return false;
                }
                if(this.form.endTime == '') {
                    this.dialog("结束时间不能为空");
                    return false;
                }
                if(this.form.matchName == '') {
                    this.dialog("比赛主题不能为空");
                    return false;
                }
                if(Date.parse(this.form.startTime) < Date.now()) {
                    this.dialog("比赛开始时间不能小于当前时间");
                    return false;
                }
                const tempPostData = Object.assign({}, this.form);
                const res = await this.$axios.editTeachMath(tempPostData);
                if(res.code == 1000) {
                    let tempObj = {};
                    tempObj.matchId = res.data.matchId;
                    tempObj.matchTime = this.form.startTime + this.form.endTime;
                    tempObj.matchStatus = 0;
                    tempObj.matchTitle = this.form.matchName;
                    this.renderList.unshift(tempObj);
                    this.centerDialogVisible = false;
                    this.form = { //重至添加比赛数据绑定
                        startTime: '',
                        endTime: '',
                        matchName: '',
                        theoryFlag: 0,
                    };
                } else {
                    this.dialog(res.message);
                }
            },
            resetForm() { //取消
                this.form = { //重至添加比赛数据绑定
                    startTime: '',
                    endTime: '',
                    matchName: '',
                    theoryFlag: 0,
                };
                this.centerDialogVisible = false;
            },
            onChangeTime() { // 选择结束日期时间
                if(this.form.startTime && this.form.endTime) {
                    if(Date.parse(this.form.startTime) > Date.parse(this.form.endTime)) {
                        this.dialog("结束时间不能小于开始时间");
                        this.form.startTime = '';
                    }
                }
            },
            async downloadResult(id, name) {      // 导出结果
                let params = {
                    matchId : id
                }
                let data = await this.$axios.exportMatchResult(params);
                if (!data) {
                    return;
                }
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', `${name}比赛结果.xls`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
        },
        mounted(){
            this.postData.matchType = sessionStorage.getItem("MatchManageType") || 0;// 比赛状态 0-进行中，1-已结束
            if( this.hasQx("teach:match:list") ) { 
                this.roles = 1; //老师
                this.getTeachMatchList();
            } else if( this.hasQx("stu:match:list")) { 
                this.roles = 2;  //学生 
                this.getStuMatchList();
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
.matchManage
    .contentDiv
        position fixed
        left 0
        top 88px
        width 100%
        height 100%
        background #efefef 
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
                margin 0 100px
            .on
                border-bottom 3px solid #138be7
        .scroll-div
            position fixed
            left 0
            right 0
            height 100%
            overflow-y auto
            -webkit-overflow-scrolling touch
            .match-list
                padding-bottom 240px
                .item
                    display flex
                    align-items center
                    justify-content space-between
                    margin-top 20px
                    padding 40px 30px
                    background #fff
                    font-size 30px
                    .match-name
                        display flex
                        flex-direction column
                        flex 1
                        .time
                            margin-top 20px
                            color #95989e
                            font-size 26px
                    .check-group
                        margin-left 20px
                        button
                            font-size 30px
                            margin 0 10px
                            padding 30px 50px
                            border-radius 50px
        .not-info
            margin 20px 20px 0
    .addMatch-cont
        position fixed
        right 50px
        bottom 50px
        width 160px
        height 160px
        border-radius 100%
        background #148ce8
        border 10px solid #bcdef8
        z-index 5
        .add-btn
            height 160px
            display flex
            align-items center
            justify-content center
            flex-direction column
            font-size 24px
            color #fff
            .el-icon-plus
                font-size 50px
                margin-bottom 10px
    .dialogBox
        .el-dialog__header
            padding 30px 20px 10px
            .el-dialog__title
                font-size 40px
                line-height 80px
                font-weight 700
            .el-dialog__headerbtn
                font-size 60px
                top 40px
        .el-dialog__body
            padding 25px 30px 30px
            .el-form-item
                margin-bottom 50px
                .el-form-item__label 
                    font-size 30px
                    margin-bottom 20px
                .el-form-item__content
                    font-size 30px
                    line-height 80px
                    text-align center
                    .el-date-editor.el-input
                        width auto
                    .el-input__inner
                        height 80px
                        line-height 80px
                        padding-right 60px
                        padding-left 30px
                    .el-input__prefix
                        right 10px
                        left auto
                        .el-input__icon
                            font-size 40px
                            width 40px
                    .el-input__suffix
                        top 0
                        right 60px
                        .el-input__icon
                            font-size 40px
                            width 40px
                    .el-checkbox
                        font-size 30px
                        .el-checkbox__label
                            font-size 30px
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
            .theory-item
                .el-form-item__label
                    float left
                    margin-bottom 0
                    line-height 80px
                .el-form-item__content
                    text-align left
                    margin-left 200px
        .el-dialog__footer 
            .el-button
                font-size 30px
                padding 30px 100px
                margin 0 20px
.el-date-picker
    overflow hidden
</style>

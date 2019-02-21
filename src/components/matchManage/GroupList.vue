<!-- 
* name: 组列表
* author: gxr
* time: 2018-8-9
-->
<template lang="pug">
    .groupList
        Header(title="比赛组", @goBack="goBack")
        .container 
            el-row(class="scroll-div" v-if="renderList.length > 0")
                el-col(:span="12",v-for="(item,index) in renderList",:key="index") 
                    .item.groupItem
                        .handle-icon.edit-icon.el-icon-edit-outline(v-if="matchStatus == 0 && hasQx('teach:match:editGroup')" @click="onEditGroup(item)")
                        .handle-icon.delete-icon.el-icon-delete(v-if="matchStatus == 0 && hasQx('teach:match:delGroup')" @click="onDeleteGroup(item.groupId)")
                        h3 {{item.groupName}}
                        .left-top {{index+1}}组
                        .button-item
                            div
                                el-button(v-if="hasQx('teach:match:groupStuList') || hasQx('stu:match:groupStuList')" plain @click="onViewGroupMembers(item.groupId)") 成员({{item.stuNum}})
                                |
                                el-button(v-if="matchStatus == 2 && hasQx('teach:match:resultList')" plain @click="onViewResult(item.groupId)") 考核结果
                |
                el-col(:span="12" v-if="matchStatus == 0 && hasQx('teach:match:editGroup')")
                    .item(@click="onAddGroupPop")
                        .add
                            img(src="static/img/add.png")
                        .text 添加组     
            NotInfo(v-if="renderList.length === 0" notClass="暂无相关比赛组信息" defaultImg="static/img/not-class-default.png" :elButton="matchStatus==0 && hasQx('teach:match:editGroup')?'添加比赛组': ''" @start="dialogVisible.addGroupDialog = true")
        .edit(v-if="matchStatus == 0 && roles == 1")
            .addMatch-cont(v-if="hasQx('teach:match:edit')" @click="onEditMathDetails")
                    .add-btn
                        span.el-icon-plus.el-icon-edit-outline
                        span 编辑信息
            .addMatch-cont(v-if="!qbId && hasQx('teach:quest:add')" @click="onAddTestDialog")
                    .add-btn
                        span.el-icon-plus.avatar-uploader-icon
                        span 新增试题
            .addMatch-cont(v-if="qbId && hasQx('teach:quest:add')" @click="onViewsTestDialog")
                    .add-btn
                        span 查看试题
        .pop(v-if="matchStatus == 0 && roles == 1")
            <el-dialog class="dialogBox" title="添加组" :visible.sync="dialogVisible.addGroupDialog" width="50%" center>
                <el-form ref="editGroupForm" label-position="top" :model="editGroupForm" label-width="80px">
                    <el-form-item label="比赛组名称">
                        <el-input v-model="editGroupForm.groupName" @focus="rules.addGroupRules=false"></el-input>
                        .error(v-if="rules.addGroupRules") 比赛组名称不能为空
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onAddGroup">{{editStatusTxt}}</el-button>
                    <el-button @click="dialogVisible.addGroupDialog = false">取 消</el-button>
                </span>
            </el-dialog>
            <el-dialog class="dialogBox" title="编辑比赛" :visible.sync="dialogVisible.editDialog" width="50%" center>
                <el-form ref="form" label-position="top" :model="form" label-width="80px">
                    <el-form-item label="比赛时间">
                        <el-col :span="11">
                            <el-date-picker v-model="form.startTime" @change="onChangeTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerOptions"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">至</el-col>
                        <el-col :span="11">
                            <el-date-picker v-model="form.endTime" @change="onChangeTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerOptions"></el-date-picker>
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
                    <el-button type="primary" @click="onSaveMatchManage">编 辑</el-button>
                    <el-button @click="dialogVisible.editDialog = false">取 消</el-button>
                </span>
            </el-dialog>
            ConfirmDialog(:dialogTableVisible="dialogVisible.deleteGroupDialog" confirmTitile="提示" confirmText="确定删除该组名？删除后数据将不可恢复" confirmTextButton="删除" closeTextButton="取消" @determine="onDeterMine" @closeConfirm="onCancelDel")
</template>
<script>
    export default {
        name: 'GroupList',
        data () {
            return {
                roles: '',
                matchStatus: 0, //比赛状态
                matchId: '', //比赛id
                delGroupId: '', //删除组ID
                editStatusTxt: '新 增',//添加组的文案提示
                qbId: '',//是否存在理论试题
                renderList:[], //渲染数据
                form: { //编辑比赛信息
                    'startTime': '',
                    'endTime': '',
                    'matchName': '',
                    'theoryFlag': 0,
                    'matchId': ''
                },
                editGroupForm: { //编辑比赛组
                    groupName: '',
                    matchId: ''
                },
                dialogVisible: { //对话框状态
                    addGroupDialog: false, //添加比赛组
                    editDialog: false, //编辑比赛
                    addTestDialog: false,//添加比赛试题
                    deleteGroupDialog: false, //删除比赛组
                },
                rules: { //验证规则 
                    addGroupRules: false, //验证添加组
                },
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
                    path: './MatchManage'
                });
            },
            onAddGroupPop() { //显示添加组弹窗
                this.dialogVisible.addGroupDialog = true;
                this.editGroupForm = { //重置
                    groupName: '',
                    matchId: ''
                };
                this.editStatusTxt = '新 增';
            },
            onEditGroup(item) { //编辑组名
                this.dialogVisible.addGroupDialog = true;
                this.editGroupForm.groupName =  item.groupName;
                this.editGroupForm.groupId =  item.groupId;
                this.editStatusTxt = '编 辑';
            },
            onDeleteGroup(groupId) {  //删除组弹窗
                this.dialogVisible.deleteGroupDialog = true;
                this.delGroupId = groupId;
            },
            onCancelDel() { //取消删除组名
                this.dialogVisible.deleteGroupDialog = false;
                this.delGroupId = '';
            },
            onEditMathDetails() { //编辑比赛弹窗
                this.getMathDetails();
                this.dialogVisible.editDialog = true;
            },
             onViewResult(groupId) { //查看考核结果
                this.$router.push({
                    path: './AssessmentGame?groupId='+groupId+'&matchId='+this.matchId + '&theoryFlag=' + this.form.theoryFlag
                });
            },
            onViewGroupMembers(groupId) { //查看组成员
                this.$router.push({
                    path: './GroupMembers?groupId='+groupId+'&matchStatus='+this.matchStatus+'&matchId='+this.matchId
                });
            },
            onAddTestDialog() { //新增比赛理论试题
                if(this.form.theoryFlag != 1) { //没有比赛理论时，页面提示
                    this.dialog("该比赛没有理论");
                    return false;
                }
                this.$router.push({
                    path: './AddTestPaper?questType=4&matchId=' + this.matchId
                });
            },
            onChangeTime() { // 选择结束日期时间
                if(this.form.startTime && this.form.endTime) {
                    if(Date.parse(this.form.startTime) > Date.parse(this.form.endTime)) {
                        this.dialog("结束时间不能小于开始时间");
                        this.form.startTime = '';
                    }
                }
            },
            onViewsTestDialog() { //查看添加的试题
                this.$router.push({
                    path: './TeachPaperDetail?qbId=' + this.qbId+'&questType=4'
                });
            },
            async getMatchGroupList() { //版获取数据
                let params = {};
                params.matchId = this.matchId;
                let res = '';
                if(this.roles == 1) { //老师版
                    res = await this.$axios.getMatchGroupList(params);
                    this.qbId = res.data.qbId; //判断是否已经添加过理论试题
                } else { //学生版
                    res = await this.$axios.getStuMatchGroupList(params);
                }
                this.renderList = res.data.groupList || [];
                this.matchStatus = res.data.matchStatus;
            },
            async onDeterMine() { //确定删除组名
                let params = {};
                params.groupId = this.delGroupId;
                const res = await this.$axios.delGroup(params);
                if(res.code === 1000) {
                    var that = this;
                    this.renderList = this.renderList.filter(function (item) {
                        return item.groupId != that.delGroupId;
                    });
                    this.dialogVisible.deleteGroupDialog = false;
                    this.delGroupId = '';
                } else {
                    this.dialog(res.message);
                }
            },
            async onAddGroup() { //新增比赛组
                if(this.editGroupForm.groupName != '') {
                    const params = Object.assign({}, this.editGroupForm);
                    params.matchId = this.matchId;
                    const res = await this.$axios.editMatchGroup(params);
                    if(res.code === 1000) {
                        this.dialogVisible.addGroupDialog = false;
                        this.getMatchGroupList();
                        delete this.editGroupForm.groupId;
                    } else {
                        this.dialog(res.message);
                    }
                } else {
                    this.rules.addGroupRules = true;
                    return false;
                }
            },
            async getMathDetails() { //获取比赛信息
                let params = {};
                params.matchId = this.matchId;
                const res = await this.$axios.getMatchDetail(params);
                if(res.code == 1000) {
                    this.form.matchName = res.data.matchName;
                    this.form.startTime = res.data.startTime;
                    this.form.endTime = res.data.endTime;
                    this.form.theoryFlag = res.data.theoryFlag;
                    this.form.matchId = res.data.matchId;
                }
            },
            async onSaveMatchManage() { //保存编辑信息
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
                const tempGroupData = Object.assign({}, this.form);
                tempGroupData.startTime = this.dayjs(tempGroupData.startTime).format('YYYY-MM-DD HH:mm:ss');
                tempGroupData.endTime = this.dayjs(tempGroupData.endTime).format('YYYY-MM-DD HH:mm:ss');
                const res = await this.$axios.editTeachMath(tempGroupData);
                if(res.code == 1000) {
                    this.dialogVisible.editDialog = false;
                } else {
                    this.dialog(res.message);
                }
            }
        },
        mounted(){
            this.matchId = this.$route.query.matchId;
            if( this.hasQx("teach:match:groupList") ) { 
                this.roles = 1; //老师
                this.getMathDetails();
            } else { 
                this.roles = 2;  //学生 
            }
            this.getMatchGroupList();
        }
    }
</script>
<style lang="stylus">
.groupList
    .container
        height 100%
        position fixed
        left 0
        right 0
        background-color #efefef
        .scroll-div
            height 100%
            overflow-y auto
            -webkit-overflow-scrolling touch
            padding-bottom 120px
            .item
                border 1px solid #eeee
                margin 30px 30px
                background: #fff
                position relative
                &.groupItem:after
                    width 0
                    height 0
                    content ''
                    position absolute
                    top 0
                    left 0
                    border-top 100px solid #e6a23c
                    border-right 100px solid transparent
                .handle-icon
                    position absolute
                    right 100px
                    top 10px
                    font-size: 50px;
                    color #148ce8
                    &.delete-icon
                        right 10px
                        color #e46969
                h3
                    font-size 35px
                    margin 60px 0 50px
                    text-align center
                .left-top
                    position absolute
                    top 15px
                    left 15px
                    color #fff
                    z-index 999
                    transform rotate(-45deg)
                .button-item
                    margin 50px 0
                    div
                        text-align center
                        .el-button
                            padding 35px  0
                            width 250px
                            font-size 30px
                            &:last-child
                                margin-left 20px
                .add
                    text-align center
                    width 80px
                    height 80px
                    margin 67px auto
                    img 
                        max-width 100%
                .text
                    text-align center
                    margin 55px 0
                    font-size 30px
        .not-info
            margin 30px 30px 0
    .edit
        position fixed
        right 50px
        bottom 50px
        .addMatch-cont
                width 160px
                height 160px
                margin-top 30px;
                border-radius 100%
                background #148ce8
                border 10px solid #bcdef8
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
                    &:before
                        content "*"
                        color #f56c6c
                        margin-right 8px
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
                .error 
                    font-size 30px
                    color #f56c6c
                    line-height 1
                    padding-top 20px
                    position absolute
                    top 100%
                    left: 0
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
    .confirm-dialog 
        .content 
            .text
                font-size 30px
                text-align center
            .button-items
                .el-button:first-child
                    background #e46969
                    border-color #e46969
</style>

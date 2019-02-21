<!-- 
* name: 组成员
* author: gxr
* time: 2018-8-10
-->
<template lang="pug">
    .groupMembers
        Header(title="组员列表", @goBack="goBack")
        .container
            nav
                span.left 队名：{{groupName}}
            ul(v-if="renderList.length > 0") 
                li(v-for="(item,index) in renderList",:key="item.stuId")
                    span.name {{item.stuName}}
                    span.number {{item.stuMobile}}
                    span.iconFont.el-icon-delete(v-if="matchStatus == 0 && hasQx('teach:match:delStu')" @click="onDeleteGroupMembers(item.stuId)")
                    span.iconFont.el-icon-arrow-right(v-if="hasQx('comm:match:personInfo')" @click="onViewPersonInfo(item.stuId)")
            NotInfo(v-if="renderList.length == 0" notClass="暂无相关成员信息" defaultImg="static/img/not-class-default.png")
        .addMatch-cont(v-if="matchStatus == 0 && (hasQx('teach:match:editStu') || hasQx('teach:match:addSchoolStu'))" @click="onAddMembers")
                .add-btn
                    span.el-icon-plus.avatar-uploader-icon
                    span 新增成员
        .delPopBox(v-if="matchStatus == 0 && hasQx('teach:match:delStu')")
            ConfirmDialog(:dialogTableVisible="deleteGroupDialog" confirmTitile="提示" confirmText="确定删除该成员？删除后数据将不可恢复" confirmTextButton="删除" closeTextButton="取消" @determine="onDeterMine" @closeConfirm="onCancelDel")
</template>
<script>
    export default {
        name: 'GroupMembers',
        data () {
            return {
                roles: '',
                groupId: '',
                delStuId: '',//删除组成员ID
                groupName: '',
                matchStatus: '', //比赛状态
                deleteGroupDialog: false,//删除显示状态
                renderList: []
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.push({
                    path: './GroupList?matchId='+this.$route.query.matchId
                });
            },
            async getGroupStuList() { //获取数据
                let params = {};
                params.groupId = this.groupId;
                let res = '';
                if(this.roles == 1) {
                    res = await this.$axios.getGroupStuList(params);
                } else {
                    res = await this.$axios.getStuGroupStuList(params);
                }
                if(res.code == 1000) {
                    this.groupName = res.data.groupName;
                    this.renderList = res.data.stuList || [];
                }
            },
            onAddMembers(){ //添加成员
                this.$router.push({
                    path: './SelectTeamMembers?groupId=' + this.groupId + '&matchStatus=' + this.matchStatus + '&matchId=' + this.$route.query.matchId
                });
            },
            onViewPersonInfo(stuId) { //查看个人信息
                this.$router.push({
                    path: './AddGroupMenbers?stuId=' + stuId
                });
            },
            onDeleteGroupMembers(stuId){ //删除组成员弹窗
                this.deleteGroupDialog = true;
                this.delStuId = stuId;
            },
            async onDeterMine() { //确定删除组成员
                let params = {};
                params.stuId = this.delStuId;
                params.groupId = this.groupId;
                const res = await this.$axios.delMatchStu(params);
                if(res.code === 1000) {
                    var that = this;
                    this.renderList = this.renderList.filter(function (item) {
                        return item.stuId != that.delStuId;
                    });
                    this.deleteGroupDialog = false;
                    this.delStuId = '';
                }
            },
            onCancelDel() { //取消删除组成员
                this.deleteGroupDialog = false;
                this.delStuId = '';
            },
        },
        mounted(){
            this.groupId = this.$route.query.groupId;
            this.matchStatus = this.$route.query.matchStatus;
            if(this.hasQx("teach:match:groupStuList")) {
                this.roles = 1; //老师
            } else { 
                this.roles = 2;  //学生 
            }
            this.getGroupStuList();
        }
    }
</script>
<style lang="stylus">
.groupMembers
    .container
        height 100%
        position fixed
        left 0
        right 0
        background #efefef
        overflow-y auto
        -webkit-overflow-scrolling touch
        nav
            height 88px
            line-height 88px
            font-size 35px
            padding 15px 20px
            background #fff
            span.left
                float left
        ul
            margin 20px 20px 110px
            background #fff
            font-size 30px
            li  
                padding 30px 30px
                border-bottom 3px solid #efefef
                overflow hidden
                display flex
                height 60px
                line-height 60px
                span.name
                    font-weight bold
                    flex 1
                
                .iconFont
                    margin-left 40px
                    font-size 50px
                    color #148ce8
                    &.el-icon-delete
                        color #e46969
        .not-info
            margin 20px 20px 0;
    .addMatch-cont
            position fixed
            right 30px
            bottom 180px
            width 160px
            height 160px
            border-radius 100%
            background #148ce8
            border 10px solid #bcdef8
            &.edit
                bottom 260px
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


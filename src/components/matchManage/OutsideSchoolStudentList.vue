<!-- 
* name: 校外学生列表
* author: gxr
* time: 2018-9-12
-->
<template lang="pug">
    .student
        Header(title="校外学生", @goBack="goBack")
        .container
            //- nav
            //-     span.left 班主任： {{teachName}}
            ul(v-if="renderList.length > 0") 
                li(v-for="(item,index) in renderList",:key="item.stuId")
                    span.el-checkbox__input
                        <input class="access-checkbox" :id="'chk_' + item.stuId" v-bind:value="item.stuId" v-model="selectCheckBox" type="checkbox" />
                        <label class="el-checkbox__inner" v-bind:for="'chk_' + item.stuId"></label>
                    span.name {{item.stuName}}
                    span.number 电话 {{item.stuPhone}}
                    span.iconFont.el-icon-arrow-right(@click="onViewPersonInfo(item.stuId)")
            NotInfo(v-if="renderList.length == 0" notClass="暂无相关校外学生信息" defaultImg="static/img/not-class-default.png")
        .addMatch-cont( @click="onAddMembers")
                .add-btn
                    span.el-icon-plus.avatar-uploader-icon
                    span 新增<br/>校外学生
        FixedButton(v-if="renderList.length > 0" buttonText="确定" @listenToChildEvent="onAddGroupNum")
</template>
<script>
    export default {
        name: 'Student',
        data () {
            return {
                renderList: [],
                selectCheckBox: [],
            }
        },
        methods:{
            goBack() { //返回按钮
                if(this.$route.query.groupId) {
                    this.$router.push({
                        path: './GroupMembers?groupId='+this.$route.query.groupId+'&matchStatus='+this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId 
                    });
                } else {
                    this.$router.back(-1);
                }
            },
            async getMathOtherStuList() { //获取数据
                const res = await this.$axios.getMathOtherStuList();
                if(res.code == 1000) {
                    this.renderList = res.data;
                } else {
                    this.renderList = [];
                }
            },
            onAddMembers(){ //新增学生
                this.$router.push({
                    path: './AddGroupMenbers?groupId='+this.$route.query.groupId + '&matchStatus=' + this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId 
                });
            },
            onViewPersonInfo(stuId) { //编辑
                this.$router.push({
                    path: './AddGroupMenbers?stuId=' + stuId
                });
            },
            async onAddGroupNum() { //添加组成员
                if(this.selectCheckBox.length == 0) {
                    this.dialog("请添加组员");
                } else {
                    let tempArr = this.selectCheckBox;
                    let params = {};
                    params.groupId = this.$route.query.groupId;
                    params.stuId = tempArr.toString();
                    const res = await this.$axios.addMathSchoolStu(params);
                    if(res.code == 1000) {
                        this.successMsg('添加成功', () => {
                            this.$router.push({
                                path: './GroupMembers?groupId='+this.$route.query.groupId+'&matchStatus='+this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId
                            });
                        });
                    } else {
                        this.dialog(res.message);
                    }
                }
            }
        },
        mounted(){
            this.getMathOtherStuList();
        }
    }
</script>
<style lang="stylus">
.student
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
            margin 20px 20px 460px
            background #fff
            font-size 30px
            li  
                padding 30px 30px
                border-bottom 3px solid #efefef
                overflow hidden
                display flex
                height 60px
                line-height 60px
                .el-checkbox__inner
                    width 50px
                    height 50px
                    font-size 30px
                    &:after
                        border-width 3px
                        height 32px
                        left 16px
                        width 13px
                .access-checkbox 
                    opacity 0
                    outline 0
                    position absolute
                    margin 0
                    width 0
                    height 0
                    z-index -1
                .access-checkbox:checked + .el-checkbox__inner
                    background-color #409EFF
                    border-color #409EFF
                .access-checkbox:checked + .el-checkbox__inner:after
                    transform rotate(45deg) scaleY(1)
                .name
                    font-weight bold
                    flex 1
                    margin 0 30px
                .number
                    color #909399
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
                span 
                    text-align center
    .confirm-dialog 
        .content 
            .text
                font-size 30px
                text-align center
            .button-items
                .el-button:first-child
                    background #e46969
                    border-color #e46969
    .fixed-footer
        position fixed
        left 0
        bottom 0
</style>




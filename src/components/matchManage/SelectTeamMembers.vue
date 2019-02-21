<!-- 
* name: 选择成员
* author: gxr
* time: 2018-8-9
-->
<template lang="pug">
    .selectTeamMembers
        Header(title="选择组员", @goBack="goBack")
        .container
            el-row(class="scroll-div" v-if="renderList.length > 0")
                el-col(:span="12",v-for="(item,index) in renderList",:key="item.classId") 
                    .item.groupItem
                        h3 {{item.className}}
                        .left-top 班级
                        .button-item
                            div
                                el-button(plain @click="onViewStudent(item.classId)") 学生({{item.stuNum}})
            NotInfo(v-if="renderList.length === 0" notClass="暂无相关信息" defaultImg="static/img/not-class-default.png")
        FixedButton(v-if="hasQx('teach:match:editStu')" buttonText="添加校外学生" @listenToChildEvent="onAddGroupNum")
</template>
<script>
    export default {
        name: 'SelectTeamMembers',
        data () {
            return {
                renderList:[],
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getClassList() { //获取数据
                const res = await this.$axios.getClassList();
                if(res.code == 1000) {
                    this.renderList = res.data;
                }
            },
            onViewStudent(classId) { //添加校内学生
                if(!this.hasQx('teach:match:addSchoolStu')) {
                    this.dialog("您无权进行该操作");
                    return false;
                }
                this.$router.push({
                    path: './Student?classId='+classId+'&groupId='+ this.$route.query.groupId + '&matchStatus=' + this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId 
                });
            },
            onAddGroupNum() { //添加校外学生
                this.$router.push({
                    path: './OutsideSchoolStudentList?groupId='+this.$route.query.groupId + '&matchStatus=' + this.$route.query.matchStatus + '&matchId=' + this.$route.query.matchId 
                });
            }
        },
        mounted(){
            this.getClassList();
        }
    }
</script>
<style lang="stylus">
.selectTeamMembers
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
            padding-bottom 220px
            .item
                border 1px solid #eeee
                margin 30px 30px
                background #fff
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
                h3
                    font-size 35px
                    margin 50px 0
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
                    margin 62px auto
                    img 
                        max-width 100%
                .text
                    text-align center
                    margin 52px 0
                    font-size 30px
    .fixed-footer
        position fixed
        left 0
        bottom 0
</style>

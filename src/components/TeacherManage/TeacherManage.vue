<!-- 
* name: 师资管理
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .teacher
        Header(title="师资管理",@goBack="goBack")
        .container
            ul
                li(v-for="(item,index) in teacherList",:key="index",@click="jump(item.teachId)")
                    .left
                        .name {{item.teachName}}
                        .phone {{item.teachMobile}}
                        .major {{item.teachJob}}
                    .right
                        .date {{item.teachTime}}
        Control(addText="新增老师", @handleControl='handleControl',v-if="hasQx('teach:editStu')")
</template>
<script>
    export default {
        name: 'TeacherManage',
        data () {
            return {
                teacherList:[]
            }
        },
        methods:{
            goBack(){
                this.$router.push({
                    path:'Home'
                });
            },
            jump(id){               //跳转到师资新增/编辑
                if(this.hasQx('teach:detail')){
                        this.$router.push({
                        path:'/TeacherInfo',
                        query:{
                            teachId:id
                        }
                    })
                }else{
                    this.dialog('您无权进行该操作');
                }
            },
            handleControl(){
                this.$router.push({
                    path:'/TeacherInfo'
                })
            },
            async teacherListFun(){
                let params = {
                    pageNo:1,
                    pageSize:1000
                }
                const res = await this.$axios.getTeacherList(params);
                this.teacherList = res.data;
            }
        },
        mounted(){
            this.teacherListFun();
        }

    }
</script>
<style lang="stylus">
.teacher
    .container 
        background #efefef
        height 100%
        ul
            li
                overflow hidden
                margin 40px 0
                padding 40px
                background #fff
                .left
                    float left
                    .name
                        color #000
                        font-size 30px
                    .phone,.major
                        color #a0a0a0
                        margin-top 20px
                .right
                    float right
                    .date
                        color #a0a0a0
    .add
        border-radius 50%
        color #fff
        background #148ce8
        border 10px solid #afd4ef
        width 150px
        height 150px
        position fixed
        bottom 100px
        right 100px
        text-align center
        z-index 2
        span.push
            font-size 80px
            font-weight 100
            display block
            height 55px
            line-height 55px
            margin-top 10px
        span.font 
            font-size 26px
            display block
            height 50px
            line-height 50px
            margin-top 10px
                        
</style>


<!-- 
* name: 角色管理
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .role
        Header(title="角色管理",@goBack="goBack")
        .container
            nav
                span.left 全部角色（{{roleList?roleList.length:''}}）
            ul
                li(v-for="(item,index) in roleList",:key="index")
                    span.name {{item.roleName}}
                    span.control 权限（{{item.permNum}}）
                    img(src="static/img/edit.png",@click="handleDialog(item.roleId)")
                    span(v-if="item.isDefault",style="margin:0 19px")
                    span(style="margin:0 20px")
                    img(v-if="!item.isDefault && hasQx('teach:role:delete')",@click="deleCurrentLine(item.roleId)",src="static/img/dele-item.png")
                    
                el-button.push(type="primary",@click="handleDialog('add')",v-if="hasQx('teach:role:edit')") + 新增角色
        //- a.add(href="javascript:void(0)",@click="handleDialog('add')",v-if="hasQx('teach:role:edit')")
        //-     span.push +
        //-     span.font 新增角色
        el-dialog(:visible.sync="dialogTableVisible" width="545px")
            .window
                h3  {{title}}
                |
                .role-name 角色名称 
                    span *
                |
                el-input(v-model="roleInput", placeholder="输入角色名")
                |
                .validate(v-if="!validate.name.isOK") {{validate.name.text}}
                |
                //- .user-type 
                //-     span 用户类型
                //-     |
                //-     el-radio-group(v-model="roles")
                //-         template(v-if="title==='新增角色'")
                //-             el-radio(label="1") 教师
                //-             el-radio(label="0") 学生
                //-         template(v-else)
                //-             el-radio(label="1" v-if="roles === '1'") 教师
                //-             el-radio(label="0" v-if="roles === '0'") 学生
                .juris 权限
                el-checkbox.all(:indeterminate="isIndeterminate", v-model="checkAll", @change="handleCheckAllChange") 全选
                el-checkbox-group(class="flex-group",v-model="checkedCities",@change="handleCheckedCitiesChange")
                    el-checkbox(v-for="item in computedList", :key="item.permId", :label="item.permId") {{item.permName}}
                .button-item
                    div
                        el-button(type="primary",@click="submit",v-if="hasQx('teach:role:edit')") 确定
                        |
                        el-button(plain="",@click="dialogTableVisible = false") 取消
</template>

<script>
    export default {
        name: 'RoleManage',
        data () {
            return {
                checkAll:           [],
                isIndeterminate:    true,
                dialogTableVisible: false,
                roleInput:          "",
                roleId:             "",
                checkList:          [],
                checkedCities:      [],
                title:              "",
                roleList:           [],
                roles:              "1",
                userType:           "",
                validate:           {
                    name:{
                        isOK:true,
                        text:'角色名称不能为空'
                    }
                }
            }
        },
        methods:{
            goBack(){
                this.$router.push({
                    path:'Home'
                });
            },
            async roleListFun(){                                //获取角色管理列表
                const res = await this.$axios.getRoleList()
                this.roleList = (res.data.sort(a => {
                    if (a.isDefault) return true ; 
                })).reverse()
                console.log(this.roleList)
            },
            async authority(){   //权限
                const res = await this.$axios.getPersonPermiss();
                if (res.code === 1000) {
                    this.$store.dispatch('getQx', res.data)
                }else{
                    this.dialog(res.message);
                }
            },
            async submit(){                                 //提交
                if(!this.roleInput){
                    this.validate.name.isOK = false
                }else{
                    this.validate.name.isOK = true
                }
                if(this.checkedCities.length==0){
                    this.dialog('请选择相应权限')
                    return
                }
                if(Object.values(this.validate).every(x=>x.isOK)){
                    var params = {
                        roleName:this.roleInput,
                        roleType:this.roles,
                        permIds: this.checkedCities.toString()
                    }
                    if (this.title=='编辑权限') {
                        params.roleId = this.roleId;
                    }
                    const res = await this.$axios.getRoleEdit(params);
                    if(res.code===1000){        //提交成功的话
                        this.roleListFun();     //刷新当前页面
                        this.authority();
                    }
                    this.dialogTableVisible = false;    //关闭窗口
                }
                
            },
            //用户类型切换
            handleCheckAllChange(val) {
                console.log(val)
                this.checkedCities = val ? this.computedList.map(item => { return item.permId }) : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                console.log(value,'value');
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.checkList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList.length;
            },
            //打开角色窗口
            async handleDialog(n){
                this.dialogTableVisible = true;
                if(n==='add'){
                    this.title = '新增角色';
                    this.roleInput = '';        //新增窗口打开时先清空上一次的角色名记录
                    this.checkedCities = []     //新增窗口打开时先清空上一次的权限记录
                    this.roles = '1',
                    this.checkAll = []          //新增的时候 全选勾恢复空值
                }else{
                    if(this.hasQx('teach:role:getInfoById')){
                        this.title = '编辑权限';
                        this.roleId = n;
                        this.getRoleDetail();       //获取详情
                    }else{
                        this.dialog('您无权进行该操作');
                    }
                    
                }
                const res = await this.$axios.getPermission();
                this.checkList = res.data;
            },
            //角色详情
            async getRoleDetail(){
                let params = {
                    roleId : this.roleId
                }
                const res = await this.$axios.getRoleDetail(params);
                this.roleInput = res.data.roleName;
                this.checkedCities = res.data.permIds.split(',');
                // console.log(this.checkedCities,"this.checkedCities");
                // console.log(res,'res');
                this.roles = res.data.roleType;
                console.log(res.data.roleType,'res.data.roleType')
                console.log(this.roles,'this.roles')
            },
            //删除角色
            async deleCurrentLine(index){
                const res = await this.$axios.getRoleDele({roleId:index})
                if(res.code===1000){
                    this.successMsg("操作成功");
                    this.roleListFun()
                }else{
                    this.dialog(res.message);
                }
            }
        },
        computed:{
            computedList(){ //0是教师  1是学生
                //return this.checkList.filter(item => this.roles === '0' ? /^学生|通用/.test(item.permName) : /^教师|通用/.test(item.permName));
                return this.checkList.filter(item => this.roles === '0' ? /^学生|通用/.test(item.permName) : this.roles === '1' ? /^教师|通用/.test(item.permName) : /^学生|教师|通用/.test(item.permName));
                //return this.checkList.filter(item => /^学生|教师|通用/.test(item.permName));
                console.log(this.checkList,'this.checkList');
            },
        },
        mounted(){
            this.roleListFun();
        },
    }
</script>
<style lang="stylus">
.role
    .container
        height 100%
        background #efefef
        overflow hidden
        nav
            height 88px
            line-height 88px
            font-size 35px
            padding 15px 20px
            background #fff
            overflow hidden
            span.left
                float left
            span.right
                float right
                color #148ce8
                padding-right 30px
        ul
            margin 20px
            font-size 30px
            overflow auto
            height 100vh
            li  
                padding 30px 30px
                border-bottom 2px solid #efefef;/*no*/
                background: #fff; 
                overflow hidden
                display flex
                height 60px
                line-height 60px
                img
                    width 30px
                    height 30px
                    padding-top 15px
                    padding-left 20px
                    padding-right 20px
                span.name
                    flex 1
                span.control
                    width 250px
                    //color #138be7
    .push
        padding 0
        width 100%
        font-size 30px
        height .9rem
        line-height 0.9rem
        margin-top 10px
    .window
        padding 50px
        h3
            font-size 40px
            color #000
            text-align center
        .role-name
            font-size 30px
            margin 50px 0
            span
                color #f56c6c
        .validate
            color #E46969
            margin-top 30px
            font-size 30px
        input[type='text']
            height 100px
            font-size 30px
        .user-type
            margin 30px 0 0 0
            &>span
                font-size 30px
                margin-right 50px
            .el-radio__label
                font-size 30px
        .juris
            font-size 30px
            margin 50px 0 30px 0
        .all
            margin 30px 0 !important
            padding 5px 20px
            display inline-block
            .el-checkbox__input
                margin-right 10px
        .flex-group
            display flex
            flex-direction column
            max-height 500px
            overflow-y auto
            border 1px solid #efefef;/*no*/
            border-radius 5px;/*no*/
            padding 5px 20px
            .el-checkbox
                width 420px
                margin 30px 0
                display inline-block
            .el-checkbox__input
                margin-right 10px
        .button-item
            margin-top 50px
            div
                margin 0 auto
                width 600px
                text-align center

                .el-button
                    width auto
                    padding 35px 90px
                    font-size 30px

                    &:last-child
                        margin-left 20px                        
</style>


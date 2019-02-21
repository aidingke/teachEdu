<!-- 
* name: 科目管理
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .subject
        Header(title="科目管理",@goBack="goBack")
        .container
            nav
                span.left 全部科目（{{subjectList.length}}）
            ul
                li(v-for="(item,index) in subjectList",:key="index")
                    span.name {{item.subjectName}}
                    |
                    span.color(:style="`background-color: ${ item.icon }`")
                    |
                    //span.control(v-if="item.id!=1 && item.id!=2 && item.id!=3 && item.id!=4 && item.id!=5 && item.id!=6  && item.id!=7 && item.id!=8")
                    span.control(v-if="Number(item.id)>8")
                        a(href="javascript:void(0)",@click="handleDialog(item,index)",v-if="hasQx('teach:subject:edit')")
                            img(src="static/img/edit.png")
                        a(href="javascript:void(0)",@click="deleCurrentLine(item.id)",v-if="hasQx('teach:subject:delete')")   
                            img(src="static/img/dele.png")
        el-dialog(:visible.sync="dialogTableVisible" width="445px")
            .window
                h3  {{title}}
                |
                .sub-name 科目名称
                    span *
                |
                el-input(v-model="subInput", placeholder="输入科目名称")
                |
                span(v-if="!validate.name.isOK",class="validate") {{validate.name.text}}
                |
                .sub-name 科目标识
                |
                .color-content
                    .color(v-for="(item,index) in subjectList", @click="select(item.icon,item.id)" ,:key="index", :style="{border: studentIndex == item.id ?  '2px solid ' + '#b7b7b7' : 'none'}") 
                        span.dot(:style="`background-color: ${ item.icon }`")
                |
                span(v-if="!validate.color.isOK",class="validate") {{validate.color.text}}
                |
                .button-item
                    div
                        el-button(type="primary",@click="add") {{buttonText}}
                        |
                        el-button(plain="",@click="dialogTableVisible = false") 取消
        a.add(href="javascript:void(0)",@click="handleDialog()",v-if="hasQx('teach:subject:edit')")
            span.push +
            span.font 新增科目
        ConfirmDialog(confirmTitile="提示",
            :confirmText="confirmText",
            :dialogTableVisible="showConfirm",
            confirmTextButton="删除",
            closeTextButton="取消",
            @determine="determine",
            @closeConfirm="closeConfirm")
</template>
<script>
export default {
    name: "SubjectManage",
    data() {
        return {
            title:              "",
            subInput:           "",
            icon:               "",
            dialogTableVisible: false,
            subjectList: [],
            studentIndex:       '',
            confirmText:        '',          //确认框提示文字
            showConfirm:        false,       //确认框显隐
            buttonText:         '',          //按钮文字
            id:                 '',
            validate:{
                name:{
                    isOK:true,
                    text:'科目名不能为空'
                },
                color:{
                    isOK:true,
                    text:'请选择科目标识'
                },
            }
        };
    },
    methods: {
        goBack(){
            this.$router.push({
                path:'Home'
            })
        },
        async getSubject() {                //获取科目列表
            let params = {
                pageNo: 1,
                pageSize: 100
            };
            const res = await this.$axios.getSubjectList(params);
            if(res.code===1000){
                this.subjectList = res.data
                console.log(res);
            }
        },
        async add(){                        //新增科目
            if(!this.subInput){
                this.validate.name.isOK = false
            }else{
                this.validate.name.isOK = true
            }

            if(!this.icon){
                this.validate.color.isOK = false
            }else{
                this.validate.color.isOK = true
            }

            if(Object.values(this.validate).every(x=>x.isOK)){
                let params = {
                    subjectName:this.subInput,
                    icon:this.icon
                }
                const res = await this.$axios.getSubjectEdit(params);
                if(res.code===1000){
                    this.successMsg('操作成功');
                    this.dialogTableVisible = false
                    this.getSubject();
                }else{
                    this.dialog('操作失败');
                }
            }

        },
        //打开科目窗口
        handleDialog(n) {
            if (n) {
                this.title = "编辑科目";
                this.subInput = n.subjectName;
                this.studentIndex = n.id;
                this.buttonText = "保存"
            } else {
                this.title = "添加科目";
                this.buttonText = "新增";
                this.subInput = "";
                
            }
            this.dialogTableVisible = true;
        },
        //确认框关闭
        closeConfirm(){             
            this.showConfirm = false
        },
        deleCurrentLine(id) {           //删除科目
            this.showConfirm = true;
            this.confirmText = '确定删除该科目吗？'
            this.id = id
        },
        async determine(){  //确定按钮后开始删除
            let params = {
                subjectId:this.id
            }
            const res = await this.$axios.getSubjectDele(params);
            if(res.code===1000){
                this.successMsg("操作成功");
                this.showConfirm = false;
                this.getSubject();
            }else{
                this.dialog(res.message)
                this.showConfirm = false;
            }
        },
        select(value,index) {   //选择颜色
            this.icon = value
            this.studentIndex = index;
        }
    },
    mounted(){
        this.getSubject();
    }
};
</script>
<style lang="stylus">
.subject 
    .container 
        height 100%
        background #efefef
        position: fixed
        left 0
        right 0
        overflow auto

        nav 
            height 88px
            line-height 88px
            font-size 30px
            padding 15px 20px
            background #fff

            span.left 
                float left
                color #909399
            
        ul 
            margin 20px
            font-size 30px
            padding-bottom: 40px;/*no*/

            li 
                padding 30px 30px
                border-bottom 3px solid #efefef
                background #fff
                overflow hidden
                display flex
                height 60px
                line-height 60px
                position relative

                span.name 
                    flex 1
                
                span.color 
                    width 30px
                    height 30px
                    border-radius 50%
                    position absolute
                    top 40px
                    left 55%

                span.control 
                    a 
                        padding: 0 30px

                        img 
                            height 40px
                            width 40px
    
    .add 
        border-radius: 50%
        color: #fff
        background: #148ce8
        border: 10px solid #afd4ef
        width: 150px
        height: 150px
        position: fixed
        bottom: 100px
        right: 100px
        text-align: center
        z-index: 2

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
        
    .window 
        padding 50px

        h3 
            font-size 40px
            color #000
            text-align center
        
        .sub-name 
            font-size 30px
            margin 50px 0
            span
                color #f56c6c
                margin 0 20px
        input[type='text'] 
            height 100px
            font-size 30px
            margin-bottom 20px
        
        .button-item 
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
        .color-content
            .color 
                width 54px
                height 54px
                display inline-block
                border-radius 50%
                margin-top 30px
                margin-right 38px
                margin-left 38px
                margin-bottom 30px
                position relative
                box-sizing border-box
                padding 2px

                // &:nth-of-type(5n) {
                // margin-right: 0;
                // }
                .dot 
                    width 100%
                    height 100%
                    border-radius 50%
                    display block
                    box-sizing border-box
        .button-item
            margin-top 30px
        .validate
            color #E46969
            font-size 30px
</style>


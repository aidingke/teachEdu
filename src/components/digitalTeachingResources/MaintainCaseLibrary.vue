<!-- 
* name: 维修库案例组件
* author: gxr
* time: 2018-7-27
-->
<template lang="pug">
    .maintainCaseLibrary
        Header(title="维修库案例", @goBack="goBack")
        .group-div
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search"  class="input-with-select" v-model="keyword">
                <el-button slot="append" @click="onsearchHandle">搜索</el-button>
            </el-input>
        .sort-div(v-if="isShowSortList")
            <div class="sort-title">故障类别</div>
            <el-checkbox-group  v-model="sortCheckList" @change="getHelperIndexList">
                <el-checkbox v-for="(item,key) of sortList" :label="item" :key="key">{{item}}</el-checkbox>
            </el-checkbox-group>
        .sortList-div(v-if="list.length>0")
            .item-div(v-for="(item, key) of list" :key="key" @click="onLinkToDetails(item)")
                .tapChoose
                    h4
                        span {{item.title}}
                        strong.text-color-blue 故障点（{{item.list.length}}）
                .tapCon
                    .textOver {{item.list[0].phenomenon}}
        NotInfo(v-if="list.length == 0" notClass="暂无相关数据" defaultImg="static/img/not-data-default.png")
</template>
<script>
    export default {
        name: 'MaintainCaseLibrary',
        data () {
            return {
                checked:false,
                list: [], // 渲染数据
                sortList: [], // 故障类别
                sortCheckList: [], // 选中的故障类别
                isShowSortList: false, // 是否显示故障类别
                keyword: '', // 搜索关键字
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getHelperIndexList(){ //获取数据
                let params = {};
                if(this.keyword != '') {
                    params.keyword = this.keyword;
                }
                if(this.sortCheckList.length > 0) {
                    params.sort = this.sortCheckList;
                }
                params.token = localStorage.getItem('phpToken');
                const res = await this.$axios.getHelperIndex(params);
                this.convertData(res);
            },
            convertData(res) { // 返回重组数据
                if(res.code == 20000) {
                    this.list = []; //重置渲染数据
                    const data = res.data.list;
                    let objSort = {};
                    let tempArr = [];
                    data.map((item, key) => {
                        let title = item.title;
                        let sort = item.sort;
                        if(!objSort[sort+"_"+title]) {
                            objSort[sort+"_"+title] = {
                                title: title,
                                list: []
                            }
                        }
                        objSort[sort+"_"+title].list.push(item);
                    });
                    for(let v in objSort) {
                        this.list.push(objSort[v]);
                    }
                    if(this.keyword != '') {
                        this.sortList = res.data.sortList;
                        this.isShowSortList = true;
                    }
                } else if (res.code == 40100) { // token过期
                    console.log('token过期');
                } else if (res.code == 20400) { //没有数据
                    this.list = [];
                    this.isShowSortList = false;
                } else {
                    this.list = [];
                    this.isShowSortList = false;
                }
            },
            onLinkToDetails(item) { // 跳转详情
                sessionStorage.setItem('sortStr',JSON.stringify(item));
                this.$router.push({
                    path: './MaintainCaseDetails'
                });
            },
            onsearchHandle() { //搜索
                if(this.keyword == '') {
                    this.dialog("请输入故障关键字");
                    return false;
                } else {
                    this.sortCheckList = [];
                    this.getHelperIndexList();
                }
            }
        },
        mounted(){
            this.getHelperIndexList();
        }
    }
</script>
<style lang="stylus">
.maintainCaseLibrary
    .group-div
        padding 30px
        background #efefef
        input 
            width 100%
            height 90px
            font-size 35px
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
        padding 30px
        font-size 30px
        border-bottom 1px solid #d3d6db
        .el-checkbox-group
            flex 1
            .el-checkbox
                font-size 30px
                margin-left 50px
                margin-bottom 30px
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
    .sortList-div
        .item-div
            padding 50px 30px
            font-size 30px
            border-bottom 1px solid #d3d6db
            h4
                display flex
                justify-content space-between
                color #303133
                margin-bottom 20px
                span 
                    flex 1
                strong 
                    margin-left 20px
                    font-weight 400
                    color #46aef7
                    letter-spacing 2px;
            .tapCon 
                color #909399
                .textOver 
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
.el-message
    padding 30px
    .el-message__icon 
        display none
    .el-message__content
        font-size 35px
</style>

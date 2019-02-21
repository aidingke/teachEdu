<!-- 
* name: 综合查询组件
* author: gxr
* time: 2018-7-31
-->
<template lang="pug">
    .integratedQuery
        Header(title="综合查询", @goBack="goBack")
        .tab-cont
            .tab(:class="tabValue ==1?'on':''", @click="tabChange(1)") 电路图
            .tab(:class="tabValue ==2?'on':''", @click="tabChange(2)") 流体数据
        template(v-if="tabValue ==1")
            .group-div
                <el-input key="serachCarKeyWord" placeholder="请输入线路图关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="keyword">
                    <el-button slot="append" @click="onSearchBtn">搜索</el-button>
                </el-input>
            ul.circuit-list(v-if="renderList.length > 0")
                li.circuit-item(v-for="(item, index) of renderList", @click="onCircuitDetails(item.id)")
                    .circuit-title {{ item.title }}
                    .circuit-img
                        img(src="static/img/circuit-img.png")
                        span {{ item.count }}张
            NotInfo(v-if="renderList.length === 0" notClass="暂无相关数据" defaultImg="static/img/not-data-default.png")
        template(v-if="tabValue ==2")
            ul.serviceBook-list
                li.serviceBook-item
                    img.logoImg(:src="'https://www.wanguoqiche.com/files/logo/'+selectCarInfo.icoName+'.jpg'")
                    span.title {{selectCarInfo.car_brand + ' '+ selectCarInfo.car_line + ' '+ selectCarInfo.car_produceYear}} 款 流体数据查询
            .check-data
                .hd-div
                    img(src="static/img/dataCheck.png")
                    span 资料查询
                .bd-div
                    .item(v-for="(item, index) of checkDatas", :key="index", @click="onLinkDetails(item)")
                        img(:src="'static/img/' + item.icoName + '.png'")
                        span {{item.title}}
</template>
<script>
    export default {
        name: 'IntegratedQuery',
        data () {
            return {
                tabValue: '',
                keyword: '',
                selectCarInfo: {
                    car_brand: '',
                    icoName: 'ad_ico',
                    car_line: '',
                    car_produceYear: '',
                    car_cc: '',
                    line_id: ''
                }, //选中的车辆信息
                renderList: [],
                cacheRenderList: [], //搜索使用的
                checkDatas:[
                    {icoName:'oilMessage',title:'机油',path:'OilMessage',type:'oil'},
                    {icoName:'waveBoxOilMessage',title:'波箱油',path:'WaveBoxOilMessage',type:'gearbox'},
                    {icoName:'batteryMessage',title:'电池型号',path:'BatteryMessage',type:'cell'},
                    {icoName:'antifreeze',title:'防冻液',path:'Antifreeze',type:'antifreeze'},
                    {icoName:'resetTutorial',title:'复位教程',path:'ResetTutorial',type:'reset_tutorial'},
                    {icoName:'maintenanceCase',title:'维修案例',path:'MaintenanceCase',type:'repair_case'},
                ],
                menuList: {
                    "oil": '',   // 1-有数据,0-没有数据
                    "gearbox": '',    // 1-有数据,0-没有数据
                    "cell": '',
                    "antifreeze": '',
                    "circuit": '', 
                    "reset_tutorial": '', 
                    "repair_case": '',
                },
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
                sessionStorage.setItem("integratedQueryTabValue", "");
            },
            async getCircuitList(){ //获取电路图数据
                const params = {};
                params.line_id = this.selectCarInfo.line_id;
                params.year = this.selectCarInfo.car_produceYear;
                const res = await this.$axios.getCircuitList(params);
                if(res.error_code == 0) {
                    this.renderList = res.data.list;
                    this.cacheRenderList = res.data.list; 
                }
            },
            tabChange(num) { //切换tab
                this.tabValue = num;
                sessionStorage.setItem("integratedQueryTabValue", num);
            },
            onSearchBtn(){ //搜索
                if(this.keyword == '') {
                    this.renderList = this.cacheRenderList;
                } else {
                    if(this.cacheRenderList.length == 0 && this.renderList.length == 0) {
                        this.renderList = [];
                        this.cacheRenderList = [];
                    } else {
                        this.renderList = this.cacheRenderList.filter((v, i) => {
                            return v.title.indexOf(this.keyword) > -1;
                        });
                    }
                }
            },
            onCircuitDetails(id) { //电路图详情
                this.$router.push({
                    path: 'CircuitDetails?id=' + id
                });
            },
            async getHelperMenu() { //获取云帮手菜单
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.car_brand = this.selectCarInfo.car_brand;
                params.car_line = this.selectCarInfo.car_line;
                params.car_produceYear = this.selectCarInfo.car_produceYear;
                params.car_cc = this.selectCarInfo.car_cc;
                params.line_id = this.selectCarInfo.line_id;
                const res = await this.$axios.getHelperMenu(params);
                const code = res.code;
                if(code == 20000) {
                    this.menuList = res.data;
                    this.controlMenu(res.data);
                } else if (code == 40100) { //php的token过期
                    //重新获取PHP的token
                } else {
                    this.dialog(res.msg);
                }
            },
            controlMenu(data) { //菜单控制，reset_tutorial = 1时，才显示复位教程菜单
                const reset_tutorial = data.reset_tutorial;
                this.checkDatas = this.checkDatas.filter((v, i) => {
                    return v.type != 'reset_tutorial' || (v.type == 'reset_tutorial' && reset_tutorial == 1);
                });
            },
            onLinkDetails(item) { //流媒体查询详情
                for(var key in this.menuList){
                    if(key==item.type){
                        if(this.menuList[key]==0){
                            this.dialog("暂无相关数据");
                        }else{
                            this.$router.push({
                                path: item.path
                            });
                        }
                    }
                }
            },
        },
        mounted(){
            if(sessionStorage.getItem("selectCarInfo")) {
                this.tabValue = sessionStorage.getItem("integratedQueryTabValue") || 1;
                this.selectCarInfo = JSON.parse(sessionStorage.getItem("selectCarInfo"));
                this.getCircuitList();
                this.getHelperMenu();
            }
        }
    }
</script>
<style lang="stylus">
.integratedQuery
    .tab-cont
        height 130px
        display flex
        justify-content center
        align-items center
        border-bottom: 1px solid #d3d6db
        .tab
            margin 0 130px
            font-size 40px
            line-height 130px
            width 50%
            text-align center
        .on
            border-bottom 3px solid #138be7
    .group-div
        padding 30px
        background #efefef
        input 
            width: 100%
            height: 90px
            font-size: 35px
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
    .circuit-list
        .circuit-item
            display flex
            align-items center
            justify-content space-between
            padding 30px
            border-bottom 1px solid #d3d6db
            .circuit-title
                font-size 34px
                flex 1
            .circuit-img
                position relative
                margin-left 20px
                img
                    width 160px
                span 
                    display flex 
                    width 100%
                    height 50px
                    position absolute
                    left 0
                    bottom 0
                    background rgba(0,0,0,0.3)
                    color #fff
                    font-size 24px
                    align-items center
                    justify-content center
    .serviceBook-list
        .serviceBook-item
            display flex
            align-items center
            padding 50px
            font-size 34px
            border-bottom 1px solid #d3d6db
            .logoImg
                margin-right 30px
                width auto
                height 120px
    .check-data
        .hd-div
            display flex
            align-items center
            height 130px
            padding 0 50px
            img
                width 37px
            span 
                font-size 34px
                margin-left 30px
        .bd-div
            display flex
            align-items center
            flex-wrap wrap
            padding 50px 0
            border-bottom 1px solid #d3d6db
            .item
                position relative
                display flex
                align-items center
                flex-direction column
                width 33.33%
                padding 20px 0
                font-size 34px
                img 
                    height 96px
                span 
                    margin-top 20px
                &:after
                    position absolute
                    right 5px
                    top 50%
                    content ''
                    display block
                    height 50%
                    width 3px
                    background #e5e5e5
                    transform translateY(-46%)
                &:nth-of-type(3n):after
                    display none
                    
</style>

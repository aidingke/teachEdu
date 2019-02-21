<!-- 
* name: 流媒体查询（防冻液）组件
* author: gxr
* time: 2018-8-30
-->
<template lang="pug">
    .antifreeze
        Header(title="防冻液", @goBack="goBack")
        .conts-div
            ul.data-list
                li.item
                    span.title 发动机型号
                    span.describe {{renderList.engine_model}}
                li.item
                    span.title 发动机排量
                    span.describe {{renderList.engine_cc}}
                li.item
                    span.title 防冻液初装量
                    span.describe {{renderList.antifreeze}}
</template>
<script>
    export default {
        name: 'Antifreeze',
        data () {
            return {
                selectCarInfo: {
                    car_brand: '',
                    icoName: 'ad_ico',
                    car_line: '',
                    car_produceYear: '',
                    car_cc: '',
                    line_id: ''
                }, //选中的车辆信息
                renderList: {},
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getHelperGearbox(){ //获取数据
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.car_brand = this.selectCarInfo.car_brand;
                params.car_line = this.selectCarInfo.car_line;
                params.car_produceYear = this.selectCarInfo.car_produceYear;
                params.car_cc = this.selectCarInfo.car_cc;
                const res = await this.$axios.getHelperGearbox(params);
                if(res.code == 20000) {
                    this.renderList = res.data;
                } else {
                    this.dialog(res.msg);
                }
            },
        },
        mounted(){
            if(sessionStorage.getItem("selectCarInfo")) {
                this.selectCarInfo = JSON.parse(sessionStorage.getItem("selectCarInfo"));
                this.getHelperGearbox();
            }
        }
    }
</script>
<style lang="stylus">
.antifreeze
    .conts-div
        .item
            display flex
            align-items center
            justify-content space-between
            padding 30px
            border-bottom 1px solid #d3d6db
            font-size 30px
            .title
                flex 1
            .describe
                margin-left 20px
                color #30b37a
</style>
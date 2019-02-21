<!-- 
* name: 流媒体查询（波箱油）组件
* author: gxr
* time: 2018-8-30
-->
<template lang="pug">
    .streamingDetails
        Header(title="波箱油", @goBack="goBack")
        .conts-div
            ul.data-list
                li.item
                    span.title 变速箱型号
                    span.describe {{renderList.gearbox_model}}
                li.item
                    span.title 波箱油初装量
                    span.describe {{renderList.gearbox_oil}}
                li.item
                    span.title 档位描述
                    span.describe {{renderList.gearbox_about}}
</template>
<script>
    export default {
        name: 'StreamingDetails',
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
.streamingDetails
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
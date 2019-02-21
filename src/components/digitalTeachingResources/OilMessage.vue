<!-- 
* name: 流媒体查询（机油）组件
* author: gxr
* time: 2018-8-30
-->
<template lang="pug">
    .oilMessage
        Header(title="机油", @goBack="goBack")
        .conts-div
            ul.data-list
                li.item
                    span.title 品牌
                    span.describe {{renderList.car_brand}}
                li.item
                    span.title 车型
                    span.describe {{renderList.car_line}}
                li.item
                    span.title 制作厂家
                    span.describe {{renderList.factory}}
                li.item
                    span.title 润滑油初装量
                    span.describe {{renderList.oil_init}}
</template>
<script>
    export default {
        name: 'OilMessage',
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
            async getHelperOil(){ //获取数据
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.car_brand = this.selectCarInfo.car_brand;
                params.car_line = this.selectCarInfo.car_line;
                params.car_produceYear = this.selectCarInfo.car_produceYear;
                params.car_cc = this.selectCarInfo.car_cc;
                const res = await this.$axios.getHelperOil(params);
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
                this.getHelperOil();
            }
        }
    }
</script>
<style lang="stylus">
.oilMessage
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
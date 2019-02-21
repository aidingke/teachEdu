<!-- 
* name: 综合查询（复位教程）组件
* author: gxr
* time: 2018-8-30
-->
<template lang="pug">
    .resetTutorial
        Header(title="复位教程", @goBack="goBack")
        .const
            p(v-for="(item, index) of renderList" :key="index")
                img(:src="item")
</template>
<script>
    export default {
        name: 'ResetTutorial',
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
                renderList: [],
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getOilReset(){ //获取数据
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.car_brand = this.selectCarInfo.car_brand;
                params.car_line = this.selectCarInfo.car_line;
                // params.car_produceYear = this.selectCarInfo.car_produceYear;
                params.car_produceYear = '2014';
                const res = await this.$axios.getOilReset(params);
                if(res.code == 20000) {
                    this.renderList = res.data.list;
                } else {
                    this.dialog(res.msg);
                }
            },
        },
        mounted(){
            if(sessionStorage.getItem("selectCarInfo")) {
                this.selectCarInfo = JSON.parse(sessionStorage.getItem("selectCarInfo"));
                this.getOilReset();
            }
        }
    }
</script>
<style lang="stylus">
.resetTutorial
    .const
        img
            display block
            max-width 100%
</style>
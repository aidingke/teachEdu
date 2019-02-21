<!-- 
* name: 流媒体查询（电池型号）组件
* author: gxr
* time: 2018-8-30
-->
<template lang="pug">
    .batteryMessage
        Header(title="电池型号", @goBack="goBack")
        .conts-div
            <el-table class="batteryMessage" :data="renderList" border style="width: 100%">
                <el-table-column prop="cell_brand" label="品牌">
                </el-table-column>
                <el-table-column prop="cell_model" label="型号" width="180">
                </el-table-column>
                <el-table-column prop="cell_alias" label="别名" width="180">
                </el-table-column>
                <el-table-column prop="cell_capacity" label="容量" width="180">
                </el-table-column>
            </el-table>
</template>
<script>
    export default {
        name: 'BatteryMessage',
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
            async getHelperCell(){ //获取数据
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.car_brand = this.selectCarInfo.car_brand;
                params.car_line = this.selectCarInfo.car_line;
                params.car_produceYear = this.selectCarInfo.car_produceYear;
                params.car_cc = this.selectCarInfo.car_cc;
                const res = await this.$axios.getHelperCell(params);
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
                this.getHelperCell();
            }
        }
    }
</script>
<style lang="stylus">
.batteryMessage
    .conts-div
        .el-table 
            margin-top 20px
            font-size 30px
            color #333
            td, th
                padding 50px 30px
                text-align center
            th
                color #000
            .cell
                line-height 1
</style>
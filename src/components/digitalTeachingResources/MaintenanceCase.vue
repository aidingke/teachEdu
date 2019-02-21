<!-- 
* name: 流媒体查询（维修案例）组件
* author: gxr
* time: 2018-8-30
-->
<template lang="pug">
    .maintenanceCase
        Header(title="维修案例", @goBack="goBack")
        .conts-div
            ul.data-list
                li.item(v-for="(item, index) of renderList" , :key="item.id", @click="onDetailsMethod(item.id)")
                    span.title {{ item.title }}
                    span.iconFont.el-icon-arrow-right
</template>
<script>
    export default {
        name: 'MaintenanceCase',
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
            async getHelperRepairCase(){ //获取数据
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.car_brand = this.selectCarInfo.car_brand;
                params.car_line = this.selectCarInfo.car_line;
                const res = await this.$axios.getHelperRepairCase(params);
                if(res.code == 20000) {
                    this.renderList = res.data.list;
                } else {
                    this.dialog(res.msg);
                }
            },
            onDetailsMethod(id) { //跳转到案例详情
                this.$router.push({
                    path: 'MaintenanceCaseDetails?id=' + id
                });
            }
        },
        mounted(){
            if(sessionStorage.getItem("selectCarInfo")) {
                this.selectCarInfo = JSON.parse(sessionStorage.getItem("selectCarInfo"));
                this.getHelperRepairCase();
            }
        }
    }
</script>
<style lang="stylus">
.maintenanceCase
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
            .iconFont
                margin-left 40px
                font-size 50px
                color #148ce8
</style>
<!-- 
* name: 综合查询（电路图详情）组件
* author: gxr
* time: 2018-8-1
-->
<template lang="pug">
    .streamingDetails
        Header(title="波箱油", @goBack="goBack")
        template(v-if="type==1")
            .conts-div
                ul.data-list
                    li.item
                        span.title 品牌
                        span.describe 大众
                    li.item
                        span.title 车型
                        span.describe 途安
                    li.item
                        span.title 制作厂家
                        span.describe 上汽大众
                    li.item
                        span.title 发动机型号
                        span.describe EA211
                    li.item
                        span.title 初装量
                        span.describe 1.4T
                    li.item
                        span.title 防冻液初装量
                        span.describe 3.2L
                    li.item
                        span.title 粘度
                        span.describe 5W-40
                    li.item
                        span.title 档位描述
                        span.describe 5档手动
        template(v-if="type==2")
            .conts-div
                <el-table class="batteryMessage" :data="tableData" border style="width: 100%">
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
        name: 'StreamingDetails',
        data () {
            return {
                type: '',
                tableData: [
                    {
                        cell_brand: '2016-05-02',
                        cell_model: '王小虎',
                        cell_alias: '4654',
                        cell_capacity: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        cell_brand: '2016-05-02',
                        cell_model: '王小虎',
                        cell_alias: '4654',
                        cell_capacity: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        cell_brand: '2016-05-02',
                        cell_model: '王小虎',
                        cell_alias: '4654',
                        cell_capacity: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        cell_brand: '2016-05-02',
                        cell_model: '王小虎',
                        cell_alias: '4654',
                        cell_capacity: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        cell_brand: '2016-05-02',
                        cell_model: '王小虎',
                        cell_alias: '4654',
                        cell_capacity: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        cell_brand: '2016-05-02',
                        cell_model: '王小虎',
                        cell_alias: '4654',
                        cell_capacity: '上海市普陀区金沙江路 1518 弄'
                    },
                ]
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getHelperIndexList(){ //获取数据
                const res = await this.$axios.getHelperIndex(params);
            },
        },
        mounted(){
            //this.getHelperIndexList();
            this.type = this.$route.query.type;
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
            font-size 35px
            .title
                flex 1
            .describe
                margin-left 20px
                color #30b37a
        .el-table 
            margin-top 20px
            font-size 35px
            td, th
                padding 30px
                text-align center
            th
                color #000
            .cell
                line-height 1
</style>
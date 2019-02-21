<!-- 
* name: 综合查询（选车型）组件
* author: gxr
* time: 2018-7-30
-->
<template lang="pug">
    .selectCarModels
        Header(title="选择车型", @goBack="goBack")
        .scroll-div
            .item

                .title-div 车系
                .carInfo-div
                    .sort-letter
                        span(v-for="(item, index) of carBrandObj.letterArr" :key="index" ,:class="item == carBrandObj.currentLetter ? 'active': ''", @click="onChangeLetter(item)") {{item}} 
                    .sort-brand
                        .group-div(v-for="(item, index) of carBrandObj.renderList" :key="index", :class="index == carBrandObj.currentIndex ? 'active': ''", @click="onSelectCarBrand(index)")
                            p 
                                img(:src="'https://www.wanguoqiche.com/files/logo/'+item.icoName+'.jpg'")
                            p {{ item.brandName }}
            .item
                .title-div 车型
                .carInfo-div    
                    .sort-brand
                        .group-div(v-for="(item, index) of carLineObj.renderList" :key="index", :class="index == carLineObj.currentIndex ? 'active': ''", @click="onSelectCarLine(index)") {{ item.lineName }}
            .item
                .title-div 排量
                .carInfo-div
                    .sort-brand(v-if="carCcObj.renderList.length > 1 || carCcObj.renderList[0].cc")
                        .group-div(v-for="(item, index) of carCcObj.renderList" :key="index", :class="index == carCcObj.currentIndex ? 'active': ''", @click="onSelectCarCc(index)") {{ item.cc}}
                    .sort-input(v-else)
                        <input type="text" class="el-input__inner" placeholder="请输入排量" v-model="carCcObj.definedUnit" @focus="carCcObj.errorText=''">
                        .error(v-if="carCcObj.errorText") {{carCcObj.errorText}}
                        .unit
                            span(v-for="(item, index) of carCcObj.unitList", @click="onChangeUnit(item)", :class=" item == carCcObj.unit ? 'active': '' ") {{item}}
                        <el-button type="primary" @click="onEnsureUnit">确定</el-button> 
            .item
                .title-div 年款
                .carInfo-div
                    .sort-brand(v-if="carProduceYearObj.length > 1 || carProduceYearObj.renderList[0].produceYear")
                        .group-div(v-for="(item, index) of carProduceYearObj.renderList" :key="index", :class="index == carProduceYearObj.currentIndex ? 'active': ''", @click="onSelectCarProduceYear(index)") {{ item.produceYear}}
                    .sort-input(v-else)
                        <el-date-picker v-model="carProduceYearObj.selectYear" :picker-options="pickerOptions"  @change="onDateChange" value-format="yyyy" type="year" placeholder="选择年款"></el-date-picker>
        FixedButton(:buttonText="btnText" @listenToChildEvent="onIntegratedQuery ")
</template>
<script>
    export default {
        name: 'SelectCarModels',
        data () {
            return {
                carBrandObj: { //车辆品牌
                    currentLetter: 'A', //默认选中字母
                    letterArr: [], //排序字母
                    cacheBrandList: [], //缓存数据
                    renderList: [
                        {
                            brandId: '',
                            brandName: '',
                            icoName: 'ad_ico',
                            initial: ''
                        }
                    ], //渲染数据
                    currentIndex: 0, //默认选中车辆品牌
                },
                carLineObj: { //车系
                    renderList: [
                        {
                            lineId: '',
                            lineName: ''
                        }
                    ], //渲染数据
                    currentIndex: 0, //默认选中车系
                },
                carCcObj: { //排量
                    renderList: [
                        {
                            cc: ''
                        }
                    ], //渲染数据
                    currentIndex: 0, //默认选中排量
                    unit: 'T', //选中的排量单位
                    unitList: ['T', 'L'], //排量单位
                    definedUnit: '', //自定义排量
                    errorText: '', //验证排量格式
                },
                carProduceYearObj: { //年份
                    renderList: [
                        {
                            produceYear: ''
                        }
                    ], //渲染数据
                    currentIndex: 0, //默认选中年份
                    selectYear: '', //自定义年份
                },
                selectCarInfo: {
                    car_brand: '',
                    icoName: '',
                    car_line: '',
                    line_id: '',
                    car_cc: '',
                    car_produceYear: ''                    
                }, //选中的车辆信息
                pickerOptions: {
                    disabledDate(time) { //设置日期可选项
                        return time.getTime() > Date.now();
                    },
                },
            }
        },
        watch: {
        },
        computed: {
            btnText() { //按钮文案
                const brandObj = this.carBrandObj.renderList[this.carBrandObj.currentIndex];
                const lineObj = this.carLineObj.renderList[this.carLineObj.currentIndex];
                const ccObj = this.carCcObj.renderList[this.carCcObj.currentIndex];
                const produceYearObj =  this.carProduceYearObj.renderList[this.carProduceYearObj.currentIndex];
                this.selectCarInfo = {
                    car_brand: brandObj.brandName,
                    icoName: brandObj.icoName,
                    car_line: lineObj.lineName,
                    line_id: lineObj.lineId,
                    car_cc: ccObj.cc || '',
                    car_produceYear: produceYearObj.produceYear || ''
                };
                return '已选【 ' + brandObj.brandName + '  ' + lineObj.lineName + '  ' + (produceYearObj.produceYear || this.carProduceYearObj.selectYear) +' 年款 】查询';
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            onIntegratedQuery() { //综合查询
                const tempObj = Object.assign({}, this.selectCarInfo);
                console.log(tempObj);
                if(tempObj.car_cc == '') {
                    if(this.carCcObj.definedUnit == '') {
                        this.dialog('请输入排量')
                        return false;
                    } else {
                        tempObj.car_cc = this.carCcObj.definedUnit + this.carCcObj.unit;
                    }
                }
                if(tempObj.car_produceYear == '') {
                    this.dialog('请选择生产年份')
                    return false;
                }
                sessionStorage.setItem("selectCarInfo", JSON.stringify(tempObj));  //选中的车辆信息
                this.$router.push({
                    path: './IntegratedQuery'
                });
            },
            async getBrandList() { //获取车辆品牌数据
                const res = await this.$axios.getBrandList();
                if(res.code == 20000) {
                    this.carBrandObj.cacheBrandList = res.data;
                    this.convertData(res.data);
                    this.getLineList();
                }
            },
            async getLineList() { //获取车系
                const params = this.getParams(['brand']);
                const res = await this.$axios.getLineList(params);
                if(res.code == 20000) {
                    this.carLineObj.renderList = res.data;
                    this.getCcList();
                }
            },
            async getCcList() { //获取排量
                const params = this.getParams(['brand', 'line']);
                const res = await this.$axios.getCcList(params);
                if(res.code == 20000) {
                    let data = res.data;
                    if(data.length > 1) { //过滤值为空的
                        data = data.filter((v, i) => {
                            return v.cc;
                        });
                    }
                    this.carCcObj.renderList = data;
                    this.getProduceYearList();
                }
            },
            async getProduceYearList() { //获取生产年份
                const params = this.getParams();
                if(!params.cc) {
                    if(this.carCcObj.definedUnit == '') {
                        return false;
                    } else {
                        let tempCc = '';
                        tempCc = this.carCcObj.definedUnit + this.carCcObj.unit;
                        params.cc = tempCc;
                    }
                }
                const res = await this.$axios.getProduceYearList(params);
                if(res.code == 20000) {
                    let data = res.data;
                    if(data.length > 1) { //过滤值为空的
                        data = data.filter((v, i) => {
                            return v.produceYear;
                        });
                    }
                    this.carProduceYearObj.renderList = data;
                }
            },
            getParams(arr = ['brand', 'line', 'cc']) { //获取请求参数
                const params = {};
                if(arr.indexOf('brand') > -1) {
                    const currentBrand = this.carBrandObj.renderList[this.carBrandObj.currentIndex];
                    params.brandId = currentBrand.brandId;
                }
                if(arr.indexOf('line') > -1) {
                    const currentLine = this.carLineObj.renderList[this.carLineObj.currentIndex];
                     params.lineId = currentLine.lineId;
                }

                if(arr.indexOf('cc') > -1) {
                    const currentCc = this.carCcObj.renderList[this.carCcObj.currentIndex];
                    params.cc = currentCc.cc;
                }
                return params;
            },
            convertData(data) { //车辆品牌排序数据
                const tempObj = {};
                let tempLetter = [];
                data.map((v, i) => {
                    if(v.initial != 'ZT') {
                        if(!tempObj.hasOwnProperty(v.initial)) {
                            tempObj[v.initial] = [];
                            tempLetter.push(v.initial);
                        }
                        tempObj[v.initial].push(v);
                    }
                });
                for(let v in tempObj) {
                    if(v == this.carBrandObj.currentLetter) {
                        this.carBrandObj.renderList = tempObj[v];
                        break;
                    }
                }
                this.carBrandObj.letterArr = tempLetter.sort();
            },
            onChangeLetter(item) { //切换字母
                if(this.carBrandObj.currentLetter == item) {
                    return false;
                }
                this.resetConfi();
                this.carBrandObj.currentLetter = item;
                this.getBrandList();
            },
            onSelectCarBrand(index) { //切换品牌
                if(this.carBrandObj.currentIndex == index) {
                    return false;
                }
                this.resetConfi(['line', 'cc', 'produceYear']);
                this.carBrandObj.currentIndex = index;
                this.getLineList();
            },
            onSelectCarLine(index){ //切换车系
                if(this.carLineObj.currentIndex == index) {
                    return false;
                }
                this.resetConfi(['cc', 'produceYear']);
                this.carLineObj.currentIndex = index;
                this.getCcList();
            },
            onSelectCarCc(index){ //切换排量
                if(this.carCcObj.currentIndex == index) {
                    return false;
                }
                this.resetConfi(['produceYear']);
                this.carCcObj.currentIndex = index;
                this.getProduceYearList();
            },
            onSelectCarProduceYear(index){ //切换年份
                if(this.carProduceYearObj.currentIndex == index) {
                    return false;
                }
                this.carProduceYearObj.currentIndex = index;
            },
            resetConfi(arr = ['brand', 'line', 'cc', 'produceYear']) { //重置配置信息 
                if(arr.indexOf('brand') > -1) {
                    this.carBrandObj.renderList = [
                        {
                            brandId: '',
                            brandName: '',
                            icoName: 'ad_ico',
                            initial: ''
                        }
                    ];
                    this.carBrandObj.currentIndex = 0;
                }
                if(arr.indexOf('line') > -1) {
                    this.carLineObj.renderList = [
                        {
                            lineId: '',
                            lineName: ''
                        }
                    ];
                    this.carLineObj.currentIndex = 0;
                }

                if(arr.indexOf('cc') > -1) {
                    this.carCcObj.renderList = [
                        {
                            cc: ''
                        }
                    ];
                    this.carCcObj.currentIndex = 0;
                }

                if(arr.indexOf('produceYear') > -1) {
                    this.carProduceYearObj.renderList = [
                        {
                            produceYear: ''
                        }
                    ];
                    this.carProduceYearObj.currentIndex = 0;
                }
            },
            onChangeUnit(unit) { //切换排量单位
                this.carCcObj.unit = unit;
            },
            onEnsureUnit() { //确定自定义排量
                if(this.carCcObj.definedUnit == '') {
                    this.dialog("请输入排量");
                    return false;
                } else {
                    this.selectCarInfo.car_cc = this.carCcObj.definedUnit + this.carCcObj.unit;
                    this.getProduceYearList();
                }
            },
            onDateChange(year) { //自定义生产年份
                this.selectCarInfo.car_produceYear = year;
            },
        },
        mounted(){
            this.getBrandList();
        }
    }
</script>
<style lang="stylus">
.selectCarModels
    font-size 28px
    .scroll-div
        margin-bottom 130px
        .title-div
            height 100px
            background #f7f7f7
            border-bottom 1px solid #d3d6db
            display flex
            align-items center
            padding 0 20px
            font-size 34px
        .carInfo-div
            padding 40px 40px 20px
            border-bottom 1px solid #d3d6db
            background #fff
            .sort-letter
                display flex
                flex-wrap wrap 
                border-bottom 1px solid #d3d6db
                padding-bottom 20px
                margin-bottom 40px
                span
                    margin 0 10px 10px 0;
                    padding 20px 40px
                    font-size 28px
                span.active
                    border-radius 10px
                    background #138be7
                    color #fff
            .sort-brand
                display flex
                align-items: center
                flex-wrap wrap 
                .group-div
                    display flex
                    justify-content center
                    align-items center
                    flex-direction column
                    margin 0 21px 30px
                    width 224px
                    height 120px
                    padding 0 10px
                    border 1px solid #d3d6db
                    border-radius 10px
                    text-align center
                    box-sizing border-box
                    &.active
                        border-color #138be7
                    img 
                        width auto
                        max-width 100%
                        height 55px
            .sort-input
                display flex
                align-items: center
                padding 20px 0
                line-height 80px
                input
                    width 300px
                    height 80px
                .unit
                    margin 0 100px 0 20px
                    display flex
                    span
                        width 80px
                        height 80px
                        border 1px solid #e5e5e5
                        text-align center
                        font-size 32px
                        &.active
                                color #fff
                                background #138be7
                        &:first-child
                                border-right 0px
                                border-top-left-radius 40px
                                border-bottom-left-radius 40px
                        &:last-child
                                border-top-right-radius 40px
                                border-bottom-right-radius 40px
                .error
                    color #e46969
                button
                    height 80px
                    background #138be7
                
</style>

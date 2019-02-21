<!-- 
* name: 比赛考核（实操评分）组件
* author: gxr
* time: 2018-8-3
-->
<template lang="pug">
    .speakingScore
        Header(title="实操评分", @goBack="goBack")
        .hd-div
            .group-name {{groupMembersInfo.groupName}}
            .student-name {{groupMembersInfo.stuName}}
        .bd-div
            .conts
                ul.list
                    li
                        .score-title 总分
                        <el-input :disabled="handleStatus != 1" placeholder="0" v-model.lazy="postData.totalScore"></el-input>
                        .score-unit 分
                    li(v-for="(item,index) of postData.partList" :key="index")
                        .score-title 第{{index + 1}}部分
                        <el-input :disabled="item.disabled" placeholder="0" v-model.lazy="item.partScore" maxlength="4" @blur="ruleNum(item)" @focus="item.error='', item.errorText=''"></el-input>
                        .score-unit 分
                        .del-btn(v-if="index > 0 && handleStatus == 1" @click="delPartList(index)")
                            i.el-icon-delete
                        .err(v-if="item.error") {{item.errorText}}
                .add-btn(v-if="handleStatus == 1" @click="onAddPart")
                    span.el-icon-plus.avatar-uploader-icon
        FixedButton(v-if="handleStatus == 1" buttonText="确定" @listenToChildEvent="onAddOperResult")
</template>
<script>
    export default {
        name: 'SpeakingScore',
        data () {
            return {
                groupMembersInfo: {
                    groupName: '',
                    stuName: ''
                },
                postData: {
                    matchId: '',
                    groupId: '',
                    stuId: '',
                    totalScore: '',
                    partList: [
                        {
                            partScore: '',
                            error: false,
                            errorText: '',
                            disabled: false
                        }
                    ]
                },
                handleStatus: false, //判断评分还是查看详情
            }
        },
        computed: {
            sumScore() {
                let sum = 0;
                this.postData.partList.map((v, i) => {
                    sum += Number(v.partScore);
                });
                return isNaN(sum) ? 0 : sum; 
            }
        },
        watch:{
            sumScore(val){ //先计算出总分，之后赋值绑定数据
                this.postData.totalScore = val;
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async onAddOperResult() {
                this.postData.partList.map((v, i) => { //如果没有填分数，提示用户
                    if(v.partScore == '') {
                        v.error = true;
                        v.errorText = '请输入分数';
                    }
                    return v;
                });
                const satues = this.postData.partList.every((v, i) => { //验证是否存在提示未填写的分数
                    return !v.error;
                });
                if(satues) {
                    const params = {};
                    params.groupId = this.postData.groupId;
                    params.stuId = this.postData.stuId;
                    params.totalScore = this.postData.totalScore;
                    params.partList = [];
                    this.postData.partList.map((v, i) => { 
                        const tempObj = {};
                        tempObj.partName = '第' + (i+1) + '部分';
                        tempObj.partScore = v.partScore;
                        tempObj.partSort = (i + 1).toString();
                        params.partList.push(tempObj);
                    });
                    const res = await this.$axios.addOperResult(params);
                    if(res.code == 1000) {
                        this.successMsg('评分成功', () => {
                            this.$router.push({
                                path: './AssessmentGame?groupId=' + this.$route.query.groupId
                            });
                        });
                    } else {
                        this.dialog(res.message);
                    }
                }
            },
            onAddPart() { //添加评分步骤
                let tempObj = {
                    partScore: '',
                    error: false,
                    errorText: '',
                    disabled: false
                };
                this.postData.partList.push(tempObj);
            },
            delPartList(index){
                this.postData.partList = this.postData.partList.filter(function (item, i) {
                        return index != i;
                });
            }, 
            ruleNum(item) { //验证分数是否是数字
                if(item.partScore == '') {
                    item.error = true;
                    item.errorText = '请输入分数!';
                } else if ( /[^\d.]/g.test(item.partScore) ) {
                    item.error = true;
                    item.errorText = '请输入正确的分数!';
                }
            },
            async getPracticalDetail() { //获取详情
                const params = {};
                params.matchId = this.postData.matchId;
                params.studentId = this.postData.stuId;
                const res = await this.$axios.getPracticalDetail(params);
                if(res.code == 1000) {
                    this.groupMembersInfo.groupName = res.data.groupName;
                    this.groupMembersInfo.stuName = res.data.userName;
                    this.convertData(res.data.partList);
                } else {
                    this.dialog(res.message);
                }
            },
            convertData(data) { //重新排序数据
                data.map((v, i) => {
                    let tempObj = {
                        partScore: v.partScore,
                        error: false,
                        errorText: '',
                        disabled: true
                    };
                    if(i == 0) {
                        this.postData.partList[i].partScore = v.partScore;
                        this.postData.partList[i].disabled = true;
                    } else {
                        this.postData.partList.push(tempObj);
                    }
                });
            },
        },
        mounted(){
            this.postData.matchId = this.$route.query.matchId;
            this.postData.groupId = this.$route.query.groupId;
            this.postData.stuId = this.$route.query.stuId;
            this.handleStatus = this.$route.query.satues;
            if(this.handleStatus == 1) {
                const groupMembersInfo = sessionStorage.getItem("groupMembersInfo");
                if(groupMembersInfo) {
                    this.groupMembersInfo = JSON.parse(groupMembersInfo);
                }
            } else {
                this.getPracticalDetail();
            }
        }
    }
</script>
<style lang="stylus">
.speakingScore
    .hd-div
        display flex
        justify-content space-between
        align-items center
        height 100px
        padding 0 30px
        font-size 30px
        border-bottom 1px solid #d3d6db
    .bd-div
        .conts
            width 70%
            margin 160px auto
        .list
            li
                position relative
                font-size 28px
                margin-bottom 80px
                .score-title
                    display flex
                    align-items center
                    justify-content center
                    position absolute
                    left 0
                    top 0
                    width 200px
                    height 100px
                    font-size 36px
                    font-weight 700
                    z-index 3
                .score-title:after
                        position absolute
                        right 0
                        top 0
                        display block
                        content ''
                        width 5px
                        height 50px
                        margin 25px 0
                        background #c2c5cd
                .el-input__inner
                    height 100px
                    line-height 100px
                    padding 0 100px 0 240px
                    font-size 30px
                .score-unit
                    position absolute
                    right 0
                    top 0
                    width 80px
                    height 100px
                    line-height 100px
                    text-align center
                    z-index 3
                .del-btn
                    position absolute
                    right -80px
                    top 0
                    font-size 50px
                    color #e46969
                    i
                        line-height 100px
                .err
                    margin 20px 20px 0
                    font-size 30px
                    color #e46969
        .add-btn
            width 100px
            height 100px
            line-height 100px
            text-align center
            border 1px solid #d3d6db
            border-radius 10px
            font-size 60px
            color #909399
    .fixed-footer
        z-index 10
</style>

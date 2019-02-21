<!-- 
* name: 综合查询（视频列表）组件
* author: gxr
* time: 2018-8-1
-->
<template lang="pug">
    .videoList
        Header(title="视频", @goBack="goBack")
        .group-div
            <el-input placeholder="视频关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="postData.videoName">
                <el-button slot="append" @click="onSearchHandle">搜索</el-button>
            </el-input>
        .sort-div
            <div class="sort-title">视频类别</div>
            <el-checkbox-group  v-model="postData.videoType" @change="onChangeSort">
                <el-checkbox v-for="(item,key) of videoTypeList" :label="item.videoType" :key="item.videoType">{{item.sortName}}</el-checkbox>
            </el-checkbox-group>
        .sort-div
            .sort-title 排序
            div.rank-box
                <span class="rank-item" v-for="(item,key) of sortTypeList" :key="item.sortType" :class="item.sortType==postData.sortType?'active': ''" @click="onChangeRank(item.sortType)"> {{item.rankName}}</span>
        .sortList-div(v-if="renderList.length > 0")
            <el-row>
                <el-col :span="6" v-for="(item,kye) of renderList" :key="item.videoId">
                    .item-div(@click="onLinkDetails(item.videoId,item.videoPic)")
                        .box-img
                            img(:src="imgUrl+item.videoPic") 
                        p.video-name {{item.videoName}}
                        p.num 
                            span {{item.playNum}}个播放量
                        p.num
                            span {{item.videoTime}}
                        p.price {{item.videoPrice>0? item.videoPrice+'元': '免费'}}
                </el-col>
            </el-row>
            <el-pagination class="page-div" @size-change="handleSizeChange" :total="total" v-if="total>postData.pageSize" @current-change="currentChange" :current-page.sync="postData.pageNo" :page-size="postData.pageSize" :page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        NotInfo(v-if="renderList.length == 0" notClass="暂无相关数据" defaultImg="static/img/not-data-default.png")
</template>
<script>
    import baseUrl from '@/apiconfig'
    export default {
        name: 'VideoList',
        data () {
            return {
                imgUrl: baseUrl.img_api+'cover/',
                videoTypeList: [ //类别
                    {
                        videoType: 0,
                        sortName: '软件使用'
                    },
                    {
                        videoType: 1,
                        sortName: '硬件使用'
                    },
                    {
                        videoType: 2,
                        sortName: '诊断及拆装'
                    },
                    {
                        videoType: 3,
                        sortName: '培训'
                    },
                    {
                        videoType: 4,
                        sortName: '项目营销'
                    }
                ],
                videoTypeList_pc: [ // pc登录视频类别
                    {
                        videoType: 0,
                        sortName: '软件使用'
                    },
                    {
                        videoType: 1,
                        sortName: '硬件使用'
                    }
                ],
                sortTypeList: [ //排序方式
                    {
                        sortType: 0,
                        rankName: '综合排序'
                    },
                    {
                        sortType: 1,
                        rankName: '最新发布'
                    },
                    {
                        sortType: 2,
                        rankName: '播放最多'
                    },
                ],
                postData: { //请求参数
                    videoName: '',
                    videoType: [],
                    sortType: '0',
                    pageNo: 1,
                    pageSize: 12,
                },
                pageSizes: [12, 24, 36, 48],
                renderList: [],
                total: null, // 总页数
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.push({
                    path:'Home'
                });
            },
            async getVideoList() { //获取数据
                const params = Object.assign({}, this.postData);
                params.videoType = params.videoType.toString();
                const res = await this.$axios.getVideoList(params);console.log(res)
                if(res.code == 1000) {
                    this.renderList = res.data.dataList;
                    this.total = res.data.total;
                } else {
                    this.renderList = [];
                }
            },
            // async getVideoDetail(videoId) {
            //     const paramsData = {};
            //     paramsData.videoId = videoId;
            //     paramsData.frontUrl = window.location.href.replace('VideoList','VideoDetails')+'?videoId='+videoId;
            //     const res = await this.$axios.getVideoDetail(paramsData);
            //     if(res.code == 1000) {
            //         console.log(res.data)
            //         this.$router.push({
            //             name: 'VideoDetails',
            //             params: {
            //                 renderObj: res.data,
            //                 payUrl: res.data.payUrl,
            //                 payStatus: res.data.payStatus  // 支付状态 0-待支付 1-支付成功
            //             }
            //         });
            //         if(this.iosFlag){
            //             console.log('这是ios设备')
            //             this.playering(res.data.videoUrl, res.data.playAuth);
            //         }else if(!this.iosFlag){
            //             console.log('这是安卓设备','vid='+res.data.videoUrl,'playAuth='+res.data.playAuth)
            //             android.orderlist('alPlayer',res.data.videoUrl,res.data.playAuth)
            //         }
            //     }else {
            //         this.dialog(res.message);
            //     }
            // },
            onSearchHandle() {
                this.postData.pageNo = 1;
                if(this.postData.videoName == '') {
                    this.dialog("请输入关键字");
                    return false;
                } else {
                    this.getVideoList();
                }
            },
            onLinkDetails(videoId,img){
                if(!this.hasQx('comm:video:detail')) {
                    this.dialog("您无权进行该操作");
                    return false;
                }
                this.$router.push({
                    path: './VideoDetails?videoId='+videoId,
                    query: {
                        imgUrl: this.imgUrl+img
                    }
                });
            },
            onChangeSort(){ //选择类别
                this.postData.pageNo = 1;
                this.getVideoList();
            },
            onChangeRank(rankId) { //选择排序
                this.postData.sortType = rankId;
                this.getVideoList();
            },
            handleSizeChange(val) {
                this.postData.pageNo = 1;
                this.postData.pageSize = val;
                this.getVideoList();
            },
            currentChange(currentPage) { //切换分页
                this.postData.pageNo = currentPage;
                this.getVideoList();
            },
            isLimit() {     // PC登录，限制部分视频列表      
                if (this.isDevice() === 'pc') {
                    this.videoTypeList = this.videoTypeList_pc
                } else {
                    return false;
                }
            }
        },
        mounted(){
            this.getVideoList();
            this.isLimit();
        }
    }
</script>
<style lang="stylus">
.videoList
    .el-select .el-input .el-input__inner 
        height 70px
        line-height 70px
    // .box-img
    //     padding-bottom 75%
    //     height 0
    //     width 100%
    //     img     
    //         height 100%
    .group-div
        padding 30px
        background #efefef
        input 
            width 100%
            height 90px
            font-size 35px
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
    .sort-div
        display flex
        align-items center
        padding 30px
        font-size 30px
        border-bottom 1px solid #d3d6db
        .sort-title
            width 120px
        .el-checkbox-group
            flex 1
            .el-checkbox
                font-size 30px
                margin-left 50px
                .el-checkbox__label
                    font-size 30px
                    padding-left 30px
                    color #303133
                .el-checkbox__inner
                    width 50px
                    height 50px
                .el-checkbox__inner::after
                        border-width 3px
                        height 32px
                        left 16px
                        width 13px
        .rank-box
            flex 1
            .rank-item
                margin 0 20px
                padding 15px 20px
                line-height 2
            .rank-item.active
                border-radius 10px
                background #138be7
                color #fff
    .sortList-div
        padding 40px
        .item-div
            margin 0 10px 40px
            font-size 35px
            img 
                display block
                width 100%
                height 180px
            .video-name
                padding 15px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            .num
                display flex
                justify-content space-between
                padding 5px
                font-size 24px
                color #909399
            .price
                color #67C23A
                padding 6px
    .page-div
        padding 30px
        text-align center
        font-weight normal
        li, button, span:not([class*=suffix])
            font-size 30px
            height 70px
            line-height 70px
        .btn-next .el-icon, .btn-prev .el-icon
            font-size 30px
        .btn-next, .btn-prev, .el-pager li
            min-width 60px
        .el-button:focus,el-button:hover 
          color #409EFF
          border-color #c6e2ff
          background-color transparent

    .noData
        margin-top 200px 
        padding 0 30px
        font-size 35px
        text-align center
        img 
            width 480px
            margin-bottom 20px
.el-message
    padding 30px
    .el-message__icon 
        display none
    .el-message__content
        font-size 35px

</style>
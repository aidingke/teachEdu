<!-- 
* name: 综合查询（维修案例详情）组件
* author: gxr
* time: 2018-8-1
-->
<template lang="pug">
    .maintenanceCaseDetails
        Header(:title="title", @goBack="goBack")
        .details-conts 
            .conts-div(v-for="(item, index) of renderList" :key="index") 
                .failurePhenomenon(v-if="item.list.length > 0")
                    p.hd-title {{item.title}}
                    .words_content
                        p(v-for="(v, k) of item.list" :key="k", v-if="v") {{v}}
            .pictureList.conts-div(v-if="renderPicList.length > 0")  
                p.hd-title 图片列表
                .picture_img 
                    p(v-for="(item, index) of renderPicList", :key="index")
                        img(:src="item")
        <div style="display: none;" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--share" title="Share"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        name: 'MaintenanceCaseDetails',
        data () {
            return {
                title: '',
                renderList: [ //故障问题
                    {
                        title: '',
                        list: []
                    }
                ],
                renderPicList: [], //故障图片
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getHelperRepairCaseDetail() {
                const params = {};
                params.token = localStorage.getItem('phpToken');
                params.id = this.$route.query.id;
                const res = await this.$axios.getHelperRepairCaseDetail(params);
                if(res.code == 20000) {
                    this.convertData(res.data);
                } else {
                    this.dialog(res.msg);
                }
            },
            convertData(data) { //处理数据
                this.title = data.title;
                this.renderPicList = data.case_pic || [];
                const tempArr = [];
                Object.keys(data).map((v, i) => {
                    if(v == 'title' || v == 'case_pic') {
                       
                    } else {
                        tempArr.push(data[v]);
                    }
                });
                tempArr.map((v, i) => {
                    let arr = v.split('<br>'); //用<br>分割字符串
                    const tempObj = {};
                    tempObj.title = arr[0];
                    tempObj.list = arr.slice(1).filter((val, k) => { //把文字里面的img标签以及空值过滤掉
                        return val.indexOf('<img') < 0 && val; 
                    });
                    this.renderList[i] = tempObj;
                });
            },
        },
        mounted(){
            this.getHelperRepairCaseDetail();
        },
    }
</script>
<style lang="stylus">
.maintenanceCaseDetails
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background #efefef
    .header 
        .title
            max-width 70%
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
    .details-conts 
        position fixed
        left 0
        right 0
        height 100%
        overflow-y auto
        -webkit-overflow-scrolling touch
        .conts-div 
            background #fff
            margin-bottom 25px
            &:last-child
                padding-bottom 200px
            .hd-title
                padding 30px
                font-size 36px
                border-bottom 1px solid #ccc
                font-weight bolder
            .words_content
                font-size 30px
                padding 30px 30px 0
                p
                    padding-bottom 30px
            .picture_img
                p
                    margin 30px 30px 0 30px
                    text-align center
                    img 
                        display inline-block
                        max-width 100%
</style>

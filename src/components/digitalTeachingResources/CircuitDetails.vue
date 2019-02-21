<!-- 
* name: 综合查询（电路图详情）组件
* author: gxr
* time: 2018-8-1
-->
<template lang="pug">
    .circuitDetails
        Header(title="电路图详情", @goBack="goBack")
        .conts
            p(v-for="(item, index) of renderList", :key="index")
                img(:src="item")
</template>
<script>
    export default {
        name: 'CircuitDetails',
        data () {
            return {
                renderList: [],
                circuitId: ''
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            async getCircuit(){ //获取数据
                const params = {};
                params.id = this.circuitId;
                const res = await this.$axios.getCircuit(params);
                if(res.error_code == 0) {
                    this.renderList = res.data.list;
                }
            },
        },
        mounted(){
            const circuitId = this.$route.query.id;
            if(circuitId) {
                this.circuitId = circuitId;
                this.getCircuit();
            } else {
                this.dialog('缺少线路图详情id');
            }
            this.$nextTick(function () {
                var items = [];
                this.renderList.map((v, i) => {
                    items.push({
                        src: v,
                        w: 2000,
                        h: 2000
                    });
                });
                var options = {
                    // history & focus options are disabled on CodePen
                    history: false,
                    focus: false,
                    pinchToClose: false,
                    showAnimationDuration: 0,
                    hideAnimationDuration: 0,
                    loop: false,
                    closeOnVerticalDrag: false,//设置往上拖动关闭
                };
                // var gallery = new PhotoSwipe();
                // gallery.init();
            });
        }
    }
</script>
<style lang="stylus">
.circuitDetails
    overflow hidden
    img 
        display block
        max-width 100%
</style>

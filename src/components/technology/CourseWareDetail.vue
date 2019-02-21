<!-- 
* name: 课件
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="CourseWareDetail">
        <!-- <Header @goBack="goBack"></Header>  -->
        <!-- <canvas id="the-canvas"></canvas> -->
        <!-- <embed :src="url" type="application/pdf" width="100%" height="1000px"> -->
        <!-- <iframe :src='url' width='100%' height='100%' frameborder='1'> </iframe> -->


    </div>
</template>
<script>
    export default {
        name: 'CourseWareDetail',
        data () {
            return {
                url:this.$route.query.url,
                pdfDoc: null,
                pageNum: 1,
                pageRendering: false,
                pageNumPending: null,
                scale: 0.9
            }
        },
        methods: {
            checkLocal () {
                let url = 'demo.pdf'
                window.open('/eduWeb/static/pdf/web/viewer.html?file=' + url)
            },
            showPDF(url){
                let _this = this
                PDFJS.getDocument(url).then(function (pdf) {
                    _this.pdfDoc = pdf
                    _this.renderPage(1)
                })
            },
            renderPage(num){
                this.pageRendering = true
                let _this = this
                this.pdfDoc.getPage(num).then(function (page) {
                    var viewport = page.getViewport(_this.scale)
                    let canvas = document.getElementById('the-canvas')
                    canvas.height = viewport.height
                    canvas.width = viewport.width
            
                    // Render PDF page into canvas context
                    var renderContext = {
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewport
                    }
                    var renderTask = page.render(renderContext)
            
                    // Wait for rendering to finish
                    renderTask.promise.then(function () {
                    _this.pageRendering = false
                    if (_this.pageNumPending !== null) {
                        // New page rendering is pending
                        this.renderPage(_this.pageNumPending)
                        _this.pageNumPending = null
                    }
                    })
                })
            },
            queueRenderPage(num){
                if (this.pageRendering) {
                    this.pageNumPending = num
                } else {
                    this.renderPage(num)
                }
            },
            onPrevPage(){
                if (this.pageNum <= 1) {
                    return
                }
                this.pageNum--
                this.queueRenderPage(this.pageNum)
            },
            onNextPage(){
                if (this.pageNum >= this.pdfDoc.numPages) {
                    return
                }
                this.pageNum++
                this.queueRenderPage(this.pageNum)
            },
            goBack(){
                this.$router.back(-1)
            }
        },
        mounted(){
            let url = this.getUrlParams().url;
            console.log(url)
            // debugger
            window.open('/eduWeb/static/pdf/web/viewer.html?file=' + url)
            this.showPdf()
        }
    }
</script>

<style scoped>
</style>


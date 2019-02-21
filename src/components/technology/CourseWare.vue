<!-- 
* name: 课件
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="CourseWare">
        <Header :title='headTitle' @goBack="goBack"></Header> 
        <div class="group-div">
            <el-input placeholder="老师名称" prefix-icon="el-icon-search"  class="input-with-select" v-model="filterInput">
                <el-button slot="append" @click="onsearchHandle">搜索</el-button>
            </el-input>
        </div>   
        <!-- 复选框 -->
        <div class="sort-div">
            <div class="sort-title">老师姓名 </div>
            <div style="height:70px;overflow: hidden;width:85%;" ref="showtag0">
                <el-checkbox-group  v-model="sortCheckList">
                    <el-checkbox v-for="(item,key) in teachersList" @change="searchObj(1)" :label="item.id" :key="key">{{item.teachName}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>   
        <div v-show="teachersList.length>6" class="headBox" @click="showAllSubject(0)" style="text-align: center;margin: 0 auto;overflow: hidden;">
            <div style="height:35px;line-height:35px;color:#bbb;font-size:16px;">查看更多...</div>
        </div> 
        <div class="sort-div">
            <div class="sort-title">科目</div>
            <div style="height:70px;overflow: hidden;width:85%;" ref="showtag1">
                <el-checkbox-group  v-model="checkedSubject">
                    <el-checkbox v-for="(item,key) in Subjects" @change="searchObj(1)" :label="item.id" :key="key">{{item.subjectName}}</el-checkbox>
                </el-checkbox-group>
            </div>
            
        </div>
        <div v-show="Subjects.length>6" class="headBox" @click="showAllSubject(1)" style="text-align: center;margin: 0 auto;overflow: hidden;">
            <div style="height:35px;line-height:35px;color:#bbb;font-size:16px;">查看更多...</div>
        </div>
        <div class="sortBox">
            <div class="headBox">
                <div style="float:right;margin-top: 10px;" @change="checisOwn">
                    <el-checkbox v-model="checIs">只看本人课件</el-checkbox>
                </div>
                <div class="tit">排序</div>
                <div class="BoxChoic">
                    <span :class="{'active':selectType==0}" @click="selectTypeFn(0)">综合排序</span>
                    <span :class="{'active':selectType==1}" @click="selectTypeFn(1)">最新发布</span>
                </div>
            </div>

            <div class="noInfo" v-if="resData.length<=0||total<=0">
                <div class="default">
                    <img src="static/img/not-add-default.png"/>
                    <div class="not-class">
                        暂无数据
                    </div>
                </div>
            </div>

            <div class="bodyBox">
                <ul class="el-row">
                    <li class="el-col el-col-6" v-for="(item,index) in resData" :key="index" style="position:relative;">
                        <!-- <a :href="courseware_api+item.courPdf"><div class="kejianBox"><img src="static/img/kj.jpg" /> </div> </a> -->
                        <!-- <a :href="'#/CourseWareDetail?url='+courseware_api+item.courPdf"><div class="kejianBox"><img src="static/img/kj.jpg" /> </div> </a>-->
                        
                        <span v-if="checIs" style="position:absolute;top:0;right:0;" @click="delCourWare(item.teachId,item.courWareId)">
                            <!-- 删除图片 -->
                            <img src="static/img/kedele.png" style="width:50px;"/>
                        </span>

                        <a href="javascript:void(0);" @click="openPDF(item.courPdf)"><div class="kejianBox"><img src="static/img/kj.jpg" /> </div> </a>
                        <h5> {{item.courWareName}}</h5>
                        <p><i>{{item.courWareTime}}</i></p>
                        <p><span>{{item.teachName}}</span> </p>
                    </li>
                </ul>
                <!-- v-if="total>12" 去掉-->
                <el-pagination class="page-div" :total="total" :page-size="12" v-if="total>0" @current-change="currentChange" :current-page.sync="pageNo" background layout="prev, pager, next"></el-pagination>
            </div>
        </div>

        <template v-if="status===0">
            <section class="uploadBtn" @click="funShowUpload" v-if="hasQx('teach:courseWare:upload')">
                <div class="prel">
                    <div class="upBox">
                        <p>+</p>
                        <a href="javascript:" class="itemBtn" style="display: inline-block;">上传课件</a>
                    </div>
                </div>   
            </section>   
            <el-dialog title="上传课件" :visible.sync="showUpload">
                <el-form :model="form" ref="upload" method="post" enctype="multipart/form-data">
                    <el-form-item label="课件名称">
                        <el-input v-model="form.courWareName" maxlength=20 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入内容最多20个字" >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属科目">
                        <el-select v-model="form.SubjectsValue" placeholder="请选择科目" @change="getSubjectIdFun">
                            <el-option v-for="item in form.list" :key="item.id" :label="item.subjectName" :value="item.id"> {{item.subjectName}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传课件">
                        *请上传PPT、PDF、pptx文件，大小限制在10M内
                        <el-upload ref="uploadFile" :on-exceed="handleExceed" :headers="headers" @click="upFiless" class="avatar-uploader" :action="form.action" :on-progress="handlePreview" :on-remove="handleRemove" :show-file-list="true" :limit="1" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="courWareFile" :data="{subjectId:form.subjectId,courWareName:form.courWareName}" :auto-upload="false">
                            <img style="width:60%" v-if="imageUrl" :src="imageUrl" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- //- <input type="file" @change="getFile($event)" name="file"> -->
                        <el-button  @click="showUpload = false" style="width:45%" class="el-button-def">取 消</el-button>
                        <el-button type="primary" @click="submitUpload" style="width:45%">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </template>
    </div>

</template>
<script>
import { dialog } from '@/common/dialog'   //警告提示
import baseUrl from '@/apiconfig'
    export default {
        name: 'CourseWare',
        data () {
            return {
                filterInput:            '',
                headTitle:              '',
                teachId:                '',
                subjectId:              '',
                checIs:                 false,
                noInfo:                 '暂无数据',
                status:                 1, //为0的时候是教师版  
                pageNo:                 1,//默认页码为1
                selectType:             0,//排序方式0综合，1最新
                total:                  0, // 总页数
                allNum:                 '',
                searchNum:              '',
                checkAll:               false,  
                fileList: 				[],                                  
                teachersList:           [],
                sortCheckList:          [],//选择的老师     
                imageUrl:               '',    
                // imageUrl:               baseUrl.webSize+'static/img/kj.jpg',    
                checkedSubject:         [],                                         
                Subjects:               [], //科目列表
                targi0:                  0,
                targi1:                  0,
                isIndeterminate:        true,
                accessToken:            '',
                previewUrl:             '',
                courseware_api:         baseUrl.img_api,//课件路径   
                form: {
                    action:baseUrl.uploading_courseware+'/edu/teach/courseWare/upload',//上传课件
                    token:'',
                    subjectId:'',
                    courWareName: '',
                    list: []
                },
                getKejianItems:           {},
                //综合排序接口数据
                resData :[
                    {
                        // "tit": "汽车空调的运行原理以及空调结构解析",
                        // "author": "1张敬涛",
                        // "time": "2018-05-15"
                    }
                ],
                showUpload:             false,
                iosFlag:                true
            }
        },
        computed:{
            headers() {
                return {
                    'accessToken': this.accessToken
                }
            }
        },
        methods: {
            onsearchHandle(){
                // this.pageNo=1
                //获取试题列表
                this.searchObj(1)
            },
            verPhone(){

            },
            goBack(){
                this.$router.push({
                    path:'/TrainExamIndex'
                })
                sessionStorage.setItem("tabValueCW", '')
                this.iosFlag = this.isIos();
                window.android = android;
                try {
                    if(!this.iosFlag){
                        android.orderlist("Files","practiceExit");
                    } 
                }catch(e){
                    // console.log(e,'e');
                    console.log('android.orderlist("Files",true)')
                }
            },
            handleExceed(files, fileList) {
                this.dialog(`最多只能上传 1 个文件`);
            },
            funShowUpload(){
                this.showUpload = true
                this.form.courWareName = ''
                this.form.SubjectsValue = ''
            },
            showAllSubject(x){
                console.log(this)
                if(x==0){
                    if(this.targi0==0){
                        this.targi0++
                        event.target.innerHTML = '收起更多'
                        this.$refs.showtag0.style.height= "auto"
                        
                    }else{
                        event.target.innerHTML = '查看更多...'
                        this.$refs.showtag0.style.height= "70px"
                        this.targi0--
                    }
                }else if(x==1){
                    if(this.targi1==0){
                        this.targi1++
                        event.target.innerHTML = '收起更多'
                        this.$refs.showtag1.style.height= "auto"
                        
                    }else{
                        event.target.innerHTML = '查看更多...'
                        this.$refs.showtag1.style.height= "70px"
                        this.targi1--
                    }
                }
            },
            upFiless(){
                // event.target.style.display="none"
                console.log(event.target)
            },
            //获取科目分类
            getSubjectIdFun(v){
                this.form.subjectId = v
            },
            openPDF(courPdf){
                if(this.iosFlag){
                    const pdfUrl = this.courseware_api+courPdf
                    window.location.href = pdfUrl
                }else{
                    const pdfUrl = this.courseware_api+courPdf;
                    try{
                        android.orderlist('openPDF',pdfUrl)
                    }catch(e){
                        console.log(e)
                    }
                    window.location.href = pdfUrl
                }
            },
            async delCourWare(t,c){
                // teachId 是	string	老师id
                // courWareId	是	string	课件id 
                let params={
                    teachId:t.toString(),
                    courWareId:c.toString()
                }
                const res = await this.$axios.delCourWare(params)
                if(res.code===1000){
                    this.successMsg('删除课件成功!')
                    //调用分页
                    this.searchObj(1,1)
                }else{
                    this.dialog('删除出错了！请联系管理员')
                }
            },
            //复选框搜索,如果参数是1 就是说从第一页索引，否则不是,y是本人1
            async searchObj(x,y){
                let teaId = '',subId=''
                this.sortCheckList.forEach((v,i) => {
                  teaId += v+','  
                })
                this.checkedSubject.forEach((v,i) => {
                  subId += v+','  
                })
                // teaId.substring(0,teaId.length-1)  //老师ID
                // subId.substring(0,subId.length-1)  //科目ID

                let params = {
                    teachName:this.filterInput,
                    teachId:teaId.substring(0,teaId.length-1),
                    subjectId:subId.substring(0,subId.length-1),
                    sortType:this.selectType,
                    pageNo: this.pageNo,
                    pageSize: 12
                }

                if(y){
                    params.isOwn = y
                }

                if(this.checIs){
                    params.isOwn=1
                }else{
                    params.isOwn=0
                }
                //切换条件的时候从1页开始
                if(x==1){
                    params.pageNo=1
                    this.pageNo=1
                }
                // params.teachId = teaId.substring(0,teaId.length-1)
                // params.subjectId = subId.substring(0,subId.length-1)
                const res = await this.$axios.getCourseWareList(params)
                // return false
                if(res.code===1000){
                    this.resData = res.data.dataList
                    this.total = res.data.total

                    // if(res.data.total>12){
                    //     this.total = res.data.total-3
                    // }else{
                    //     this.total = res.data.total
                    // }
                    if(this.resData.length<=0){
                        this.pageNo=1
                    }
                }
            },
            currentChange(val) { //切换分页
                // console.log(val);
                // if(val===1){
                //     //改变分页样式
                //     let x = document.getElementsByClassName('page-div')[0].children[1]  //UL
                //     x.getElementsByClassName('active')[0].classList.remove('active')
                //     x.children[0].classList.add("active")
                // }
                // if(val>1){
                //     //改变分页样式
                //     let x = document.getElementsByClassName('page-div')[0].children[1]  //UL
                //     x.firstChild.classList.remove('active')
                // }

                //课件接口，第一参数排序，第二是页码123...
                // this.getCourseWareList(this.selectType,val)
                //搜索,如果参数是1 就是说从第一页索引，否则不是,y是本人1
                this.pageNo = val
                if(this.checIs){
                    this.searchObj(val,1)
                }else{
                    this.searchObj(0)
                }
                
                
            },
            handleAvatarSuccess(res, file) {
                if(res.code===1000){
                    // this.successMsg('课件上传成功了')
                    this.$message.success('课件上传成功了')
                    this.selectType = 1
                    this.form.courWareName = ''
                    this.form.SubjectsValue = ''
                    //刷新课件列表
                    this.getCourseWareList(0,1)
                    this.$refs.uploadFile.clearFiles()
                    this.showUpload = false
                    // this.fileList.push(this.img_api + res.data.imgName);
                    return false
                }else if(res.code===100){
                    this.dialog(res.message)
                    // this.$message.error('课件没有上传成功！！')
                    this.$router.push({path:"/Login"})  
                    return false
                }else if(res.code===1100){
                    // this.$message.error('课件没有上传成功！！')
                    this.$refs.uploadFile.clearFiles()
                    this.dialog(res.message)
                }else{
                    this.dialog('课件没有上传成功！')
                }
		    },
	        beforeAvatarUpload(file) {
                if(file==undefined){
                    // this.$message.error('请上传PPT、PDF文件')
                    this.dialog('请上传PPT、PDF文件')
                    return false;
                }else{
                    let fileName = file.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
                    let fileNameLength = file.name.length;//取到文件名长度
                    let fileFormat = file.name.substring(fileName + 1, fileNameLength);//截

                    var this_ = this
                    var reader = null;
                    const isLt = file.size / 1024 / 1024 <= 10;
                    if (!isLt) {
                        // this.$message.error('上传文件大小不能超过 10MB!');
                        this.dialog('上传文件大小不能超过10M')
                        this.filess ='';
                        return false
                    }

                    if(fileFormat.toLowerCase()==='pdf'||fileFormat.toLowerCase()==='ppt'||fileFormat.toLowerCase()==='pptx')
                    {
  

                    }else{
                        // this.$message.error('请上传PPT、PDF文件');
                        this.dialog('请上传PPT、pptx、PDF文件')
                        this.filess ='';
                        return false;
                    }
                }
	        },
            handleRemove(file, fileList) {
            },
            handlePreview(event, file, fileList) {
                // console.log(event)
            },
            filterBy(resData,value){
                if(value.length===0){
                    this.total = this.allNum
                    
                    return this.resData
                }else{
                    resData = resData.filter(function(info){
                        if(info.teachName.match(value)){
                            return info.teachName.match(value);
                        }
                    })
                    this.total = resData.length
                    return resData
                }
                // this.total=resData.length 
                // console.log(this.total)
            },
            selectTypeFn(type){ //实现切换TAB
                this.selectType = type
                sessionStorage.setItem("tabValueCW", this.selectType)
                //调用分页第一页
                this.currentChange(1)
            },
            getFile(event) {

            },
            async submitUpload() {
                this.filess = document.querySelector('input[type=file]').files[0]

                if(this.form.courWareName.length<1||this.form.courWareName.length>21){
                    this.dialog('请输入内容，最多20个字')
                    return false
                }
                if(this.form.subjectId==''){
                    this.dialog('请选择科目')
                    return false
                }
                //判断是不是PDF文件的方法
                this.beforeAvatarUpload(this.filess)
                this.$refs.uploadFile.submit()

                this.fileList = []
                return false

                let params = {
                    accessToken: this.form.token,
                    courWareName: this.form.courWareName,
                    subjectId:this.form.SubjectsValue,
                    file:this.filess
                }
                
                const res = await this.$axios.addCourWare(params)
            },
            //获取科目列表
            async getSubject() {
                let params = {
                    pageNo: 1,
                    pageSize: 100
                }
                const res = await this.$axios.getSubjectList(params);
                if(res.code===1000){
                    this.form.list = res.data
                    // console.log(this.form.list)
                    this.Subjects = res.data
                }
            },
            // 获取老师列表
            async getTeachList(){
                const res = await this.$axios.getTeachList()
                if(res.code===1000){
                    this.teachersList=res.data
                }
            },
            checisOwn(){
                // let isOwn = 1
                let sortType = this.selectType
                this.pageNo=1
                if(this.checIs){
                    
                    this.getCourseWareList(sortType,1,1)
                }else{
                    this.getCourseWareList(sortType,1,0)
                }
            },
            //获取课件列表
            async getCourseWareList(x,y,z) {
                let params = {
                    pageNo: '',
                    sortType:'',
                    pageSize: 12
                };
                params.sortType=x,params.pageNo=y
                if(z){
                    params.isOwn=z        
                }
                const res = await this.$axios.getCourseWareList(params);
                if(res.code===1000){
                    this.resData = res.data.dataList
                    this.total = res.data.total

                }
            }
        },
        mounted(){
            this.selectType = sessionStorage.getItem("tabValueCW") || 1; //用于标识切换
            this.iosFlag = this.isIos();
            
            try {
                if(!this.iosFlag){
                    android.orderlist("Files",'practice');
                } 
            }catch(e){
                // console.log(e,'e');
                console.log('android.orderlist("Files",true)')
            }
            
            // 先获取老师列表
            this.getTeachList();
            //先获取科目列表
            this.getSubject();
            //获取课件,参数排序（0、1），页码第一页
            this.getCourseWareList(this.selectType,1);
            //获取token
            if(localStorage.getItem("userType") == 0) { //老师 
                this.status = 0;
                this.headTitle ='老师课件';
                this.form.token = localStorage.getItem("accessToken");
                if(this.form.token===null){
                    this.$router.push({path:"/Login"});
                }
            }else{
                this.headTitle ='老师课件';
                this.status = 1;
                this.form.token = ''
            }
            this.accessToken = localStorage.getItem('accessToken');
        }
    }
</script>
<style lang="stylus">
.CourseWare        
    .group-div
        padding 30px
        background #efefef
        input 
            width 100%
            height 90px
            font-size 35px
            text-indent 65px
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
        padding 30px 0 0 0
        font-size 30px
        border-bottom 2px solid #d3d6db
        .sort-title
            width 17%
            text-align center
        .el-checkbox-group
            flex 1
            .el-checkbox
                font-size 30px
                margin-left 50px
                margin-bottom 15px
                // width 250px
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

    .sortBox
        clear both
        overflow hidden
        .headBox
            border-bottom 1px solid #ccc
            .tit
                display inline-block
                width 17%
                height 100px
                line-height 100px
                text-align center
                float left
                font-size 30px
            .BoxChoic
                display inline-block
                height 100px
                line-height 100px
                margin-left 50px
                span 
                    width 165px
                    height 65px
                    line-height 65px
                    text-align center
                    font-size 30px
                    color #555
                    display inline-block
                span.active
                    background  #138BE7
                    color #fff
                    border-radius 10px 
        .noInfo		
            overflow hidden
            margin-top 1.5%
            .default
                width 100%
                padding 8% 0
                img
                    width: 30%;
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                .not-class
                    font-size 40px
                    text-align center
                    color #9b9b9b
                    margin 30px 0 0 0
                .add-text
                    font-size 20px
                    text-align center
                    color #a5a5a5
                    margin 30px 0 50px 0
                .el-button
                    width 100%
                    padding 30px 20px
                    font-size 30px              
        .bodyBox
            clear both
            padding 30px
            overflow hidden     
            li
                padding 0 0px 40px 10px
               .kejianBox
                    background #e7f3fc
                    text-align center
                    padding 8%
                    img 
                        width 100%
                        margin-top 8%
                h5
                    color #666
                    font-size 12px
                    padding 10px 0 10px 0
                    width 93%
                    height 45px
                    font-weight 300
                    font-size 28px
                    line-height 45px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                p
                    margin-top 10px
                    clear both
                    height 50px
                    overflow hidden
                    span
                        color #67C23A
                        font-size 30px
                        font-weight 900
                    i 
                        font-style normal
                        font-size 24px
                        color #999
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
    .uploadBtn
        position fixed
        right  2%
        bottom  2%
        font-size  26px
        z-index 500
        border-radius  150px
        .prel
            position relative
            width  170px
            height  170px
            color  #fff
            background  #148ce8
            z-index  500
            border-radius  150px
            border: 12px solid #BCDEF8;
            // box-shadow 1px 2px 25px #148ce8
            .upBox
                width  150px
                height  150px
                // background #148ce8
                border-radius 50px
                position absolute
                top 50%
                left 50%
                margin -43% 0 0 -45%
                text-align  center
                p
                    text-align center
                    font-size 80px
                    line-height 97%
                .itemBtn
                    color #fff
                    text-decoration none
                    font-size 28px
    .el-dialog__wrapper
        .el-dialog
            width 80%
        .el-dialog__close
            font-size 60px
        .el-dialog__header
            text-align center
            padding-top 50px
            .el-dialog__title
                font-size 40px
                font-weight 900
        .el-dialog__body
            padding 30px 60px
            .el-textarea__inner
            .el-form-item__label
                font-size 32px
                margin-bottom 20px
                display: block
                float: none
                text-align: left
            .el-input__inner
                height 70px
                width 100%
            .el-select
                width 100%
            .addTip 
                font-size 15px
                color #ccc
            .el-upload 
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
        .el-button--primary,.el-button-def
            width 90%
            height 90px
            display inline
            border-radius 15px
            margin 20px 0 30px 0        
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
				.avatar-uploader-icon {
				    font-size: 28px;
				    color: #8c939d;
				    width: 178px;
				    height: 178px;
				    line-height: 178px;
				    text-align: center;
				}              
    .el-select-dropdown 
        .el-select-dropdown__item
            height 60px   
            line-height 60px         
</style>


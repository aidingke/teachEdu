<!-- 
* name: 教师版技术培训
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="TeachTraining">
		<div>
			<!-- 导航 --> 
			<Header title='技术培训' @goBack="goBack"></Header>    
			<!-- 导航 -->
			<tabNav :tabNavArr="NavArr" @tabChange="updateTabValue($event)" :tabVal="tabValue"></tabNav>
		</div>

		<!-- 报名培训 -->
		<div class="passBox box" v-if="resData && resData.length>0 && show">
			<div class="selectBox" @click="goDetail(item.trainId,item.trainStuNum)" v-for="(item,index) in resData" :key="index">
				<div class="passBox">
					<h3 class="head">{{item.trainName}}</h3>
					<p class="comCol">{{item.trainTime}}</p>
					<p class="ctit">{{item.trainDesc}}</p>
					<div class="kaoshiScore">
						<span class="default">
							{{item.trainStuNum}}
							<p>报名人数</p>
						</span>
					</div>
				</div>
			</div>
		</div>
        <NotInfo v-if="resData.length === 0 && !show" notClass="暂无技术培训列表信息" defaultImg="static/img/not-data-default.png"></NotInfo>

		<el-dialog title="新增培训" :visible.sync="showAdd">
            <el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="培训时间" required>
					<el-row>
						<el-col :span="11">
							<el-form-item prop="startTime">
								<el-date-picker :span="11"
							v-model="form.startTime"
							type="date"
							placeholder="选择日期" style="border: 1px solid #dcdfe6;border-radius: 4px;" focus="blur()">
						</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">至</el-col>
						<el-col :span="11">
							<el-form-item prop="endTime">
								<el-date-picker :span="11"
							v-model="form.endTime"
							type="date"
							placeholder="选择日期" style="border: 1px solid #dcdfe6;border-radius: 4px;" focus="blur()">
						</el-date-picker>	
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>

				<el-form-item label="主题" prop="trainName">
                    <el-input v-model="form.trainName" maxlength=36 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入主题，最多36个字" >
                    </el-input>
                </el-form-item>

				<el-form-item label="上传图片" prop="trainImg" >
		    		<p class="addTip">*请上传图片，大小限制在3M以内</p>
					<el-upload ref="uploadFile" class="avatar-uploader" :headers="headers"
					:multiple="true" :action="action" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
					:show-file-list="true" :on-success="handleAvatarSuccess" list-type="picture-card"
					:before-upload="beforeAvatarUpload" name="imgFile" :data="{imgType:4}" >
					<i class="el-icon-plus"></i>
					</el-upload>
                </el-form-item>
				<el-form-item label="描述" prop="trainDesc">
                    <el-input v-model="form.trainDesc" maxlength=36 type="textarea" :autosize="{ minRows: 3, maxRows: 16}"  placeholder="请输入描述，最多36个字" >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="validate('form')">确 定</el-button>
				<el-button @click="showAdd = false">取 消</el-button>
            </div>
        </el-dialog>
		<!-- 上传培训 -->
		<section class="uploadBtn" @click="openAddInfo" v-if="hasQx('teach:train:add')">
            <div class="prel">
                <div class="upBox">
                    <p>+</p>
                    <a href="javascript:" class="itemBtn" style="display: inline-block;">新增培训</a>
                </div>
            </div>   
        </section> 
	</div>
</template>

<script>
import tabNav from '@/common/tabNav'
export default {
	name: 'TeachTraining',
	components:{
		"tabNav":tabNav
	},
    data(){
        return {
			tabValue: 				Number(sessionStorage.getItem("teachTabNavType")) || 1, //切换tab标签
			NavArr:  ["进行中","历史培训"],
			nameNumber:             6, //如果是数字6就展示 培训菜单，即进行中、历史培训 
            showAdd:             	false, 
            userType:               '0',
			action: '/edu/teach/uploadImg',
			form: {
				startTime: '',    // 培训开始时间
				endTime: '',     // 培训结束时间
				trainName:'',   // 培训名称
				trainDesc:'',  // 培训描述
				trainImg: ''
			},
			accessToken:localStorage.getItem("accessToken"),
			rules: { 
				startTime: [
					{ required: true, message: '请输入培训开始时间', trigger: 'blur' },
				],
				endTime: [
					{ required: true, message: '请输入培训结束时间', trigger: 'blur' },
				],
				trainName: [
					{ required: true, message: '请输入培训名称', trigger: 'blur' },
				],
				trainDesc: [
					{ required: true, message: '请输入培训描述', trigger: 'blur' },
				],
				trainImg: [
					{ required: true, message: '请上传图片', trigger: 'blur' },
				]
			},
			resData: [],
			fileImgUrl: "",// 图片实时预览路径
			dialogVisible: false,
			params: {
				pageNo    : 1,
                pageSize  : 10
			},
			show: true		
        }
	},
	methods:{
		goBack(){
			// 返回
			this.$router.push({
				name: 'TrainExamIndex'
			});
			window.sessionStorage.removeItem("teachTabNavType");
		},
		//跳转到详情页
		goDetail(id,trainStuNum){
			if(this.hasQx('comm:train:detail')){
				this.$router.push({
					path:'TrainingDetail',
					query:{
						trainId: id,
						trainStuNum: trainStuNum,
						isStudent: false, // 是否是学生版
						isTeacher: true
					}
				})
			}else{
				this.dialog('您无权进行该操作');
			}
		},
		openAddInfo(){
			this.showAdd = true
		},
		beforeAvatarUpload(file) {
			if(this.hasQx('teach:uploadImg')){
				const isFormat= file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isFormat) {
					this.$message.error('请上传正确的图片格式!');
				}
				if (!isLt2M) {
					this.$message.error('图片不能大于3M!');
				}
				return isFormat && isLt2M;
			}else{
				this.dialog('您无权进行该操作');
			}
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
			// 删除图片
			let arr = this.form.trainImg.split(',');
			this.form.trainImg = arr.filter((item,index)=>{
				return item !== file.response.data.imgName;
			}).join(',');
      	},
		handlePictureCardPreview(file) {
			// 图片预览
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleAvatarSuccess(res, file) {
			// 图片上传成功保存后台返回的图片名称
			if(res.code===1000){
				this.$message.success('上传图片成功')
				if(this.form.trainImg===""){
					this.form.trainImg = res.data.imgName;
				}else{
					this.form.trainImg += ","+res.data.imgName;
				}
			}else{
				this.$message.error('上传图片失败！！');return false;
			}
		},
		updateTabValue(type) { //切换考试状态
			this.tabValue = type;
			window.sessionStorage.setItem("teachTabNavType", type);
			this.getList();
		},
		validate(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.TeachTrainAdd();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		async TeachTrainAdd() { //切换考试状态
			this.form.startTime = this.dayjs(this.form.startTime).format('YYYY-MM-DD');
			this.form.endTime = this.dayjs(this.form.endTime).format('YYYY-MM-DD');
			const res = await this.$axios.TeachTrainAdd(this.form);
			if(res.code===1000){
				this.successMsg("新增培训成功");
				this.showAdd = false;
				this.getList();
			}else{
				this.dialog(res.message)
			}
		},
		async getList(){ //切换考试状态
            if(this.tabValue===1){
                this.params.trainType = '0'  // 进行中
            }else{
				this.params.trainType = '1'  //0-历史
            }
			 const res = await this.$axios.getTeachTrainList(this.params);
			 this.resData = [];
			 if(res.code===1000){
				if(res.data.length>0){
					this.show = true;
				}else{
					this.show = false;
				}
				 this.resData = res.data;
			 }else{
				 this.show = false;
				 if(res.code===1100){ // 暂无数据，不弹窗
					return ;
				}else{
					this.dialog(res.message);
				}
			 }
        },
	},
    mounted(){
        this.userType = localStorage.getItem('userType');
        this.getList();
	},
	computed:{
		headers() {
			return {
				'accessToken': localStorage.getItem("accessToken")
			}
		}
	},
}
</script>


<style lang="stylus">
	.TeachTraining
		background :#eee;
		.el-date-editor.el-input, .el-date-editor.el-input__inner
			width 100% !important;
		.line
			text-align center;
		.box
			// position: absolute;
			// top: 189px;
			// left: 0;
			// width: 100%;
			// overflow: auto;
			margin-top 30px
			height 100%
			margin-bottom 300px
		.selectBox
			margin-bottom 30px;
			background #fff;
			border-bottom 1px solid #ddd;/*no*/
			padding 0 30px 0 30px;
			.passBox
				position relative
				padding 0 0 30px 0
				font-size 35px
				.head
					padding-top 25px
					color #555
				p
					font-size 30px	
				.comCol
					color #E7A544	
					margin-top 30px	
				.ctit
					color #888
				.kaoshiBtn
					position absolute
					right 2%
					bottom 15%
					.default
						background: #fff;
						border: 2px solid #ccc;
						padding: 30px 40px;
						border-radius: 50px;
				.kaoshiScore
					position absolute
					right 2%
					bottom 15%
					text-align center
					.default
						font-size 60px
						font-weight 900
						color #000
						p
							font-size 30px
							font-weight 300
							color #999
						i
							font-style: normal;
							font-size: 20px;
							font-weight: 300;
		.uploadBtn
			position fixed
			right  2%
			bottom  2%
			font-size  14px
			z-index 500
			border-radius  150px
			.prel
				position relative
				width  150px
				height  150px
				color  #fff
				background  #148ce8
				z-index  500
				border-radius  150px
				border: 12px solid #BCDEF8;
				.upBox
					width  150px
					height  150px
					border-radius 50px
					position absolute
					top 50%
					left 50%
					margin -50% 0 0 -50%
					text-align  center
					p
						text-align center
						font-size 60px
					.itemBtn
						color #fff
						text-decoration none	
		.el-dialog__wrapper
			.el-upload 
				border: 1px dashed #d9d9d9
				border-radius: 6px
				cursor: pointer
				position: relative
				overflow: hidden
				.avatar-uploader-icon
					font-size: 28px
					color: #8c939d
					width: 178px
					height: 178px
					line-height: 178px
					text-align: center
			.el-button--primary,.el-button--default
				width 47%
				height 90px
				display inline-block
				border-radius 10px
				margin 20px 0 30px 0  
				span	
					font-size 32px		
			.el-dialog
				width 65%
			.el-dialog__header
				text-align center
				padding-top 50px
				.el-dialog__title
					font-size 40px
					font-weight 900
			.el-dialog__body
				padding 30px 60px
				.el-form-item__label
					font-size 32px
					margin-bottom 20px
					display: block
					float: none
					text-align: left
				.el-input__inner
					height 70px
					width 100%	
					border none	
					input 
						height 60px
						line-height 60px
						width 86%
						margin-left 15px
						color #666
						border 1px solid #ccc
						// border-radius 15px 0 0 15px
						padding-left: 15px
					.el-dialog__headerbtn
						position static	
						line-height 60px
						height 60px
						border 1px solid #ccc
					.closeBtn
						position absolute
						font-size 50px	
						height: 82%
						right 3%
						border-left 1px solid #ccc
						padding-top 1%
						width: 7%							

</style>
<!-- 
* name: 论述题库
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="Discussion">
		<!-- 导航 -->
        <Header title='论述题'></Header>
		<div @click="goBackInfo" style="width: 50px;height: 50px;position:relative;margin-top:-50px;">
		<!-- 做组件返回处理 -->
		</div>
		<div class="headBox">
			<h3><span class="addTi" @click="openAddInfo" v-if="hasQx('teach:quest:addKind')">+</span>每道论述题分数为<input v-model="scores" v-on:keyup="scoreFun" @keyup=keyUpFun />分</h3>
		</div>
		<div class="group-div">
            <el-input placeholder="题目关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="filterInput">
                <el-button slot="append" @click="onsearchHandle" >搜索</el-button>
            </el-input>
		</div>	
		<div class="selectBox">
			<div class="contentBox">
				<h3 style="border-bottom: 1px solid #ddd;"> 
					<el-checkbox checked :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选({{checkVal}}/{{allVal}})</el-checkbox>
				</h3>
				<div class="noInfo" v-if="tagTotal<=0">
					<div class="default">
						<img src="static/img/not-add-default.png" alt="" />
						<div class="not-class">
							暂无相关信息
						</div>
					</div>
				</div>

				<div class="timuBox" v-for="(item,index) in filterBy(resData,filterInput)" :key="index">
					<div class="timu" >
						<el-checkbox-group v-model="item.checkedSingles" @change="handleCheckedSingleChange">
							<h4>
								<el-checkbox :checked="item.checkedSingles" style="display: inline-block;">{{index+1}}、{{item.qcDesc}}</el-checkbox>
								<template v-if="item.isOwn==1">
									<span style="float:right;" @click="deleAnswers(index,item.questId)"><img src="static/img/dele.png" /></span>
									<span style="float:right;" @click="editAnswers(index)"><img src="static/img/edit.png" /></span>
								</template>
								<span style="float:right;color:#bbb;margin-right:1%">{{scores}}分</span>
							</h4>
						</el-checkbox-group>

						<div class="contAnswers">
							<div>
								<span  v-for="(v,i) in item.arr" :key="i" style="vertical-align: top;display: inline-block;margin-right:1%">
									<!-- <img @click="showImages" :preview="index" preview-text="" :src="img_api+v.questImg" style="width:100px"/> -->
									<img @click="showImages" :src="img_api+v.questImg" style="width:100px"/>
								</span>
							</div>
							<p style="font-size:14px"><span style="color:#000">答案：</span>{{item.answersl}}</p>
						</div>
					</div>
				</div>	
			</div>
		</div>

		<div class="selectBox">
			<el-row style="position: fixed;bottom: 0;width: 100%;z-index: 999;background: #fff;">
				<el-button type="primary" @click="submitInfo">提交</el-button>
			</el-row>	
		</div>

		<el-dialog
			title="查看图片"
			:visible.sync="imgDialogVisible"
			width="80%"
			center> -->
			<span>查看图片</span>
			<div id="imgDialogVisible">
				<img :src="targetImg" preview="0" preview-text="描述文字" style="width:100%"/>	
			</div>
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="imgDialogVisible = false" style="">取 消</el-button> -->
				<el-button type="primary" @click="imgDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

        <el-dialog title="论述题" :visible.sync="showAdd">
            <el-form :model="form">
				<span style="font-size:14px">每题分数：<b style="color:red">{{scores}}</b>分</span>
                <el-form-item label="题目描述">
                    <el-input v-model="form.name" maxlength=36 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述，最多36个字" >
                    </el-input>
                </el-form-item>
				<el-form-item label="上传图片">
                    <p class="addTip">*请上传图片，大小限制在3M内</p>
					<el-upload class="avatar-uploader" :headers="{accessToken: this.accessToken}" :auto-upload="true"
					list-type="picture" :file-list="fileList" :action="form.action" :show-file-list="true" 
					:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-remove="handleRemove"
					name="imgFile" :data="{imgType: form.imgType}" accept="image/jpg,image/jpeg,image/png,image/gif">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
				<el-form-item label="正确答案">
                    <el-input v-model="form.answers" maxlength=255 type="textarea" :autosize="{ minRows: 3, maxRows: 16}"  placeholder="请输入答案，最多255个字" >
                    </el-input>
                </el-form-item>
				<el-button type="primary" @click="AddInfo" style="width:45%;display:inline-block">确 定</el-button>
				<el-button @click="showAdd = false" style="width:45%;display:inline-block">取 消</el-button>
            </el-form>
        </el-dialog>

		<el-dialog :visible.sync="dialogTableVisible" center :show-close="false">
			<div class="success-dialog">
				<div class="content">
					<img src="static/img/success.png" />
					<div class="name"> 新增论述题成功</div>
					<div class="time" v-if="sendMsgDisabled">{{time+'s回到详情页'}}></div>
				</div>	
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="openAddInfo" style="width:45%;display:inline-block">再加一个</el-button>
					<el-button @click="dialogTableVisible = false" style="width:45%;display:inline-block">知道了</el-button>
				</span>
			</div>	
		</el-dialog>

		<div class="scoreAll">
			<p>
				<span class="big">{{checkScore}}</span>
				/<span>100 <!--{{allScores}}--></span>
			</p>
			<p>试卷分值</p>
		</div>
	</div>
</template>

<script>
import baseUrl from '@/apiconfig'
export default {
	name:'Discussion',
	props:{
		objDis:{
			type:Object
		}
	},
    data(){
        return {
			numVal: 				0,//记录新增选择题数量做判断，全部没选就提示 选有且有一个答案
			allVal:					'',
			filterInput:			"",
			questKind:				4,//4是论述题
			scores:					'',//输入框，每道题多少分
			checkScore:				0,//记录选中的分数
			allScores:				0,//记录总分数	
			editBtn:				0,
			dataVal:				'',
			tagTotal:				'',
			tempEditId:				'',
			tempImgArr:				[],
			checkVal:				0,//记录选择多少个题
			checkAll: 				false,
			isIndeterminate: 		false,
			showAdd:             	false, 
			dialogTableVisible: 	false,//发布成功弹窗
			imgDialogVisible:		false,//图片弹窗
			targetImg:				'',//装图片
            time:               	3,   //默认时间3S
			sendMsgDisabled:    	false,
			img_api: 				baseUrl.img_api,//路径
			accessToken:			'',
			fileList: 				[],//编辑的图片数组
			form: {
				name: '',
				action:'/edu/teach/uploadImg',//上传图片地址
				imgType:2,//论述题
				answers:'',
				questImg:'',
				checkedSingles:true
			},
			resData: [
				{
					// "name": "汽车空调的运行原理以及空调结构解析是什么？",
					// "answers":`汽车空调的运行原理以及空调结构解析是什么？汽车空调的运行原理以及空调结构解析是什么？汽车空调的运行原理以及空调结构解析是什么？
					// 汽车空调的运行原理以及空调结构解析是什么？汽车空调的运行原理以及空调结构解析是什么？汽车空调的运行原理以及空调结构解析是什么？
					// 汽车空调的运行原理以及空调结构解析是什么？汽车空调的运行原理以及空调结构解析是什么？汽车空调的运行原理以及空调结构解析是什么？`,
					// 'img':'',
					// "checkedSingles":true
				}
			]
        }
	},
	methods: {
		goBackInfo(){
			let c={}
			c.showPaperShow=true,c.addPaperShow=false
			this.$emit("goBackInfo",c)
		},
		showImages(){
			// console.log(event.target)
			// document.getElementById('imgDialogVisible').innerHTML=event.target
			this.targetImg = event.target.getAttribute('src')
			// console.log(this.targetImg )
			this.imgDialogVisible=true
		},
		handleAvatarSuccess(res, file) {
			if(res.code===1000){
				this.successMsg('图片上传成功了')
				//给图片字段拼接串
				this.form.questImg += res.data.imgName+'ψ'
				this.showUpload = false
				let url = this.img_api + res.data.imgName
				this.fileList.push({url:url}); // 对象 ，不然会报错
				this.tempImgArr.push({questImg:res.data.imgName}); // 对象 ，不然会报错
				return false
			}else if(res.code===100){
				this.dialog(res.message)
				this.$router.push({path:"/Login"}) 
				return false
			}else{
				this.dialog('图片没上传成功！请联系管理员或者再试一次')
				return false
			}
		},
		beforeAvatarUpload(file) {
			if(file==undefined){
				this.dialog('请上传图片');return false;
			}else{
				let fileName = file.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
				let fileNameLength = file.name.length;//取到文件名长度
				let fileFormat = file.name.substring(fileName + 1, fileNameLength);//截

				var this_ = this
				var reader = null;
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.dialog('上传文件大小不能超过 2MB!');
					this.filess ='';
					return false
				}

				if(fileFormat.toLowerCase()==='jpg'||fileFormat.toLowerCase()==='png'||fileFormat.toLowerCase()==='jpeg'||fileFormat.toLowerCase()==='gif')
				{
				}else{
					this.dialog('请上传图片文件');
					this.filess ='';
					return false;
				}
			}
		},
		//重新给数据赋值空
		openAddInfo(){
			//给内容赋值
			this.form.name = ''
			this.form.answers = ''
			this.form.img = ''

			this.editBtn = -1 //编辑功能关闭
			this.showAdd = true
		},
		filterBy(resData,value){
			if(value.length===0){
				this.tagTotal = resData.length
				return this.resData
			}else{
				resData = resData.filter(function(info){
					if(info.qcDesc.match(value)){
						return info.qcDesc.match(value);
					}
				})
				this.tagTotal = resData.length
				return resData
			}
		},
		//弹出层 用于添加题目
		async AddInfo(){
			// console.log(this.form)	
			// return false		
			let ywkData ={
				accessToken:'',
				// subjectId:this.objDis.subId,
				questKind:this.questKind,//定4论述题
				questDesc:'',//题目描述
				questAnswer:'',//题目答案
				questImg:this.form.questImg, //图片非必填
				// level:this.objDis.subId,
				// score:this.scores,
				itemList:[]
				// name:'',
				// answers:'',
				// 'img':'',
				// checkedSingles:true
			},cflg,d
			//cflg判定选择题中内容不能为空，d是让写法短一点
			if(this.form.name.length<5||this.form.name.length>37)
			{
				this.dialog('题目描述字数不能少于5个且不能多于36个！')
				return false
			}
			if(this.form.answers.length<1||this.form.answers.length>255)
			{
				this.dialog('答案字数不能少于1个且不能多于255个！')
				return false
			}
			
			ywkData.accessToken= this.form.token
			ywkData.questDesc= this.form.name
			// ywkData.score = this.scores
			ywkData.questAnswer = this.form.answers
			//更新和添加数据接口在此判断
			if(this.editBtn!=-1){
				ywkData.questImg =''
				//给图片字段拼接串
				this.tempImgArr.forEach((v,i)=>{
					ywkData.questImg+=v.questImg+'ψ'
				})
				
				// console.log(this.form.questImg)
				
				ywkData.id = this.tempEditId
				const res = await this.$axios.addKind(ywkData);
				if(res.code==1000){
					this.successMsg('编辑成功!')
					this.getList()
					this.showAdd = false
					return false
				}else if(res.code===1100){
						this.dialog(res.message)
						return false
					}else {
						this.dialog('请联系管理员')
						return false
					}

			}else{
				const res = await this.$axios.addKind(ywkData);
				if(res.code==1000){	
					this.showAdd = false
					this.dialogTableVisible = true
					this.fileList = [];
					this.handleCheckedSingleChange()
					// this.resData.push(ywkData)
					//调用列表
					this.getList()
				}else if(res.code===1100){
					this.dialog(res.message)
					return false
				}else {
					this.dialog('请联系管理员')
					return false
				}
			}
			return false
		},
		handleRemove(file, fileList) {
			// console.log(event.target.parentNode.parentNode)
			var nodeCollection = event.target.parentNode.parentNode.children //所有子div的集合,类数组
			var nodeArr = Array.from(nodeCollection) //把类数组转成数组
			var index = nodeArr.indexOf(event.target.parentNode) //拿到index
			// 删除当前图片
			this.tempImgArr.forEach((v,i)=>{
				if(index==i){
					this.tempImgArr.splice(i,1) //临时数组，无绝对路径
					.splice(i,1) //缩略图数组
				}
			})
			this.fileList = []
			this.fileList = fileList
			// console.log(this.tempImgArr)
			// console.log('移除fileLIst')
			// console.log(this.fileList)
		},
		editAnswers(x){
			this.showAdd = true		
			//给内容赋值
			this.form.name = this.resData[x].qcDesc
			this.form.answers = this.resData[x].answersl
			// this.form.img = this.resData[x].img
			this.tempImgArr=this.resData[x].arr
			this.tempEditId = this.resData[x].questId
			// this.fileList.push(this.img_api + res.data.imgName);

			this.fileList = [],
			this.resData[x].arr.forEach((v,i)=>{
				let a={}
				a.url = this.img_api+v.questImg
				this.fileList.push(a)
			})
			// console.log('------------')
			// console.log(this.tempImgArr)
			
			// this.tempImgArr = this.fileList
			this.editBtn = x
		},
		addAnswers(){
			let basket ={
				title:'',
				content:'',
				answers:false
			}
			//只能添加2项选择
			if(this.form.resData.length<6){
				this.form.resData.push(basket)	
			}
			else{
				this.dialog('不能再添加了！')
				return false
			}
		},
		//删除多选
		async deleAnswers(index,questId){
			let params={questId:questId}
			const res = await this.$axios.deleAnswers(params)
			if(res.code===1000){
				this.successMsg('删除题目成功!')
				this.resData.splice(index,1)
				this.handleCheckedSingleChange()
			}else if(res.code===1100){
				this.dialog(res.message)
				return false
			}else {
				this.dialog('请联系管理员')
				return false
			}
		},
		closeAnswers(index){
			// console.log(item)
			if(index<1){
				this.dialog('有且仅保留第一个答案，不能再删了！')
		        return false
			}else{
				this.form.resData.splice(index,1)
			}
		},
		onsearchHandle() {

		},
		//全选
		handleCheckAllChange(val) {
			if(this.checkAll){
				this.resData.forEach(function(items,index){
					items.checkedSingles=true
				})
			}else{
				this.resData.forEach(function(items,index){
					items.checkedSingles=false
				})
			}
			//分数
			this.scoreFun()
		},
		// 点选
		handleCheckedSingleChange(value) {
			//分数
			this.scoreFun()
		},
		keyUpFun(){
			// this.checkScore = this.scores*this.checkVal
			// this.allScores = this.scores*this.resData.length
		},
		//获取 全选 和 点选分数
		scoreFun(){
			let allScore = 0,checkS=0,a =0,t,sc=Number(this.scores) //总分，选中的分数,选中的题数,t是有一个没选中 全选会变成 false
			this.allVal = this.resData.length
			this.resData.forEach(function(v,i){
				// allScore +=v.score
				//获取选中的分
				if(v.checkedSingles===true){
					// checkS+=v.score
					checkS+=sc
					a++
				}else{
					//有一个false 全选都是不选中状态
					t=false
				}
				return allScore,checkS,a,t
			})
			// allScore = this.allVal*this.scores
			allScore = this.objDis.scoresAll
			
			this.checkAll = t
			this.checkVal = a
			this.allScores=allScore
			this.checkScore=checkS
		},
		//获取论述题列表
		async getList(){
			let params = {questKind:this.questKind},newList=[],answers=[],questImg=[]
			const res = await this.$axios.getKindList(params)
			if(res.code===1100){
				this.dialog(res.message)
				return false
			}else if(res.code===1000){
				if(Object.keys(res.data).length==0){
					this.resData = []
					return false
				}
				this.questList = res.data.questList
				this.questList.forEach(function(item,index){
					let itemobj = {}
					questImg=item.questImg.split("ψ")
					itemobj.questId =item.questId
					itemobj.score = item.score
					itemobj.isOwn = item.isOwn
					itemobj.qcDesc = item.qcDesc
					itemobj.answersl = item.questAnswer
					itemobj.checkedSingles = false //首次进来 全部复选框 不选择

					if(questImg.length>0){
						let indexMun=0
						itemobj.arr=[]
						questImg.forEach(function(v,i){
							if(v.length>0){
								let vobj = {}
								vobj.questImg = v
								itemobj.arr.push(vobj)
								indexMun++
							}
						})
					}
					newList.push(itemobj)
				})
				this.resData = newList
				//从父组件传回来的素组去和现在的匹配，有值为true
				if(this.objDis.parentData.length>0){
					let parentData = this.objDis.parentData
					//给输入框的分数赋值
					this.scores = this.objDis.scores
					this.resData.forEach(function(v,i){
						v.checkedSingles=false
						parentData.forEach(function(val,index){
							if(v.questId===val.questId){
								v.checkedSingles=true
							}
						})
					})
				}
				//获取分数 一个总分 一个选中分数
				this.scoreFun()
			}
		},
		//最后提交的时候获取选中的数据
		submitInfo(){
			let a =this.resData,b=[],c={}
			c.tit=this.questKind //传4判断给父组件
			// c.score = this.checkScore
			a.forEach(function(v,i){
				if(v.checkedSingles===true){
					b.push(v)
				}
			})
			c.score = this.checkScore
			c.resData = b
			// console.log(b)
			//子组件传给父组件值
			this.$emit("getPaperInfo",c);
		}
	},
	mounted(){
		//获取token
		if(localStorage.getItem("userType") == 0) { //老师 
			// this.status = 0
			this.form.token = localStorage.getItem("accessToken")
			this.accessToken = localStorage.getItem("accessToken")
			if(this.form.token===null||this.form.token==''){
				this.$router.push({path:"/Login"})    
			}
		}else{
			this.status = ''
			this.form.token = ''
			this.$router.push({path:"/Login"})  
		}
		//获取多选列表
		this.getList()
	},
	watch:{
		dialogTableVisible(val){
			if(val){
				let me = this;
				me.sendMsgDisabled = true;
				let interval = window.setInterval(function() {
					if ((me.time--) <= 1) {
						me.time = 3
						me.sendMsgDisabled = false
						me.dialogTableVisible=false
						window.clearInterval(interval); //停止
					}
				}, 1000);
			}
		}
	}
}
</script>


<style lang="stylus">
.Discussion
	.headBox
		background #fff
		margin-top 0px
		padding 30px
		color:#909399
		input 
			width 20%
			height 65px
			font-size 35px
			text-indent 15px
			margin 0 20px 0 20px
		.addTi
			float right 
			font-size 70px
			color #138be7	
		h3
			color #333
			font-size:36px
		.comCol
			color #E7A848
			font-size 28px
		.comWeight
			font-weight:900	
		.score
			border-bottom 2px solid #ddd
			padding-bottom 40px
			span 
				width 180px
				display inline-block		
	.group-div
		padding 30px
		background #efefef
		input 
			width 100%
			height 90px
			font-size 35px
			text-indent 65px
			padding-left 0
		.el-input-group__append
			padding 0	
			button
				width 180px
				height 90px
				font-size 35px
				color #fff
				border-radius 0
				background #138be7
				margin 0
			.el-input__icon
			.el-input__prefix
				font-size 50px
				width 70px
	.subBox
		position fixed
		bottom 0
		left 0	
		width 100%
		z-index 999			
	.selectBox
		margin-top 0px
		background #fff
		border-bottom 4px solid #ddd
		padding 0 30px 0 30px
		.contentBox
			margin-bottom 15%
			h3
				.el-checkbox__label
					font-weight 900
					font-size 36px
			.noInfo
				position relative
				height 900px
				.default
					width 400px
					position absolute
					left 50%
					top 50%
					transform: translate(-50%,-50%)
					img
						max-width 100%
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
			.el-checkbox__label
				line-height 70px;
				font-size 30px
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #67c23a
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #67c23a
				border-color #67c23a	 	
			.el-checkbox__input.is-focus .el-checkbox__inner
				border-color #ccc
			.el-checkbox__inner:after
				border: 2px solid #fff;
				border-left: 0;
				border-top: 0;
				height: 25px;
				left: 8px;
				top: 3px;
				width: 15px;
		.timuBox
			border-bottom 1px solid #eee 
			.contAnswers
				padding 5px 0 30px 20px
				margin-left 4%
				color #888
			h4
				font-weight 300;
				line-height 60px;
				font-size 32px;
				color #303133;
				img
					width 45px
					height 45px
					margin 10px 40px 0 0
				.el-checkbox__input.is-checked .el-checkbox__inner
					background  #666
					border-color #666	
				.el-checkbox__input.is-checked+.el-checkbox__label
					color #666	
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #67c23a
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #ccc
				border-color #ccc	
			.el-checkbox
				display inline-block
				margin-bottom 30px
			.checkBox
				.el-checkbox
					margin-right :15px;
					width:190px;
					margin-top:30px;      
					.el-checkbox__inner
						width :45px;
						height :45px;
						border: 3px solid #ddd;
						
				.el-checkbox__inner:after
					border: 2px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 25px;
					left: 8px;
					top: 3px;
					width: 15px;
				.el-checkbox+.el-checkbox
					margin-left :0px;	
			.el-radio-group
				display block
					
	
	.el-dialog__wrapper
		.el-dialog
			width 900px
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
					input 
						height 60px
						line-height 60px
						width 86%
						margin-left 15px
						color #666
						border 1px solid #ccc
						border-radius 15px 0 0 15px
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
		.addTip 
			font-size 15px
			color #ccc	
			margin-bottom 15px			
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
		width 95%
		height 90px
		display inline-block
		text-align center
		border-radius 10px
		margin 20px 0 30px 0  
		span	
			font-size 32px		
	.scoreAll
		height 120px
		background #E6A23C
		width 180px
		position fixed
		right 0
		bottom 3%
		text-align center
		color #ffffff
		border-radius: 90px 0 0 90px
		padding-top 20px
		p
			font-size 30px
			span
				font-size 20px
			.big
				font-weight 900
				font-size 40px
	.success-dialog
		.content
			text-align center
			img
				width 100px
				height 100px
			.name
				color #000
				font-size 36px
				font-weight bold
				margin 20px 0
			.time
				color #909399
				margin 50px 0
			.button-items
				text-align center
				.el-button
					padding 30px 0
					width 40%
					font-size 30px		
.pswp__button
	width 85px
	height 85px
	opacity 1
	background-size 458px 189px
.pswp__button--close 
	background-position 0 -90px
.pswp__button--zoom
	background-position -75px 0	
.pswp--fs
	.pswp__button--fs
		background-position -70px 0
@media (max-width: 1200px) { 
	.pswp__button--close{
		background-position 0 -80px
	}
}		
</style>
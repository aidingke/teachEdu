<!-- 
* name: 填空题库
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="Completion">
		<!-- 导航 -->
        <Header title="填空题库"></Header>
		<div @click="goBackInfo" style="width: 50px;height: 50px;position:relative;margin-top:-50px;">
		<!-- 做组件返回处理 -->
		</div>
		<div class="headBox">
			<h3><span class="addTi" @click="openAddInfo" v-if="hasQx('teach:quest:addKind')">+</span>每道填空题分数为<input v-model="scores" v-on:keyup="scoreFun" @keyup=keyUpFun />分</h3>
		</div>
		<div class="group-div">
            <el-input placeholder="题目关键字" prefix-icon="el-icon-search"  class="input-with-select" v-model="filterInput">
                <el-button slot="append" @click="onsearchHandle">搜索</el-button>
            </el-input>
		</div>	
		<div class="selectBox">
			<div class="contentBox">
				<h3> 
					<el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选({{checkVal}}/{{allVal}})</el-checkbox>
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
						<ul>
							<li v-for="(itec,index) in item.arr" :key="index"> （{{index+1}}） <span>{{itec.answersl}}</span> </li>
						</ul>
					</div>
				</div>	
			</div>
		</div>

		<div class="selectBox subBox">
			<el-row>
				<el-button type="primary" @click="submitInfo">提交</el-button>
			</el-row>	
		</div>

        <el-dialog title="填空题" :visible.sync="showAdd" @close="resetForm">
            <el-form :model="form">
		<span style="font-size:14px">每题分数：<b style="color:red">{{scores}}</b>分</span>
                <el-form-item label="题目描述">
                    <el-input v-model="form.name" maxlength=36 type="textarea" id="txt1" @change="changeValue" @blur="getTxt1CursorPosition" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述，最多36个字" >
                    </el-input>
                </el-form-item>
				<div>	
					<p style="font-size:18px;">
						<span style="color:#3DA2FE;float:right" @click="addAnswers()">插入填空</span>
						<span>正确答案</span>
					</p>
					<div v-for="(items,indexTit) in form.resData" :key="indexTit" class="contBoxMain">
						<span>（{{indexTit+1}}）</span>
						<input placeholder="输入答案" v-model="items.content"/>
						<i class="el-dialog__close el-icon el-icon-close closeBtn" @click="closeAnswers(indexTit)"></i>
					</div>
				</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="AddInfo" style="display: inline;width:45%">确 定</el-button>
				<el-button @click="resetForm" style="display: inline;width:45%">取 消</el-button>
            </div>
        </el-dialog>

		<el-dialog :visible.sync="dialogTableVisible" center :show-close="false">
			<div class="success-dialog">
				<div class="content">
					<img src="static/img/success.png" />
					<div class="name"> 新增填空题成功</div>
					<div class="time" v-if="sendMsgDisabled">{{time+'s回到详情页'}}></div>
				</div>	
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="openAddInfo" style="display: inline;width:45%">再加一个</el-button>
					<el-button @click="dialogTableVisible = false" style="display: inline;width:45%">知道了</el-button>
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
export default {
	name:'Completion',
	props:{
		objCom:{
			type:Object
		}
	},
    data(){
        return {
			numVal: 				0,//记录新增选择题数量做判断，全部没选就提示 选有且有一个答案
			filterInput:			"",
			allVal:					'',
			questKind:				3,//3是填空题
			scores:					'',//输入框，每道题多少分
			checkScore:				0,//记录选中的分数
			allScores:				0,//记录总分数	
			editBtn:				0,
			tagTotal:				'',
			dataVal:				'',
			checkVal:				0,//记录选择多少个题
			checkAll: 				true,
			isIndeterminate: 		true,
			showAdd:             	false, 
			dialogTableVisible: 	false,//发布成功弹窗				
            time:               	3,   //默认时间3S
            sendMsgDisabled:    	false,
			form: {
				name: '',
				resData:[]
			},
			itemList:[],
			questList:[],
			ansList:[],
			resData: [
				{
					// "qcDesc": "2汽车空调的运行原理以及空调结构解析是什么？",
					// "arr":[
					// 	{'name':'A.1压缩机'},
					// 	{'name':'B.冷凝器'},
					// 	{'name':'C.车门'},
					// 	{'name':'D.底盘'}
					// ],
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
		resetForm(){
			this.form = {
				name: '',
				resData:[]
			};
			this.showAdd = false;   // 关闭弹窗
		},
		changeValue(){
			console.log(1)
		},
		//重新给数据赋值空
		openAddInfo(){
			// console.log(this.form)
			// return false
			// let a = this.form.resData
			// this.form.name = ''

			// a.length===2?a.splice(0,1):a.length===3?a.splice(0,2):a.length===4?a.splice(0,3):a.length===5?a.splice(0,4):a.length===6?a.splice(0,5):'what are you doing'
			// a[0].content =''
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
			//  return false;			
			let ywkData ={
				accessToken:'',
				// subjectId:this.objCom.subId,
				questKind:this.questKind,//定3填空
				questDesc:'',
				questAnswer:'',
				// level:this.objCom.levelId,
				// score:this.scores,
				itemList:[]
				// name:'',
				// arr:[],
				// checkedSingles:true
			},cflg,d
			//cflg判定选择题中内容不能为空，d是让写法短一点
			d = this.form.resData
			if(this.form.name.length<5||this.form.name.length>37)
			{
				this.dialog('题目描述字数不能少于5个且不能多于36个！')
				return false
			}
			else{
				ywkData.accessToken= this.form.token
				ywkData.questDesc= this.form.name
				// ywkData.score = this.scores
				d.forEach(function(items,index){
					// console.log(flags,numVals)
					if(items.content==''){
						cflg=1  //这里return false不管用，弹窗出不来所以得在外层阻止
					}
					else{
						let itemL={}
						itemL.item = index+','
						ywkData.itemList.push(itemL);
						//只要答案字符串就行了
						ywkData.questAnswer += items.content+'ψ'
					}
				})
				if(cflg==1){
					this.dialog('选项内容必填哦')
					return false
				}

				ywkData.questAnswer=ywkData.questAnswer.substring(0,ywkData.questAnswer.length-1)
				// console.log(ywkData.questAnswer)
				// return false	

				//更新和添加数据接口在此判断
				if(this.editBtn!=-1){	
					// this.resData.splice(this.editBtn,1,ywkData);
					// console.log(this.resData[this.editBtn])
					ywkData.id = this.tempEditId
					const res = await this.$axios.addKind(ywkData);
					if(res.code==1000){
						this.successMsg('编辑成功!')
						this.getList()
						this.showAdd = false
					}else if(res.code===1100){
						this.dialog(res.message)
						return false
					}else {
						this.dialog('请联系管理员')
						return false
					}
				}else{
					const res = await this.$axios.addKind(ywkData);
					this.resetForm();
					if(res.code==1000){
						// this.$message.warning('添加多选成功！')	
						this.showAdd = false
						this.dialogTableVisible = true
						this.handleCheckedSingleChange()
						// this.resData.push(ywkData)
						this.getList()
					}else{
						this.dialog('操作失败')	
					}
				}
			}
			return false
		},
		editAnswers(x){
			console.log(this.resData[x])
			this.showAdd = true		
			//给内容赋值
			this.form.name = this.resData[x].qcDesc
			this.tempEditId = this.resData[x].questId
			let editArr = []

			this.resData[x].arr.forEach(function(items,index){
				let array = {}
				array.content=items.answersl
				editArr.push(array)
			})
			
			this.form.resData = editArr
			//  console.log(this.form)
			this.editBtn = x
		},
		getTxt1CursorPosition(){
			var oTxt1 = document.getElementById("txt1");
			var cursurPosition = -1;
			if(oTxt1.selectionStart){//非IE浏览器
				cursurPosition = oTxt1.selectionStart;
			}else{//IE
				if(oTxt1.value.length>0){
					var range = document.selection.createRange();
					range.moveStart("character",-this.form.name.length);
					cursurPosition = range.text.length;
				}
			}
			return sessionStorage.setItem("cursurPosition",cursurPosition);
		},
		addAnswers(){
			let basket ={
				title:'',
				content:'',
				answers:false,
			}
			//只能添加2项选择
			// let count = 0;
			let index = sessionStorage.getItem("cursurPosition"); // 当前光标的位置
			if(this.form.resData.length<6){
				basket.id = this.form.resData.length-0;
				this.form.resData.push(basket);
				if(index==='-1'){
					this.form.name += '('+(basket.id+1)+')';
				}else if(index < this.form.name.length){
					this.form.name = this.form.name.slice(0,index)+'('+(basket.id+1)+')'+this.form.name.slice(index);
				}else{
					this.form.name = this.form.name.slice(0,index)+'('+(basket.id+1)+')';
				}
				// 插入后排序
				// this.addAnswersSort();
			}
			else{
				this.dialog('不能再添加了！')
				return false
			}
		},
		addAnswersSort(){
			let count = 0;
			for(let i = 0, iLen = this.form.name.length; i < iLen; i++){
				if(this.form.name[i].match(/\d/)){ // 是数字
					if(this.form.name[i]==Number(this.form.name.charAt(i))){
						count = count+1;
						this.$set(this.form,"name",this.form.name.replace("("+this.form.name.lastIndexOf(this.form.name.charAt(i))+")","("+count+")"))
					}
				}else{
					
				}
			}
		},
		//删除
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
			let count = 0;
			this.form.name = this.form.name.replace("("+(index+1)+")","");
			for(let i = 0, iLen = this.form.name.length; i < iLen; i++){
				if(this.form.name[i].match(/\d/)){ // 是数字
					if(index<this.form.name.charAt(i)){
						this.form.name = this.form.name.replace("("+(index+2+count)+")","("+(index+1+count)+")");
						count = count+1;
					}
				}else{
					
				}
			}
			this.form.resData.splice(index,1);
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
			let allScore = 0,checkS=0,a =0,t=true,sc=Number(this.scores) //总分，选中的分数,选中的题数,t是有一个没选中 全选会变成 false
			this.allVal = this.resData.length
			this.resData.forEach(function(v,i){
				allScore +=v.score
				//获取选中的分
				if(v.checkedSingles===true){
					// checkS+=v.score
					checkS+=sc
					a++
				}else{
					//有一个false 全选都是不选中状态
					t=false
				}
				return allScore,checkS,a
			})
			// allScore = this.allVal*this.scores
			allScore = this.objCom.scoresAll
			
			this.checkAll=t?true:false
			this.checkVal = a
			this.allScores=allScore
			this.checkScore=checkS
		},
		async getList(){//获取填空题列表
			let params = {questKind:this.questKind},newList=[],answers=[]
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
					answers=item.questAnswer.split("ψ");

					if(answers.length>0){
						let indexMun=0,itemobj = {}
						itemobj.questId =item.questId
						itemobj.qcDesc = item.qcDesc
						itemobj.score = item.score
						itemobj.isOwn = item.isOwn
						itemobj.arr=[]
						itemobj.checkedSingles = false //首次进来 全部复选框 不选择
						answers.forEach(function(v,i){
							if(v.length>0){
								let vobj = {}
								vobj.answersl = v
								itemobj.arr.push(vobj)
								indexMun++
							}
						})
						if(indexMun>0){
							newList.push(itemobj)
						}
					}
				})
				this.resData = newList
				//从父组件传回来的素组去和现在的匹配，有值为true
				if(this.objCom.parentData.length>0){
					let parentData = this.objCom.parentData
					//给输入框的分数赋值
					this.scores = this.objCom.scores
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
			c.tit=this.questKind //传3给父组件
			// c.score = this.checkScore
			a.forEach(function(v,i){
				if(v.checkedSingles===true){
					b.push(v)
				}
			})
			c.score = this.checkScore
			c.resData = b
			//子组件传给父组件值
			this.$emit("getPaperInfo",c);
		}
	},
	mounted(){
		//获取token
		if(localStorage.getItem("userType") == 0) { //老师 
			// this.status = 0
			this.form.token = localStorage.getItem("accessToken")
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
	computed: {
		name: function(){
			return this.form.arr.push(this.form.name);
		}
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
.Completion
	.headBox
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
	.headBox
		background #fff
		margin-top 0px
		padding 30px
		color #909399
		h3
			color #333
			font-size:36px;
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
			ul
				li
					padding 20px 0 20px
					margin-left 4%
					span
						color #67C23A
						font-size 26px
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
			.contBoxMain
				margin-bottom 35px
				position relative
				padding-top 1%
				height 60px
				line-height 60px
				input 
					height 60px
					line-height 60px
					width 84.3%
					margin-left 15px
					color #666
					border 1px solid #ccc
					padding-left: 15px
				.el-dialog__headerbtn
					position static	
					line-height 60px
					height 60px
					border 1px solid #ccc
				.closeBtn
					position absolute
					font-size 50px
					right 1.5%
					height 60px
					border-left 1px solid #ccc
					padding-top 5px
					width: 7%
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
		bottom 9.5%
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
</style>
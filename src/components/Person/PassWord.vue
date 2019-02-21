<template lang="pug">
    div.password
        Header(title="修改密码",@goBack="goBack")
        div.content
           div.arow(v-for="items in arr")
                ul 
                    li {{items.name}} 
                        span *
                    li
                        el-input(type="password" v-model="items.val" name="password" :placeholder="items.placeholder")              
        FixedButton(buttonText='提交', @listenToChildEvent="sumbit")      

        .success-dialog
            el-dialog(:visible.sync="dialogTableVisible" center)
                .content
                    img(src="static/img/success.png")
                    .name 修改密码成功
                    .time(v-if="sendMsgDisabled") {{time+'s回到个人中心界面'}}
</template>
<script>
export default {
	name: 'password',
	data() {
		return {
            dialogTableVisible:false,
            time: 3, // 发送验证码倒计时
            sendMsgDisabled: false,
            arr:[
                {
                    name:'旧密码',
                    placeholder:'旧密码',
                    val:''
                },
                {
                    name:'新密码',
                    placeholder:'至少6位新密码',
                    val:''
                },
                {
                    name:'验证新密码',
                    placeholder:'验证新密码',
                    val:''
                }
            ],
		}
	},
	methods: {
        goBack(){
            this.$router.back(-1);
        },
        errorTip(content){
            this.$alert(content, '提示', {
                confirmButtonText: '知道了',
                callback: action => {
                }
            });
        },
        async sumbit(){
            let re = /^[a-zA-Z\d]{6,12}$/;
            if(!this.arr[0].val){
                this.dialog("请填写旧密码")
                return false
            }else if(!re.test(this.arr[0].val)){
                this.dialog("请输入6到12位字母或数字")
                return false
            }

            if(!this.arr[1].val){
                this.dialog("请填写新密码")
                return false
            }else if(!re.test(this.arr[1].val)){
                this.dialog("请输入6到12位字母或数字")
                return false
            }

            if(!this.arr[2].val){
                this.dialog("请填写验证新密码")
                return false
            }else if(!re.test(this.arr[2].val)){
                this.dialog("请输入6到12位字母或数字")
                return false
            }

            if(this.arr[2].val.split('').length<6){
                this.dialog("请填写至少六位的新密码")
                return false
            }

            if(this.arr[1].val != this.arr[2].val){
                this.dialog("验证新密码与新密码不一致")
                return false
            }
            let params = {
                oldPwd : this.$md5(this.arr[0].val).toUpperCase(),
                newPwd : this.$md5(this.arr[1].val).toUpperCase(),
                confirmPwd : this.$md5(this.arr[2].val).toUpperCase(),
            }
            const res = await this.$axios.changePwd(params);
            if(res.code===1000){
                this.dialogTableVisible = true
            }else{
                this.dialog(res.message)
            }
        }
    },
    watch:{
        dialogTableVisible(val){
            if(val){
                let me = this;
                me.sendMsgDisabled = true;
                let interval = window.setInterval(function() {
                    if ((me.time--) <= 1) {
                        me.time = 3;
                        /* me.sendMsgDisabled = false; */
                        window.clearInterval(interval); //停止
                        me.dialogTableVisible = false
                        me.$router.push({
                            path:'/PerCenter'
                        })
                    }
                }, 1000);
            }
        }
    }
}
</script>
<style lang="stylus">
.password 
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    padding-bottom 1rem
    background #fff
    overflow hidden
    box-sizing border-box
		
	.content
		width 100%
		.arow
			width 100%
			font-size 30px
			box-sizing border-box
			ul
                padding 1.0rem 1.5rem 0rem 1.5rem
                overflow hidden
                li
                    &:nth-child(1) 
                        float left
                        width 30%
                        line-height 77px
                        span 
                            color red
                            margin-left 10px
                    &:nth-child(2)
                        float left
                        width 50%
                        input
                            width 90%
                            box-sizing border-box
                            padding 10px 20px
                            font-size 30px
				
	.success-dialog
        .el-dialog
            margin-top 35vh !important
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
                font-size 16px;/*no*/
            .el-button
                padding 30px 60px

</style>

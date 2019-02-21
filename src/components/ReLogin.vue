<template lang="pug">
    .re-login 
        Header(title="登录",@goBack="goBack")
        .content
           .arow
                ul 
                    li 用户名
                        span *
                    li
                        el-input(type="text" v-model="user.userName" placeholder="帐号",@input="check")  
                ul 
                    li 密码
                        span *
                    li
                        el-input(type="text" v-model="user.password" placeholder="密码",@input="check")  
                .null-msg(v-if="nullMsg") {{nullMsg}}
        FixedButton(buttonText='提交', @listenToChildEvent="sumbit")      

</template>
<script>
export default {
	name: 'ReLogin',
	data() {
		return {
            user:{
                userName:       "",
                password:       ""
            },
            nullMsg:    ''
		}
	},
	methods: {
        goBack(){
            this.$router.back(-1);
        },
        check(){
            if(this.user.userName && this.user.password){
                this.nullMsg = ''
            }else{
                this.nullMsg = '帐号或密码不能为空'
            }
        },
        async sumbit(){
            this.check();
        }
    },
}
</script>
<style lang="stylus">
.re-login 
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
		.arow
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
			.null-msg
                float left
                margin-left 35%
                margin-top 30px
                color red
</style>

<!-- 
* name: 个人中心
* author: cgc
* time: 2018-8-24
-->
<template lang="pug">
    .per-center
        .center-line
            p.navigation 
                img.img-fl(src="static/img/gb.png" @click="goback")
                img.img-fr(src="static/img/lj.png" @click="goHome")
            img.imgCity(src="static/img/cityCenter.png")
        .name-text
            p.text  {{userName}}
            span.figure-head
                img.img-logo(src="static/img/logo.png")
        .cont
            .ul(:span="24") 
                .cross(:span="24",@click="goPersonal")
                    span
                        img.pan(src="static/img/panb.png")
                    span.data-name 个人资料
                    b.into
                .cross(:span="24",@click="editPassWord",v-if="hasQx('comm:person:changePwd')")
                    span
                        img.pan(src="static/img/passwordblue.png")
                    span.data-name 修改密码
                    b.into
                .cross(:span="24",@click="goResume",v-if="hasQx('stu:resume:detail')")  
                    span
                        img.pan(src="static/img/resume-entry.png")
                    span.data-name 我的简历
                    b.into    
        FixedButton(buttonText='退出', @listenToChildEvent="signOut")
</template>
<script>
export default {
	name: 'PerCenter',
	data() {
		return {
            userName:'',
            userType:'',
		}
	},
	methods: {
        goback(){
            this.$router.push(
                {
                    path:'Home'
                }
            );
        },
        goPersonal(){           //跳转到个人资料 0：教师  1：学生
            if(this.userType==='0' || this.userType==='4'){
                this.$router.push(
                    {
                        path:'/PerTeachInfo'
                    }
                );
            }else if(this.userType==='1'|| this.userType==='2'){
                this.$router.push(
                    {
                        path:'/PerStuInfo'
                    }
                );
            }
        },
        goResume(){           //跳转到我的简历 0：教师  1：学生    
            if(this.userType==='0' || this.userType==='4'){
                return;
            }else if(this.userType==='1'|| this.userType==='2'){
                this.$router.push(
                    {
                        path:'/StuResume'
                    }
                );
            }
        },
        editPassWord(){
            this.$router.push(
                {
                    path:'PassWord'
                }
            );
        },
        signOut(){
            this.$confirm('确定退出登录？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '退出',
            }).then(() => {
                sessionStorage.removeItem('accessToken');
                this.$router.push({name:'StartPage'});
            }).catch(() => {
                
            });
        },
        goHome(){
            this.$router.push({
                path:'/Home'
            })
        }
    },
    mounted(){
        this.userName = sessionStorage.getItem('userName');
        this.userType = localStorage.getItem('userType');
    }
}
</script>
<style lang="stylus">
.per-center 
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    padding-bottom 1rem
    background #e5e5e5
    // overflow hidden
    overflow auto
    box-sizing border-box
	.center-line 
        width 100%
        background #138be7
		.navigation 
            overflow hidden
            padding 0.3rem
			.img-fl
                float left
                width 2%
                cursor pointer
			
			.img-fr
                float right
                width 3.5%
                cursor pointer
		
		.img-city 
            width: 100%
            padding-top:1rem
    .name-text
        position relative
        box-sizing border-box
        min-height 2rem
        background #fff
        padding-top 1rem
        .text
           text-align center
           font-size 0.38rem
		
		.figure-head
            box-sizing border-box
            position absolute
            top -50%
            width 200px
            height 200px
            background #fff
            left 50%
            transform translate(-50%,0%)
            border-radius 50%
            display block
            overflow hidden
            .img-logo
                display block
                width 100%
	
	.cont
        padding 20px
		.ul
            background #fff
            .cross
                position relative
                padding 20px
                border-bottom 1px solid #e5e5e5
                padding 30px
			.pan
                width 3.2%
                vertical-align bottom
              
	        .data-name
	           	padding-left 20px
	           	font-size 30px
	          
	        .into
	          	position absolute
	          	right 30px
	          	top 10px
	          	display block
	          	width 25px
	          	height 40px
	          	background url('../../../static/img/acj.png')
	          	background-size 100% 100%
	          	transform translate(0%,50%)
	          	cursor pointer
	          
	.btn-parent
		position absolute
		bottom 0
		left 0
		width 100%
		background #fff
		padding 20px
		.btn
            padding 30px
            text-align center
            color #fff
            background #138be7
            font-size .38rem
            cursor pointer
</style>

<template>
	<view class="login">
		<view class="content">
			
			<!-- 头部logo -->
			<view class="header">
				<!-- <image :src="logoImage"></image> -->
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			
			<!-- 主体表单 -->
			<view class="main">
				<input type="text" value="" class="main-input" placeholder="账号" @input="onKeyUserNameInput"/>
				
				<input type="password" value="" class="main-input" placeholder="密码" @input="onKeyUserPwdInput"/>
			</view>
			
			<button class="wbutton" @click="Userregist">注册</button>
			
			
			
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				pwd:''
			}
		},
		
		methods:{
			
			onKeyUserNameInput(e){
				this.username = e.target.value
			},
			
			onKeyUserPwdInput(e){
				this.pwd = e.target.value
			},
			
			Userregist(){
				// console.log(this.username);
				// console.log(this.pwd);
				
				// 生成随机openId
				let openId = randomString()
				// console.log(openId);
				
				let formdata = {
					nickName: this.username,
					openId: openId,
					pwd:this.pwd
				};
				
				uniCloud.callFunction({
					name:"user",
					data:{
						formdata:formdata
					},
					success: (res) => {
						uni.navigateBack({})
					}
					
				})
			}
		}
	}
	
	function randomString() {    
	    let e = 32
	    var t = "ABCDEFGHJKMNPQRSTWXYZ012345678"
	    let a = t.length
	    let n = ""
	    for (let i = 0; i < e; i++)
			{
				n += t.charAt(Math.floor(Math.random() * a))
			}
	    return n
	}
</script>

<style>
	.header {
		width:161rpx;
		height:161rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #000000; 
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161rpx;
		height:161rpx;
		border-radius:50%;
	}
	
	
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
		height: 300upx;
	}
	
	.main-input{
		flex: 1;
		text-align: left;
		padding-left: 50upx;
		font-size: 28rpx;
		/* line-height: 100rpx; */
		padding-right: 10rpx;
		margin-left: 20rpx;
		border: 1px solid #DDDDDD;
		margin-bottom: 40upx;
		border-radius: 60upx;
	}
	
	/* 登录按钮 */
	.wbutton{
		margin-top: 50upx;
		width: 200upx;
		height: 100upx;
		border-radius: 80upx;
		background-color: #333333;
		color: white;
		line-height: 100upx;
	}
</style>

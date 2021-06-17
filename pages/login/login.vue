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
				<input type="text" value="" class="main-input" placeholder="账号" @input="getUsername"/>
				
				<input type="password" value="" class="main-input" placeholder="密码" @input="getUserPwd"/>
			</view>
			
			<button type="default" class="wbutton" @click="UserLogin">登录</button>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					 <uni-icons type="qq" @click="qqLogin" size="30"></uni-icons>
				</view>
				<view class="login_icon">
					 <uni-icons type="weixin" @click="weixin" size="30"></uni-icons>
				</view>
				<view class="login_icon">
					<uni-icons type="weibo" @click="weibo" size="30"></uni-icons>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="#">找回密码</navigator>
				<text>|</text>
				<navigator url="./regist" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				formdata:null,
				username:'',
				pwd:''
			}
		},
		
		methods:{
			
			getUsername(e){
				this.username = e.target.value
			}, 
			
			getUserPwd(e){
				this.pwd  = e.target.value
			},
			
			UserLogin(){
				// console.log(this.username);
				// console.log(this.pwd);
				uniCloud.callFunction({
					name:'userLogin',
					data:{
						nickName:this.username,
						pwd:this.pwd
					},
					success: (res) => {
						if(res.result.msg)
						{
							uni.showToast({
								title:res.result.msg,
								position:"bottom"
							})
						}
						else{
							// console.log(res.result.data);
							
							let formdata = {}
							formdata.nickName = res.result.data[0].nickname
							formdata.openId = res.result.data[0].openId
							
							formdata.headImgUrl = "../../static/logo/logo.png"
							// console.log(formdata);
							
							this.$store.commit("userLogin",formdata)
							this.$store.commit('login',formdata)
							
							// console.log(this.$store.state.user);
							// 通过云函数 更新数据库中的用户信息
							uniCloud.callFunction({
								name:"user",
								data:{
									formdata:formdata
								}
							}).then(res =>{})
							
							uni.navigateBack({
								animationType:"pop-out"
							})
						}
					}
				})
			},
			
			weixin(){
				uni.showToast({
					title:'...',
					position:"bottom"
				})
			},
			
			weibo(){
				uni.showToast({
					title:'...',
					position:"bottom"
				})
			},
			
			
			// qq登录
			qqLogin(){
				uni.login({
					provider:"qq",
					success: (res) => {
						// console.log(res);
						let access_token = res.authResult.access_token;
						// console.log(access_token);
						
						uni.getUserInfo({
							provider:"qq",
							success: (info) => {
								// 获得昵称 头像 id
								let formdata = {
									nickName: info.userInfo.nickname,
									headImgUrl: info.userInfo.figureurl_qq_2,
									openId: info.userInfo.openId,
									access_token: access_token,
									pwd:""
								};
								// console.log(this.formdata);
								
								// 传进vuex 供其他页面展示数据
								this.$store.commit("userLogin",formdata)
								this.$store.commit('login',formdata)
								
								
								// 通过云函数 更新数据库中的用户信息
								uniCloud.callFunction({
									name:"user",
									data:{
										formdata:formdata
									}
								}).then(res =>{})
								
								uni.navigateBack({
									animationType:"pop-out"
								})
							},
							fail() {
								console.log('qq nono');
							}
						})
					},
					fail() {
						console.log('qqfail');
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128rpx; */
	}
	
	/* 头部 logo */
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
	
	/* 主体 */
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
	
	/* 其他登录方式 */
	.other_login{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 100upx;
		text-align: center;
	}
	.login_icon{
		border: none;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0,0,0,0.7)
	}
	.wechat_color{
		color: #83DC42;
	}
	.weibo_color{
		color: #F9221D;
	}
	.github_color{
		color: #24292E;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>

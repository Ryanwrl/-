<template>
	<view class="logout">
		
		<view class="user">
			<image :src="userdata.headImgUrl" mode="" class="headimage"></image>
			<view class="nickname">
				{{userdata.nickName}}
			</view>
		</view>
		
		<view class="logout-btn">
			<button type="default" @click="userLogout">退出当前登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userdata:{}
			}
		},
		mounted(){
			uni.getStorage({
				key:'user',
				success: (res) => {
					this.userdata = res.data
				}
			})
		},
		methods:{
			userLogout(){
				this.$store.commit('logout')
				uni.navigateBack({
					animationType:"pop-out"
				})
			}
		},
	}
</script>

<style scoped>
	
	.logout-btn{
		width: 500rpx;
		height: 600rpx;
		margin: 300rpx auto;
		text-align: center;
	}
	
	.logout-btn button{
		width: 400rpx;
		height: 100rpx;
		margin-bottom: 20rpx;
		
		border-radius: 80upx;
		background-color: #333333;
		color: white;
		line-height: 100upx;
	}
	
	.user{
		width: 500upx;
		height: 500upx;
		position: relative;
		top: 300upx;
		left: 50%;
		transform: translateX(-50%);
		
		
		text-align: center;
	}
	
	.headimage
	{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	
	.nickname{
		font-size: 50upx;
	}
	
	
</style>

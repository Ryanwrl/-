<template>
  <view class="profile-list">
    <view class="profile-list-item" @click="msgBtn">
				<image src="../../../static/profile/email.png" mode="aspectFit"></image>
				我的消息
    </view>
    <view class="profile-list-item" @click="markBtn">
      <image src="../../../static/profile/contacts.png" mode="aspectFit"></image>
			我的标记
    </view>
    
    <view class="profile-list-item">
			<image src="../../../static/profile/tradingvolume.png" mode="aspectFit"></image>
			学习统计
    </view>

  </view>
</template>

<script>

export default {
  name: "profileList",
	computed:{
		userid(){
			return this.$store.state.user.openId
		}
	},
	methods:{
		markBtn(){
			// console.log(userid);
			if(this.userid == "")
			{
				uni.showToast({
					title:"请先登录",
					icon:"none",
					position:"bottom"
				})
			}
			else{
				uni.navigateTo({
					url:"/pages/user/userMark?id=" + this.userid + "",
					
				})
			}
			
		},
		
		msgBtn(){
			// console.log(userid);
			if(this.userid == "")
			{
				uni.showToast({
					title:"请先登录",
					icon:"none",
					position:"bottom"
				})
			}
			else{
				uni.navigateTo({
					url:"/pages/user/userMsg"
				})
			}
			
		}
	}
};
</script>

<style scoped>
.profile-list {
  width: 100%;
}

.profile-list-item {
  line-height: 80upx;
  display: flex;
  align-items: center;
  height: 80upx;
  padding: 0 40upx;
	box-shadow: 3upx 3upx 8upx  rgba(0,0,0,.2);
	margin: 20upx;
	border-radius: 20upx;
	background-color: #FFFFFF;
}

image{
	width: 40upx;
	height: 40upx;
	vertical-align: middle;
	margin-right: 10upx;
}

.line {
  width: 100%;
  height: 20upx;
  background-color: #eeeeee;
}
</style>

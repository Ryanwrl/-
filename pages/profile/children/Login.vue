<template>
  <view class="login" >
    <view class="user-pic" >
			<image :src="userdata.headImgUrl" v-if="userdata.headImgUrl != ''"></image>
    </view>
		
		<view class="user-info" v-if="userdata.openId != ''">
			<text @click="userLogout">{{userdata.nickName}}</text>
			<view class="phone-num">
			  <text>今天你刷了吗</text>
			</view>
		</view>
		
    <view class="user-info" v-else>
      <text @click="userLogin">登录/注册</text>
      <view class="phone-num">
        <text>今天你刷了吗</text>
      </view>
    </view>
		
		
  </view>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
			
    }
  },
	
	
	// mounted(){
	// 	uni.getStorage({
	// 		key:'user',
	// 		success: (res) => {
	// 			this.$store.commit('userLogin',res.data)
	// 		}
	// 	})
	// },
	
	
	computed:{
		userdata(){
			return this.$store.state.user
		},
		
	},
	
	methods:{
		
		userLogout(){
			uni.navigateTo({
				url:'/pages/login/logout'
			})
		},
		
		userLogin(){
			uni.navigateTo({
				url:'/pages/login/login',
				fail() {
					console.log('网不好呀');
				}
			})
		}
	}
};
</script>

<style scoped>
.login {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 20px;
  background-color: #afb4db;
}

.user-pic {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
}

.user-pic image {
  display: block;
  width: 60px;
  height: 60px;
	border-radius: 50%;
}

.user-info {
  font-size: 16px;
  margin-left: 20px;
  color: white;
}

.user-info text:last-child {
  margin-left: 3px;
}

.user-info .phone-num {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.icon-phone {
  display: inline-block;
  width: 16px;
  height: 16px;
}

.profile-arrow-right {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
}

.profile-arrow-right image {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>

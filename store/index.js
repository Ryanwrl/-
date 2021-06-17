import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
			user:{
				nickName:'',
				headImgUrl:'',
				openId:'',
			},
			haslogin:false,
		},
    mutations: {
			userLogin(state,payload){
				// console.log(payload);
				state.user.nickName = payload.nickName
				state.user.headImgUrl = payload.headImgUrl
				state.user.openId = payload.openId
				// console.log(state.user);
				 
			},
			
			login(state,payload){
				// 改变登录状态 将用户信息存到本地 以此保持登录状态
				state.hasLogin = true
				uni.setStorage({
						key: 'user',  
						data: payload  
				}) 
			},
			
			//退出登录  
			logout(state) {
					state.hasLogin = false  
					state.user = {
						nickName:'',
						headImgUrl:'',
						openId:'',
						token:''
					} 
					uni.removeStorage({  
							key: 'user'  
					})  
					console.log('user out');
			}  
		},
    actions: {}
})
export default store
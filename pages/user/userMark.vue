<template>
	<view class="user-mark" v-if="userid">
			<uni-list v-if="this.markinfo != null">
				<!-- v-for 与 @click 写在一起 会导致只触发一次click事件 -->
				<uni-list-item 
					v-for="item in this.markinfo.mark" :key="item.id" 
					:title="item.en" 
					:note="item.cn" 
					class="list-item"
					>
					<template slot="footer">
						<!-- <button type="default" @click="removeMark(item.id)">取消标记</button> -->
						<view class="footer">
							<image src="../../static/profile/delete.png" mode="aspectFill" @click="removeMark(item.id)"></image>
						</view>
					</template>
				</uni-list-item>
				
			</uni-list>
			
			
	</view>
	
	<view class="user-warn" v-else>
		请登录哦
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userid:'',
				markinfo:{},
			}
		},
	
		
		onLoad(option){
			// console.log(option.id);
			this.userid = option.id
			uniCloud.callFunction({
				name:"getUser",
				data:{
					id:this.userid
				},
				success: (res) => {
					// console.log(res.result.res.data[0]);
					this.markinfo = res.result.res.data[0]
				}
			})
	},
	
	methods:{
		removeMark(id){
			uni.showModal({
				content:"取消此标记吗?",
				success: (res) => {
					if(res.confirm)
					{
						uniCloud.callFunction({
							name:"deleteMark",
							data:{
								markid:id,
								userid:this.userid
							},
							success: (res) => {
								// console.log(res.result.user.data[0]);
								// console.log(this.markinfo);
								this.markinfo.mark = res.result.user.data[0].mark
									
							}
						})
					}
				},
				
				
			})
		}
	},
	
	}
</script>

<style>
	.footer{
		display: flex;
		align-items: center;
	}
	
	 image{
		width: 50upx;
		height: 50upx;
	}
</style>

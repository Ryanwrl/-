<template>
	<view class="word">
		<uni-list class="list">
			<uni-list-item title="四级测试" note="" class="list-item" thumb="../../static/word/cet-4.png" thumbSize="lg" clickable @click="testCet4"></uni-list-item>
			<uni-list-item title="六级测试" note="" class="list-item" thumb="../../static/word/cet-6.png" thumbSize="lg" clickable @click="testCet6"></uni-list-item>
			<uni-list-item title="雅思托福测试" note="" class="list-item"  thumb="../../static/word/ielts.png" thumbSize="lg" clickable @click="testIelts"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		
		computed:{
			userid(){
				return this.$store.state.user.openId
			}
		},
		
		methods:{
			testCet4(){
				if(this.userid == '')
				{
					uni.showToast({
						title:'请先登录',
						position:"bottom"
					})
					
				}
				else{
					uni.showModal({
						content:"准备好四级测试了吗?",
						success: (res) => {
							if(res.confirm)
							{
								console.log('TestCet4');
								uni.navigateTo({
									url:"/pages/word/wordtest?test=cet4"
								})
							}
						}
						})
				}
			}
			,
			testCet6(){
				if(this.userid == '')
				{
					uni.showToast({
						title:'请先登录',
						position:"bottom"
					})
					
				}
				else{
					uni.showModal({
						content:"准备好六级测试了吗?",
						success: (res) => {
							if(res.confirm)
							{
								console.log('TestCet6');
								uni.navigateTo({
									url:"/pages/word/wordtest?test=cet6"
								})
							}
						}
						})
				}
			},
			
			testIelts(){
				if(this.userid == '')
				{
					uni.showToast({
						title:'请先登录',
						position:"bottom"
					})
					
				}
				else{
					uni.showModal({
						content:"准备好雅思托福测试了吗?",
						success: (res) => {
							if(res.confirm)
							{
								console.log('Testielts');
								uni.navigateTo({
									url:"/pages/word/wordtest?test=ielts"
								})
							}
						}
						})
				}
			}
		}
	}
</script>

<style scoped>
	
	.list{
		width: 100vh;
		height: 100vh;
		background-color: #F4F4F4;
	}
	
	.list-item{
		width: 700upx;
		font-weight: 800;
		border-bottom: 1px solid #dddddd;
		box-shadow: 3upx 3upx 8upx  rgba(0,0,0,.2);
		margin: 25upx;
		border-radius: 20upx;
	}
</style>

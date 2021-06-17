<template>
	<view class="result">
		<view class="user-result">
			<text>此次得分为 {{count * 10}}</text>
		</view>
		
		<view class="result-list">
			<uni-list>
				<uni-list-item v-for="(item,index) in question" :key="index" :title="item.tranOther" :note="item.tranCn" :rightText="answer[index]"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				count:0,
				question:[],
				answer:[],
				hint:[]
			}
		},
		onLoad(option) {
			this.count = option.count
			let data = JSON.parse(decodeURIComponent(option.formdata))
			this.getData(data.question,data.answer,data.hint)
		},
		
		onBackPress(event) {
			uni.switchTab({
					url: '/pages/index/index'
				});
			return true
		},
		
		methods:{
			getData(question,answer,hint){
				this.question = question
				this.answer = answer
				this.hint = hint
				// console.log(this.question);
				// console.log(this.answer);
				// console.log(this.hint);
			}
		}
	}
</script>

<style>
	.user-result{
		width: 400upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		margin: 80upx auto;
		font-size: 40upx;
	}
	
	.result-list {
		margin: 0 auto;
		font-size: 30upx;
	}
</style>

<template>
	<view class="test" v-if="Object.keys(qusetion).length !== 0">
		
		<swiper :interval="3000" :duration="150" class="swiper" @change="IndexChange">
			<swiper-item v-for="(item,index) in qusetion">
				<view class="swiper-item">
					
					<view class="question">
						<uni-title title="根据提示拼写单词" align="center" type="h4" ></uni-title>
						
						<view class="en-hint">
							{{item.tranOther}}
						</view>
						
						<view class="other-hint" v-if="ShowHint == 1 || ShowHint == 2">
							{{hint[index]}}
						</view>
						
						<view class="cn-hint" v-if="ShowHint == 2">
							{{item.tranCn}}
						</view>
						
					</view>
					
					<view class="answer">
						<input type="text" value="" placeholder="输入答案" @input="getAnswer(index,$event)" />
					</view>
					
					
					
				</view>
			</swiper-item>
			
		</swiper>
		
		<view class="another-hint">
			<image src="../../static/word/tishi.png" mode="aspectFit" @click="giveHint" ></image>
			<image src="../../static/word/tijiaowancheng.png" mode="aspectFit" @click="answerSubmit"></image>
		</view>
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			qusetion:[],
			hint:[],
			answer:[],
			current:0,
			ShowHint:0,
			
			userAnswer:[]
		}
	},
	
	computed:{
		userId(){
			return this.$store.state.user.openId
		}
	},
	
	onLoad(option) {
		
		uniCloud.callFunction({
			name:option.test,
			success: (res) => {
				let data = res.result.data
				// console.log(data);
				let ques = []
				let ans = []
				let hint = []
				data.forEach(item =>{
					ques.push(item.content.word.content.trans[0])
					if(!item.content.word.content.phone)
					{
						hint.push("/" + item.content.word.content.usphone + "/")
					}
					else{
						hint.push("/" + item.content.word.content.phone + "/")
					}
					ans.push(item.headWord)
				})
				
				this.qusetion = ques
				this.answer = ans
				this.hint = hint
				// console.log(ques);
				// console.log(ans);
				// console.log(hint);
			}
		})
	},
	
	methods:{
		// 重置提示flag
		IndexChange(){
			this.ShowHint = 0
		},
		
		// 获取input中的value
		getAnswer(index,e){
			this.userAnswer[index] = e.target.value
		},
		
		// 提交答案 校对答案
		answerSubmit(){
			let count = 0
			this.userAnswer.forEach((item,index) =>{
					if(item === this.answer[index])
					{
						count++
					}
			})
			// console.log(count);
			let formdata = {}
			formdata.question = this.qusetion
			formdata.hint = this.hint
			formdata.answer = this.answer
			console.log(formdata);
			uni.navigateTo({
				url:"./result?count=" + count + "&formdata=" + encodeURIComponent(JSON.stringify(formdata)),
				animationType:"pop-in",
			})
		},
		
		giveHint(){
			if(this.ShowHint < 2)
			{
				this.ShowHint++
			}
		}
	}
	
}
</script>

<style>
	.test{
		height: 100vh;
		background-color: #F4F4F4;
	}
	
	.swiper{
		width: 100%;
		height: 80vh;
	}
	

	
	.question{
		height: 600upx;
		width: 600upx;
		margin: 100upx auto;
		border: 2px solid #DDDDDD;
		margin-bottom: 50upx;
		text-align: center;
		background-color: #cde6c7;
		border-radius: 100upx;
	}
	
	.cn-hint{
		padding: 50upx;
	}
	
	.en-hint{
		padding: 20upx;
		font-size: 35upx;
		margin-bottom: 100upx;
	}
	
	.another-hint{
		display: flex;
		text-align: center;
		justify-content: center;
	}

	
	.another-hint image{
		height: 80upx;
		width: 200upx;
	}
	
	.answer{
		height: 100upx;
		width: 300upx;
		margin: 100upx auto;
		background-color: #FFFFFF;
	}
	
	.answer input{
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		box-shadow: 5upx 5upx 10upx rgba(0,0,0,.2);
		border-radius: 20upx;
		border: 1px solid #DDDDDD;
	}
</style>

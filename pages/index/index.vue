<template>
	<view class="container" v-if="Object.keys(testlist).length !== 0">
		<!-- 卡片 -->
		<view class="total-card" >
			<!-- 卡片正面 -->
			<view class="card">
				<text>{{testlist[currenIndex].headWord}}</text>
			</view>
			
			<!-- 卡片反面 -->
			<view class="card-reverse">
				<text>{{testlist[currenIndex].content.word.content.trans[0].tranCn}}</text>
				
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view class="operation" >
			<!-- <button type="primary"@click="renderjs.cardReverse" class="btnReverse opitem">翻页</button> -->
			<!-- <uni-icons type="arrowleft" size="30" @click="renderjs.cardReverse" class="btnReverse opitem"></uni-icons> -->
			<image src="../../static/index/retweet.png" class="btnReverse opitem" @click="renderjs.cardReverse" mode="aspectFit"></image>
			<image src="../../static/index/arrowleft.png" class="btnPre opitem" @click="PreCard" mode="aspectFit"></image>
			<image src="../../static/index/arrowright.png" class="btnNext opitem" @click="nextCard" mode="aspectFit"></image>
			<image :src="markPng" class="btnMark opitem" @click="markDown" mode="aspectFit"></image>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				// 词库
				testlist:[],
				
				// 记录标记下的单词
				markdown:[],
				
				userId:'',
				
				userinfo:'',
				
				currenIndex:0,
				
				markPng:"../../static/index/flag.png",
				
				chosenList:[],
				
			}
		},
		
		// 点击返回时 记录当前卡片位置
		onBackPress() {
			this.cardIndex()
		},
		
		// 切换当前tab时 记录当前卡片位置
		onHide() {
			if(this.userId != '')
			{
				this.cardIndex()
			}
		},
		
		// 生命周期函数 通过调用云函数得到云数据库中的数据
		onLoad() {
			this.userId = this.$store.state.user.openId
			
			uniCloud.callFunction({
				name:"word"
			}).then(res => {
								this.testlist = res.result.data
								// console.log(res.result.data)
							})
			
			
			this.getUser()
			this.getMark()
			
		},
		
		onTabItemTap() {
			// 需要重新获取一次userid 更新数据
			this.userId = this.$store.state.user.openId
			this.getUser()
			this.getMark()
		},
		
		
		methods:{

			// 调用getuser云函数
			getUser(){
				uniCloud.callFunction({
					name:'getUser',
					data:{
						id:this.userId
					},
					success: (res) => {
						this.userinfo = res.result.res.data[0]
						this.currenIndex = this.userinfo.cardIndex
					}
				})
			},
			
			getMark(){
				uniCloud.callFunction({
					name:"getUser",
					data:{
						id:this.userId
					},
					success: (res) => {
						this.markdown = res.result.res.data[0].mark
					}
				})
			},
			
			// 调用cardindex云函数
			cardIndex()
			{
				uniCloud.callFunction({
					name:'cardIndex',
					data:{
						index:this.currenIndex,
						id:this.userId
					},
					success: () => {
						// console.log('卡片位置记录已完成');
					}
				})
			},
			
			changeMarkIcon(){
				this.getMark()
				let flag = this.markdown.some(item => item.en === this.testlist[this.currenIndex].headWord)
				if(!flag)
				{
					this.markPng = "../../static/index/flag.png"
				}
				else{
					this.markPng = "../../static/index/flag-fill.png"
				}
			},
			
			// 下一张卡片
			nextCard(){
				if(this.currenIndex < this.testlist.length - 1)
					{
						this.currenIndex++
						uni.$emit('changeIndex',this.currenIndex)
					}
					
				this.changeMarkIcon()
				
			},
			
			// 上一张卡片
			PreCard(){
				if(this.currenIndex > 0)
				{
					this.currenIndex --
					uni.$emit('changeIndex',this.currenIndex)
				}
				
				this.changeMarkIcon()
			},
			
			// 标记卡片
			markDown(){
				if(this.userId == "")
				{
					uni.showToast({
						title:"请先登录",
						icon:"none",
						position:"bottom"
					})
				}
				else{
					// console.log(this.markdown);
					let flag = this.markdown.some(item => item.en === this.testlist[this.currenIndex].headWord)
					// console.log(flag);
					
					// 取消标记
					if(flag)
					{
						// 调用云函数 删除标记
						uniCloud.callFunction({
							name:"deleteMark",
							data:{
								markid:this.testlist[this.currenIndex]._id,
								userid:this.userId
							},
							success: (res) => {
								// console.log(res.result.user.data[0]);
								// console.log(this.markinfo);
								this.markPng = "../../static/index/flag.png"
								
								uni.showToast({
									title:"取消标记",
									icon:"none",
									position:"bottom"
								})
								this.getMark()
							}
						})
					}
					
					// 标记
					else{
						// 调用云函数mark 将用户mark的单词记入数据库
						const userid = this.$store.state.user.openId;
						uniCloud.callFunction({
							name:"mark",
							data:{
								markdown:this.testlist[this.currenIndex],
								index:this.currenIndex,
								userid:userid
							},
							complete: () => {
								this.getMark()
								uni.showToast({
									title:"已标记",
									icon:"none",
									position:"bottom"
								})
							}
						})
						this.markPng = "../../static/index/flag-fill.png"
						
					}
				}
				
			},
			
			
		}
		
	}
</script>

<script module='renderjs' lang="renderjs">
	export default{
		data(){
			return{
				pageX:0,
				pageY:0,
				isReverse:false
			}
		},
		
		methods: {
			// 卡片反转
			cardReverse(){
				let cardNode = document.querySelector(".total-card")
				if(this.isReverse)
				{
					cardNode.style.transform = "rotateY(0)"
					this.isReverse = false
				}
				else{
					cardNode.style.transform = "rotateY(-180deg)"
					this.isReverse = true
				}
			},
			
			// 下面是监听手指触摸，实现动态效果
			// cardTransform(x,y)
			// {
			// 	let cardNode = document.querySelector(".total-card")
			// 	// console.log(cardNode);
			// 	// console.log(x);
			// 	let rotateX = x 
			// 	let rotateY = y 
			// 	let rotateZ = rotateX
			// 	if(rotateX > 0 && rotateY > 0)
			// 	{
			// 		let res = "rotate3d(" + rotateX +"," + rotateY + "," + rotateZ + ",-3deg)"
			// 		cardNode.style.transform = res
			// 	}
			// 	else{
			// 		let res = "rotate3d(" + rotateX +"," + rotateY + "," + rotateZ + ",3deg)"
			// 		cardNode.style.transform = res
			// 	}
			// 	// console.log(res);
			// },
			
			// cardTouchStart(e){
			// 	this.pageX = e.touches[0].pageX
			// 	this.pageY = e.touches[0].pageY
			// },
			
			// cardTouchMove(e){
			// 	// console.log(e);
			// 	let offsetX = e.touches[0].pageX - this.pageX
			// 	let offsetY = e.touches[0].pageY - this.pageY
			// 	this.cardTransform(offsetX,offsetY)
			// 	// console.log(offsetX);
			// 	this.pageX = e.touches[0].pageX
			// 	this.pageY = e.touches[0].pageY
			// },
			
			// cardTouchCancel(e){
			// 	this.cardTransform(0,0)
			// 	// console.log("leave");
			// }
		}
	}
</script>

<style scoped>
	.container { 
		font-size: 14px;
		perspective: 4000px;
		height: 100vh;
		background-color: #F4F4F4;
	}
	
	.total-card{
		position: relative;
		top: 100upx;
		width: 550upx;
		height: 800upx;
		margin: 50rpx auto;
		transition: all 1s;
		transform-style: preserve-3d;
		font-size: 40rpx;
		text-align: center;
		/* line-height: 400upx; */
	}
	
	.card,
	.card-reverse{
		width: 550upx;
		height: 800upx;
		position: absolute;
		border-radius: 50upx;
		/* transform: rotate3d(0,0,1,45deg); */
		
		box-shadow: 5upx 10upx 10upx rgba(0,0,0,.2);
		overflow: hidden;
	}
	
	.card text{
		position: absolute;
		left: 0upx;
		width: 550upx;
		text-align: center;
		top: 200upx;
		font-size: 50upx;
	}
	
	.card-reverse text{
		position: absolute;
		width: 550upx;
		text-align: center;
		left: 0upx;
		top: 150upx;
	}
	
	.card{
		background-color: #cde6c7;
		z-index: 1;
	}
	
	.card-reverse{
		background-color: #afb4db;
		transform: rotateY(180deg);
	}
	
	.operation{
		display: flex;
		position: relative;
		bottom: -200upx;
		width: 80%;
		margin: 0 auto;
		border-radius: 30upx;
	}
	
	.operation .opitem{
		flex: 1;
		width: 50upx;
		height: 50upx;
	}
	
	
</style>

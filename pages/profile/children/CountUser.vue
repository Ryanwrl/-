<template>
  <view class="count">
    <view class="count-item">
      <text class="number">
        {{index-cardIndex>0?index-cardIndex:0}}
        <text></text>
      </text>
      <text>本次学习单词</text>
    </view>
    <view class="count-item">
      <text class="number">
				{{3000-index}}
      </text>
      <text>个单词待学</text>
    </view>
    <view class="count-item">
      <text class="number">
        999
        <text></text>
      </text>
      <text>我的积分</text>
    </view>
    <view class="line"></view>
  </view>
</template>

<script>
export default {
  name: "Countuser",
	data(){
		return{
			cardIndex:0,
			
		}
	},
	computed:{
		openId(){
			return this.$store.state.user.openId
		},
		
		
	},
	
	props:{
		index:{
			type:Number
		}
	},
	
	mounted() {
		uniCloud.callFunction({
			name:'getUser',
			data:{
				id:this.openId
			},
			success: (res) => {
				// console.log(res.result.res.data[0].MaxIndex);
				this.cardIndex = res.result.res.data[0].cardIndex
			}
		})
	}
};
</script>

<style scoped>
.count {
  display: flex;
  width: 100%;
}

.count .count-item {
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 85px;
}

.count .count-item:nth-of-type(1),
.count .count-item:nth-of-type(2) {
  border-right: 1px solid #eeeeee;
}

.count .count-item p:first-child {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 3px;
  color: #ff5f3e;
}

.count .count-item p:first-child text {
  font-size: 14px;
  font-weight: normal;
  margin-left: 3px;
  color: #666666;
}

.count .count-item p:last-child {
  font-size: 14px;
  color: #666666;
}

.number{
	color:#349537 ;
	font-weight: 800;
	font-size: 35upx;
}
</style>

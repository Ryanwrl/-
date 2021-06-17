<template>
  <view class="profile">
    
		<login />
		<countuser class="countuser" :index = "this.index"></countuser>
		<view class="line"></view>
		<profile-list />
		
  </view>
</template>

<script>

import Login from "./children/Login";
import Countuser from "./children/CountUser";
import ProfileList from "./children/profileList";


export default {
  name: "Profile",
  components: {  ProfileList, Countuser, Login, },
	data(){
		return{
			index:0
		}
	},
	onTabItemTap() {
		uni.$on('changeIndex',index=>{
			this.index = index
		})
	}
};
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100vh;
	background-color: #f4f4f4;
}


.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.countuser{
	background-color: #FFFFFF;
}


</style>

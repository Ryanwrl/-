<script>
	export default {
		globalData:{
			chosenList:[]
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getStorage({
				key:'user',
				success: (res) => {
					this.$store.commit('userLogin',res.data)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

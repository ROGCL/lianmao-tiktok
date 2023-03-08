<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import {
		getOppenId
	} from 'api.js'
	import {
		decryptedFun
	} from 'utils/aes.js'
	export default {
		data() {
			return {
				code: ""
			}
		},
		onLaunch() {
			this.getCode()
			this.getDevice()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			//获取设备code
			getCode() {
				uni.login({
					success(e) {
						uni.setStorageSync('code', e.code)
						getOppenId({
							code: e.code
						}).then(res => {
							let crypt = decryptedFun(res)
							uni.setStorageSync('openId', crypt.result.data)
						})
					}
				})
			},
			//获取设备信息
			getDevice() {
				uni.getSystemInfo({
					success: (res) => {
						uni.setStorageSync('platform', res.osName)
					}
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

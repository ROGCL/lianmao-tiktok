<template>
	<view class="vip-home">
		<!-- 视频播放板块 -->
		<view class="video-play">
			<video :src="videoPlay" autoplay="true" loop="true" object-fit="cover" id="player" :show-mute-btn="false"
				:show-loading="false" :show-center-play-btn="false" :show-play-btn="false" :show-fullscreen-btn="false"
				:controls="false"></video>
		</view>

		<!-- 购买板块 -->
		<view class="out-bank">
			<view class="buy-vip">
				<!-- 价格选择 -->
				<view class="choose-price">
					<view class="inner" v-for="item in combos" :key="item.id"
						:class="{borderActive:borderActive == item.id ? 1 : 0}" @click="choosePay(item)">
						<h5 class="describe">{{item.title}}</h5>
						<h5 class="price" :class="{txtActive:txtActive == item.id ? 1 : 0}"><span
								class="doller">￥</span>{{item.price}}</h5>
						<h5 class="dec">{{item.hint2}}</h5>
					</view>
				</view>
				<view class="wx-pay">
					<image src="../../static/index-img/37.png" style="width: 40rpx;height: 40rpx;"></image>
					<h5 style="color: #fff;font-size: 24rpx;line-height: 40rpx;margin-left: -550rpx;">微信</h5>
					<view @click="changePay">
						<image style="width: 40rpx;height: 40rpx;" src="../../static/index-img/39.png"
							v-if="wxActive == false"></image>
						<image style="width: 40rpx;height: 40rpx;" src="../../static/index-img/38.png" v-else></image>
					</view>

				</view>
				<!-- 购买按钮 -->
				<view class="buy-btn" @click="buyVip">立即购买,无限换装</view>
				<!-- 协议部分 -->
				<view class="protocol">
					<view @click="agreeProtocol" style="width: 40rpx;height: 40rpx;margin-right: 30rpx;">
						<image src="../../static/index-img/39.png" style="width: 40rpx;height: 40rpx;"
							v-if="agree == false"></image>
						<image src="../../static/index-img/38.png" style="width: 40rpx;height: 40rpx;" v-else></image>
					</view>

					<view style="font-size: 20rpx;display: flex;color: #fff;line-height: 40rpx;">开通即代表接受<h5 @click="turnProtocol" style="color:#FB894C;font-size: 20rpx;line-height: 40rpx;">《会员服务协议》</h5>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		vipList,
		payPal,
		info
	} from '../../api.js'
	import {
		decryptedFun
	} from 'utils/aes.js'
	export default {
		data() {
			return {
				list: [{
					id: 1,
					name: `<h5 style="color:#fff;font-size:20rpx;">开通即代表接受<span style="color:#FB894C;">《会员服务协议》</span></h5>`,
					checked: true
				}],
				borderActive: 55,
				txtActive: 55,
				combos: [], //套餐列表
				comboList: {}, //保存套餐信息(需要默认赋值第一组数据)
				videoPlay: "http://cdn.fwyouni.com/media/default/2302/22/1677032060_fJ67sTinrn.mp4",
				payPalList: {}, //支付相关字段
				wxActive: true, //选择微信支付高亮字段
				agree: false //协议同意字段
			}
		},
		onLoad() {
			this.getlist()
		},
		methods: {
			//选择套餐
			choosePay(item) {
				this.borderActive = item.id
				this.txtActive = item.id
				this.comboList = item
				console.log(item)
			},
			//获取套餐分类的列表
			getlist() {
				vipList().then(res => {
					let list = decryptedFun(res)
					this.combos = list.result.combos
					//默认赋值,以免直接点击购买没有数据请求
					let defaults = {}
					list.result.combos.forEach(val => {
						console.log(val)
						if (val.id == this.borderActive) {
							defaults = val
						}
					})
					this.comboList = defaults
					console.log(this.combos)
				})
			},
			//购买vip
			buyVip() {
				//加上前置校验
				if (this.agree == false) {
					uni.showToast({
						title: "请先勾选同意协议"
					})
				} else if (this.wxActive == false) {
					uni.showToast({
						title: "请选择支付方式"
					})
				} else {
						payPal({
							pay_type: 'jsapi',
							combo_id: this.comboList.id
						}).then(res => {
							console.log(decryptedFun(res))
							let payList = decryptedFun(res).result
							tt.pay({
								orderInfo: {
									order_id: payList.order_id,
									order_token: payList.order_token
								},
								service: 5,
								success:res=> {
									//为0支付成功,1支付超时,2支付失败,3支付关闭,4支付取消
									if (res.code == 0) {
										console.log('hhh')
										info().then(res=>{
											uni.setStorageSync('info',decryptedFun(res).result)
										})
									}else if(res.code == 1){
										uni.showToast({
											title:"支付超时"
										})
									}else if(res.code == 2){
										uni.showToast({
											title:"支付失败"
										})
									}else if(res.code == 3){
										uni.showToast({
											title:"支付关闭"
										})
									}else if(res.code == 4){
										uni.showToast({
											title:"支付取消"
										})
									}else{
										uni.showToast({
											title:"支付失败"
										})
									}
								},
								falil:res=>{
									if(res.errMsg == 10000){
										uni.showToast({
											title:"支付失败"
										})
									}else if(res.errMsg == 10001){
										uni.showToast({
											title:"调起微信支付失败"
										})
									}else{
										uni.showToast({
											title:"请先安装微信后进行操作"
										})
									}
									console.log('fail')
								}
							})
						})
				}
			},
			//跳转用户协议
			turnProtocol() {
				uni.navigateTo({
					url: "/pages/vip/turnAccount/index"
				})
			},
			changePay() {
				if (this.wxActive == false) {
					this.wxActive = true
				} else {
					this.wxActive = false
				}
			},
			agreeProtocol() {
				if (this.agree == false) {
					this.agree = true
				} else {
					this.agree = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.vip-home {
		width: 100%;
		min-height: 100vh;
		background: #000;
		position: relative;

		.video-play {
			width: 100%;
			height: 1056rpx;

			#player {
				width: 100%;
				height: 100%;
			}
		}

		.out-bank {
			position: absolute;
			left: 0;
			top: 800rpx;
			width: 100%;

			// background: #000;
			.buy-vip {

				margin-top: 40rpx;
				width: 686rpx;
				margin: 40rpx auto 20rpx;

				.choose-price {
					display: flex;
					justify-content: space-around;

					.inner {
						width: 218rpx;
						height: 284rpx;
						margin-right: 16rpx;
						border-radius: 24rpx;
						border: 1rpx solid #FFFFFF;
						background: rgba(0, 0, 0, 0.7);

						.describe {
							color: #fff;
							text-align: center;
							font-size: 28rpx;
							font-weight: 600;
							padding-top: 52rpx;
						}

						.price {
							padding-top: 24rpx;
							font-size: 52rpx;
							font-weight: 700;
							color: #fff;
							text-align: center;

							.doller {
								font-size: 24rpx;

							}
						}

						.dec {
							text-align: center;
							padding-top: 24rpx;
							font-size: 24rpx;
							color: #7D808D;
						}
					}



				}

				.wx-pay {
					width: 100%;
					height: 40rpx;
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
				}

				.buy-btn {
					width: 686rpx;
					height: 88rpx;
					margin: 35rpx auto;
					background: linear-gradient(322deg, #FB894C 0%, #FFCE9A 81%, #FFDFA4 100%);
					text-align: center;
					line-height: 88rpx;
					font-weight: 600;
					color: #FFFFFF;
					border-radius: 24rpx;

				}

				.protocol {
					width: 100%;
					height: 40rpx;
					margin-top: 30rpx;
					display: flex;
					// background: pink;
				}
			}
		}
	}
</style>
<style>
	.txtActive {
		color: #FB894C !important;
	}

	.borderActive {
		border: 3rpx solid #FB894C !important;
	}
</style>

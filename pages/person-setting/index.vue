<template>
	<view class="home">
		<!-- 用户信息 -->
		<!-- <view class="bgc-banner"> -->
		<view class="userInfo">
			<!-- 用户头像 -->
			<image :src="infoMes.photourl" class="avator" v-if="infoMes !== ''"></image>
			<image :src="imgs" class="avator" v-else></image>
			<!-- 用户信息 -->
			<view class="infoList">
				<h5 class="user-name" v-if="infoMes !== ''">{{infoMes.nickname}}</h5>
				<h5 class="user-name" v-else @click="loginForm">未登录</h5>
				<image v-for="item in srcList" :key="item.is_vip" v-show="infoMes.is_vip == item.is_vip" :src="item.src"
					class="vip-ava"></image>
			</view>
			<template v-if="infoMes !== ''">
				<view class="copy-box">
					<image src="../../static/index-img/15.png"
						style="width: 28rpx;height: 24rpx;transform: translateY(4rpx);"></image>
					<h5 class="num">{{infoMes.id}}</h5>
					<view class="copy" @click="copyNum">复制</view>
				</view>
			</template>
			<template v-else>
				<view class="copy-box" @click="loginForm">
					<h5 class="nums">点击登录，随心畅玩～！</h5>
				</view>
			</template>
			<view class="login-btn" v-show="infoMes == ''" @click="loginForm">立即登录</view>


		</view>

		<!-- 会员权限展示模块 -->
		<view class="isVip" @click="buyVip" v-show="infoMes !== ''">
			<view class="isVip-inner" v-for="item in vipList" :key="item.id" v-show="item.is_vip == infoMes.is_vip">
				<image :src="item.src" class="vip-img"></image>
				<h5
					style="margin-left: -100rpx;color: #fff;font-weight: 500;font-size: 28rpx;line-height: 52rpx;white-space: nowrap;">
					{{item.time}}
				</h5>
				<h5 style="margin-left: -88rpx;font-weight: 400;font-size: 20rpx;color: #737582;line-height: 52rpx;white-space: nowrap;"
					v-if="infoMes.is_vip == 1 || infoMes.is_vip == 2">将在{{infoMes.vip_end_time |	timeChange}}后到期</h5>
				<h5 style="margin-left: -88rpx;font-weight: 400;font-size: 20rpx;color: #737582;line-height: 52rpx;white-space: nowrap;"
					v-else>{{item.day}}</h5>
				<view class="btn" v-show="infoMes.is_vip !== 3 || item.is_vip !== 3">{{item.nobuy}}</view>
			</view>
		</view>
		<!-- 变脸素材 -->
		<view class="material">
			<!-- 上方文字 -->
			<view class="ma-head">
				<h5 style="font-size: 28rpx;color: #213B52;font-weight: 600;margin-left: 6rpx;white-space: nowrap;">变脸素材
				</h5>
				<view class="ma-btn" @click="editor" v-if="show_cancel == false">编辑</view>
				<view v-else style="display: flex;">
					<view class="ma-btn" style="margin-right:40rpx;" @click="cancel">取消</view>
					<view class="mask-btn" @click="maskDelete">删除</view>
				</view>

			</view>
			<!-- 下方横向滚动 -->
			<view class="ma-bottom">
				<scroll-view class="navscroll" scroll-x="true">
					<view class="scroll-bank" v-for="(item,ind) in materialList" :key="ind" @click="uploadMateria(ind)">
						<view class="icon-dele" @click="changeAttitube(item,ind)" v-show="is_delete">
							<image src="../../static/index-img/39.png" style="width: 100%;height: 100%;"
								v-if="item.checked == false && ind !== 0"></image>
							<image style="width: 100%;height: 100%;" src="../../static/index-img/38.png"
								v-else-if="item.checked==true && ind !== 0"></image>
						</view>
						<image class="ma-img"
							style="width: 88rpx;height: 88rpx;margin-right: 32rpx;border-radius: 88rpx;margin-top: 10rpx;"
							:src="item.src"></image>
					</view>

					<!-- <u-icon></u-icon> -->
				</scroll-view>

			</view>
		</view>
		<!-- </view> -->
		<!-- 选择栏 -->
		<view class="select">
			<!-- 内部框 -->
			<view class="select-inner" v-for="item in infoList" :key="item.id" @click="turnPro(item)"
				:class="{borderActive:borderActive == item.id ? 1 : 0}">
				<view class="choose">
					<image style="width: 48rpx;height: 48rpx;" :src="item.src"></image>
					<h5 style="margin-left: 20rpx;margin-right: 402rpx;">{{item.text}}</h5>
					<!-- <web-view src="https://cat.fwyouni.com/static/link/JTK-UserServe.html"></web-view> -->
					<image style="width: 24rpx;height: 40rpx;" src="../../static/index-img/8.png"></image>
				</view>
			</view>
		</view>

		<!-- 二维码弹出层 -->
		<u-mask :show="serviceShow">
			<view class="mask-innerbox">
				<view class="uicondele" @click="serviceShow = false">
					<u-icon name="close" size="40" color="#fff"></u-icon>
				</view>
				<view style="width: 400rpx;height: 400rpx;margin: 0 auto;">
					<image src="../../static/index-img/26.png" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="mask-inner-btn" @click="saveBtn">保存二维码</view>
			</view>

		</u-mask>
		<u-mask :show="is_modalShow" @click="is_modalShow = false">
			<view class="notice">

				<view class="no-baner">
					<image src="../../static/index-img/21.webp" class="notice-img" style="width: 100%;height: 100%;">
					</image>
					<view class="no-baner-into" @click="clearNotice">
						<image src="../../static/index-img/14.png" style="width: 100%;height: 100%;"></image>
					</view>
				</view>

				<view class="btn" v-for="item in btnList" :key="item.id" :class="{activeBtn:activeBtn == item.id}"
					@click="carmen(item.id)">{{item.txt}}</view>
				<h5 class="notice-txt">我们不会存储你的人脸照片,你可以在应用设置里删除它们</h5>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {
		likeList,
		imageAtion
	} from '../../api.js'
	import {
		decryptedFun
	} from 'utils/aes.js'
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	export default {
		data() {
			return {
				vipList: [{
						id: 1, //月会员
						nobuy: "续费",
						time: "月会员",
						is_vip: 1,
						day: "20",
						src: require('../../static/index-img/5.png'),
					},
					{
						id: 2,
						noBuy: "开通",
						time: "开通会员",
						day: "解锁海量特权",
						src: require('../../static/index-img/17.png'),
						is_vip: 0
					},
					{
						id: 3, //年会员
						nobuy: "续费",
						time: "年会员",
						day: "288",
						src: require('../../static/index-img/16.png'),
						is_vip: 2
					},
					{
						id: 4,
						buy: "续费",
						time: "永久会员",
						day: "永久畅享换装特权",
						is_vip: 3,
						src: require('../../static/index-img/16.png')
					}
				],
				infoList: [{
						id: 1,
						text: "客服中心",
						src: require('../../static/index-img/7.png')
					},
					{
						id: 2,
						text: "我的收藏",
						src: require('../../static/index-img/24.png')
					},
					{
						id: 3,
						text: "用户协议",
						html: "https://cat.fwyouni.com/static/link/JTK-UserServe.html",
						src: require('../../static/index-img/25.png')
					},
					{
						id: 4,
						text: "隐私协议",
						html: 'https://cat.fwyouni.com/static/link/CAT-UserAgreement.html',
						src: require('../../static/index-img/23.png')
					}
				],
				materialList: [{
					src: "../../static/index-img/9.png",
					checked: false
				}],
				borderActive: 3,
				infoMes: {}, //从storage中取的数据
				srcList: [{
						is_vip: 0,
						src: require('../../static/index-img/17.png')
					},
					{
						is_vip: 1,
						src: require('../../static/index-img/5.png')
					},
					{
						is_vip: 2,
						src: require('../../static/index-img/16.png')
					}
				],
				serviceShow: false,
				is_modalShow: false, //素材栏的弹窗标识
				btnList: [{
						id: 1,
						txt: "相册选择"
					},
					{
						id: 2,
						txt: "去拍摄"
					}
				],
				activeBtn: 2, //高亮样式
				photoList: [], //素材库
				is_delete: false, //是否展示该按钮
				show_cancel: false,
				recordList: [], //记录用户选择删除的素材数据
				storageList: [],
				imgs: require('../../static/index-img/50.png'),
				QRcode: "https://cdn.fwyouni.com/media/default/2303/01/1677663205_bzhj86jG7M.png"
			}
		},
		onLoad() {
			this.infoMes = uni.getStorageSync('info')
			if (uni.getStorageSync('material') !== '') {
				this.getInfo()
			}
			// if(uni.getStorageSync('info') !== ''){
			// 	this.getInfo()
			// }
		},
		onShow() {
			this.infoMes = uni.getStorageSync('info')
		},
		onUnload() {
			let arr = []
			this.materialList.forEach(({
				src
			}) => {
				arr.push(src)
			})
			console.log(arr, 'arr')
			let newList = arr.shift()
			uni.setStorageSync('material', arr)
		},
		filters: {
			timeChange(val) {
				let time = val
				if (null != time && "" != time) {
					if (time >= 60 * 60 * 24) {
						time = parseInt(time / 3600.0 / 24) + "天";
					}
				}
				return time;
			}
		},
		methods: {
			//默认从storage中获取用户数据
			getInfo() {
				let lists = uni.getStorageSync('material')
				lists.forEach(val => {
					let obj = {}
					obj.checked = false
					obj.src = val
					console.log(val, '8899')
					this.materialList.push(obj)
				})

			},
			//复制用户账号
			copyNum() {
				console.log('123')
				uni.showModal({
					content:this.infoMes.id,
					confirmText:'复制ID',
					success:res=>{
						if(res.confirm){
							uni.setClipboardData({
								data:this.infoMes.id,
								success:()=>{
									uni.showToast({
										title:"复制成功"
									})
								}
							})
						}else if(res.cancel){
							console.log('用户取消')
						}
					}
				})
				// uni.setClipboardData({
				// 	data: this.infoMes.id,
				// 	success() {
				// 		console.log('success')
				// 	}
				// })
			},
			//跳转协议
			turnPro(item) {
				if (item.id == 2) {
					if (uni.getStorageSync('info') !== '') {
						uni.navigateTo({
							url: '/pages/collect/index',
						})
					} else {
						uni.navigateTo({
							url: "/pages/login/index"
						})
					}

				} else if (item.id == 1) {
					this.serviceShow = true
				} else if (item.id == 3) {
					uni.navigateTo({
						url: "/pages/person-setting/privacy/index"
					})
				} else if (item.id == 4) {
					uni.navigateTo({
						url: "/pages/person-setting/account/index"
					})
				}
			},
			//购买/续费vip会员
			buyVip() {
				uni.navigateTo({
					url: "/pages/vip/index"
				})
			},
			//进入编辑详情页
			editor() {
				this.show_cancel = true
				if (this.is_delete == false) {
					this.is_delete = true
				} else {
					this.is_delete = false
				}
			},
			//取消按钮
			cancel() {
				this.recordList = [] //取消时默认清空选择的删除数组
				this.show_cancel = false
				for (let i = 0; i < this.materialList.length; i++) {
					this.materialList[i].checked = false
				}
				if (this.is_delete == false) {
					this.is_delete = true
				} else {
					this.is_delete = false
				}
			},
			//删除素材操作
			maskDelete() {
				let newArr = []
				this.materialList.forEach(({
					src
				}) => {
					newArr.push(src)
				})
				// console.log(newArr)
				this.recordList.forEach(val => {
					let x = newArr.indexOf(val)
					this.materialList.splice(x, 1)
				})
				this.show_cancel = false
				this.is_delete = false
				console.log(this.materialList, 'fujhasgdc')
			},
			//上传素材
			uploadMateria(ind) {
				console.log(ind)
				if (ind == 0) {
					this.is_modalShow = true
				}
			},
			clearNotice() {
				this.is_modalShow = false
			},
			//拍照或相册选择
			carmen(id) {
				let txt = ""
				if (id == 1) {
					txt = "album"
				} else {
					txt = "camera"
				}
				uni.chooseImage({
					count: 1,
					sourceType: [txt],
					success: res => {
						//流程1、判断图片大小。2、图片转base64格式。3、调imageAtion接口进行判断图片是否合规，合规成功上传存储到本地,不合规提醒
						if (res.tempFiles[0].size < 5000000) {
							pathToBase64(res.tempFilePaths[0]).then(base64 => {
								let base = ""
								let newBase = base.concat(base64).replace('data:image/png;base64,', '')
								imageAtion({
									image: newBase
								}).then(result => {
									if (decryptedFun(result).result.check == 1) {
										let back = ""
										res.tempFilePaths.forEach(val => {
											// console.log(val)
											back = val
										})
										let obj = {}
										this.materialList.forEach((val, ind) => {
											console.log(back, 'kkk')
											console.log(val)
											if (val.src == back) {
												this.materialList.splice(ind, 1)
											} else {
												// let obj = {}
												obj.checked = false
												obj.src = back

											}
										})
										this.materialList.push(obj)
										console.log(this.materialList, 'jjj')
									} else {
										this.is_modal = false
										uni.showToast({
											title: "图片审核未通过,请重新上传"
										})
									}
								})
							})
						} else {
							uni.showToast({
								title: "图片不能超过5M"
							})
						}
					}

				})
			},
			//编辑素材出现的选择框的选项
			changeAttitube(item, ind) {
				console.log(item, ind)
				if (this.materialList[ind].checked == false) {
					this.materialList[ind].checked = true
					this.recordList.push(item.src)
					console.log(this.recordList, 'das')
				} else {
					this.materialList[ind].checked = false
					let bol = this.recordList.indexOf(this.materialList[ind].src)
					if (bol !== -1) {
						this.recordList.splice(bol, 1)
					}
				}
			},
			//跳转登录
			loginForm() {
				uni.navigateTo({
					url: "/pages/login/index"
				})
			},
			//保存二维码的操作
			saveBtn() {
				// pathToBase64(this.QRcode).then(base64=>{
				// 	console.log(base64)
				// })
				uni.downloadFile({
					url: this.QRcode,
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: res => {
								this.serviceShow = false
								uni.showToast({
									title: "请到相册查看"
								})
							},
							fail: err => {
								this.serviceShow = false
								uni.showToast({
									title: "保存失败,请稍后再试"
								})
							}
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		// position: relative;
		width: 670rpx;
		min-height: 100vh;
		margin: 0 auto;

		// .bgc-banner{
		// 	width: 750rpx;
		// 	height: 800rpx;
		// 	position: absolute;
		// 	left: 0;
		// 	top: 0;
		// }
		.userInfo {
			position: relative;
			display: flex;
			width: 100%;
			height: 120rpx;
			margin-top: 30rpx;

			.login-btn {
				position: absolute;
				right: 0;
				top: 40rpx;
				width: 120rpx;
				height: 52rpx;
				background: #fff;
				border-radius: 32rpx;
				font-weight: 600;
				color: #213B52;
				text-align: center;
				line-height: 52rpx;
				font-size: 22rpx;
			}

			.avator {
				width: 120rpx;
				height: 120rpx;
				border-radius: 120rpx;
			}

			.infoList {
				position: absolute;
				left: 120rpx;
				top: -10rpx;
				display: flex;
				width: 500rpx;
				height: 56rpx;
				margin-left: 40rpx;
				margin-top: 30rpx;

				.user-name {
					// width: 400rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.vip-ava {
					width: 40rpx;
					height: 40rpx;
					margin-left: 20rpx;
					transform: translateY(2rpx);
				}
			}

			.copy-box {
				position: absolute;
				top: 80rpx;
				left: 150rpx;
				display: flex;
				width: 500rpx;
				height: 30rpx;

				// background: hotpink;
				.num {
					// margin-top: -20rpx;
					margin-left: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #23294B;
				}

				.nums {
					font-size: 24rpx;
					font-weight: 400;
					color: #23294B;
				}

				.copy {
					margin-left: 20rpx;
					cursor: pointer;
					z-index: 888;
					font-weight: 400;
					color: #213B52;
					font-size: 24rpx
				}
			}
		}

		.isVip {
			width: 100%;
			height: 108rpx;
			background: linear-gradient(303deg, #252432 0%, #3E4357 100%);
			margin-top: 48rpx;
			border-radius: 24rpx;

			.isVip-inner {
				display: flex;
				justify-content: space-between;
				width: 630rpx;
				height: 52rpx;
				margin: 0 auto;
				transform: translateY(27rpx);

				.vip-img {
					width: 52rpx;
					height: 52rpx;

					transform: translateY(5rpx);
				}

				.btn {
					width: 120rpx;
					height: 52rpx;
					background-image: url('../../static/index-img/6.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					text-align: center;
					line-height: 52rpx;
					color: #CE481D;
					font-size: 22rpx;
					font-weight: 600;
				}
			}
		}

		.material {
			width: 670rpx;
			height: 228rpx;
			background: #fff;
			margin-top: 32rpx;
			border-radius: 24rpx;

			.ma-head {
				display: flex;
				justify-content: space-between;
				width: 646rpx;
				height: 40rpx;
				margin: 0 auto;
				flex-wrap: nowrap;
				padding-top: 28rpx;

				.ma-btn {
					width: 76rpx;
					height: 40rpx;
					background: rgba(165, 176, 213, 0.18);
					border-radius: 22rpx;
					text-align: center;
					line-height: 40rpx;
					font-weight: 400;
					color: #213B52;
					font-size: 20rpx;
					cursor: pointer;
					white-space: nowrap;
				}

				.mask-btn {
					width: 76rpx;
					height: 40rpx;
					background: #FB894C;
					border-radius: 22rpx;
					text-align: center;
					line-height: 40rpx;
					font-weight: 400;
					color: #213B52;
					font-size: 20rpx;
					cursor: pointer;
				}
			}

			.ma-bottom {
				width: 638rpx;
				margin: 60rpx auto 0;
				height: 88rpx;
				margin-top: 60rpx;

				.navscroll {
					white-space: nowrap;
					overflow: hidden;
					width: 100%;
					height: 100rpx;

					.scroll-bank {
						position: relative;
						display: inline-block;
						width: 100rpx;
						height: 100rpx;
						border-radius: 88rpx;

						.icon-dele {
							position: absolute;
							right: 8rpx;
							top: -12rpx;
							width: 20rpx;
							height: 20rpx;
							border-radius: 20rpx;
							// background: pink;
						}
					}
				}

			}
		}

		.select {
			width: 100%;
			height: 448rpx;
			background: #fff;
			margin-top: 32rpx;
			border-radius: 24rpx;

			.borderActive {
				border-bottom: none;
			}

			.select-inner {
				width: 606rpx;
				height: 112rpx;
				margin: 0 auto;
				border-bottom: 1px solid #EBEDF3;

				.choose {
					display: flex;
					padding-top: 45rpx;
				}
			}

		}

		.notice {

			width: 650rpx;
			height: 708rpx;
			background: #fff;
			border-radius: 32rpx;
			margin: 350rpx auto;

			.no-baner {
				position: relative;
				width: 100%;
				height: 360rpx;

				.no-baner-into {
					position: absolute;
					right: 40rpx;
					top: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}

			.btn {
				width: 496rpx;
				height: 88rpx;
				margin: 20rpx auto;
				text-align: center;
				line-height: 88rpx;
				font-size: 28rpx;
				color: #213B52;
				font-weight: 600;
				background: #A9DDD8;
				border-radius: 44rpx;
			}

			.activeBtn {
				background: rgba(33, 59, 82, 0.1);
			}

			.notice-txt {
				width: 496rpx;
				margin: 0 auto;
				color: #828282;
				font-weight: 400;
				text-align: center;
				white-space: wrap;
				font-size: 24rpx;
			}
		}

		.mask-innerbox {
			position: relative;
			width: 480rpx;
			height: 500rpx;
			border-radius: 24rpx;
			margin: 0 auto;
			transform: translateY(65%);

			.uicondele {
				position: absolute;
				right: -20rpx;
				top: -20rpx;

			}

			.mask-inner-btn {
				width: 400rpx;
				height: 80rpx;
				margin: 20rpx auto 0;
				background: #A9DDD8;
				text-align: center;
				font-size: 26rpx;
				line-height: 80rpx;
				border-radius: 24rpx;
				color: #fff;
			}
		}
	}
</style>

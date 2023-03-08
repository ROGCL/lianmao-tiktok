<template>
	<view class="main-img">
		<view class="video-train">
			<video :src="mainList.linkfile" autoplay="true" loop="true" object-fit="cover" id="player"
				:show-mute-btn="false" :show-loading="false" :show-center-play-btn="false" :show-play-btn="false"
				:show-fullscreen-btn="false" :controls="false" v-if="resultList == ''"></video>
				<video :src="resultList" autoplay="true" loop="true" object-fit="cover" id="player"
					:show-mute-btn="false" :show-loading="false" :show-center-play-btn="false" :show-play-btn="false"
					:show-fullscreen-btn="false" :controls="false" v-else></video>
		</view>

		<view class="collect">
			<u-icon name="heart" size="45" color="#fff" @click="collectModal" v-if="colModel == 0"></u-icon>
			<u-icon name="heart-fill" size="45" color="#fa3534" @click="collectModal" v-else></u-icon>
		</view>

		<view class="inner">
			<view class="tab" v-if="photoList.length > 1 && resultList == ''">
				<view class="tab-inner">
					<scroll-view class="navscroll" scroll-x="true">
						<view class="nav-inner-box" v-for="(item,ind) in photoList" :key="ind"
							@click="chooseBanner(item,ind)">
							<image class="nav-img" :src="item" :class="{boxActive:boxActive == ind}">
							</image>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="btn" @click="produck" v-if="resultList == ''">立即制作</view>
			<view class="btn" @click="saveVideo" v-else>保存视频</view>
		</view>
		<u-mask :show="is_modal">
			<view class="modal-box">
				<view class="top">
					<image src="../../static/index-img/14.png" class="dele" @click="is_modal = false"></image>
					<h5 class="title">上传视频或图片素材</h5>
					<view class="content">
						<ul>
							<li v-for="item in content" :key="item.content" style="font-size: 28rpx;color: #213B52;">
								{{item.txt}}
							</li>
						</ul>
					</view>
					<view class="btn-choose">
						<view class="sele-btn" @click="shoot">去拍摄</view>
						<view class="sele-btn btn-pri" @click="selectPhoto">相册选择</view>
					</view>
				</view>
				<view class="bottom">

				</view>
			</view>
		</u-mask>
		<view class="loading" v-show="productShow">
		<u-loading mode="circle" size="60" color="#55ff00" id="load"></u-loading>
		<h5 class="loadTxt" v-if="txtChange == 1">视频生成中,请稍等</h5>
		<h5 class="loadTxt" v-else>视频保存中,请稍等</h5>
	</view>
	</view>
</template>

<script>
	import {
		collectFace,
		likeStatusGet,
		createFaceTask,
		imageAtion,
		resultFace
	} from '../../api.js';
	import {
		decryptedFun
	} from 'utils/aes.js';
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	export default {
		data() {
			return {
				is_material: true,
				is_modal: false,
				content: [{
						id: 1,
						txt: '1、素材中有且只有单个人脸'
					},
					{
						id: 2,
						txt: '2、素材不能与政治人物相关'
					},
					{
						id: 3,
						txt: '3、素材不能与色情、暴力相关'
					}
				],
				colModel: 0, //是否收藏了的
				mainList: {}, //接收的数据列表
				photoList: [
					"../../static/index-img/12.png"
				], //相册列表
				boxActive: 1, //选中模板高亮控制字段
				infoListMes: {}, //用户信息列表
				photoMes: "", //点击的素材模板
				// timer: null,
				resultList:"", //制作结果
				txtChange:1, //文字切换字段
				productShow:false, //加载中模糊窗
			}
		},
		onLoad(options) {
			// this.mainList = options.data
			if (options !== null) {
				this.mainList = JSON.parse(decodeURIComponent(options.data))
				console.log(this.mainList, '8899')
			}
			 if(uni.getStorageSync('material') !== ''){
				let lists = uni.getStorageSync('material') //获取素材情况
				console.log(lists, 'kdsasa')
				lists.forEach(val => {
					this.photoList.push(val)
				})
			}
			 if(uni.getStorageSync('info') !== ''){
				this.infoListMes = uni.getStorageSync('info')
			}
			console.log(this.infoListMes)
			this.getStatus()
		},
		onUnload() {
			let nenwList = this.photoList.shift()
			uni.setStorageSync('material', this.photoList) //存储素材数据	
		},
		methods: {
			//点击制作
			produck() {
				if (this.photoList.length == 1) {
					//没有素材,直接拉起弹窗
					this.is_modal = true
				} else {
					//有素材,且是会员的状态
					if (this.infoListMes.is_vip !== 0) {
						//选择好素材之后,直接提交
						//默认赋值
						if(this.photoMes == ''){
							pathToBase64(this.photoList[1]).then(base64=>{
								let base = ""
							    let newBase = base.concat(base64).replace('data:image/png;base64,', '')
								console.log(newBase)
								this.photoMes = newBase
								this.getCreateFaceTask()
							})
						}else{
							this.getCreateFaceTask()
						}
					} else {
						console.log(this.photoMes, 'jsadkdasjf')
						//没有直接跳转会员中心(并保存数据)
						uni.navigateTo({
							url: '/pages/vip/index'
						})
					}
				}
			},
			//开始制作
			getCreateFaceTask() {
				this.productShow = true
				createFaceTask({
					ProjectId: this.mainList.ProjectId,
					ModelId: this.mainList.ModelId,
					image: this.photoMes
				}).then(res => {
					console.log(decryptedFun(res))
					let result = decryptedFun(res)
					if (result.status !== 1) {
						this.productShow = false
						uni.showToast({
							title: result.msg
						})
					} else {
							resultFace({
								JobId: result.result.JobId
							}).then(res => {
								let attitube = decryptedFun(res)
                               if (attitube.status == 0) {
									this.timer = setInterval(() => {
										setTimeout(() => {
                                              this.getResult(result)
										}, 0)
									}, 2000)
								} else {
									this.productShow = false
									clearInterval(this.timer)
									uni.showToast({
										title: attitube.msg
									})
								}
							})
					}
				})
			},
			//轮询获取结果
			getResult(result){
				resultFace({
					JobId: result.result.JobId
				}).then(res=>{
					console.log(decryptedFun(res))
					if(decryptedFun(res).status == 1){
						clearInterval(this.timer)
						this.productShow = false
						this.resultList = decryptedFun(res).result.url
						console.log(this.resultList)
					}
				})
			},
			//进入页面获取收藏状态
			getStatus() {
				likeStatusGet({
					id: this.mainList.id
				}).then(res => {
					this.colModel = decryptedFun(res).result.likeStatus
				})
			},
			//保存视频
			saveVideo(){
				this.txtChange = 2
				this.productShow = true
				
				uni.downloadFile({
					url:this.resultList,
					success:res=>{
						if(res.statusCode === 200){
							uni.saveVideoToPhotosAlbum({
								filePath:res.tempFilePath,
								success:result=>{
									this.productShow = false
									uni.showToast({
										title:'保存成功,请前往相册查看'
									})
								},
								fail:error=>{
									this.productShow = false
									uni.showToast({
										title:"保存失败请稍后再试"
									})
								}
							})
						}
					}
				})

			},
			//去拍摄
			shoot() {
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: res => {
						if (res.tempFiles[0].size < 5000000) {
							pathToBase64(res.tempFilePaths[0]).then(base64 => {
								let base = ""
								let newBase = base.concat(base64).replace('data:image/png;base64,', '')
								imageAtion({
									Image: newBase
								}).then(result => {
									if (decryptedFun(result).result.check == 1) {
										this.is_modal = false
										res.tempFilePaths.forEach(val => {
											this.photoList.push(val)
										})
									} else {
										this.is_modal = false
										uni.showToast({
											title: "图片审核未通过,请重新上传"
										})
									}
								})
							})
						} else {
							this.is_modal = false
							uni.showToast({
								title: "图片不能超过5M"
							})
						}
					}
				})
			},
			//相册选择
			selectPhoto() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: res => {
						console.log(res)
						if (res.tempFiles[0].size < 5000000) {
							pathToBase64(res.tempFilePaths[0]).then(base64 => {
								let base = ""
								let newBase = base.concat(base64).replace('data:image/png;base64,', '')
								// base = base64
								imageAtion({
									image: newBase
								}).then(result => {
									console.log(decryptedFun(result))
									if (decryptedFun(result).result.check == 1) {
										this.is_modal = false
										res.tempFilePaths.forEach(val => {
											let obj = this.photoList.find(item =>
												item ==
												val)
											//==undefined没有相同的,!==undefined有相同的,将相同的提取到第一个,并把后面相同的进行删除
											if (obj == undefined) {
												this.photoList.push(val)
											} else {
												this.photoList.splice(1, 0, val)
												this.photoList = Array.from(new Set(
													this
													.photoList))
											}
										})
										console.log(this.photoList, 'kdsal')
										// if (this.photoList.length == 1) {
										// 	this.photoMes = val //默认赋值,以免为空
										// }
									} else {
										this.is_modal = false
										uni.showToast({
											title: "图片审核未通过,请重新上传"
										})
									}
								})
							})
						} else {
							this.is_modal = false
							uni.showToast({
								title: "图片不能超过5M"
							})
						}
					}
				})

			},
			//收藏按钮
			collectModal(ind) {
				collectFace({
					id: this.mainList.id
				}).then(res => {
					let result = decryptedFun(res)
					if (result.msg == 'success' && this.colModel == 0) {
						this.colModel = 1
					} else {
						this.colModel = 0
					}
				})

			},
			chooseBanner(item, ind) {
				//转换base64格式
				pathToBase64(item).then(base64 => {
					let base = ""
					let newBase = base.concat(base64).replace('data:image/png;base64,', '')
					this.photoMes = newBase
				})
				if (ind == 0) {
					this.is_modal = true
				} else {
					this.boxActive = ind
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-img {
		position: relative;
		width: 100%;
		height: 100vh;
        .loading{
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, .7);
			width: 100%;
			height: 100vh;
			#load{
				position: absolute;
				left: 50%;
				top: 50%;
			}
			.loadTxt{
				position: absolute;
				left: 38%;
				top: 55%;
				color: #fff;
			}
		}
		.video-train {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;

			#player {
				width: 100%;
				height: 100%;
			}
		}

		.collect {
			position: absolute;
			right: 50rpx;
			top: 50rpx;
			width: 80rpx;
			height: 80rpx;
		}

		.inner {
			position: absolute;
			bottom: 88rpx;
			left: 32rpx;
			width: 686rpx;
			height: 336rpx;

			.tab {
				width: 100%;
				height: 158rpx;
				background: rgba(37, 45, 67, 0.5);
				margin-bottom: 40rpx;
				border-radius: 16rpx;

				.tab-inner {
					padding-top: 40rpx;
					margin-left: 20rpx;

					.navscroll {
						white-space: nowrap;
						overflow: hidden;
						width: 100%;
						height: 128rpx;

						.boxActive {
							padding: 4rpx;
							border: 2rpx solid #A9DDD8;
						}

						.nav-inner-box {
							display: inline-block;
							width: 88rpx;
							height: 88rpx;
							border-radius: 88rpx;
							margin-right: 40rpx;

							.nav-img {
								display: inline-block;
								width: 88rpx;
								height: 88rpx;
								margin-right: 40rpx;
								border-radius: 88rpx;
							}
						}
					}
				}
			}


		}

		.btn {
			position: fixed;
			bottom: 88rpx;
			width: 686rpx;
			height: 88rpx;
			background: #A9DDDB;
			border-radius: 32rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #213B52;
		}

		.modal-box {
			width: 650rpx;
			height: 536rpx;
			border-radius: 32rpx;
			margin: 400rpx auto;
			background: #fff;

			.top {
				position: relative;
				width: 100%;
				height: 468rpx;
				background-repeat: no-repeat;
				background-size: 100% 100%;

				.dele {
					position: absolute;
					right: 20rpx;
					top: 20rpx;
					width: 60rpx;
					height: 60rpx;
				}

				.title {
					font-size: 40rpx;
					color: #333;
					font-weight: 600;
					text-align: center;
					padding-top: 60rpx;
				}

				.content {
					width: 390rpx;
					height: 160rpx;
					margin: 60rpx auto 80rpx;
				}

				.btn-choose {
					display: flex;
					justify-content: space-between;
					width: 502rpx;
					height: 80rpx;
					margin: 0 auto;

					// background: #A9DDDB;
					.sele-btn {
						width: 234rpx;
						height: 100%;
						background: rgba(33, 59, 82, 0.1);
						border-radius: 40rpx;
						line-height: 80rpx;
						text-align: center;
						font-size: 28rpx;
						font-weight: 600;
						color: #213B52;
					}

					.btn-pri {
						background: #A9DDD8;
					}
				}
			}
		}
	}
</style>

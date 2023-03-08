<template>
	<view class="index">
		<view class="banner">
			<!-- 顶部会员中心、搜索、个人中心 -->
			<!-- <u-sticky z-index="9999"> -->
			<view class="bgc-outside">

				<view class="bgc">

					<view class="header">
	<view class="vip" @click="toVipCenter" v-if="infoList !== ''">
<!-- 		<image style="width: 100%;height: 100%;object-fit: contain;" v-for="item in identification" :key="item.id"  :src="item.src" v-show="item.is_vip == infoList.is_vip"></image> -->
<image style="width: 100%;height: 100%;object-fit: contain;" :src="identification[infoList.is_vip].src"></image>
	</view>
	<view class="vip" @click="toVipCenter" v-else>
		<image style="width: 100%;height: 100%;object-fit: contain;"   :src="identification[0].src" ></image>
	</view>
<!-- <template v-else>
	<view class="vip" @click="toVipCenter" >
		<image style="width: 100%;height: 100%;object-fit: contain;" :src="srcs"></image>
	</view>
</template> -->


						<view class="search" @click="toSearchCenter">
							<view class="inner-box">
								<image src="../../static/index-img/4.png" class="search-img"></image>
								<h5 style="transform: translateY(2px);">搜索你想要的模板</h5>
							</view>

						</view>
						<view class="setting" @click="toPersonSetting">
							<image src="../../static/index-img/33.png"
								style="width: 100%;height: 100%;object-fit: contain;"></image>
						</view>
					</view>
					<!-- 上方横向滚动选择区域 -->

					<view class="block-heaader">
						<u-tabs name="name" :list="tenfacetype" :current="current" @change="change"
							inactive-color="#213B52" bg-color="#fff" active-color="#213B52"></u-tabs>
					</view>
				</view>
			</view>
			<!-- </u-sticky> -->
			<!-- 下方板块展示区域 -->
			<view class="block">


				<!-- 下方瀑布流部分 -->
				<view class="water-pool">
					<view class="water-inner">
						<view class="water-box" v-for="item in list" :key="item.id" @click="turnDetails(item)">
							<image class="water-img" :src="item.thumbimage"
								style="border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;"></image>
							<h5 class="water-class">{{item.name}}</h5>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadStatus" />
			</view>
		</view>
		<view class="wrap">
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>

</template>

<script>
	import {
		classify,
		tenface
	} from '../../api.js'
	import {
		decryptedFun
	} from 'utils/aes.js'
	export default {
		data() {
			return {
				tenfacetype: [], //换脸分类的数据
				current: 0, //换脸分类的选中项
				loadStatus: 'loadmore',
				list: [],
				scrollTop: 600,
				tenfaceId: 1, //换脸模板ID
				page: 1, //当前页
				pageSize: 20, //展示限制
				identification: [
					{
						id: 1, //非会员
						src: require('../../static/index-img/17.png'),
						is_vip: 0
					},
					{
						id: 2, //会员
						src: require('../../static/index-img/16.png'),
						is_vip: 1
					},
					{
						id: 3, //永久会员
						src: require('../../static/index-img/5.png'),
						is_vip: 2
					},

				],
				infoList: {} //存储用户信息
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getTenfacetype();
			this.getTenface()
			console.log(uni.getStorageSync('info'),'8899')
			if(uni.getStorageSync('info') !== ''){
				this.infoList = uni.getStorageSync('info')
			}else{
				this.infoList = ''
			}
			

		},
		onShow() {
			console.log(uni.getStorageSync('info'),'9988')
		    if(uni.getStorageSync('info') !== ''){
		    	this.infoList = uni.getStorageSync('info')
		    }else{
				this.infoList = ''
			}	
		},
		onReachBottom() {
			console.log('触底了')
			this.loadStatus = 'loading';
			this.page++
			// 模拟数据加载
			setTimeout(() => {
				this.loadStatus = 'loadmore';
				this.getTenface()
			}, 500)
		},
		methods: {
			//去会员中心
			toVipCenter() {
				if(uni.getStorageSync('info') !== ''){
					uni.navigateTo({
						url: "/pages/vip/index"
					})
				}else{
				   return uni.navigateTo({
						url:"/pages/login/index"
					})
				}

			},
			//去搜索模块
			toSearchCenter() {
				uni.navigateTo({
					url: "/pages/search/index"
				})
			},
			//去个人中心
			toPersonSetting() {
				uni.navigateTo({
					url: "/pages/person-setting/index"
				})
			},
			change(index) {
				this.list = []
				this.current = index;
				this.tenfaceId = this.tenfacetype[index].id
				console.log(this.current)
				this.page = 1
				this.getTenface()
			},
			turnDetails(item) {
				console.log(item)
				if(uni.getStorageSync('info') !== ''){
					uni.navigateTo({
						url: '/pages/details/index' + `?data=${encodeURIComponent(JSON.stringify(item))}`
					})
				}else{
				return uni.navigateTo({
						url:"/pages/login/index"
					})
					
				}

			},
			//获取模板分类
			getTenfacetype() {
				classify().then(res => {
					let list = decryptedFun(res)
					console.log(list)
					this.tenfacetype = list.result
				})
			},
			//默认请求第一页的换脸模板
			getTenface() {
				tenface({
					type: this.tenfaceId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					let lists = decryptedFun(res).result
					let filte = lists.filter((val,ind)=>{
						return val.linkfile !== ""
					})
					let menu = this.list.concat(filte)
					this.list = menu
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	$mainColor:#F1F4F7;

	.index {
		position: relative;
		background-color: $mainColor;

		.banner {
			// width: 718rpx;
			min-height: 100vh;
			// margin: 0 auto;
			background: $mainColor;

			.bgc-outside {
				
                width: 100%;
				height: 176rpx;

				.bgc {
					
					position: fixed;
					width: 750rpx;
					height: 176rpx;
					// z-index: 9999;

					.header {
						$rpx: 88rpx;
						z-index: 999;
						display: flex;
						justify-content: space-between;
						width: 100%;
						height: 88rpx;
						background: rgba(255, 255, 255, 1);

						.vip {
							width: $rpx;
							height: $rpx;
							margin-left: 20rpx;
						}

						.search {
							width: 510rpx;
							height: 72rpx;
							margin-top: 10rpx;
							border-radius: 36rpx;
							background: #ffffff;

							.inner-box {
								display: flex;
								width: 300rpx;
								margin: 12rpx auto;

								.search-img {
									width: 48rpx;
									height: 48rpx;
								}
							}

						}

						.setting {
							width: 88rpx;
							height: 88rpx;
						}
					}
				}

				.block-heaader {
					z-index: 999;
					background: #ffffff;
					height: 88rpx;
					// margin-bottom: 20rpx;
				}
			}

			.block {
				width: 718rpx;
				margin: 0 auto;

				.water-inner {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.water-box {
						width: 352rpx;
						height: 672rpx;
						margin-top: 20rpx;
						border-radius: 16rpx;
						background: #ffffff;

						.water-img {
							width: 100%;
							height: 592rpx;
						}

						.water-class {
							width: 100%;
							height: 80rpx;
							text-align: center;
							line-height: 80rpx;
							font-size: 28rpx;
							font-weight: normal;
							color: #000;
						}
					}
				}
			}
		}
	}
</style>

<style>
	page {
		background-color: rgba(240, 240, 240);
	}
</style>

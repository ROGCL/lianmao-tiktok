<template>
	<view class="banner">
		<view class="block">
			<!-- 下方瀑布流部分 -->
			<view class="water-pool">
				<view class="water-inner">
					<view class="water-box" v-for="item in list" :key="item.id" @click="turnDetails(item)">
						<image class="water-img" :src="item.thumbimage" style="border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;"></image>
						<h5 class="water-class">{{item.name}}</h5>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" />
		</view>
		<view class="wrap">
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>
</template>

<script>
	import {
		likeList
	} from '../../api.js'
	import {
		decryptedFun
	} from 'utils/aes.js'
	export default {
		data() {
			return {
				list: [],
				loadStatus: 'loadmore',
				loadText:{
					loadmore:"轻轻下滑",
					loading:"努力加载中",
					nomore:"没有了"
				},
				scrollTop:0,
				page:1,
				pageSize:10,
				hiding:false,
				changeList:[],
				lisLength:0,
				lastList:[] //最后两条数据
			}
		},
		onLoad() {
			console.log('into')
			this.getLikeList()
		},
		onShow() {
			if(this.hiding == true){
				let len = uni.getStorageSync('lengths')
				let top = uni.getStorageSync('scrollTop')
				let last = uni.getStorageSync('lastList')
					this.page = 1
					this.pageSize = len
					this.list = []
					this.getLikeList()
				uni.pageScrollTo({
					scrollTop:top-200,
					duration:300
				})
				

			}
		},
		onPageScroll(e) {
			// console.log(e.scrollTop)
			this.scrollTop = e.scrollTop;
		},
		onHide() {
			this.hiding = true
			uni.setStorageSync('lengths',this.lisLength)
			uni.setStorageSync('lastList',this.lastList)
		   	// console.log('12345')	
		},
		onUnload() {
		uni.removeStorageSync('scrollTop')
		uni.removeStorageSync('lengths',this.lisLength)
		},
		onReachBottom() {
           this.loadStatus = 'loading';
           this.page++
           // 模拟数据加载
           setTimeout(() => {
			   if(this.changeList.length < 10){
			   	this.loadStatus = 'nomore'
			   }else{
				   this.loadStatus = 'loadmore';
				   this.getLikeList()
			   }

           }, 500)
		},
		methods: {
			getLikeList() {
				likeList({page:this.page,pageSize:this.pageSize}).then(res => {
					this.changeList = decryptedFun(res).result
					if(this.hiding == false){
						this.list = this.list.concat(decryptedFun(res).result)
						this.lisLength = this.list.length
						if(this.changeList.length < 10){
							this.lastList.push(this.list[this.lisLength-1])
							this.lastList.push(this.list[this.lisLength-2])
						}

						console.log(this.lastList)
					}else{
						decryptedFun(res).result.forEach(val=>{
							this.list.push(val)
							this.lisLength = this.list.length
						})
					}
				})
			},
			turnDetails(item) {
				console.log(this.page)
				uni.setStorageSync('scrollTop',this.scrollTop)
				uni.navigateTo({
					url: '/pages/details/index' + `?data=${encodeURIComponent(JSON.stringify(item))}`,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.banner {
		width: 100%;
		min-height: 100vh;
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
</style>

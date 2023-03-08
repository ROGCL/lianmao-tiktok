<template>
	<view class="home">
		<view class="search">
			<u-search placeholder="搜索你想要的模板" v-model="searchWord" action-text="取消" focus="true" @custom="backHome"
				@search="searchInfo" height="80" bg-color="#fff" shape="round"></u-search>
		</view>
		<view class="search-history" v-show="historyList.length > 0 && is_show == true">
			<view class="his-kouBox">
				<h3 style="color:#000;">搜索历史</h3>
				<view class="icon-his" @click="clearHistory">
					<u-icon name="trash"></u-icon>
					<h3 style="color: #7D808D;margin-left: 10rpx;" >清除</h3>
				</view>
			</view>
			
			<view class="hisWord">
				<view class="hisDown" @click="searchHistory(item)" v-for="(item,ind) in historyList" :key="ind">{{item}}</view>
			</view>
		</view>
		<view class="hotSearch" v-if="is_show == true">
			<h3 class="font">热门搜索</h3>
			<!-- 热搜关键词模块 -->
			<view class="keyWord">
				<!-- 下分模块 -->
				<view class="down" v-for="item in hotList" :key="item.id" @click="chooseModal(item)">{{item.title}}</view>
			</view>
		</view>
		<view class="block" v-else>
			<!-- 下方瀑布流部分 -->
			<view class="water-pool">
				<view class="water-inner">
					<view class="water-box" v-for="item in searchList" :key="item.id" @click="chooseBlock(item)">
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
		tenface,hsearch
	} from '../../api.js'
	import {
		decryptedFun
	} from 'utils/aes.js'
	export default {
		data() {
			return {
				hotList:[], //热搜列表
			    page:1,
				pageSize:10,
				tenfaceId:1, //默认热搜请求首页的10个数据
				is_show:true, //是否隐藏热搜关键词栏
				loadStatus:'loadmore',
				scrollTop: 600,
				searchWord:"", //搜索词汇
				searchList:[], //搜索出来的结果数组
				historyList:[], //搜索历史列表
				storageList:[] //取出来的本地暂存列表
			}
		},
		onLoad() {
			this.getHsearch()
			if(uni.getStorageSync('historyList') !== ''){
				let lists = uni.getStorageSync('historyList')
				lists.forEach(val=>{
					console.log(val)
					this.historyList.push(val)
				})
			}else{
				this.historyList = []
			}

			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			this.page++
			setTimeout(()=>{
				this.loadStatus = 'loadmore'
				this.getHotSearch()
			},500)
		},
		// onHide() {
		//    uni.setStorageSync('historyList',this.historyList)
		// },
		onUnload() {
			uni.setStorageSync('historyList',this.historyList)
		},
		methods: {
			//搜索右侧控件返回主页
			backHome() {
				if(this.is_show == true){
					uni.navigateBack()
				}else{
					this.is_show = true
					this.searchWord = ""
					this.searchList = []
					this.getHsearch()
				}
				
			},
			//搜索的请求发送
			searchInfo() {
				if (this.keyword == '') {
					uni.showToast({
						title: "请输入搜索内容"
					})
				}else{
					this.searchList = []
					this.getHotSearch()
					this.is_show = false
				}
			},
			//热门搜索的选择
			chooseModal(item){
				this.searchWord = item.title
				this.tenfaceId = item.typeValue
				this.getHotSearch()
				this.is_show = false
			},
			//获取热搜列表
			getHsearch(){
				hsearch({typeValue:1}).then(res=>{
					this.hotList = decryptedFun(res).result
				})
			},
			//搜索结果
		getHotSearch(){
			this.historyList.push(this.searchWord)
			let arr = this.historyList.filter((item,ind,array)=>{
				return array.indexOf(item) === ind
			})
				this.historyList = arr
			console.log(this.historyList.includes(this.searchWord))
		tenface({id:this.tenfaceId,page:this.page,pageSize:this.pageSize,search:this.searchWord}).then(res=>{
					let list = decryptedFun(res).result
					console.log(list,'search')
					let menu = this.searchList.concat(list)
					this.searchList = menu
				})
			},
			//跳转详情页
			chooseBlock(item){
				uni.navigateTo({
				url: '/pages/details/index' + `?data=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			//搜索历史
			searchHistory(item){
				console.log(item)
				this.searchWord = item
				this.getHotSearch()
				this.is_show = false
			},
			//清除搜索历史记录
			clearHistory(){
				this.historyList = []
				uni.removeStorageSync('historyList')
			}
		}
	}
</script>

<style scoped lang="scss">
	.home {
		width: 718rpx;
		min-height: 100vh;
		margin: 0 auto;

		.search {
			width: 100%;
			height: 80rpx;
			background: #fff;
		}
        .search-history{
			width: 718rpx;
			min-height: 100rpx;
			margin: 20rpx auto;
			.his-kouBox{
				width: 100%;
				height: 40rpx;
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				.icon-his{
					display: flex;
				}
			}
			.hisWord{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				margin-bottom: 40rpx;
				margin-top: 20rpx;

				.hisDown{
					min-width: 200rpx;
					height: 80rpx;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
					padding:0 20rpx;
					text-align: center;
					line-height: 80rpx;
					// overflow: hidden;
					// white-space: nowrap;
					// text-overflow: ellipsis;
					border-radius: 32rpx;
					background: rgba(33,59,82,0.1);
					font-size: 28rpx;
					font-weight: 600;
					color: #213B52;
				}
			}
		}
		.hotSearch {
			width: 718rpx;
			height: 600rpx;
            margin: 20rpx auto;
			.font {
				margin-top: 30rpx;
				color: #000;
			}

			.keyWord {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				margin-bottom: 40rpx;
				// height: 500rpx;
				margin-top: 20rpx;
				.down {
					min-width: 200rpx;
					height: 80rpx;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
					padding:0 20rpx;
					text-align: center;
					line-height: 80rpx;
					// overflow: hidden;
					// white-space: nowrap;
					// text-overflow: ellipsis;
					border-radius: 32rpx;
					background: rgba(33,59,82,0.1);
					font-size: 28rpx;
					font-weight: 600;
					color: #213B52;
				}
			}
		}
		.block {
			width: 718rpx;
			margin: 0 auto;
			.water-inner{
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.water-box{
					width: 352rpx;
					height: 672rpx;
					margin-top: 20rpx;
					border-radius: 16rpx;
					background: #ffffff;
					.water-img{
						width: 100%;
						height: 592rpx;
					}
					.water-class{
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
<style>
	body {
		background: #F1F4F7;
	}
</style>

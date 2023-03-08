import operate from '../common/operate.js'
// import md5 from './md5.js'
import md5 from 'md5'
export default class Request {




	http(param) {

		// 对象的key升序排列
		let ksort = (params) => {
			let keys = Object.keys(params).sort();
			let newParams = {};
			keys.forEach((key) => {
				newParams[key] = params[key];
			});
			return newParams;
		}


		// 把对象参数转成URL参数
		let obj2strUrl = (obj) => {
			let str = "";
			for (let key in obj) {
				str = `${str}${key}=${obj[key]}&`
			};
			str = str.substring(0, str.length - 1);
			return str;
		}

		let plat = uni.getStorageSync('platform')
		let openId = uni.getStorageSync('openId')
		let info = uni.getStorageSync('info')
		let form = {
			app_id: '70000',
			channel: 'douyin',
			version: '1.1.0',
			versionCode: '110',
			timestamp: new Date().getTime(),
			imei_zt: openId.openid || '',
			imei: openId.openid || '',
			idfa: openId.openid || '',
			platform: plat,
			uuid: info.uuid || '',
			token: info.token || ''
		}


		// 请求参数
		var url = param.url,
			method = param.method,
			header = {},
			data = {
				...form,
				...param.data
			} || {
				...form
			},

			hideLoading = param.hideLoading || false;
		//拼接完整请求地址
		var requestUrl = operate.api + url;

		let ksort_obj = ksort(data) // 先升序排列
		let obj2strUrl_temp = obj2strUrl(ksort_obj) + '&123456ABCDEFGHIJKL{(&#!,.&*)}MNOPQRSTUVWXYZ789070000'

		// 然后再转成URL参数形式的字符串+secret
		data.sign = md5(obj2strUrl_temp) // 进行md5加密
		if (method) {
			method = method.toUpperCase(); //小写改为大写
			if (method == "POST") {
				header = {
					'content-type': "application/json"
				};
			} else {
				header = {
					'content-type': "application/json"
				};
			}
		}

		//加载圈
		if (!hideLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		}

		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res) => {
					// 判断 请求api 格式是否正确
					if (res.statusCode && res.statusCode != 200) {
						uni.showToast({
							title: "api错误" + res.errMsg,
							icon: 'none'
						});
						return;
					}
					// 将结果抛出
					resolve(res.data)
				},
				//请求失败
				fail: (e) => {
					uni.showToast({
						// title: "" + e.data.msg,
						title: "" + e.data,
						icon: 'none'
					});
					resolve(e.data);
				},
				//请求完成
				complete() {
					//隐藏加载
					if (!hideLoading) {
						uni.hideLoading();
					}
					resolve();
					return;
				}
			})
		})
	}
}

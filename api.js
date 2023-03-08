import Request from './utils/request.js'
import operate from './common/operate.js'
let request = new Request().http


//获取oppenid的接口
export const getOppenId = function(data){
	return request({
		url:"/api/v6.dysmall/getOpenid",
		method:"POST",
		data:data || ''
	})
}
//登录接口
export const login = function(data){
	return request({
		url:'/api/v1.user/login',
		method:'POST',
		data:data || ''
	})
}

//用户信息的接口
export const info = function(data){
	return request({
		url:"/api/v1.user/info",
		method:"POST",
		data:data || ""
	})
}

//模板分类接口
export const classify = function(data){
	return request({
		url:"/api/v3.template/tenfacetype",
		method:"POST",
		data:data || ''
	})
}

//换脸模板接口
export const tenface = function(data){
	return request({
		url:"/api/v3.template/tenface",
		method:"POST",
		data:data || ''
	})
}

//套餐列表接口
export const vipList = function(data){
	return request({
		url:"/api/v1.combos/index",
		method:"POST",
		data:data || ''
	})
}

//收藏和取消收藏接口
export const collectFace = function(data){
	return request({
		url:"/api/v4.tenface/like",
		method:"POST",
		data:data || ''
	})
}

//查看收藏状态的接口
export const likeStatusGet = function(data){
	return request({
		url:"/api/v4.tenface/likeStatusGet",
		method:"POST",
		data:data || ''
	})
}

//查看收藏列表
export const likeList = function(data){
	return request({
		url:"/api/v4.tenface/likeList",
		method:"POST",
		data:data || ''
	})
}

//支付接口
export const payPal = function(data){
	return request({
		url:"/api/v6.wxorder/create",
		method:"POST",
		data:data || ''
	})
}

//热搜关键词接口
export const hsearch = function(data){
	return request({
		url:"/api/v3.draft/hsearch",
		method:"POST",
		data:data || ''
	})
}

//换脸请求接口
export const createFaceTask = function(data){
	return request({
		url:"/api/v4.tenface/createFaceTask",
		method:"POST",
		data:data || ""
	})
}

//上传图片审核
export const imageAtion = function(data){
	return request({
		url:"/api/v5.faceai/imageAtion",
		method:"POST",
		data:data || ""
	})
}

export const resultFace = function(data){
	return request({
		url:"/api/v4.tenface/resultFace",
		method:"POST",
		data:data || ''
	})
}
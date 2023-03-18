import request from "@/utils/request.js"

export const getGoods = (data) => {
	return request({
		url: "/goods/search",
		data
	})
}

export const getDetails = (data) => {
	return request({
		url: "/goods/detail",
		data
	})
}
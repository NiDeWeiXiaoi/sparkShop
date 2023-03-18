import request from "@/utils/request.js"

export const getGoods = (data) => {
	return request({
		url: "/goods/search",
		data
	})
}
import request from "@/utils/request.js"

export function getBannerList() {
	return request({
		url: "/home/swiperdata"
	})
}
import request from "@/utils/request.js"

export function getBannerList() {
	return request({
		url: "/home/swiperdata"
	})
}

export function getNav() {
	return request({
		url: "/home/catitems"
	})
}

export function getFloor() {
	return request({
		url: "/home/floordata"
	})
}
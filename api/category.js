import request from "@/utils/request.js"

export function getCategory() {
	return request({
		url: "/categories"
	})
}
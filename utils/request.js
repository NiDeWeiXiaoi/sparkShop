const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"

const request = async config => {
	config.url = baseURL + config.url
	config.method = config.method || 'GET'
	
	const [error, res] = await uni.request(config)
	
	if(res.data.meta.status === 200) {
		return res.data
	} else {
		return res.data.meta
	}
	
}

export default request;
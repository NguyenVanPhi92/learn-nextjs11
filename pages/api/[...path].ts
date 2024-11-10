// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

// tắt bodyParser
export const config = {
	api: {
		bodyParser: false,
	},
}

// setup proxy
// Proxy được hiểu đơn giản là sợi dây liên kết giữa người truy cập Internet và Internet,
// dùng để thực hiện chuyển tiếp thông tin và kiểm soát sự an toàn cho người dùng.
// Có thể nói, cách thức hoạt động của Proxy như một tường lửa (firewall), hoặc là một bộ lọc truy cập web
const proxy = httpProxy.createProxyServer()

// tạo phương thức handle api
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise(() => {
		// convert cookies to header Authorization
		const cookies = new Cookies(req, res)
		const accessToken = cookies.get('access_token')
		if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`

		// don't send cookies to API server
		// khi uer gửi tín hiệu lên nextjs, nextjs sẽ bỏ cookies đi
		req.headers.cookie = ''

		// /api/students
		//  và chuyển sang domain proxy và proxy tự handle response
		proxy.web(req, res, {
			// https://js-post-api.herokuapp.com/api/students
			target: process.env.API_URL, // api server
			changeOrigin: true,
			selfHandleResponse: false,
		})
	})
}

import { LoginPayload } from '@/models'
import axiosClient from './axios-client'

export const authApi = {
	// LoginPayload: định nghĩa kiểu data payload đưa lên server
	login(payload: LoginPayload) {
		return axiosClient.post('/login', payload)
	},

	logout() {
		return axiosClient.post('/logout')
	},

	getProfile() {
		return axiosClient.get('/profile')
	},
}

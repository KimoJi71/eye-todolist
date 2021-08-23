import apiRequest from "./api"

const auth = {
    //會員登入驗證
    login: (payload) => apiRequest.post('/auth', payload),
    //新增 會員資料
    createUser: (payload) => apiRequest.post('users', payload)
}

export default auth
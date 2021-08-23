import axios from 'axios'

let baseURL = '/api'

const apiRequest = axios.create({
  baseURL: baseURL
})

//axios攔截器
// apiRequest.interceptors.request.use(
//     (res) => {
//       console.log('axios 1')
//       return res.data ? res.data : res
//     },
//     (err) => {
//       console.log('axios 1 err');
//       console.log(err)
//       return err
//     }
// )

// apiRequest.interceptors.response.use(
//   (res) => {
//     console.log('axios 2')
//     return res
//   },
//   (err) => {
//     console.log('axios 2 err')
//     if(err.response.status === 500) alert('系統忙碌中...請稍後再試')
//     return err
//   }
// )

export default apiRequest

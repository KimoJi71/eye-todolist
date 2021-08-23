import apiRequest from "./api"

const todolist = {
    //取得 待辦事項 清單
    getTodoList: () => apiRequest.get('/to-do-list/list'),
    //取得 待辦事項 資料細項
    getTodoDetail: (to_do_id) => apiRequest.get(`/to-do-list/detail/${to_do_id}?type=json`),
    //新增或更新 待辦事項 資料細項
    updateTodoDetail: (to_do_id, payload) => apiRequest.put(`/to-do-list/detail/${to_do_id}`, payload),
    //刪除 待辦事項 資料細項
    deleteTodoDetail: (to_do_id) => apiRequest.delete(`/to-do-list/detail/${to_do_id}`),
    //取得 待辦事項 最新的 id 編號
    getTodoID: () => apiRequest.get('/to-do-list/the-newest-id')
}

export default todolist
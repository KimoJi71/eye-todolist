<template>
    <div>
        <Header></Header>
        <v-container class="fill-height mt-10" fluid>
            <v-row  align="center" justify="center" no-gutters>
                <v-col sm="10" md="20">
                    <h1
                        class="text-left
                        blue-gray--text
                        ml-5"
                    >
                        To Do List 清單
                    </h1>
                </v-col>
                <v-col cols="40" md="20" offset-md="20">
                    <v-btn 
                     class="mr-5"
                     color="blue" 
                     dark
                     @click="addTodo"
                    >
                        新增
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="ma-5">
                <v-divider></v-divider>
            </v-row>
            <v-row class="ma-5" align="center" justify="center">
                <v-simple-table fixed-header height="400">
                    <template>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    編號
                                </th>
                                <th class="text-left">
                                    主題
                                </th>
                                <th class="text-left">
                                    預約時間
                                </th>
                                <th class="text-left">
                                    內容簡介
                                </th>
                                <th class="text-left">
                                    重要程度
                                </th>
                                <th class="text-left">
                                    撰寫者
                                </th>
                                <th class="text-left">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <TodoItem
                                v-for="(todo, idx) in todos"
                                :key="idx"
                                :todo="todo"
                                @delete-todo="removeTodo(idx)"
                            >
                            </TodoItem>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-row>
        </v-container>
        <SnackBar
         :text="text"
         :timeout="2000"
         :visible="snackbarVisible"
        ></SnackBar> 
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import TodoItem from '../components/TodoItem.vue'
import SnackBar from '../components/SnackBar.vue'

export default {
    components: {
        Header,
        TodoItem,
        SnackBar
    },
    data(){
        return {
            //todo資料
            todos: [],
            //Snackbar視窗
            snackbarVisible: false,
            text: ''
        }
    },
    methods: {
        //開啟新增頁面
        addTodo() {
            this.$router.push('/add-todo')
        },
        //刪除
        removeTodo(idx) {
            this.todos.splice(idx, 1)
            this.text = '刪除成功'
            this.snackbarVisible = true
        }
    },
    mounted() {
        //獲取todo清單
        this.$axios.get('/api/to-do-list/list')
        .then(res =>  {
            this.todos = res.data.result
        })
        .catch(err => {
            if(err.response.status === 401) {
                if(confirm('請先登入') === true) {
                    this.$router.push({name: 'login'})
                }
            } else if(err.response.status === 500) {
                alert('Server 端錯誤')
            } else {
                alert('不明錯誤')
            }
        })
    }
}
</script>
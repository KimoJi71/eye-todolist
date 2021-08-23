<template>
    <div>
        <Header/>
        <v-container class="fill-height mt-10" fluid>
            <v-row  align="center" justify="center" no-gutters>
                <v-col sm="10" md="20">
                    <h1 class="text-left blue-gray--text ml-5">
                        To Do List 清單
                    </h1>
                </v-col>
                <v-col cols="40" md="20" offset-md="20">
                    <v-btn 
                     class="mr-5"
                     color="primary" 
                     @click="addTodo"
                    >
                        新增
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="ma-5">
                <v-divider/>
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
                            @delete-todo="(removeTodo(idx), removeInfo())"/>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-row>
        </v-container>
        <v-snackbar
         color="success"
         absolute
         v-model="snackbar.visible"
         timeout="3000"
        >
            {{snackbar.text}}
            <v-icon class="mr-2">mdi-check-circle</v-icon>
        </v-snackbar>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import TodoItem from '../components/TodoItem.vue'

export default {
    components: {
        Header,
        TodoItem
    },
    data(){
        return {
            //todo資料
            todos: [],
            //snackbar視窗
            snackbar: {
                text: null,
                visible: false
            }
        }
    },
    methods: {
        //開啟新增頁面
        addTodo() {
            this.$router.push('/add-todo').catch(() => {})
        },
        //刪除
        removeTodo(idx) {
            this.todos.splice(idx, 1)
        },
        removeInfo() {
            if(localStorage.getItem('isDeleteSuccess') === 'true') {
                this.snackbar = {
                    text: '刪除成功',
                    visible: true,
                }
                localStorage.removeItem('isDeleteSuccess')
            }
        }
    },
    async mounted() {
        if(localStorage.getItem('account') === null) {
            this.$router.push({name: 'login'}).catch(() => {})
        } else {
            //取得todo清單
            try {
                const response = await this.$api.todolist.getTodoList()
                this.todos = response.data.result
            } catch(err) {
                if(err.response.status === 401) {
                    this.$router.push({name: 'login'}).catch(() => {})
                }
            }
        }
    },
    updated() {
        if(localStorage.getItem('isAddSuccess') === 'true') {
            this.snackbar = {
                text: '新增成功',
                visible: true
            }
            localStorage.removeItem('isAddSuccess')
        }
        if(localStorage.getItem('isEditSuccess') === 'true') {
            this.snackbar = {
                text: '更新成功',
                visible: true
            }
            localStorage.removeItem('isEditSuccess')
        }
    }
}
</script>
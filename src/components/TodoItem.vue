<template>
    <tr>
        <td>{{todo.to_do_id}}</td>
        <td>
            {{todo.subject}}
        </td>
        <td>{{todo.reserved_time}}</td>
        <td>{{todo.brief}}</td>
        <td>{{todo.level}}</td>
        <td>{{todo.author}}</td>
        <td>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    class="ma-1"
                    color="primary"
                    outlined
                    fab
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    @click="editTodo"
                    >
                        <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                </template>
                <span>編輯</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    class="ma-1"
                    color="red"
                    outlined
                    fab
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    @click="openDialog"
                    >
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>刪除</span>
            </v-tooltip>
        </td>
        <ConfirmDialog
        :action="`刪除編號${todo.to_do_id}`"
        :visible="dialogVisible"
        @onCancel="closeDialog"
        @onConfirm="deleteTodo"
        ></ConfirmDialog>
    </tr>
</template>

<script>
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default {
    props: ['todo'],
    components: {
        ConfirmDialog
    },
    data() {
        return {
            //Dialog視窗
            dialogVisible: false
        }
    },
    methods: {
        //Dialog視窗
        openDialog() {
            this.dialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false
        },
        //編輯
        editTodo() {
            this.$router.push({name: 'edit-todo', params: {to_do_id: this.todo.to_do_id}})
        },
        //刪除
        deleteTodo() {
            this.$axios.delete(`/api/to-do-list/detail/${this.todo.to_do_id}`)
            .then(res => {
                if(res.data.message === "ok.") {
                    this.$emit('delete-todo')
                }
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
}
</script>

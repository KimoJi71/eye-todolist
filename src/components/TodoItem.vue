<template>
    <tr>
        <td>{{todo.to_do_id}}</td>
        <td>
            <router-link :to="{name: `edit-todo`, params: {to_do_id: todo.to_do_id}}">{{todo.subject}}</router-link>
        </td>
        <td>{{todo.reserved_time}}</td>
        <td>{{todo.brief}}</td>
        <td>{{todo.level}}</td>
        <td>{{todo.author}}</td>
        <td>
            <v-btn
             color="red"
             outlined
             small
             @click="deleteTodo"
            >
                刪除
            </v-btn>
        </td>
    </tr>
</template>

<script>

export default {
    props: ['todo'],
    methods: {
        deleteTodo() {
            if(confirm('將刪除編號 ' + this.todo.to_do_id + '，確定要刪除嗎？') == true) {
                this.$axios.delete(`/api/to-do-list/detail/${this.todo.to_do_id}`)
                .then(res => {
                    if(res.data.message == "ok.") {
                        this.$emit('delete-todo');
                    }
                })
            }
        }
    },
}
</script>

<style scoped>
    .blue--text{
        cursor: pointer;
    }
</style>

<template>
    <tr>
        <td>{{todo.to_do_id}}</td>
        <td
         class="blue--text"
         @click="editTodo"
        >
            <u color="blue">{{todo.subject}}</u>
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
        editTodo() {
            this.$router.push(`/edit-todo/${this.todo.to_do_id}`);
        },
        deleteTodo() {
            this.$axios.delete(`/api/to-do-list/detail/${this.todo.to_do_id}`)
            .then(res => {
                if(res.data.message == "ok.") {
                    this.$emit('delete-todo');
                }
            })
        }
    },
}
</script>

<style scoped>
    .blue--text{
        cursor: pointer;
    }
</style>

<template>
    <div>
        <Header></Header>
        <v-container class="fill-height mt-10" fluid>
            <v-row justify="center" align="center">
                <v-col cols="auto">
                    <h1>沒有這一頁</h1>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col cols="auto">
                    <v-btn color="primary" @click="backTodo">
                        前往首頁
                        <v-icon class="ml-2">mdi-home-circle</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
    components: {
        Header
    },
    methods: {
        backTodo() {
            this.$router.push({name: 'todo-list'})
        }
    }
}
</script>

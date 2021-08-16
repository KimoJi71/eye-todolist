<template>
    <div>
        <v-app-bar
         dark
        >
            <v-toolbar-title>Eye TodoList</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" text @click.prevent="logout">
                <v-icon class="mr-2">mdi-account-circle</v-icon>
                登出
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$router.push({name: 'login'})
            localStorage.removeItem('account')
        }
    }
}
</script>

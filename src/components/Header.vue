<template>
    <div>
        <v-app-bar
         color="blue-gray"
         dark
        >
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
            <v-btn @click="logout">登出</v-btn>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$router.push('/');
        },
    },
};
</script>

<template>
    <v-snackbar
     color="success"
     v-model="snackbar"
     :timeout="timeout"
    >
        {{text}}
        <v-icon class="mr-2">mdi-check-circle</v-icon>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '完成'
        },
        timeout: {
            type: Number,
            default: 2000
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        snackbar: {
            get() {
                return this.visible
            },
            set(newVisible) {
                return newVisible
            }
        }
    }
}
</script>

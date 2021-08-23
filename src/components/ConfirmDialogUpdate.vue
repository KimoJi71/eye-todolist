<template>
    <v-dialog width="350" v-model="dialog" persistent>
        <v-card>
            <v-card-title>
                確定要<b class="red--text">{{action}}</b>嗎？
            </v-card-title>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                 class="mr-2"
                 color="primary"
                 small 
                 @click.prevent="onConfirm"
                >
                    確定
                </v-btn>
                <v-btn
                 outlined
                 small
                 @click.prevent="onCancel"
                >
                    取消
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        action: {
            type: String,
            default: '執行'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        dialog() {
            return this.visible
        }
    },
    methods: {
        onConfirm() {
            this.$emit('onConfirm')
        },
        onCancel() {
            this.$emit('onCancel')
        }
    }
}
</script>

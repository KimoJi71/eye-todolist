<template>
    <div>
        <Header/>
        <!-- Todo欄位資料 -->
        <v-container class="fill-height mt-10" fluid>
            <v-row  align="center" justify="center" no-gutters>
                <v-col sm="10" md="20">
                    <h1 class="text-left ml-5">新增 To Do List</h1>   
                </v-col>
            </v-row>
            <v-row class="ma-5">
                <v-divider/>
            </v-row>
            <v-row class="ma-5" align="center" justify="center">
                <v-col sm="10">
                    <v-form v-model="valid">
                        <v-row>
                            <v-col cols="12" sm="10">
                                <label>建立時間：</label>
                                <span>{{modified_time}}</span>
                                <br>
                                <label>項目編號：</label>
                                <span>{{to_do_id}}</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <!-- 主題 -->
                            <v-col cols="auto">
                                <v-subheader class="pa-0">主&emsp;&emsp;題</v-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    outlined
                                    dense
                                    type="text"
                                    v-model="subject"
                                    :rules="[v => !!v || '必填']"/>
                            </v-col>
                            <!-- 預約時間 -->
                            <v-col cols="auto">
                                <v-subheader class="pa-0">預約時間</v-subheader>
                            </v-col>
                            <v-col class="d-flex">
                                <!-- 日期 -->
                                <v-menu
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290"
                                min-width="auto"
                                >
                                    <template v-slot:activator="{on, attrs}">
                                        <v-text-field
                                        v-model="date"
                                        outlined
                                        dense
                                        readonly
                                        :rules="[v => !!v || '必填']"
                                        v-bind="attrs"
                                        v-on="on"/>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    no-title
                                    scrollable
                                    :min="modified_time.split(' ')[0]"
                                    @input="dateMenu = false"/>
                                </v-menu>
                                <!-- 時間 -->
                                <v-menu
                                v-model="timeMenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290"
                                min-width="290"
                                >
                                    <template v-slot:activator="{on, attrs}">
                                        <v-text-field
                                        class="ml-2"
                                        v-model="time"
                                        outlined
                                        dense
                                        readonly
                                        :rules="[v => !!v || '必填']"
                                        v-bind="attrs"
                                        v-on="on"/>
                                    </template>
                                    <v-time-picker v-model="time" format="24hr" full-width/>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <!-- 重要程度 -->
                            <v-col cols="auto">
                                <v-subheader class="pa-0">重要程度</v-subheader>
                            </v-col>
                            <v-col class="d-flex">
                                <span class="grey--text text-caption ml-2">
                                    ({{level * 2}})
                                </span>
                                <v-rating
                                v-model="level"
                                color="yellow darken-3"
                                background-color="grey"
                                empty-icon="$ratingFull"
                                clearable
                                half-increments
                                hover/>
                            </v-col>
                            <!-- 簡介 -->
                            <v-col cols="auto">
                                <v-subheader class="pa-0">簡&emsp;&emsp;介</v-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                outlined
                                dense
                                type="text"
                                v-model="brief"
                                :rules="[v => !!v || '必填']"/>
                            </v-col>
                            <!-- 撰寫者 -->
                            <v-col cols="auto">
                                <v-subheader class="pa-0">撰&ensp;寫&ensp;者</v-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                outlined
                                dense
                                type="text"
                                v-model="author"
                                :rules="[v => !!v || '必填']"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <!-- 詳細內容 -->
                            <v-col cols="auto">
                                <v-subheader class="pa-0">詳細內容</v-subheader>
                            </v-col>
                            <v-col>
                                <v-textarea
                                outlined
                                dense
                                type="text"
                                rows="3"
                                v-model="content"
                                :rules="[v => !!v || '必填']"/>
                            </v-col>
                        </v-row>
                        <!-- 操作按鈕 -->
                        <v-row justify="center" align="center">
                            <v-btn
                            class="mr-5"
                            color="success"
                            :disabled="!valid"
                            @click.stop="openUpdateDialog"
                            >
                                儲存
                            </v-btn>
                            <v-btn
                            color="warning"
                            @click.stop="openBackDialog"
                            >
                                取消
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-col>                    
            </v-row>
        </v-container>
        <!-- Dialog視窗 -->
        <UpdateConfirmDialog
         :action="'儲存'"
         :visible="updateDialogVisible"
         @onCancel="closeUpdateDialog"
         @onConfirm="submit"/>
        <BackConfirmDialog
         :action="'取消'"
         :visible="backDialogVisible"
         @onCancel="closeBackDialog"
         @onConfirm="backTodo"/>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import timeFormat from '../mixins/timeFormat'
import BackConfirmDialog from '../components/ConfirmDialogBack.vue'
import UpdateConfirmDialog from '../components/ConfirmDialogUpdate.vue'

export default {
    components: {
        Header,
        UpdateConfirmDialog,
        BackConfirmDialog
    },
    data() {
        return {
            //預約時間選擇器
            dateMenu: false,
            timeMenu: false,
            date: '',
            time: '',
            //todo資料
            to_do_id: '',
            subject: '',
            modified_time: '',
            level: 0,
            brief: '',
            author: '',
            content: '',
            //表單欄位驗證
            valid: false,
            //Dialog視窗
            updateDialogVisible: false,
            backDialogVisible: false
        }
    },
    computed: {
        reserved_time() {
            return this.date + ' ' + this.time
        }
    },
    methods: {
        //儲存視窗
        openUpdateDialog() {
            this.updateDialogVisible = true
        },
        closeUpdateDialog() {
            this.updateDialogVisible = false
        },
        //返回視窗
        openBackDialog() {
            this.backDialogVisible = true
        },
        closeBackDialog() {
            this.backDialogVisible = false
        },
        //返回
        backTodo() {
            this.$router.push({name: 'todo-list'}).catch(() => {})
        },
        //錯誤處理
        catchErr(err) {
            if(err.response.status === 401) {
                this.$router.push({name: 'login'}).catch(() => {})
            }
        },
        //儲存
        async submit() {
            try {
                await this.$api.todolist.updateTodoDetail(this.to_do_id, {
                    to_do_id: this.to_do_id,
                    subject: this.subject,
                    reserved_time: this.reserved_time,
                    level: this.level * 2,
                    brief: this.brief,
                    author: this.author,
                    content: this.content
                })
                localStorage.setItem('isAddSuccess', 'true')
                this.$router.push({name: 'todo-list'}).catch(() => {})
            } catch(err) {
                this.catchErr(err)
            }
        }
    },
    mixins: [timeFormat],
    async mounted() {
        if(localStorage.getItem('account') === null) {
            this.$router.push({name: 'login'}).catch(() => {})
        } else {
            //獲取最新todo編號
            try {
                const response = await this.$api.todolist.getTodoID()
                this.to_do_id = response.data.result
                this.modified_time = this.timeFormat(new Date)
            } catch(err) {
                this.catchErr(err)
            }
        }
    }
}
</script>

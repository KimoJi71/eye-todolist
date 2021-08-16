<template>
    <div>
        <Header></Header>
        <!-- Todo欄位資料 -->
        <v-container class="fill-height mt-10" fluid>
            <v-row  align="center" justify="center" no-gutters>
                <v-col sm="10" md="20">
                    <h1 class="text-left ml-5">新增 To Do List</h1>   
                </v-col>
            </v-row>
            <v-row class="ma-5">
                <v-divider></v-divider>
            </v-row>
            <v-row class="ma-5" align="center" justify="center">
                <v-col sm="10">
                    <v-form v-model="valid">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <label>建立時間：</label>
                                <span>{{modified_time}}</span>
                                <br>
                                <label>項目編號：</label>
                                <span>{{to_do_id}}</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                 label="主題"
                                 outlined
                                 dense
                                 type="text"
                                 v-model="subject"
                                 :rules="[v => !!v || '必填']"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                 label="預約時間"
                                 placeholder="格式：YYYY-MM-DD HH:MM"
                                 outlined
                                 dense
                                 type="text"
                                 v-model="reserved_time"
                                 :rules="timeRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                 label="重要程度"
                                 :items="degree"
                                 outlined
                                 dense
                                 v-model="level"
                                 :rules="[v => /(?=.*\d)/.test(v) || '必填']"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                 label="簡介"
                                 outlined
                                 dense
                                 type="text"
                                 v-model="brief"
                                 :rules="[v => !!v || '必填']"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                 label="撰寫者" 
                                 outlined
                                 dense
                                 type="text"
                                 v-model="author"
                                 :rules="[v => !!v || '必填']"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-textarea
                                 label="詳細內容" 
                                 outlined
                                 dense
                                 type="text"
                                 rows="3"
                                 v-model="content"
                                 :rules="[v => !!v || '必填']"
                                ></v-textarea>
                            </v-col>
                        </v-row>
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
         @onConfirm="submit"
        ></UpdateConfirmDialog>
        <BackConfirmDialog
         :action="'取消'"
         :visible="backDialogVisible"
         @onCancel="closeBackDialog"
         @onConfirm="backTodo"
        ></BackConfirmDialog>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import timeFormat from '../mixins/timeFormat'
import BackConfirmDialog from '../components/BackConfirmDialog.vue'
import UpdateConfirmDialog from '../components/UpdateConfirmDialog.vue'

export default {
    components: {
        Header,
        UpdateConfirmDialog,
        BackConfirmDialog
    },
    data() {
        return {
            //重要程度等級
            degree: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            //todo資料
            to_do_id: '',
            subject: '',
            modified_time: '',
            reserved_time: '',
            level: '',
            brief: '',
            author: '',
            content: '',
            //表單欄位驗證
            valid: false,
            timeRules: [
                v => !!v || '必填',
                v => /(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)/.test(v) || '請符合格式：YYYY-MM-DD HH:SS',
            ],
            //Dialog視窗
            updateDialogVisible: false,
            backDialogVisible: false
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
            this.$router.push({name: 'todo-list'})
        },
        //錯誤處理
        catchErr(err) {
            if(err.response.status === 401) {
                this.$router.push({name: 'login'})
            } else if(err.response.status === 500) {
                alert('Server 端錯誤')
            } else {
                alert('不明錯誤')
            }
        },
        //儲存
        submit() {
            this.$axios.put(`/api/to-do-list/detail/${this.to_do_id}`, {
                to_do_id: this.to_do_id,
                subject: this.subject,
                reserved_time: this.reserved_time,
                level: this.level,
                brief: this.brief,
                author: this.author,
                content: this.content
            })
            .then(res => {
                if(res.data.message == "ok.") {
                    localStorage.setItem('isAddSuccess', 'true')
                    this.$router.push({name: 'todo-list'})
                }
            })
            .catch(err => {
                this.catchErr(err)
            })
        }
    },
    mixins: [timeFormat],
    mounted() {
        if(localStorage.getItem('account') === null) {
            this.$router.push({name: 'login'})
        } else {
            //獲取最新todo編號
            this.$axios.get('/api/to-do-list/the-newest-id')
            .then(res => {
                this.to_do_id = res.data.result
                this.modified_time = this.timeFormat(new Date)
            })
            .catch(err => {
                this.catchErr(err)
            })
        }
    }
}
</script>

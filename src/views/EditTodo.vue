<template>
    <div>
        <Header></Header>
        <v-container class="fill-height mt-10" fluid>
            <v-row  align="center" justify="center" no-gutters>
                <v-col sm="10" md="20">
                    <h1
                     class="text-left
                     blue-gray--text
                     ml-5"
                    >
                        編輯 To Do List
                    </h1>                    
                </v-col>
            </v-row>
            <v-row class="ma-5">
                <v-divider></v-divider>
            </v-row>
            <v-row class="ma-5" align="center" justify="center">
                <v-col sm="10">
                    <v-form @submit.prevent="submit" v-model="valid">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <label>編輯時間：</label>
                                <span>{{modified_time}}</span>
                                <br>
                                <label>項目編號：</label>
                                <span>{{todoDetail.to_do_id}}</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                 label="主題" 
                                 outlined
                                 dense
                                 type="text"
                                 v-model="todoDetail.subject"
                                 :rules="[v => !!v || '請輸入主題']"
                                >
                                    {{todoDetail.subject}}
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                 label="預約時間" 
                                 outlined
                                 dense
                                 type="text"
                                 placeholder="格式：YYYY-MM-DD HH:MM"
                                 v-model="todoDetail.reserved_time"
                                 :rules="timeRules"
                                >
                                    {{todoDetail.reserved_time}}
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                 :items="degree"
                                 label="重要程度" 
                                 outlined
                                 dense
                                 v-model="todoDetail.level"
                                 :rules="[v => /(?=.*\d)/.test(v) || '請輸入重要程度']"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                 label="簡介" 
                                 outlined
                                 dense
                                 type="text"
                                 v-model="todoDetail.brief"
                                 :rules="[v => !!v || '請輸入簡介']"
                                >
                                    {{todoDetail.brief}}
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                 label="撰寫者" 
                                 outlined
                                 dense
                                 type="text"
                                 v-model="todoDetail.author"
                                 :rules="[v => !!v || '請輸入撰寫者']"
                                >
                                    {{todoDetail.author}}
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-textarea
                                 label="詳細內容" 
                                 outlined
                                 dense
                                 type="text"
                                 rows="3"
                                 v-model="todoDetail.content"
                                 :rules="[v => !!v || '請輸入詳細內容']"
                                >
                                    {{todoDetail.content}}
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row justify="center" align="center">
                            <v-btn
                             class="mr-5"
                             color="success"
                             type="submit"
                             :disabled="!valid"
                            >
                                儲存
                            </v-btn>
                            <v-btn
                             color="warning"
                             @click="openDialog"
                            >
                                返回
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-col>                    
            </v-row>
        </v-container>
        <ConfirmDialog
         :action="'返回'"
         :visible="dialogVisible"
         @onCancel="closeDialog"
         @onConfirm="backTodo"
        ></ConfirmDialog>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import timeFormat from '../mixins/timeFormat'
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default {
    components: {
        Header,
        ConfirmDialog
    },
    data() {
        return {
            //重要程度等級
            degree: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            //todo資料
            todoDetail: [],
            modified_time: '',
            //表單欄位驗證
            valid: false,      
            timeRules: [
                v => !!v || '請輸入預約時間',
                v => /(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)/.test(v) || '不符合時間格式',
            ],
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
        //返回
        backTodo() {
            this.$router.push({name: 'todo-list'})
        },
        //更新儲存
        submit() {
            this.$axios.put(`/api/to-do-list/detail/${this.todoDetail.to_do_id}`, {
                to_do_id: this.todoDetail.to_do_id,
                subject: this.todoDetail.subject,
                reserved_time: this.todoDetail.reserved_time,
                level: this.todoDetail.level,
                brief: this.todoDetail.brief,
                author: this.todoDetail.author,
                content: this.todoDetail.content
            })
            .then(res => {
                if(res.data.message == "ok.") {
                    this.$router.push({name: 'todo-list'})
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
    },
    mixins: [timeFormat],
    mounted() {
        //獲取todo詳細內容
        this.$axios.get(`/api/to-do-list/detail/${this.$route.params.to_do_id}?type=json`)
        .then(res => {
            this.todoDetail = res.data.result
            this.modified_time = this.timeFormat(new Date)
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
</script>

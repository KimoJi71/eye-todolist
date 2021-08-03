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
                    <v-form @submit.prevent="submit">
                        <label>編輯時間：</label>
                        <span>{{modified_time}}</span>
                        <br>
                        <label>項目編號：</label>
                        <span>{{todoDetail.to_do_id}}</span>
                        <br><br>
                        <v-text-field
                         label="主題" 
                         outlined
                         dense
                         type="text"
                         v-model="todoDetail.subject"
                        >
                            {{todoDetail.subject}}
                        </v-text-field>
                        <v-text-field
                         label="預約時間" 
                         outlined
                         dense
                         type="text"
                         placeholder="格式：YYYY-MM-DD HH:MM:SS"
                         v-model="todoDetail.reserved_time"
                        >
                            {{todoDetail.reserved_time}}
                        </v-text-field>
                        <v-select
                         :items="degree"
                         label="重要程度" 
                         outlined
                         dense
                         v-model="todoDetail.level"
                        ></v-select>
                        <v-text-field
                         label="簡介" 
                         outlined
                         dense
                         type="text"
                         v-model="todoDetail.brief"
                        >
                            {{todoDetail.brief}}
                        </v-text-field>
                        <v-text-field
                         label="撰寫者" 
                         outlined
                         dense
                         type="text"
                         v-model="todoDetail.author"
                        >
                            {{todoDetail.author}}
                        </v-text-field>
                        <v-textarea
                         label="詳細內容" 
                         outlined
                         dense
                         type="text"
                         v-model="todoDetail.content"
                        >
                            {{todoDetail.content}}
                        </v-textarea>
                        <v-btn
                        class="mr-5"
                         color="blue"
                         dark
                         type="submit"
                        >
                            儲存
                        </v-btn>
                        <v-btn
                         color="orange"
                         dark
                         @click="backTodo"
                        >
                            返回
                        </v-btn>
                    </v-form>
                </v-col>                    
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todoDetail: [],
            modified_time: '',
            degree: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        };
    },
    methods: {
        timeFormat(timeStamp) {
            let newdate = new Date(timeStamp);
            let year = newdate.getFullYear();
            let month = newdate.getMonth() + 1 < 10 ? "0" + (newdate.getMonth() + 1) : newdate.getMonth() +1;
            let date = newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate;
            let hh = newdate.getHours() < 10 ? "0" + newdate.getHours() : newdate.getHours();
            let mm = newdate.getMinutes() < 10 ? "0" + newdate.getMinutes() : newdate.getMinutes();
            let ss = newdate.getSeconds() < 10 ? "0" + newdate.getSeconds() : newdate.getSeconds();

            this.modified_time = year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss;
        },
        nowTimes() {
            this.timeFormat(new Date());
        },
        logout() {
            this.$router.push('/login');
        },
        submit() {
            this.$axios.put(`/api/to-do-list/detail/${this.todoDetail.to_do_id}`, {
                to_do_id: this.todoDetail.to_do_id,
                subject: this.todoDetail.subject,
                reserved_time: this.todoDetail.reserved_time,
                level: this.todoDetail.level,
                brief: this.todoDetail.brief,
                author: this.todoDetail.author,
                content: this.todoDetail.content,
            }).then(res => {
                if(res.data.message == "ok.") {
                    this.$router.push('/todo-list');
                }
            })
        },
        backTodo() {
            this.$router.push('/todo-list');
        },
    },
    mounted() {
        this.$axios.get(`/api/to-do-list/detail/${this.$route.params.to_do_id}?type=json`)
        .then(res => {
            this.todoDetail = res.data.result;
            this.nowTimes();
        })
    },
}
</script>

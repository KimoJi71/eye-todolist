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
                        新增 To Do List
                    </h1>                    
                </v-col>
            </v-row>
            <v-row class="ma-5">
                <v-divider></v-divider>
            </v-row>
            <v-row class="ma-5" align="center" justify="center">
                <v-col sm="10">
                    <v-form ref="form" @submit.prevent="submit">
                        <label>建立時間：</label>
                        <span>{{modified_time}}</span>
                        <br>
                        <label>項目編號：</label>
                        <span>{{to_do_id}}</span>
                        <br><br>
                        <v-text-field
                         label="主題" 
                         outlined
                         dense
                         type="text"
                         v-model="subject"
                        ></v-text-field>
                        <v-text-field
                         label="預約時間" 
                         outlined
                         dense
                         type="text"
                         placeholder="格式：YYYY-MM-DD HH:MM:SS"
                         v-model="reserved_time"
                        ></v-text-field>
                        <v-select
                         :items="degree"
                         label="重要程度" 
                         outlined
                         dense
                         v-model="level"
                        ></v-select>
                        <v-text-field
                         label="簡介" 
                         outlined
                         dense
                         type="text"
                         v-model="brief"
                        ></v-text-field>
                        <v-text-field
                         label="撰寫者" 
                         outlined
                         dense
                         type="text"
                         v-model="author"
                        ></v-text-field>
                        <v-textarea
                         label="詳細內容" 
                         outlined
                         dense
                         type="text"
                         v-model="content"
                        ></v-textarea>
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
            degree: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            to_do_id: '',
            subject: '',
            modified_time: '',
            reserved_time: '',
            level: '',
            brief: '',
            author: '',
            content: '',
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
        backTodo() {
            this.$router.push('/');
        },
        submit() {
            this.$axios.put(`/api/to-do-list/detail/${this.to_do_id}`, {
                to_do_id: this.to_do_id,
                subject: this.subject,
                reserved_time: this.reserved_time,
                level: this.level,
                brief: this.brief,
                author: this.author,
                content: this.content,
            }).then(res => {
                if(res.data.message == "ok.") {
                    this.$router.push('/');
                }
            })
        },
    },
    mounted() {
        this.$axios.get('/api/to-do-list/the-newest-id')
        .then(res => {
            this.to_do_id = res.data.result;
            this.nowTimes();
        })
    },
}
</script>

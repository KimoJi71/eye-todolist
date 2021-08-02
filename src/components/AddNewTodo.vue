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
                        <span>Date</span>
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
                        >
                            {{subject}}
                        </v-text-field>
                        <v-text-field
                         label="預約時間" 
                         outlined
                         dense
                         type="datetime"
                         v-model="reserved_time"
                        >
                            {{reserved_time}}
                        </v-text-field>
                        <v-select
                         :items="degree"
                         label="重要程度" 
                         outlined
                         dense
                         v-model="level"
                        >
                            {{level}}
                        </v-select>
                        <v-text-field
                         label="簡介" 
                         outlined
                         dense
                         type="text"
                         v-model="brief"
                        >
                            {{brief}}
                        </v-text-field>
                        <v-text-field
                         label="撰寫者" 
                         outlined
                         dense
                         type="text"
                         v-model="author"
                        >
                            {{author}}
                        </v-text-field>
                        <v-textarea
                         label="詳細內容" 
                         outlined
                         dense
                         type="text"
                         v-model="content"
                        >
                            {{content}}
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
            degree: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            to_do_id: '',
            subject: '',
            reserved_time: '',
            level: '',
            brief: '',
            author: '',
            content: '',
        };
    },
    computed:{

    },
    methods: {
        logout() {
            this.$router.push('/login');
        },
        backTodo() {
            this.$router.push('/');
        },
        submit() {
            this.$axios.put(`/api/to-do-list/detail/to_do_list=${this.to_do_id}`, {
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
        })
    },
}
</script>

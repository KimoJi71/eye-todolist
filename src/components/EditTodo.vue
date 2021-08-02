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
                    <v-form ref="form">
                        <label>編輯時間：</label>
                        <span></span>
                        <br>
                        <label>項目編號：</label>
                        <span>{{todoID}}</span>
                        <br><br>
                        <v-text-field
                         label="主題" 
                         outlined
                         dense
                         type="text"
                        >
                            <!-- {{todoDatas.subject}} -->
                        </v-text-field>
                        <v-text-field
                         label="預約時間" 
                         outlined
                         dense
                         type="date"
                        >
                            <!-- {{todoDatas.reserved_time}} -->
                        </v-text-field>
                        <v-select
                         :items="degree"
                         label="重要程度" 
                         outlined
                         dense
                        >
                            <!-- {{todoDatas.level}} -->
                        </v-select>
                        <v-text-field
                         label="簡介" 
                         outlined
                         dense
                         type="text"
                        >
                            <!-- {{todoDatas.brief}} -->
                        </v-text-field>
                        <v-text-field
                         label="撰寫者" 
                         outlined
                         dense
                         type="text"
                        >
                            <!-- {{todoDatas.author}} -->
                        </v-text-field>
                        <v-textarea
                         label="詳細內容" 
                         outlined
                         dense
                         type="text"
                        >
                            <!-- {{todoDatas.content}} -->
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
    props: ['todoID'],
    data() {
        return {
            todoDetail: [],
            degree: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        };
    },
    methods: {
        logout() {
            this.$router.push('/login');
        },
        backTodo() {
            this.$router.push('/');
        },
    },
    mounted() {
        this.$axios.get(`/to-do-list/detail/10002`)
        .then(res => {
            console.log(res)
            this.todoDetail = res.data.result;
        })
    },
}
</script>

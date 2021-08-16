<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-5">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card-text class="mt-5">
                        <h1 class="text-center display-1">
                          系統登入
                        </h1>
                        <div class="text-center mt-5">
                          <v-form @submit.prevent="login">
                            <v-text-field
                             label="帳號"
                             prepend-icon="mdi-account"
                             type="text"
                             color="black"
                             v-model="account"
                            >
                            </v-text-field>
                            <v-text-field
                             label="密碼"
                             prepend-icon="mdi-lock"
                             :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                             :type="show ? 'text' : 'password'"
                             color="black"
                             v-model="passwd"
                             @click:append="show = !show"
                            >
                            </v-text-field>
                            <span class="red--text" v-if="error">{{error}}</span>
                            <br><br v-if="error">
                            <v-btn
                             elevation="2"
                             dark
                             large
                             type="submit"
                            >
                              登入
                            </v-btn>
                          </v-form>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      //是否顯示密碼
      show: false,
      //檢查帳號密碼
      error: '',
      //會員資料
      account: '',
      passwd: ''
    }
  },
  methods: {
    //會員登入
    login() {
      this.$axios.post('/api/auth', {
        account: this.account,
        passwd: this.passwd
      })
      .then(response => {
        if(response.status === 200) {
          localStorage.setItem('account', this.account)
          this.$router.push({name: 'todo-list'})
        }
      })
      .catch(err => {
        if(err.response.status === 400) {
          this.error = '帳號密碼欄位有誤'
        } else if(err.response.status === 500) {
          alert('Server 端錯誤')
        } else {
          alert('不明錯誤')
        }
      })
    }
  },
  watch: {
    //重置error
    account() {
      this.error = ''
    },
    passwd() {
      this.error = ''
    }
  }
}
</script>

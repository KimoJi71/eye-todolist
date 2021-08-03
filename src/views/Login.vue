<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-8">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card-text class="mt-5">
                        <h1 class="text-center
                         display-1
                         blue-gray--text"
                        >
                          系統登入
                        </h1>
                        <div class="text-center mt-5">
                          <v-form @submit.prevent="login">
                            <v-text-field
                             label="帳號"
                             prepend-icon="mdi-account"
                             type="text"
                             color="blue-gray"
                             v-model="account"
                            >
                            </v-text-field>
                            <v-text-field
                             label="密碼"
                             prepend-icon="mdi-lock"
                             type="password"
                             color="blue-gray"
                             v-model="passwd"
                            >
                            </v-text-field>
                            <v-btn
                             elevation="2"
                             large color="blue-gray"
                             dark
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
      valid: true,
      account: '',
      passwd: '',
    };
  },
  methods: {
    login() {
      this.$axios.post('/api/auth', {
        account: this.account,
        passwd: this.passwd,
      })
      .then(response => {
        if(response.data.message == "ok. 您現在可存取 API.") {
          this.$router.push('/todo-list');
        }
      })
      .catch(err => {
        alert('登入失敗，請重新嘗試！');
        console.log(err);
      })
    },
  },
  watch: {
    account() {
      this.error = '';
    },
    passwd() {
      this.error = '';
    },
  },
};
</script>

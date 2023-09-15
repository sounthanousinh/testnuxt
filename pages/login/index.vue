<template >
  <!-- <v-content> -->
  <v-app>
    <!-- <v-container class="fill-height" fluid> -->
    <v-row class="bg-img" align="center" justify="center">
      <v-col cols="12" sm="6" md="6">

        <v-card class="elevation-12 overflow-hidden">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row class="d-flex flex-wrap-reverse">
                <v-col cols="12" md="7">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">Sign In System</h1>

                    <h4 class="text-center mt-4">Ensure your email for registration</h4>
                    <v-form @submit.prevent="userLogin">
                      <v-text-field rounded label="Email" v-model="login.email" persistent-hint outlined></v-text-field>

                      <v-text-field rounded label="Password" v-model="login.password" persistent-hint
                        outlined></v-text-field>

                      <div class="text-center">
                        <v-btn rounded color="teal accent-3" large type="submit" dark block>
                          <v-icon>mdi-login-variant</v-icon>
                          Login
                        </v-btn>
                      </div>
                    </v-form>
                    <!-- <h3 class="text-center mt-4">Forgot your password ?</h3> -->
                  </v-card-text>
                  <div class="text-center mt-3">
                    <!-- <v-btn rounded color="teal accent-3" dark>SIGN IN</v-btn> -->

                  </div>
                </v-col>
                <v-col cols="12" md="5" class="teal accent-3 order-0 order-md-0">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Company Name</h1>
                    <h5 class="text-center">Enter your personal details and start journay with us</h5>

                    <div class="text-center">
                      <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="300"
                        src="https://picsum.photos/id/11/500/300"></v-img>
                    </div>
                  </v-card-text>

                </v-col>
              </v-row>
            </v-window-item>




            <!-- <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form>
                          <v-text-field label="Name" name="Name" prepend-icon="person" type="text"
                            color="teal accent-3" />
                          <v-text-field label="Email" name="Email" prepend-icon="email" type="text"
                            color="teal accent-3" />

                          <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password"
                            color="teal accent-3" />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" dark>SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item> -->



          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </v-app>

  <!-- </v-content> -->
</template>

<style>
.bg-img {
  background-color: #666666;
  background-image: url('https://www.fundoodata.com/learning-center/wp-content/uploads/background-companies-4-1.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>


<script>
export default {
  layout: "layoutLogin",
  data() {
    return {
      step: 1,
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log('response', response)
        if (response) {
          this.$router.push('/' + this.$i18n.locale + '/department')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>

<!-- <template> -->

  <!-- <v-flex sm12 md6 offset-md3 justify-center>
    <v-row>
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-form @submit.prevent="userLogin">
          <v-card>
            <v-card-text>
              <v-text-field label="Email" v-model="login.email" persistent-hint outlined></v-text-field>

              <v-text-field label="Password" v-model="login.password" persistent-hint outlined></v-text-field>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn text>
                Cancel
              </v-btn>
              <v-spacer></v-spacer>


              <v-btn color="primary" text type="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-flex> -->
<!-- </template> -->
<!-- <script>
export default {
  layout: "layoutLogin",


  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
        if (response) {
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

}
</script> -->

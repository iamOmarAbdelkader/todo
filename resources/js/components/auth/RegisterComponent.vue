<template>
    <div>
        <!-- <nav-component />   -->
        {{$auth.user().name}}
        <div class="container">
            <div class="row">
                <div class="col"></div>
                <div class="col-8">
                     <div class="b-card-parent">
            <b-card-group deck>
            <b-card title=""
                header="Registeration Form"
                header-tag="header"
                footer-tag="footer"
            >
                <div class="b-form-parent">
                    <b-alert v-model="error" variant="danger" dismissible>
                 Please enter your data correctly (email is reserved)
              </b-alert>
                     <b-form >
        <b-form-group
            id="email-f-group"
            label="Email address:"
            label-for="email"
        >
                <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
      </b-form-group>

        <b-form-group
            id="user-name-f-group"
            label="User Name:"
            label-for="user-name"
        >
                <b-form-input
                id="user-name"
                v-model="form.name"
                type="text"
                required
                placeholder="Enter User name"
                ></b-form-input>
      </b-form-group>

       <b-form-group
            id="password-f-group"
            label="Password:"
            label-for="password"
        >
                <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter Password"
                ></b-form-input>
      </b-form-group>
    </b-form>
                </div> <!--b-form-parent -->
                 <div slot="footer">
                     <b-button type="submit" variant="primary" @click="submit">Register</b-button>
                      <b-button type="submit" @click="goToLogin" variant="success">Login</b-button>
                </div>
            </b-card>
            </b-card-group>
         </div> <!--b-card parent -->
                </div> <!-- .col-6-->
                <div class="col"></div>
            </div> <!-- .row -->
        </div> <!-- /.container-->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        error:false,
        form: {
          email: 'o@o.com',
          name: 'ahmed',
          password: '123456'
        }
      }
    },
    methods: {
      submit() {
        let that =this
        this.$auth.register({
                    data: {
                      email: this.form.email,
                      name: this.form.name,
                      password: this.form.password,

                    },
                    autoLogin: true,
                    rememberMe: true,
                    success: function () {
                      console.log('suucccess register')
                    },
                    error: function (res) {
                      that.error = true
                    },
                    redirect: '/'
                });
      },
      goToLogin(){
        this.$router.push('/login');
      }
    },
    mounted(){
      this.$auth.ready(function () {
                console.log('ready');
            });
    }
    ,created(){
                console.log('cready');

      

    }
  }
</script>
<style scoped>
.b-card-parent {
    margin-top: 15%;
}


</style>
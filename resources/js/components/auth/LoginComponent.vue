<template>
    <div>
        <!-- <nav-component />    -->
        <div class="container">
            <div class="row">
                <div class="col"></div>
                <div class="col-8">
                     <div class="b-card-parent">
            <b-card-group deck>
                         <ValidationObserver
                        ref="observer"
                        tag="b-form"
                        style="width:100%"
                        @submit.prevent="submit()"
                        v-slot="{ invalid }"
                        >
            <b-card title=""
               header="Login Form"
                header-tag="header"
                footer-tag="footer"
            >
            
              <b-alert v-model="error" variant="danger" dismissible>
                 Please enter your data correctly
              </b-alert>
  
                <div class="b-form-parent">
                  
    <!-- <b-form > -->

        <b-form-group
            id="email-f-group"
            label="User Name:"
            label-for="email"
        >
        <ValidationProvider
        rules="required|email"
        name="email"
        v-slot="{ errors }"
        >
       <b-form-input
        id="email"
        v-model="form.email"
        type="text"
        required
        placeholder="Enter email"
        :state="errors[0] == null"
        ></b-form-input>
    <b-form-invalid-feedback :state="errors[0] == null">
      {{errors[0]}}
      </b-form-invalid-feedback>
</ValidationProvider>
           
      </b-form-group>

       <b-form-group
            id="password-f-group"
            label="Password:"
            label-for="password"
        >
          <ValidationProvider 
            rules="required"
            name="password"
            v-slot="{ errors }"
          >
                <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter Password"
                  :state="errors[0] == null"
                ></b-form-input>

                  <b-form-invalid-feedback :state="errors[0] == null">
                       {{errors[0]}}
                </b-form-invalid-feedback>
          </ValidationProvider>
      </b-form-group>
   

      <b-form-group id="remember-group">
          <b-form-checkbox
            id="remember"
            v-model="form.checked"
            name="remember"
            :value="true"
            :unchecked-value="false"
        >
        Remember Me
        </b-form-checkbox>
      </b-form-group>

     
         
    <!-- </b-form> -->
                </div> <!--b-form-parent -->
                 <div slot="footer">
                      <b-button type="submit" :disabled="invalid"  variant="primary" >Login</b-button>
                     <b-button type="submit" @click="goToRegister" variant="success">Register</b-button>
                </div>
            </b-card>
          </ValidationObserver>

            </b-card-group>
         </div> <!--b-card parent -->
                </div> <!-- .col-6-->
                <div class="col"></div>
            </div> <!-- .row -->
        </div> <!-- /.container-->
    </div>
</template>

<script>
  import {bus} from '../../app'
  export default {
    data() {
      return {
        error:false,
        form: {
          email: '',
          password: '',
          checked:false
        }
      }
    },
    methods: {
       submit() {
        bus.$emit('load',true)
          // const isValid = await this.$refs.observer.validate();
        console.log(this.form.email)
         this.$auth.login({
          params: {
            email:this.form.email,
            password:this.form.password
          }, 
          success(res) {
            this.error = false
          },
          error(e) {
            bus.$emit('load',false)
            this.error =true;
          },
            rememberMe: this.form.checked,
            redirect: '/',
            fetchUser: true,
        })  
      },
      goToRegister(){
        this.$router.push('/register');
      }
    }
  }
</script>
<style scoped>
.b-card-parent {
    margin-top: 15%;
}


</style>
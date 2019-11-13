<template>
    <div>
        <loading :active="loading" 
        :is-full-page="true"
        :opacity='1'
        ></loading>
<b-navbar v-show="ready" toggleable="lg" type="dark" variant="info">
    <router-link style="cursor:pointer" tag="b-navbar-brand" v-if="$auth.check()" to="">ToDo</router-link>
    <router-link style="cursor:pointer" tag="b-navbar-brand" v-else to="/welcome">ToDo</router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto" v-if="$auth.ready()">
        <router-link active-class="active"  tag="b-nav-item" to="login">{{$auth.user().name}}</router-link>
      </b-navbar-nav> -->

        <b-navbar-nav class="ml-auto">
        <router-link active-class="active" v-if="!$auth.check()"  tag="b-nav-item" to="login">Login</router-link>
        <router-link active-class="active"  v-if="!$auth.check()" tag="b-nav-item" to="register">Register</router-link>
            <b-nav-item-dropdown   v-if="$auth.check()" :text="$auth.user().name" right>
              <b-dropdown-item  @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

   
      

    </b-collapse>
  </b-navbar>
       <router-view ></router-view>
    </div>
</template>

<script>
    import {bus} from '../app'
    export default {
       data() {
            return {
            ready:false,
            loading:false
            }
        },
        methods:{
        logout(){
            setTimeout(() => {
                this.$auth.logout({redirect:'/welcome'});
            }, 1000);
        }
        },
        mounted(){
            this.$auth.ready(()=>{
                    this.ready = true;
            })

            bus.$on('load',(payload)=>{
                   setTimeout(() => {
                       console.log('here in')
                         this.loading = payload
                },1000)
            })
        }
}
</script>
  
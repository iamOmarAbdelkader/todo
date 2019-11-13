import LoginComponent from '../components/auth/LoginComponent.vue'
import RegisterComponent from '../components/auth/RegisterComponent.vue'
import HomeComponent from '../components/home/HomeComponent.vue'
import WelcomeComponent from '../components/welcome/WelcomeComponent.vue'

const routes = [
    {path: '/',component:HomeComponent, meta:{auth:true}},
    {path: '/login',component:LoginComponent, meta:{auth:false}},
    {path: '/register',component:RegisterComponent, meta:{auth:false}},
    {path: '/welcome',component:WelcomeComponent,meta:{auth:false}},
]

export default routes




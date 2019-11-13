import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {bus} from '../app'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'hash',
});

router.beforeEach((to,from,next)=>{
    bus.$emit('load',true)
    setTimeout(() => {
        next()
        bus.$emit('load',false)
    },1000)
})
// router.afterEach((to,from,next)=>{
//     bus.$emit('load',false)
// })
export default router;
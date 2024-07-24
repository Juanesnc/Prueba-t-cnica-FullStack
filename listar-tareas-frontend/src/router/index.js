import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '@/store/auth'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ListTasksView from '@/views/ListTasksView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/tasks/:id',
    name: 'tasks',
    component: ListTasksView,
    meta: {
      requireAuth: true
      }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  const isAuth = auth.token
  const param = to.params.id

  if(from.name == 'login' && to.params.id){
    localStorage.setItem('saveParam', param)
  }

  if((to.meta.requireAuth) && (isAuth == null)){
    next({name: 'login'})
  } if (((to.name == 'login') || to.params.id !== localStorage.getItem('saveParam'))  && (isAuth) ){
    next({path: `/tasks/${localStorage.getItem('saveParam')}`})
  } else {
    next()
  }

})

export default router

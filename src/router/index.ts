import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import UserData from '@/views/userData.vue'
import Login from '@/views/login.vue'
import register from '@/views/register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页&推荐',
      component: home,
    },
    {
      path: '/userData',
      name: '查看帖子',
      component: UserData,
    },
    {
      path: '/login',
      name: '登录页',
      component: Login,
      meta: { showNav: false },
    },
    {
      path: '/register',
      name: '注册',
      component: register,
      meta: { showNav: false },
    },
  ],
})
router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const protectedPaths = ['/', '/userData']

  console.log('守卫执行 to.path=', to.path)
  console.log('token=', token)
  console.log('!token=', !token)
  console.log('数组是否包含路径：', protectedPaths.includes(to.path))

  if ((!token || token === 'null') && protectedPaths.includes(to.path)) {
    console.log('触发重定向到login')
    return '/login'
  }
})

export default router

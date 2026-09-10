import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import UserData from '@/views/userData.vue'
import Login from '@/views/login.vue'
import register from '@/views/register.vue'
import user from '@/views/user.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页&推荐',
      component: home,
    },
    {
      path: '/userData/:id',
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
    {
      path:'/user',
      name: '用户主页',
      component: user
    }
  ],
})
router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  // 首页和帖子详情页都需要登录,详情页路径形如 /userData/123,所以用前缀匹配
  if ((!token || token === 'null') && (to.path === '/' || to.path.startsWith('/userData'))) {
    return '/login'
  }
})

export default router

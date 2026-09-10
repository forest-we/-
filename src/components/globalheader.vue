<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="gh" v-if="$route.meta.showNav !== false">
    <div class="gh-left">
      <span class="wordmark serif-title">聊吧</span>
      <el-menu :ellipsis="false" class="gh-menu" mode="horizontal" :router="true">
        <el-menu-item index="/">推荐</el-menu-item>
        <el-menu-item index="2">关注</el-menu-item>
        <el-menu-item index="3">热榜</el-menu-item>
          <el-sub-menu index="1">
        <template #title> <el-avatar class="author-avatar" :size="45" src="https://ts2.tc.mm.bing.net/th/id/OIP-C.5XpzGKbBQBM5d2VsJq-GZAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3">
    <el-icon><User /></el-icon>
    </el-avatar></template>
          <el-menu-item index="/user">个人主页</el-menu-item>
          <el-menu-item @click="useStore.logout">退出登录</el-menu-item>
      </el-sub-menu>
        </el-menu>
    </div>
    <div>
      <div>
        <el-input
          class="responsive-input"
          placeholder="Type something"
          :prefix-icon="Search"
        />
      </div>
    </div>
    <div class="gh-right">
      <el-button class="gh-post" @click="postClos" :icon="Edit" />
      <el-button v-if="!useStore.token" class="gh-login" type="primary" @click="Login">登录</el-button>
    </div>
  </div>
  <post ref="postss" />
</template>

<script setup lang="ts">
import post from '@/post/post.vue'
import { Edit, Search } from '@element-plus/icons-vue'
import router from '@/router'
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {useUserStore} from '@/pinia/user'
const useStore = useUserStore()
const postss = ref<any>(null)
const postClos = () => {
  postss.value?.clos()
}
const Login = () => {
  router.push('/login')
}
</script>

<style scoped>
.gh {
  max-width: 1060px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.gh-left {
  display: flex;
  align-items: center;
}

/* 字标:衬线大字 + 荧光黄底划线 */
.wordmark {
  position: relative;
  margin-right: 20px;
  padding-bottom: 6px;
  font-size: 24px;
  font-weight: 700;
  color: var(--ink);
}

.wordmark::after {
  content: '';
  position: absolute;
  left: 2px;
  right: 2px;
  bottom: 0;
  height: 3px;
  background: var(--acid);
}

/* 导航菜单去掉自身高度干扰,垂直居中于 60px 顶栏 */
.gh-menu {
  height: auto;
  align-self: stretch;
}

.gh-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gh-login {
  height: 34px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 14px;
}

.gh-post {
  height: 34px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink-2);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.gh-post:hover {
  background: var(--card-deep);
  border-color: var(--acid-deep);
  color: var(--ink);
}
</style>

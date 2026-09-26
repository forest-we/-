<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="gh" v-if="$route.meta.showNav !== false">
    <div class="gh-left">
      <span class="wordmark serif-title">聊吧</span>
      <el-menu
        :ellipsis="false"
        class="gh-menu"
        mode="horizontal"
        :router="true"
        :default-active="activeMenu"
      >
        <el-menu-item index="/">推荐</el-menu-item>
        <el-menu-item index="/follow">关注</el-menu-item>
        <el-menu-item index="/hot">热榜</el-menu-item>
        <el-menu-item index="/photo">图吧</el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-avatar class="author-avatar" :size="45" :src="useAvatar.avatar">
              <el-icon><User /></el-icon> </el-avatar
          ></template>
          <el-menu-item index="/user">个人主页</el-menu-item>
          <el-menu-item index="logout" @click="useStore.logout">退出登录</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="gh-search" v-if="route.path !== '/user' && route.path !== '/user/follows'">
      <el-input
        v-model="title"
        class="responsive-input"
        placeholder="模糊搜索帖子"
        :prefix-icon="Search"
        maxlength="10"
        clearable
        @keyup.enter="ttt"
        @clear="clearSearch"
      />
      <el-button class="gh-search-btn" type="primary" @click="ttt">搜索</el-button>
    </div>
    <div class="gh-right">
      <el-button
        class="gh-post"
        @click="postClos"
        :icon="Edit"
        v-if="route.path !== '/user/follows' && route.path !== '/user'"
      />
      <el-button v-if="!useStore.token" class="gh-login" type="primary" @click="Login"
        >登录</el-button
      >
    </div>
  </div>
  <post ref="postss" />
</template>

<script setup lang="ts">
import post from '@/post/post.vue'
import { Edit, Search, User } from '@element-plus/icons-vue'

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAvatarStore } from '@/pinia/avatar'
import { useUserStore } from '@/pinia/user'
import { usePostStore } from '@/pinia/post'
import router from '@/router'
import { ElMessage } from 'element-plus'

const useStore = useUserStore()
const route = useRoute()
const usePost = usePostStore()
// 高亮菜单和当前路由绑定：刷新/切换都不会丢
const activeMenu = computed(() => {
  const p = route.path
  if (p === '/' || p.startsWith('/userData')) return '/' // 详情页归属推荐流
  if (p.startsWith('/follow')) return '/follow'
  if (p.startsWith('/hot')) return '/hot'
  if (p.startsWith('/user')) return '/user'
  return ''
})
const title = ref('')
const ttt = async () => {
  const kw = title.value.trim()
  if (!kw) {
    return ElMessage.error('搜索关键词不能为空')
  }
  //不在首页时先跳回去,否则结果覆盖了 postList 但当前页面看不到
  //(跳转后 home 会自己拉一次列表,store 里的 seq 守卫保证搜索结果后写、不会被盖掉)
  if (route.path !== '/') await router.push('/')
  await usePost.searchPost(kw)
}
//点输入框的 X:清空关键词并回到全量列表
//(getlist 的 page 默认就是 1,不传参即可;分页器页码由 home.vue 的 watch(keyword) 归位)
const clearSearch = async () => {
  title.value = ''
  await usePost.getlist()
}
const useAvatar = useAvatarStore()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  gap: 12px;
  padding: 0 24px;
}

.gh-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* 搜索区:撑开中间剩余空间,左右两块就自动分开了 */
.gh-search {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
}

/* 之前这个 class 没有任何样式,用的是 Element Plus 默认尺寸 */
.responsive-input {
  width: 100%;
  max-width: 260px;
}

/* 高度跟右侧按钮对齐:都是 34px;圆角跟 --el-border-radius-base 一致 */
.responsive-input :deep(.el-input__wrapper) {
  height: 34px;
  border-radius: 8px;
  padding: 0 14px;
}

.gh-search-btn {
  height: 34px;
  padding: 0 16px;
  border-radius: 8px;
  flex-shrink: 0;
}

@media (max-width: 880px) {
  .gh-search {
    padding: 0 8px;
  }

  .responsive-input {
    max-width: 150px;
  }

  .gh-search-btn {
    padding: 0 12px;
  }
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
  flex-shrink: 0;
}

.gh-login {
  height: 34px;
  padding: 0 22px;
  border-radius: 8px;
  font-size: 14px;
}

.gh-post {
  height: 34px;
  border-radius: 8px;
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

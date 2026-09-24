<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-home">
    <!-- 顶部信息卡 -->
    <div class="profile-card">
      <div class="profile-left">
        <el-tooltip content="点击修改头像" placement="top">
          <el-upload action="" :http-request="up" :show-file-list="false">
            <el-avatar class="author-avatar" :size="96" :src="useAvatar.avatar">
              <el-icon><User /></el-icon>
            </el-avatar>
          </el-upload>
        </el-tooltip>
        <div class="profile-info">
          <div class="profile-name">{{ useStore.username }}</div>
          <div class="profile-desc">{{ useStore.Profile || '这个人很懒，什么都没写~' }}</div>
        </div>
      </div>
      <el-button type="primary" @click="adDuser" :icon="Edit" circle />
    </div>

    <!-- Tab 二级导航 -->
    <el-tabs v-model="activeTab" class="my-tabs" @tab-click="onTabClick">
      <el-tab-pane label="我的帖子" name="posts" />
      <el-tab-pane label="我的关注" name="follows" />
      <el-tab-pane label="我的粉丝" name="fans" />
    </el-tabs>

    <!-- 子页面出口 -->
    <div class="tab-body">
      <router-view />
    </div>
  </div>

  <addUser ref="adD" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/pinia/user'
import { Edit, User } from '@element-plus/icons-vue'
import addUser from '@/components/add-user.vue'
import axios from '@/axios/axios'
import { useAvatarStore } from '@/pinia/avatar'

const useAvatar = useAvatarStore()
const useStore = useUserStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  useAvatar.avatarPost()
})

// Tab 与路由联动：/user → posts，/user/follows → follows，/user/fans → fans
const activeTab = computed(() => {
  const p = route.path
  if (p.startsWith('/user/follows')) return 'follows'
  if (p.startsWith('/user/fans')) return 'fans'
  return 'posts'
})

const onTabClick = (pane: any) => {
  const name = pane.paneName
  router.push(name === 'posts' ? '/user' : `/user/${name}`)
}

const up = async (upload: any) => {
  const file = upload.file
  const formee = new FormData()
  formee.append('avatar', file)
  const res = await axios.post('upload', formee)
  useAvatar.avatar = res.data.url
}

const adD = ref<any>(null)
const adDuser = () => {
  adD.value.addClose()
}
</script>

<style scoped>
.my-home {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 16px 40px;
}

/* 信息卡 */
.profile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--card);
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  padding: 22px 24px;
  box-shadow: var(--shadow-warm);
}

.profile-left {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.author-avatar {
  background: var(--acid);
  color: var(--acid-ink);
  border: 2px solid var(--acid-soft);
  flex-shrink: 0;
}

.profile-info {
  min-width: 0;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.05em;
}

.profile-desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--ink-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;
}

/* Tab */
.my-tabs {
  margin-top: 18px;
  background: var(--card);
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  padding: 0 18px;
}

.my-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: var(--line-soft);
}

.my-tabs :deep(.el-tabs__item) {
  font-size: 14px;
  color: var(--ink-2);
}

.my-tabs :deep(.el-tabs__item.is-active) {
  color: var(--acid);
  font-weight: 600;
}

.my-tabs :deep(.el-tabs__active-bar) {
  background-color: var(--acid);
  height: 2px;
}

/* 内容区 */
.tab-body {
  margin-top: 12px;
  background: var(--card);
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  padding: 6px 20px 18px;
  box-shadow: var(--shadow-warm);
}
</style>

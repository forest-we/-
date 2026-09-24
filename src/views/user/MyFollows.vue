<template>
  <div class="my-follows">
    <!-- 空态 -->
    <el-empty
      v-if="!loading && follows.length === 0"
      description="还没有关注任何人，去主页看看有趣的帖子吧~"
      :image-size="90"
    />

    <!-- 关注用户卡片列表 -->
    <div v-for="f in follows" :key="f.id" class="follow-card">
      <el-avatar :size="44" :src="f.a">
        <el-icon><User /></el-icon>
      </el-avatar>
      <div class="follow-info">
        <div class="follow-name">{{ f.username }}</div>
        <div class="follow-desc">{{ normalizeProfile(f.profile) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import axios from '@/axios/axios'

interface Follow {
  id: number
  username: string
  a: string // 后端别名:头像URL(CONCAT ... as a)
  profile: string | null
}

const follows = ref<Follow[]>([])
const loading = ref(false)

const normalizeProfile = (v: string | null) =>
  v === null || v === 'null' || v === 'undefined' || v === '' ? '这个人很懒，什么都没写~' : v

const getFollows = async () => {
  loading.value = true
  try {
    const res = await axios.get('post/follow_user')
    follows.value = res.data.data || []
  } catch {
    // 失败保持空态
  } finally {
    loading.value = false
  }
}

onMounted(getFollows)
</script>

<style scoped>
.my-follows {
  padding: 6px 0 10px;
}

.follow-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 4px;
  border-bottom: 1px solid var(--line-soft);
}

.follow-card:last-child {
  border-bottom: none;
}

.follow-info {
  min-width: 0;
}

.follow-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}

.follow-desc {
  margin-top: 3px;
  font-size: 12px;
  color: var(--ink-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
</style>

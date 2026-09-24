<template>
  <div class="my-fans">
    <div>
      <p>我的粉丝数：{{ fanslike }}</p>
    </div>
    <!-- 空态 -->
    <el-empty
      v-if="!loading && fans.length === 0"
      description="暂时没人关注你哦~"
      :image-size="90"
    />

    <!-- 粉丝卡片列表 -->
    <div v-for="f in fans" :key="f.id" class="fan-card">
      <el-avatar :size="44" :src="f.avatar">
        <el-icon><User /></el-icon>
      </el-avatar>
      <div class="fan-info">
        <div class="fan-name">{{ f.username }}</div>
        <div class="fan-desc">{{ normalizeProfile(f.profile) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import axios from '@/axios/axios'

interface Fan {
  id: number
  username: string
  avatar: string
  profile: string | null
}

const fans = ref<Fan[]>([])
const loading = ref(false)
const fanslike = ref(0)
const normalizeProfile = (v: string | null) =>
  v === null || v === 'null' || v === 'undefined' || v === '' ? '这个人很懒，什么都没写~' : v

const getFans = async () => {
  loading.value = true
  try {
    const res = await axios.get('post/user_follow')
    fans.value = res.data.data || []
    fanslike.value = res.data.fanslike
  } catch {
    // 失败保持空态
  } finally {
    loading.value = false
  }
}

onMounted(getFans)
</script>

<style scoped>
.my-fans {
  padding: 6px 0 10px;
}

.fan-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 4px;
  border-bottom: 1px solid var(--line-soft);
}

.fan-card:last-child {
  border-bottom: none;
}

.fan-info {
  min-width: 0;
}

.fan-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}

.fan-desc {
  margin-top: 3px;
  font-size: 12px;
  color: var(--ink-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
</style>

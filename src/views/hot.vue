<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hot">
    <header class="hot-head">
      <h2 class="hot-title serif-title">全站热榜</h2>
      <p class="hot-sub">
        {{ list.length ? `共 ${list.length} 条 · 按点赞数排序` : '按点赞数排序' }}
      </p>
    </header>

    <el-card class="hot-card" v-loading="loading">
      <ul v-if="list.length" class="hot-list">
        <li
          v-for="(item, index) in list"
          :key="item.id"
          class="hot-item"
          @click="rou(item)"
        >
          <span class="hot-rank" :class="{ 'hot-rank--top': index < 3 }">
            {{ index + 1 }}
          </span>
          <span class="hot-name">{{ item.title }}</span>
          <span class="hot-like">
            <el-icon><Star /></el-icon>
            {{ item.a }}
          </span>
        </li>
      </ul>

      <p v-else-if="!loading" class="hot-empty">暂时还没有上榜的帖子</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import axios from '@/axios/axios'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { Star } from '@element-plus/icons-vue'

interface HotItem {
  id: number
  title: string
  a: number // 点赞数
}

const list = ref<HotItem[]>([])
const loading = ref(false)

const getHotList = async () => {
  loading.value = true
  try {
    const res = await axios.get('like/win')
    if (res.data.code === 200) {
      list.value = res.data.data
    }
  } catch {
    // 失败提示由 axios 拦截器统一弹出,页面保持空态
  } finally {
    loading.value = false
  }
}

const rou = (item: HotItem) => {
  router.push(`/userData/${item.id}`)
}

onMounted(getHotList)
</script>

<style scoped>
/* 与首页同宽的窄列 */
.hot {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}

.hot-head {
  padding: 4px 4px 16px;
}

.hot-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
}

.hot-sub {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--ink-3);
  letter-spacing: 0.05em;
}

.hot-card {
  border-radius: 14px;
  overflow: hidden;
}

/* 列表铺满卡片,悬停整行高亮 */
.hot-card :deep(.el-card__body) {
  padding: 0;
}

.hot-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 22px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hot-item + .hot-item {
  border-top: 1px solid var(--line-soft);
}

.hot-item:hover {
  background: var(--card-deep);
}

.hot-item:hover .hot-name {
  color: var(--acid);
}

/* 名次:默认浅灰,前三名换成知乎蓝实心徽标 */
.hot-rank {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--ink-3);
}

.hot-rank--top {
  background: var(--acid);
  color: var(--acid-ink);
}

/* 标题:超长省略 */
.hot-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: var(--ink);
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease;
}

/* 点赞数 */
.hot-like {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--ink-2);
  font-variant-numeric: tabular-nums;
}

.hot-empty {
  margin: 0;
  padding: 28px 0;
  text-align: center;
  font-size: 13px;
  color: var(--ink-3);
}
</style>

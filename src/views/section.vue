<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="section-page">
    <div class="tab-row">
      <el-button
        v-for="s in tabs"
        :key="s.id"
        class="tab"
        :class="{ 'tab-active': s.id === currentId }"
        @click="pick(s.id)"
      >
        {{ s.name }}
      </el-button>
    </div>

    <div class="feed" v-if="posts.length">
      <el-card v-for="p in posts" :key="p.id" class="post-card">
        <div class="post-author">{{ p.username }}</div>
        <el-button class="post-title" @click="open(p)">{{ p.title }}</el-button>
        <p class="post-time">{{ '发布时间  ' + p.create_time }}</p>
        <el-button type="warning" :icon="Star" @click="like(p)">{{ p.post_like_COUNT }}</el-button>
      </el-card>
    </div>
    <div class="feed" v-else>
      <el-card class="post-card">
        <div class="post-author"></div>
        <el-button class="post-title">{{ emptyText }}</el-button>
        <p class="post-time"></p>
      </el-card>
    </div>

    <div class="pager">
      <pagination :page="page" :limit="limit" :total="total" @pageChangs="changePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from '@/axios/axios'
import router from '@/router'
import pagination from '@/components/pagination.vue'
import { Star } from '@element-plus/icons-vue'

interface SectionItem {
  id: number
  name: string
}
interface PostItem {
  id: number
  title: string
  username: string
  create_time: string
  post_like_COUNT: number
}

const tabs = ref<SectionItem[]>([{ id: 0, name: '全部' }])
const currentId = ref(0) // 0 表示全部,不传 section_id
const posts = ref<PostItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(10)
// 请求序号:只有最后一次发出的请求才允许写入结果,防止慢响应盖掉新结果
let seq = 0

const emptyText = computed(() => (currentId.value ? '该分区还没有帖子' : '暂时没有帖子呢'))

const loadSections = async () => {
  const res = await axios.get('/api/section/list')
  tabs.value = [{ id: 0, name: '全部' }, ...(res.data.data ?? [])]
}

const loadPosts = async () => {
  const my = ++seq
  const res = await axios.get('/api/post/list', {
    params: {
      page: page.value,
      pageSize: limit.value,
      section_id: currentId.value || undefined,
    },
  })
  if (my !== seq) return
  posts.value = res.data.data ?? []
  total.value = res.data.total ?? 0
}

const pick = (id: number) => {
  if (id === currentId.value) return
  currentId.value = id
  page.value = 1 //换分区必须回到第一页,否则会停在不存在页码上看到空白
  loadPosts()
}

const changePage = (pageS: number) => {
  page.value = pageS
  loadPosts()
}

const open = (p: PostItem) => {
  router.push(`/userData/${p.id}`)
}

const like = async (p: PostItem) => {
  await axios.post('/api/like', { post_id: p.id })
  await loadPosts() //重新拉当前页,点赞数才会更新
}

onMounted(async () => {
  await loadSections()
  await loadPosts()
})
</script>

<style scoped>
.section-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 分区 tab:横向排列,放不下自动换行 */
.tab-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 18px 0 6px;
}

.tab {
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.tab-active {
  background: var(--acid);
  border-color: var(--acid);
  color: #fff;
}

/* 帖子流,与首页保持一致 */
.feed {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 10px 0;
}

.post-card {
  border-radius: 12px;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease;
}

.post-card:hover {
  border-color: var(--line);
  box-shadow: var(--shadow-warm);
  transform: translateY(-2px);
}

.post-card :deep(.el-card__body) {
  padding: 18px 22px;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--ink-2);
  font-size: 13px;
  letter-spacing: 0.06em;
}

.post-author::before {
  content: '';
  width: 7px;
  height: 7px;
  background: var(--acid);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.post-title {
  height: auto;
  padding: 0;
  border: none;
  background: transparent;
  white-space: normal;
  text-align: left;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  color: var(--ink);
  transition: color 0.2s ease;
}

.post-title:hover {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--acid);
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
}

.post-time {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--ink-3);
  letter-spacing: 0.05em;
}

.pager {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>

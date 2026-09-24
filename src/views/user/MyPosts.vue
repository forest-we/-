<template>
  <div class="my-posts">
    <!-- 空态 -->
    <el-empty
      v-if="!loading && posts.length === 0"
      description="还没有发过帖子，去首页发一条吧~"
      :image-size="90"
    />

    <!-- 帖子卡片流 -->
    <div
      v-for="p in posts"
      :key="p.id"
      class="post-card"
      @click="goDetail(p.id)"
    >
      <div class="post-main">
        <div class="post-title">{{ p.title }}</div>
        <div class="post-meta">
          <span class="meta-like">❤ {{ p.post_like_COUNT }}</span>
          <span>{{ formatTime(p.create_time) }}</span>
        </div>
      </div>
      <el-button
        type="danger"
        size="small"
        text
        class="del-btn"
        @click.stop="delPost(p.id)"
      >删除</el-button>
    </div>

    <!-- 分页 -->
    <div class="pager">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios/axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

interface MyPost {
  id: number
  title: string
  create_time: string
  post_like_COUNT: number
}

const posts = ref<MyPost[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

const getList = async () => {
  loading.value = true
  try {
    const res = await axios.get('post/my', {
      params: { page: page.value, pageSize: pageSize.value },
    })
    posts.value = res.data.data
    total.value = res.data.total || 0
  } catch {
    ElMessage.error('加载帖子失败')
  } finally {
    loading.value = false
  }
}

const changePage = (p: number) => {
  page.value = p
  getList()
}

const goDetail = (id: number) => {
  router.push(`/userData/${id}`)
}

const delPost = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇帖子吗？评论和点赞会一起删除。', '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
  } catch {
    return // 用户取消
  }
  try {
    const res = await axios.delete('post/delete', { data: { post_id: id } })
    if (res.data.code === 200) {
      ElMessage.success('删除成功')
      // 如果当前页删空了且不是第一页，回退一页
      if (posts.value.length === 1 && page.value > 1) {
        page.value--
      }
      getList()
    } else {
      ElMessage.error(res.data.message || '删除失败')
    }
  } catch {
    ElMessage.error('删除时出了点问题')
  }
}

const formatTime = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

onMounted(getList)
</script>

<style scoped>
.my-posts {
  padding: 4px 0 8px;
}

.post-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 4px;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  transition: background 0.15s ease;
}

.post-card:hover {
  background: var(--card-deep);
}

.post-main {
  flex: 1;
  min-width: 0;
}

.post-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-meta {
  display: flex;
  gap: 14px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--ink-3);
}

.meta-like {
  color: var(--ink-2);
}

.del-btn {
  flex-shrink: 0;
}

.pager {
  display: flex;
  justify-content: center;
  padding: 18px 0 6px;
}
</style>

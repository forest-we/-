<template>
  <article class="detail">
    <header class="detail-head">
      <el-avatar
        class="author-avatar"
        :size="52"
        :src="postData.avatar"
      >
        <el-icon><User /></el-icon>
      </el-avatar>
      <p class="author-name">{{ '作者: ' + postData.username }}</p>
      <el-button
        v-if="postData.id !== userId"
        class="follow-btn"
        :type="isFollow ? 'info' : 'primary'"
        @click="follow"
      >
        {{ isFollow ? '已关注' : '关注' }}
      </el-button>
    </header>

    <h2 class="detail-title serif-title">{{ postData.title }}</h2>

    <div class="detail-body">
      <p>{{ postData.content }}</p>
    </div>

    <hr class="detail-hr" />

    <section class="comments">
      <h3 class="comments-title">评论区</h3>

      <div class="comment-editor">
        <el-input
          v-model="commenT.content"
          :rows="3"
          type="textarea"
          placeholder="写下你的评论…"
        />
        <div class="comment-editor-actions">
          <el-button type="primary" @click="commentPost">发布</el-button>
        </div>
      </div>

      <p v-if="postComments.length === 0" class="comments-empty">
        还没有评论，来说两句吧
      </p>

      <div
        v-for="comment in postComments"
        :key="comment.id"
        class="comment-item"
      >
        <el-avatar class="comment-avatar" :size="40" :src="comment.avatar">
          <el-icon><User /></el-icon>
        </el-avatar>
        <div class="comment-main">
          <div class="comment-meta">
            <span class="comment-name">{{ comment.username }}</span>
            <span class="comment-time">{{ formatTime(comment.create_time) }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/pinia/user'
import axios from '@/axios/axios'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const userStore = useUserStore()
const userId = userStore.userId
const postId = route.params.id

interface Post {
  id: string
  username: string
  title: string
  content: string
  avatar: string
}
const postData = ref<Post>({
  id: '',
  username: '',
  title: '',
  content: '',
  avatar: ''
})

interface Comm {
  id: number
  content: string
  create_time: number | string | null
  username: string
  avatar: string
}
const postComments = ref<Comm[]>([])

const commenT = ref({
  post_id: postId,
  content: '',
})
const commentPost = async () => {
  try {
    if (!commenT.value.content || !commenT.value.post_id) {
      return ElMessage.error('评论不能为空')
    }

    const res = await axios.post('comment/create', commenT.value)
    if (res.data.code === 200) {
      ElMessage({
        message: '发布成功',
        type: 'success',
      })
      postComment()
    }
  } catch {
    ElMessage.error('发布时出了点问题')
  }
}

// 当前是否已关注该作者
const isFollow = ref(false)

// 进页面查一次关注状态
const followStatus = async () => {
  try {
    const res = await axios.get('api/follow/status', {
      params: { post_user_id: postData.value.id },
    })
    isFollow.value = res.data.is_follow
  } catch {
    // 查不到就保持默认"关注"
  }
}

const follow = async () => {
  try {
    const post_user_id = postData.value.id
    const res = await axios.post('api/follow', { post_user_id: post_user_id })
    if (res.data.code === 200) {
      isFollow.value = res.data.is_follow // 用后端返回的最新状态
      ElMessage({
        message: res.data.message,
        type: 'success',
      })
    }
  } catch {
    // 失败提示由 axios 拦截器统一弹出,这里只兜住未捕获的 rejection
  }
}

const postGet = async () => {
  try {
    const res = await axios.get('post/detail', {
      params: {
        post_id: postId,
      },
    })
    postData.value = res.data.data
  } catch {
    // 失败提示由 axios 拦截器统一弹出
  }
}
const postComment = async () => {
  const res = await axios.get('comment/list', {
    params: {
      post_id: postId,
    },
  })
  postComments.value = res.data.data
}

// 时间显示:兼容秒/毫秒时间戳与日期字符串,统一为 YYYY-MM-DD HH:mm
const formatTime = (t: number | string | null | undefined): string => {
  if (t === null || t === undefined || t === '') return ''
  const n = Number(t)
  const d = Number.isNaN(n) ? new Date(t) : new Date(n < 1e12 ? n * 1000 : n)
  if (Number.isNaN(d.getTime())) return String(t)
  const pad = (x: number) => String(x).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

onMounted(async () => {
  await postGet() // 先拿作者 id
  postComment()
  followStatus() // 再查关注状态
})
</script>

<style scoped>
/* 文章阅读列 */
.detail {
  max-width: 760px;
  margin: 0 auto;
  padding: 12px 20px 40px;
}

/* 作者行:头像+昵称居左,关注按钮推到最右 */
.detail-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.author-avatar {
  background: var(--acid);
  color: var(--acid-ink);
  border: 2px solid var(--acid-soft);
  flex-shrink: 0;
}

.author-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.05em;
}

.follow-btn {
  margin-left: auto;
}

/* 标题:衬线大标题 */
.detail-title {
  margin: 0 0 20px;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.55;
  color: var(--ink);
}

/* 正文:宽松行距,保留换行 */
.detail-body p {
  margin: 0;
  font-size: 16px;
  line-height: 2;
  color: var(--ink);
  white-space: pre-wrap;
}

/* 低对比分割线 */
.detail-hr {
  border: none;
  border-top: 1px solid var(--line);
  margin: 32px 0 26px;
}

/* 评论区 */
.comments-title {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.25em;
  color: var(--ink-2);
}

.comments-title::before {
  content: '';
  width: 7px;
  height: 7px;
  background: var(--acid);
  transform: rotate(45deg);
  flex-shrink: 0;
}

/* 发布框:自适应宽度,按钮右对齐 */
.comment-editor {
  margin-bottom: 28px;
}

.comment-editor-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/* 空状态 */
.comments-empty {
  margin: 0;
  padding: 8px 2px 20px;
  color: var(--ink-3);
  font-size: 13px;
}

/* 评论条目:头像居左,昵称+时间+内容在右,细分割线分隔 */
.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px 2px;
}

.comment-item + .comment-item {
  border-top: 1px solid var(--line-soft);
}

.comment-avatar {
  background: var(--acid);
  color: var(--acid-ink);
  border: 2px solid var(--acid-soft);
  flex-shrink: 0;
}

.comment-main {
  flex: 1;
  min-width: 0;
}

.comment-meta {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.comment-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.comment-time {
  margin-left: auto;
  font-size: 12px;
  color: var(--ink-3);
}

.comment-content {
  margin: 4px 0 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--ink);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>

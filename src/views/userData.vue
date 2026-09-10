<!-- eslint-disable vue/valid-template-root -->
<template>
  <article class="detail">
    <header class="detail-head">
      <el-avatar class="author-avatar" :size="52" src="https://ts2.tc.mm.bing.net/th/id/OIP-C.5XpzGKbBQBM5d2VsJq-GZAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3">
        <el-icon><User /></el-icon>
      </el-avatar>
      <p class="author-name">{{ '作者: ' + postData.username }}</p>
    </header>

    <h2 class="detail-title serif-title">{{ postData.title }}</h2>

    <div class="detail-body">
      <p>{{ postData.content }}</p>
    </div>

    <hr class="detail-hr" />

    <section class="comments">
      <h3 class="comments-title">评论区</h3>
      <p class="comments-empty">{{}}</p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from '@/axios/axios'
import { onMounted, ref } from 'vue'
const route = useRoute()
const postId = route.params.id 
console.log(postId)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Post{
  username:string
  title:string
  content:string
}
const postData = ref<Post>({
  username: '',
  title: '',
  content: ''
})




const postGet = async () => {
  const res = await axios.get(`/post/list/${postId}`)
  postData.value = res.data.data
  console.log(res.data.data)
}
onMounted(() => {
  postGet()
})
</script>

<style scoped>
/* 文章阅读列 */
.detail {
  max-width: 760px;
  margin: 0 auto;
  padding: 12px 20px 40px;
}

/* 作者行 */
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

.comments-empty {
  margin: 0;
  color: var(--ink-3);
  font-size: 13px;
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="feed" v-if="postStore.postList.length">
    <el-card v-for="post in postStore.postList" :key="post.id" class="post-card">
      <div class="post-author">{{ post.username }}</div>
      <el-button class="post-title" @click="rou(post)">{{ post.title }}</el-button>
      <p class="post-time">{{ '发布时间  ' + post.create_time }}</p>
       <el-button type="warning" :icon="Star" @click="like(post)" >{{ post.post_like_COUNT }}</el-button> 
    </el-card>
  </div>
  <div class="feed" v-else>
    <el-card class="post-card">
      <div class="post-author"></div>
      <el-button class="post-title">暂时没有帖子呢</el-button>
      <p class="post-time"></p>
    </el-card>
  </div>
  <div id="tu">                             
  <pagination :page="page" :limit="limit" :total="postStore.total" @pageChangs="changePage" />
  </div>
</template>

// eslint-disable-next-line vue/block-lang
<script setup lang="ts">
import router from '@/router'
import { onMounted } from 'vue'
import pagination from '@/components/pagination.vue'
import { usePostStore } from '@/pinia/post'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useAvatarStore } from '@/pinia/avatar'
import axios from '@/axios/axios'
const useAvatar = useAvatarStore()
const postStore = usePostStore()
onMounted(() => {
  postStore.getlist()
  useAvatar.avatarPost()
})
const page = ref(1)
const limit = ref(10)


const changePage = (pageS:number) =>{
    page.value = pageS
    postStore.getlist(page.value, limit.value)   //如果传入的参数和默认参数不一样会覆盖
 }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rou = (post: any) => {
  router.push(`/userData/${post.id}`)
}
const like = async (post: any) =>{
   await axios.post('/like', {post_id:post.id})
   postStore.getlist()
}

</script>

<style scoped>
/* 知乎式窄列帖子流 */
.feed {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.post-card {
  border-radius: 14px;
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

/* 作者行:荧光黄菱形小点 */
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

/* 标题:正文级按钮,悬停荧光黄下划线 */
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
#tu{
    display: flex;
  justify-content: center;
  padding: 10px;
}
</style>

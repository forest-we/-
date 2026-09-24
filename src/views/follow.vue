<template>
<div class="feed" v-if="followS.followData.length">
    <el-card v-for="post in followS.followData" :key="post.id" class="post-card">
      <div class="post-author">{{ post.username }}</div>
      <el-button class="post-title" @click="rou(post)">{{ post.title }}</el-button>
      <p class="post-time">{{ '发布时间  ' + post.create_time }}</p>
       <el-button type="warning" :icon="Star" @click="like(post)" >{{ post.post_like_COUNT }}</el-button> 
    </el-card>
  </div>
  <div class="feed" v-else>
    <el-card class="post-card">
      <div class="post-author"></div>
      <el-button class="post-title">暂时没有帖子呢,或者你根本没关注任何人</el-button>
      <p class="post-time"></p>
    </el-card>
  </div>
  <div class="weer">
      <pagination  :limit="limit" :page="page" :total="followS.total" @pageChangs="changePage" />
  </div>
</template>

<script setup lang="ts">
import { useFollow } from '@/pinia/follow';
import router from '@/router';
import pagination from '@/components/pagination.vue';
import { onMounted } from 'vue';


import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import axios from '@/axios/axios';
import { ref } from 'vue';
const followS = useFollow()
onMounted(()=>{
    followS.follow()
})
  
const limit = ref(10)
const page = ref(1)
const changePage = (pageS:number) =>{
    page.value = pageS
    followS.follow(page.value, limit.value)   //如果传入的参数和默认参数不一样会覆盖
 }


const rou = (post:any) =>{
        router.push(`/userData/${post.id}`)
}
const like = async (post: any) =>{
    await axios.post('/like', {post_id:post.id})
}

</script>

<style scoped>
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
.feed {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
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
.weer{
     display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
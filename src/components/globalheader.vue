<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="gh" v-if="$route.meta.showNav !== false">
    <el-menu :ellipsis="false" class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item class="qq" index="/">推荐</el-menu-item>
      <el-menu-item class="qq" index="2">关注</el-menu-item>
      <el-menu-item class="qq" index="3">热榜</el-menu-item>
    </el-menu>
    <div style="padding: 20px"><el-button @click="Login" type="primary">登录</el-button></div>
    <el-button @click="postClos" type="primary" :icon="Edit" />
  </div>
  <post ref="postss" />
</template>

<script setup lang="ts">
import post from '@/post/post.vue'
import { Edit } from '@element-plus/icons-vue'
import router from '@/router'
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postss = ref<any>(null)
const postClos = () => {
  postss.value.clos()
}
const Login = () => {
  router.push('/login')
}
</script>

<style scoped>
.gh {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  width: 300px;
}
</style>

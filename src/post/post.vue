<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-dialog v-model="posts" title="什么帖子" append-to-body>
    <el-form-item label="标题">
      <el-input v-model="from.title" autocomplete="off" />
    </el-form-item>
    <el-form-item label="正文">
      <el-input :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" v-model="from.content" />
    </el-form-item>
    <el-form-item>
      <el-button @click="Post" type="primary">发布</el-button>
      <el-button @click="clock" type="info">取消</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from '@/axios/axios'
import { ElMessage } from 'element-plus'
import { usePostStore } from '@/pinia/post'
const postStore = usePostStore()
const posts = ref(false)
const clos = () => {
  posts.value = true
}
defineExpose({ clos })
const from = ref({
  title: '',
  content: '',
})
const Post = async () => {
  try {
    const res = await axios.post('admin/post', from.value)
    if (res.data.code === 200) {
      ElMessage({
        message: '发布成功',
        type: 'success',
      })
    }
    posts.value = false
    postStore.getlist()
  } catch {
    ElMessage.error('稍等,出现了点意外')
  }
}
const clock = () => {
  posts.value = false
}
</script>

<style></style>

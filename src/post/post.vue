<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-dialog v-model="posts" title="什么帖子" append-to-body>
    <el-form-item label="标题">
      <el-input v-model="from.title" autocomplete="off" />
    </el-form-item>
    <el-form-item label="正文">
      <el-input :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" v-model="from.content" />
    </el-form-item>
    <el-form-item label="分区">
      <el-select v-model="from.section_id" placeholder="不选择则不分区" clearable>
        <el-option v-for="s in sections" :key="s.id" :label="s.name" :value="s.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="Post" type="primary">发布</el-button>
      <el-button @click="clock" type="info">取消</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import axios from '@/axios/axios'
import { ElMessage } from 'element-plus'
import { usePostStore } from '@/pinia/post'
interface SectionItem {
  id: number
  name: string
}
const postStore = usePostStore()
const posts = ref(false)
const sections = ref<SectionItem[]>([])
const clos = () => {
  posts.value = true
}
defineExpose({ clos })
const emptyForm = () => ({ title: '', content: '', section_id: null as number | null })
const from = ref(emptyForm())
onMounted(async () => {
  const res = await axios.get('/api/section/list')
  sections.value = res.data.data ?? []
})
const Post = async () => {
  try {
    const res = await axios.post('/api/post/create', from.value)
    // 4xx 不会进 catch,必须自己看 code,否则分区不存在时弹窗会静默关掉
    if (res.data.code === 200) {
      ElMessage({
        message: '发布成功',
        type: 'success',
      })
      from.value = emptyForm() //发完清空,下次打开不留上一条的内容
      posts.value = false
      postStore.getlist()
    } else {
      ElMessage.error(res.data.message ?? '发布失败')
    }
  } catch {
    ElMessage.error('稍等,出现了点意外')
  }
}
const clock = () => {
  posts.value = false
}
</script>

<style></style>

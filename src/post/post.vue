<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-dialog v-model="posts" title="什么帖子">
    <el-form-item label="标题">
      <el-input v-model="from.title" autocomplete="off" />
    </el-form-item>
    <el-form-item label="正文">
      <el-input :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" v-model="from.content" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">发布</el-button>
      <el-button @click="clock" type="info">取消</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const posts = ref(false)
const clos = () => {
  posts.value = true
}
defineExpose({ clos })
const from = ref({
  title: '',
  content: '',
})

const clock = () => {
  posts.value = false
}

</script>

<style></style>

<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->

<template>
  <div class="rt">
    <div>
      <h1>注册</h1>
    </div>
    <el-form-item label="账号">
      <el-input style="width: 240px" v-model="from.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        style="width: 240px"
        v-model="from.password"
        type="password"
        autocomplete="off"
        show-password
      />
    </el-form-item>
    <el-button @click="regiser()" type="primary">注册</el-button>
  </div>
</template>

<script setup lang="ts">
import axios from '@/axios/axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const from = ref({
  username: '',
  password: '',
})
const regiser = async () => {
  try {
    if (!from.value.password || !from.value.username) {
      return ElMessage.error('账号密码为空')
    }
    const res = await axios.post('api/register', from.value)
    if (res.data.code === 200) {
      ElMessage({
        message: res.data.message,
        type: 'success',
      })
      router.push('/login')
    }
    if (res.data.code === 401) {
      return ElMessage.error(res.data.message)
    }
  } catch {
    ElMessage.error('额,出了点问题')
  }
}
</script>

<style>
.rt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="serif-title auth-title">注册</h1>
      <el-form-item label="账号">
        <el-input v-model="from.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="from.password"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-button class="auth-submit" type="primary" @click="regiser()">注册</el-button>
      <div class="auth-switch">
        <el-button class="auth-link" @click="login">有账号????</el-button>
      </div>
    </div>
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

const login = () => {
  router.push('/login')
}
</script>

<style scoped>
.auth-page {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.auth-card {
  width: 100%;
  max-width: 380px;
  background: var(--card);
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  padding: 42px 36px 26px;
  box-shadow: var(--shadow-warm);
}

.auth-title {
  margin: 0 0 30px;
  font-size: 27px;
  font-weight: 700;
  text-align: center;
  color: var(--ink);
}

.auth-card :deep(.el-form-item) {
  display: block;
  margin-bottom: 18px;
}

.auth-card :deep(.el-form-item__label) {
  display: block;
  text-align: left;
  height: auto;
  margin-bottom: 8px;
  color: var(--ink-2);
  font-size: 13px;
  letter-spacing: 0.14em;
  line-height: 1.4;
}

.auth-card :deep(.el-input),
.auth-card :deep(.el-input__wrapper) {
  width: 100%;
}

.auth-submit {
  width: 100%;
  height: 42px;
  margin-top: 10px;
  border-radius: 999px;
  font-size: 15px;
  letter-spacing: 0.3em;
}

.auth-switch {
  margin-top: 16px;
  text-align: center;
}

.auth-link {
  border: none;
  background: transparent;
  padding: 2px 4px;
  color: var(--ink-3);
  font-size: 13px;
}

.auth-link:hover {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--acid);
  text-underline-offset: 5px;
  text-decoration-thickness: 2px;
}
</style>

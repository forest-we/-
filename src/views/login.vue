<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->

// eslint-disable-next-line vue/valid-template-root
<template>
  <div id="ii">
    <div>
      <h1>登录你的账号</h1>
    </div>
    <el-form-item label="账号">
      <el-input style="width: 240px" v-model="from.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input style="width: 240px" v-model="from.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-button @click="logg()" type="primary">登录</el-button>
    <el-button @click="regiser()">没有账号????</el-button>
  </div>
</template>

// eslint-disable-next-line vue/block-lang
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/pinia/user'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
const userStore = useUserStore()
const from = ref({
  username: '',
  password: '',
})
const logg = async () => {
  try {
    if (!from.value.password || !from.value.username) {
      return ElMessage.error('账号密码为空')
    }
    await userStore.Login(from.value)
    if (userStore.userCode === 401) {
      return ElMessage.error('账号密码错误')
    }
    if (userStore.userCode === 200) {
      ElMessage({
        message: '欢迎你,' + userStore.username,
        type: 'success',
      })
      router.push('/')
    }
  } catch {
    ElMessage.error('出了点问题')
  }
}
const regiser = () => {
  router.push('/register')
}
</script>

<style>
#ii {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
}
</style>

<template>
  <el-dialog label="修改主页" v-model="adD" append-to-body>
    <el-form ref="formRef" :model="from" :rules="rules" label-width="76px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="from.username" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item label="个人签名" prop="profile">
        <el-input v-model="from.profile" type="textarea" :rows="2" maxlength="50" show-word-limit />
      </el-form-item>
    </el-form>
    <div>
      <el-button class="auth-submit" type="primary" @click="userAdd">修改</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { useUserStore } from '@/pinia/user'
import axios from '@/axios/axios'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface ProfileForm {
  username: string
  profile: string
}

const useStore = useUserStore()
const adD = ref(false)
const formRef = ref<FormInstance>()
const from = ref<ProfileForm>({
  username: '',
  profile: '',
})

// 纯空格不算填了内容（required 拦不住 " "）
const notBlank =
  (tip: string) => (_rule: unknown, value: string, callback: (e?: Error) => void) => {
    if (!value || !value.trim()) callback(new Error(tip))
    else callback()
  }

// 规则与后端 user/add 对齐：username、profile 均不可为空，用户名上限 10（输入框 maxlength）
const rules = reactive<FormRules<ProfileForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名长度 2 ~ 10 个字符', trigger: 'blur' },
    { validator: notBlank('用户名不能全是空格'), trigger: 'blur' },
  ],
  profile: [
    { required: true, message: '个人签名不能为空', trigger: 'blur' },
    { max: 50, message: '签名不超过 50 个字符', trigger: 'blur' },
    { validator: notBlank('个人签名不能全是空格'), trigger: 'blur' },
  ],
})

const addClose = () => {
  from.value.username = useStore.username
  from.value.profile = useStore.Profile
  adD.value = true
  // 清掉上一次打开留下的红字，否则一进来就是报错状态
  nextTick(() => formRef.value?.clearValidate())
}

const userAdd = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate() // 不通过会 reject，直接 return，不发请求
  } catch {
    return
  }
  try {
    const res = await axios.put('user/add', {
      username: from.value.username.trim(),
      profile: from.value.profile.trim(),
    })
    if (res.data.code === 200) {
      ElMessage({ message: '修改成功', type: 'success' })
      adD.value = false
      useStore.username = res.data.data.username
      useStore.Profile = res.data.data.profile
      localStorage.setItem('username', res.data.data.username)
      localStorage.setItem('profile', res.data.data.profile)
    }
  } catch (err: unknown) {
    // 400（重名/空值）、401、500、网络异常，axios 拦截器已经弹过提示了，这里不重复弹
    console.log(err instanceof Error ? err.message : err)
  }
}

defineExpose({ addClose })
</script>

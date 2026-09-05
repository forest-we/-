// oxlint-disable unicorn/no-empty-file
// oxlint-disable-next-line no-unused-vars unicorn/no-empty-file
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const userCode = ref()
  const token = ref(localStorage.getItem('token') || '')
  const Login = async (from: { username: string; password: string }) => {
    const res = await axios.post('api/login', from)
    username.value = res.data.data.username
    token.value = res.data.token
    userCode.value = res.data.code
    localStorage.setItem('token', token.value)
  }

  return {
    Login,
    token,
    username,
    userCode,
  }
})

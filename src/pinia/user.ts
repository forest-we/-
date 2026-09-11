// oxlint-disable unicorn/no-empty-file
// oxlint-disable-next-line no-unused-vars unicorn/no-empty-file
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

export const useUserStore = defineStore('user', () => {
  const username = ref(localStorage.getItem('username') || '')
  const userCode = ref()
  const token = ref(localStorage.getItem('token') || '')
  const Profile = ref(localStorage.getItem('profile') || '')
  const Login = async (from: { username: string; password: string }) => {
    const res = await axios.post('api/login', from)
    username.value = res.data.data.username
    token.value = res.data.token
    userCode.value = res.data.code
    Profile.value = res.data.data.profile
    localStorage.setItem('token', token.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('profile', Profile.value)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('profile')
    Profile.value = ''
    username.value = ''
    userCode.value = ''
    token.value = ''
    window.location.href = '/login'
  }

  return {
    Profile,
    logout,
    Login,
    token,
    username,
    userCode,
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

export const useUserStore = defineStore('user', () => {
  const normalizeProfile = (v: string | null) =>
    v === null || v === 'null' || v === 'undefined' ? '' : v
  const userId = ref(localStorage.getItem('userId') || '')
  const username = ref(localStorage.getItem('username') || '')
  const userCode = ref()
  const token = ref(localStorage.getItem('token') || '')
  const Profile = ref(normalizeProfile(localStorage.getItem('profile')))
  const Login = async (from: { username: string; password: string }) => {
    const res = await axios.post('api/login', from)
    userId.value = res.data.data.id
    username.value = res.data.data.username
    token.value = res.data.token
    userCode.value = res.data.code
    Profile.value = res.data.data.profile ?? ''
    localStorage.setItem('token', token.value)
    localStorage.setItem('userId', userId.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('profile', Profile.value)
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('profile')
    localStorage.removeItem('avatar')
    Profile.value = ''
    userId.value = ''
    username.value = ''
    userCode.value = ''
    token.value = ''
    window.location.href = '/login'
  }

  return {
    Profile,
    userId,
    logout,
    Login,
    token,
    username,
    userCode,
  }
})

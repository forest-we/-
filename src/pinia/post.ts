import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

interface Postlist {
  id: number
  username: string
  title: string
  create_time: number
}

export const usePostStore = defineStore('post', () => {
  const postList = ref<Postlist[]>([])
  const getlist = async () => {
    const res = await axios.get('post/list')
    postList.value = res.data.data
  }

  return {
    getlist,
    postList,
  }
})

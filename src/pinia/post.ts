import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

interface Postlist {
  id: number
  username: string
  title: string
  create_time: number
  post_like_COUNT:number
  avatar:string
}

export const usePostStore = defineStore('post', () => {
  const postList = ref<Postlist[]>([])
  const total = ref(0)     //分页参数默认值
  const getlist = async (page = 1, pageSize = 10) => {
    const res = await axios.get('post/list', {
      params: { page, pageSize }
    })
    postList.value = res.data.data
    total.value = res.data.total
  }

  return {
    getlist,
    postList,
    total
  }
})

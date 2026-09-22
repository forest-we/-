import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

interface data{
    id: number
  username: string
  title: string
  create_time: number
  post_like_COUNT:number
  avatar:string
}
export const useFollow = defineStore('follow', () =>{
    const total = ref(0)
    const followData = ref<data[]>([])
    const follow = async (page = 1, pageSize = 10) =>{
        const res = await axios.get('api/follow/post-list', { params: { page, pageSize } })
        followData.value = res.data.data
        total.value = res.data.total
    }
    return{
        total,
        followData,
        follow
    }
})

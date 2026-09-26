import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'

interface Postlist {
  id: number
  username: string
  title: string
  create_time: number
  post_like_COUNT: number
  avatar: string
}

export const usePostStore = defineStore('post', () => {
  const postList = ref<Postlist[]>([])
  const total = ref(0) //分页参数默认值
  const keyword = ref('') //当前搜索关键词,空字符串表示非搜索态
  // 请求序号:只有最后一次发出的请求才允许写入结果,防止慢响应盖掉新结果
  let seq = 0

  const getlist = async (page = 1, pageSize = 10) => {
    const my = ++seq
    keyword.value = '' //回到普通列表态
    const res = await axios.get('post/list', {
      params: { page, pageSize },
    })
    if (my !== seq) return //已经有更新的请求了,丢弃这次的结果
    postList.value = res.data.data ?? []
    total.value = res.data.total ?? 0
  }

  //搜索:后端返回的数据结构与列表一致,所以直接用响应覆盖 postList 即可复用同一套渲染
  const searchPost = async (title: string, page = 1, pageSize = 10) => {
    const kw = String(title ?? '').trim()
    if (!kw) {
      //关键词为空 -> 恢复成普通列表
      await getlist(1, pageSize)
      return
    }
    const my = ++seq
    keyword.value = kw
    const res = await axios.post('post/search', { title: kw, page: page, pageSize: pageSize })
    if (my !== seq) return
    postList.value = res.data.data ?? []
    total.value = res.data.total ?? 0
  }

  return {
    searchPost,
    getlist,
    postList,
    total,
    keyword,
  }
})

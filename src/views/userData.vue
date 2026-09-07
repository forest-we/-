<!-- eslint-disable vue/valid-template-root -->
<template>
  <div id="as">
    <div>
      <el-avatar
        shape="square"
        :size="50"
        src="https://ts2.tc.mm.bing.net/th/id/OIP-C.5XpzGKbBQBM5d2VsJq-GZAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
      >
        <el-icon><User /></el-icon>
      </el-avatar>
      <p>{{ '作者: ' + postData.username }}</p>
    </div>
    <div>
      <h2>{{ postData.title }}</h2>
    </div>
    <div>
      <p>{{ postData.content }}</p>
    </div>
    <hr />
    <div>
      <p>评论区</p>
      <p>{{}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from '@/axios/axios'
import { onMounted, ref } from 'vue'
const route = useRoute()
const postId = route.params.id
console.log(postId)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postData = ref<any>('')
const postGet = async () => {
  const res = await axios.get(`/post/list/${postId}`)
  postData.value = res.data.data
  console.log(res.data.data)
}
onMounted(() => {
  postGet()
})
</script>

<style>
#as {
  text-align: center;
}
</style>

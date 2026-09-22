<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="photo-wall">
    <!-- 工具栏：上传 -->
    <div class="photo-toolbar">
      <el-upload :http-request="ee" :show-file-list="false" accept="image/*">
        <el-button type="primary" :icon="Upload">上传图片</el-button>
      </el-upload>
    </div>

    <!-- 图片网格 -->
    <div v-if="srcList.length" class="photo-grid">
      <div v-for="(item, index) in srcList" :key="item.id" class="photo-card">
        <el-image
          class="photo-img"
          :src="item.url"
          :preview-src-list="srcList.map((i) => i.url)"
          :initial-index="index"
          fit="cover"
          preview-teleported
        />
        <div class="photo-author">{{ item.username }}</div>
      </div>
    </div>
    <el-empty v-else description="还没有图片，上传第一张吧" />

    <!-- 分页 -->
    <div class="photo-pager">
      <pagination :page="page" :limit="limit" :total="total" @pageChangs="changePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from '@/axios/axios'
import { ElMessage } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'
import pagination from '@/components/pagination.vue'

interface PhotoItem {
  id: number
  image_path: string
  create_time: string
  username: string
  url: string
}

const srcList = ref<PhotoItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(15) // 一页 15 张（10~20 之间）

// 拉取图片列表：参数和后端 /image/list 的 page/pageSize 对齐
const photoGet = async (p: number = page.value) => {
  const res = await axios.get('image/list', {
    params: { page: p, pageSize: limit.value },
  })
  srcList.value = res.data.data
  total.value = res.data.total
}

const changePage = (pageS: number) => {
  page.value = pageS
  photoGet(pageS)
}

// 上传（http-request 自定义请求，字段名 image 和后端 multer single('image') 对齐）
const ee = async (a: any) => {
  try {
    const file = a.file
    const photo = new FormData()
    photo.append('image', file)
    const res = await axios.post('image/upload', photo)
    if (res.data.code === 200) {
      ElMessage({ message: '上传成功', type: 'success' })
      photoGet() // 上传完刷新回第一页
    }
  } catch (err: any) {
    ElMessage.error('上传失败')
  }
}

onMounted(() => {
  photoGet()
})
</script>

<style scoped>
.photo-wall {
  max-width: 1060px;
  margin: 0 auto;
  padding: 20px 16px;
}

.photo-toolbar {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 网格：auto-fill 自适应列数，窄屏自动换列 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

/* 每张图的卡片：图片 + 用户名 */
.photo-card {
  border-radius: 10px;
  overflow: hidden;
  background: var(--card-deep);
}

.photo-img {
  display: block;
  width: 100%;
  height: 180px;
  cursor: zoom-in;
}

.photo-author {
  padding: 6px 10px;
  font-size: 12px;
  color: var(--ink-2);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.photo-pager {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

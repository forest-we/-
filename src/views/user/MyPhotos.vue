<template>
  <div class="my-photos">
    <!-- 空态 -->
    <el-empty
      v-if="!loading && photos.length === 0"
      description="还没有上传过图片，去图吧页发一张吧~"
      :image-size="90"
    />

    <!-- 图片网格 -->
    <div v-if="photos.length" class="photo-grid">
      <div v-for="(item, index) in photos" :key="item.id" class="photo-card">
        <div class="photo-img-wrap">
          <el-image
            class="photo-img"
            :src="item.url"
            :preview-src-list="photos.map((i) => i.url)"
            :initial-index="index"
            fit="cover"
            preview-teleported
          />
          <el-button
            class="photo-del"
            type="danger"
            size="small"
            :icon="Delete"
            circle
            title="删除这张图片"
            @click.stop="delPhoto(item.id)"
          />
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pager">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from '@/axios/axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

interface MyPhoto {
  id: number
  image_path: string
  url: string
}

const photos = ref<MyPhoto[]>([])
const page = ref(1)
const pageSize = ref(12)
const total = ref(0)
const loading = ref(false)

// /api/image/user 只返回自己的图片，所以这里每条都能删
const getList = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/image/user', {
      params: { page: page.value, pageSize: pageSize.value },
    })
    photos.value = res.data.data
    total.value = res.data.total || 0
  } catch {
    ElMessage.error('加载图片失败')
  } finally {
    loading.value = false
  }
}

const changePage = (p: number) => {
  page.value = p
  getList()
}

// 后端会连带清掉 uploads/ 里的物理文件
const delPhoto = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这张图片吗？删除后无法恢复。', '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
  } catch {
    return // 用户取消
  }
  try {
    const res = await axios.delete('/api/image/delete', { data: { id } })
    if (res.data.code === 200) {
      ElMessage.success('删除成功')
      // 当前页删空了且不是第一页，回退一页
      if (photos.value.length === 1 && page.value > 1) {
        page.value--
      }
      getList()
    } else {
      ElMessage.error(res.data.message || '删除失败')
    }
  } catch {
    ElMessage.error('删除时出了点问题')
  }
}

onMounted(getList)
</script>

<style scoped>
.my-photos {
  padding: 4px 0 8px;
}

/* 网格：auto-fill 自适应列数，窄屏自动换列 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.photo-card {
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-deep);
}

/* 图片外层定位容器，删除按钮叠在右上角 */
.photo-img-wrap {
  position: relative;
}

.photo-img {
  display: block;
  width: 100%;
  height: 150px;
  cursor: zoom-in;
}

/* 默认隐藏，鼠标移到卡片上才露出，避免挡住图片 */
.photo-del {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity 0.2s;
}

.photo-card:hover .photo-del {
  opacity: 1;
}

.pager {
  display: flex;
  justify-content: center;
  padding: 18px 0 6px;
}
</style>

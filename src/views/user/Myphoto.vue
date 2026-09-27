<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-photo">
    <div class="photo-head">
      <span class="count">我的图片数量：{{ total }}</span>
    </div>

    <!-- 空态 -->
    <el-empty
      v-if="!loading && photoData.length === 0"
      description="还没有上传过图片，去图吧传一张吧~"
      :image-size="90"
    />

    <!-- 图片网格 -->
    <div v-else class="photo-grid">
      <div v-for="(value, index) in photoData" :key="value.id" class="photo-card">
        <el-image
          class="thumb"
          :src="value.url"
          :preview-src-list="previewList"
          :initial-index="index"
          preview-teleported
          fit="cover"
        />
        <div class="photo-bar">
          <el-button type="danger" size="small" text class="del-btn" @click="delPhoto(value.id)">
            删除
          </el-button>
        </div>
      </div>
    </div>
    <div>
      <pagination :page="page" :limit="pageSize" :total="total" @pageChangs="getMyphoto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from '@/axios/axios'
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import pagination from '@/components/pagination.vue'
interface PhotoItem {
  id: number
  image_path: string
  url: string
}

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const photoData = ref<PhotoItem[]>([])

//预览序列:点开大图后左右能翻的就是这个数组,所以要用 url
const previewList = computed(() => photoData.value.map((i) => i.url))

const get = async (pages: number = page.value) => {
  loading.value = true
  try {
    const res = await axios.get('api/image/user', {
      params: { page: pages, pageSize: pageSize.value },
    })
    photoData.value = res.data.data ?? []
    total.value = res.data.total ?? 0
  } catch {
    ElMessage.error('加载图片失败')
  } finally {
    loading.value = false
  }
}

const getMyphoto = (pages: number) => {
  page.value = pages
  get(pages)
}

const delPhoto = async (id: number) => {
  //二次确认:删除不可恢复
  try {
    await ElMessageBox.confirm('确定要删除这张图片吗？删除后不可恢复。', '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
  } catch {
    return //用户点了取消
  }
  try {
    const res = await axios.delete('api/image/delete', { data: { id: id } })
    if (res.data.code === 200) {
      ElMessage.success('删除成功')
      //删掉的是当页最后一张时要回退一页,否则会停在空页:
      //列表显示"没有图片"但上面的数量栏不是 0
      if (photoData.value.length === 1 && page.value > 1) page.value--
      await get()
    } else {
      ElMessage.error(res.data.message || '删除失败')
    }
  } catch {
    //400/500 拦截器已经弹过具体提示了,这里别重复弹
  }
}

onMounted(get)
</script>

<style scoped>
.my-photo {
  padding: 4px 0 8px;
}

.photo-head {
  display: flex;
  align-items: center;
  padding: 0 4px 12px;
}

.count {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-2);
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 14px;
}

.photo-card {
  border: 1px solid var(--line-soft);
  border-radius: 10px;
  overflow: hidden;
  background: var(--card-deep);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.photo-card:hover {
  border-color: var(--acid-deep);
  transform: translateY(-2px);
}

.thumb {
  display: block;
  width: 100%;
  height: 120px;
}

.photo-bar {
  display: flex;
  justify-content: center;
  padding: 6px 0;
}

.del-btn {
  flex-shrink: 0;
}
</style>

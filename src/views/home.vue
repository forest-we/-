<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-card style="max-width: 360px">
      <div>
        <div>
          <el-button @click="rou">{{ postData.title }}</el-button>
        </div>
        <div>
          <p>
            {{ '发布时间  ' + postData.create_time }}
          </p>
        </div>
      </div>
    </el-card>
    <el-card style="max-width: 300px">
      <div>
        <div>
          <el-button @click="rou">{{ '标题部分' }}</el-button>
        </div>
        <div>
          <p>
            {{ '正文' }}
          </p>
        </div>
      </div>
    </el-card>
    <el-card style="max-width: 300px">
      <div>
        <div>
          <el-button @click="rou">{{ '标题部分' }}</el-button>
        </div>
        <div>
          <p>
            {{ '正文' }}
          </p>
        </div>
      </div>
    </el-card>
    <el-card style="max-width: 300px">
      <div>
        <div>
          <el-button @click="rou">{{ '标题部分' }}</el-button>
        </div>
        <div>
          <p>
            {{ '正文' }}
          </p>
        </div>
      </div>
    </el-card>
    <el-card style="max-width: 300px">
      <div>
        <div>
          <el-button @click="rou">{{ '标题部分' }}</el-button>
        </div>
        <div>
          <p>
            {{ '正文' }}
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

// eslint-disable-next-line vue/block-lang
<script setup lang="ts">
import axios from '@/axios/axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { onMounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postData = ref<any>('')
onMounted(() => {
  postGet()
})

const postGet = async () => {
  try {
    const res = await axios.get('post/list')
    postData.value = res.data.data[0]
    console.log(res.data.data)
  } catch {
    ElMessage.error('额,出了点问题')
  }
}
console.log('nh')

const rou = () => {
  // oxlint-disable-next-line no-unused-expressions
  router.push('/userData')
}
</script>

<style>
#er {
  text-align: center;
  width: 100%;
}
.tt {
  max-width: 600px;
}
</style>

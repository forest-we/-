<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="er">
    <div class="tt">
      <el-form-item label="搜索文章">
        <el-input autocomplete="off" />
      </el-form-item>
    </div>
    <el-card style="max-width: 480px">
      <el-button @click="rou()"> 点击查看 </el-button>
      <el-collapse>
        <el-collapse-item title="作者:" name="1">
          <p>阿八八八八八</p>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card style="max-width: 480px">
      <el-button> 点击查看 </el-button>
      <el-collapse>
        <el-collapse-item style="" title="Consistency" name="1">
          <div>skbdfdsgfzhbzzzzzzzbzbzbzbzbzbbvbkesz</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card style="max-width: 480px">
      <el-button> 点击查看 </el-button>
      <el-collapse>
        <el-collapse-item style="" title="Consistency" name="1">
          <div>skbdfdsgfzhbzzzzzzzbzbzbzbzbzbbvbkesz</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <div id="ty">
      <el-card style="max-width: 300px">
        <div>大家都在搜</div>
        <p>1</p>
        <p>2</p>
      </el-card>
    </div>
  </div>
</template>

// eslint-disable-next-line vue/block-lang
<script setup lang="ts">
import axios from '@/axios/axios'
import router from '@/router'
import { ref } from 'vue'
import { onMounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postData = ref('')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const username = ref('')

onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const res = await axios.get('post/list')
})

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

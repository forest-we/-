<template>
      <el-image
        ref="imageRef"
        style="width: 100px; height: 100px"
        :src="url"
        show-progress
        :preview-src-list="srcList"
        fit="cover"
        :initial-index="4"
         
      />

<el-upload :http-request="ee"  >
    
      上传

</el-upload>


</template>

<script setup lang="ts">
import axios from '@/axios/axios'
import { ElMessage, type ImageInstance } from 'element-plus'
import { onMounted, ref } from 'vue'
const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = ref<string[]>([])
const ee =  async (a:any) =>{
   try{
     const file = a.file
    console.log(file);
  const photo = new FormData()
  photo.append('image', file)
    const res = await axios.post('image/upload', photo)
    if(res.data.code === 200){
        ElMessage({
          message:'上传成功',
          type:'success'
        })
    }
   }
   catch(err:any){
    ElMessage.error('发送错误')
   }
}

const photoGet = async () =>{
 const res = await axios.get('/image/upload')
  srcList.value = res.data.data
}
onMounted(()=>{
  photoGet()
})
</script>
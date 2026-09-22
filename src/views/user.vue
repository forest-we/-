<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="rt">
    <div class="wer">
   
     <el-tooltip  content="点击修改头像" placement="top">
   <el-upload  
                action=""
                :http-request="up">
 <el-avatar
        class="author-avatar"
        :size="120"
        :src="useAvatar.avatar"
        
       
      >
        <el-icon><User /></el-icon>
        
      </el-avatar>
      </el-upload>
     </el-tooltip>
    </div>
    <div>
    </div>
    
      <span>{{ useStore.username }}</span>
    
    <div class="jianjei">
      <p>{{ useStore.Profile }}</p>
    </div>
    <div>
        <el-button type="primary" @click="adDuser" :icon="Edit" circle />
    </div>
  </div>
  <addUser ref="adD" />
     
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia/user'

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  User,
} from '@element-plus/icons-vue'
import addUser from '@/components/add-user.vue';
import { onMounted, ref } from 'vue';
import axios from '@/axios/axios';
import { useAvaterStore } from '@/pinia/avatar';
const useAvatar = useAvaterStore()
const useStore = useUserStore()

onMounted(() => {
  useAvatar.avatarPost()
})

const up = async (upload: any) =>{
     const file = upload.file
     console.log(file);
     const formee = new FormData()
     formee.append('avatar', file)
     const res = await axios.post('upload', formee)
     useAvatar.avatar = res.data.url
}



const adD = ref<any>(null)
const adDuser = () =>{
    adD.value.addClose()
}



</script>

<style>
#rt {
  display: flex;
}
.wer{
  padding: 10px;
}
</style>

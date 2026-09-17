<template>
<el-dialog label="修改主页" v-model="adD" append-to-body>
    <el-form-item label="用户名">
        <el-input v-model="from.username" maxlength="10"  />
    </el-form-item>
    <el-form-item label="个人签名">
        <el-input v-model="from.profile" />
    </el-form-item>
</el-dialog>
</template>

 
<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/pinia/user';
const useStore = useUserStore()
const adD = ref(false)
const addClose = () =>{
    from.value.username = useStore.username
    from.value.profile = useStore.Profile
    adD.value = true
}


const from = ref({
    username: '',
    profile: ''
})
defineExpose({addClose})
</script>
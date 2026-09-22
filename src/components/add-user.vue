<template>
<el-dialog label="修改主页" v-model="adD" append-to-body>
        <el-form >
        <el-form-item label="用户名">
        <el-input v-model="from.username" maxlength="10"  />
        </el-form-item>
        <el-form-item label="个人签名">
        <el-input v-model="from.profile" />
        </el-form-item>
        </el-form>
    <div>
        <el-button class="auth-submit" type="primary" @click="userAdd">修改</el-button>
    </div>
</el-dialog>
</template>

 
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/pinia/user';
import axios from '@/axios/axios';
import { ElMention, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
const useStore = useUserStore()
const adD = ref(false)
const addClose = () =>{
    from.value.username = useStore.username
    from.value.profile = useStore.Profile
    adD.value = true
}
const userAdd = async () =>{
   try{
     const res = await axios.put('user/add', from.value)
    if(res.data.code  === 200){
        ElMessage({
            message:'修改成功',
            type:'success'
        })
        adD.value = false
    }
   }
   catch(err:any){
        console.log(err.message);
        ElMessage.error('修改时出现问题')
   }
}

const from = ref({
    username: '',
    profile: ''
})
defineExpose({addClose})
</script>
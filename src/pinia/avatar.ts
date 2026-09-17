import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios/axios'


export const useAvaterStore = defineStore('avatar', ()=>{
    const avatar = ref(localStorage.getItem('avatar') || '')
    const avatarPost = async () =>{
        const res = await axios.get('upload')
        avatar.value = res.data.url
        localStorage.setItem('avatar', avatar.value)
    }


    return{
        avatar,
        avatarPost
    }
})
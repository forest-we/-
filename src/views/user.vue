<template>
<div id="rt">
    <div>
    <el-avatar class="author-avatar" :size="52" src="https://ts2.tc.mm.bing.net/th/id/OIP-C.5XpzGKbBQBM5d2VsJq-GZAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3">
    <el-icon><User /></el-icon>
    </el-avatar>
    </div>
    <div>
        <h1>
            {{ useStore.username }}
        </h1>
    </div>
    <div class="jianjei">
        <p>{{ useStore.Profile }}</p>
    </div>
</div>



</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/pinia/user';
const useStore = useUserStore()
const geet = (name:string): void =>{
        console.log('hello', name);
        
}
geet('相似u为')

const fyt = (name?:string, tty?:Number): void =>{
        console.log('hello', name,  tty);
        
}
fyt('无赖哦·', 123)

interface ex1{
    x:string,
    v:Number
}
interface ex2 extends ex1{
     z?:Number
}
let ex3: ex2 = {
    x:'',
    v:1
}
</script>




<style>
#rt{
    text-align: center;
}




</style>
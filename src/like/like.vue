<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
<el-dialog v-model="close" append-to-body>
   <div id="asd">
     <h1>这里是彩蛋界面</h1>
        <p>我是站长,也是维护和开发的程序员</p>
        <p>作者懒得做防火墙了,求别ddos和xss</p>
        <p>有什么建议可以写在帖子上,作者会看的</p>
        <p>最后最后本站是自由的想发什么就发什么,然后有bug记得发帖说一下哈</p>
        <img src="/photo/OIP-C.jpg" alt="">
   </div>

</el-dialog>



    
</template>


<script setup lang="ts">

import { ref } from 'vue';
const hello = ()=>{
    close.value = true
}
const close = ref(false)
defineExpose({hello})
</script>

<style >
    #asd{
        text-align: center;
    }


</style>
<template>
<div>                                                                 
     <el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :current-page="page" @current-change="changePage"/>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';   //父组件在子组件标签处向子组件传输  //子组件用defineProps接收  
defineProps({                   //子组件通过在共享标签处加上@hanshu调用changPage函数，然后函数里封装好的emit向父组件发送一个函数代表提醒父组件刷新 //pageS代表子组件传给父组件的新页数
    page:Number,               //分页组件按钮被点击时会传递当前页数的参数， 可以用函数的形参接受
    limit:Number,
    total:Number
})
const emit = defineEmits(['pageChangs'])   
const changePage = (pageS:Number) =>{
    emit('pageChangs', pageS)  
}


</script>
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="a1">
    <el-container>
      <el-header>
        <Globalheader />
      </el-header>
      <el-main class="ww">
        <RouterView />
      </el-main>
      <el-footer class="ee">
        <a href="https://element-plus.org/" target="_blank">架构</a>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Globalheader from '@/components/globalheader.vue'
//路由切换到哪RouterView 路由出口就切换到对应界面 在el-maib标签处
//  最后再把布局文件引入到外层文件app.vue
</script>

<style>
#a1 {
  height: 100vh;
}

#a1 .el-container {
  height: 100%;
}

#a1 .ee {
  background: #efefef;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
.ww {
  background: #e5eaf3;
}
</style>

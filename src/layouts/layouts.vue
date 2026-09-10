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

/* 顶部栏:纸面浅色通栏,知乎式底部发丝线 */
#a1 .el-header {
  height: 60px;
  padding: 0;
  background: rgb(253 250 242 / 88%);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--line-soft);
  box-shadow: 0 1px 0 rgb(104 82 42 / 3%);
  position: relative;
  z-index: 5;
}

/* 主区域:透出纸色背景,底栏留出悬浮余量 */
#a1 .ww {
  background: transparent;
  padding: 28px 0 96px;
}

/* 底部栏:纸色窄条,低对比,小字 */
#a1 .ee {
  background: rgb(253 250 242 / 92%);
  backdrop-filter: blur(6px);
  border-top: 1px solid var(--line-soft);
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px 16px;
  font-size: 13px;
  letter-spacing: 0.2em;
  color: var(--ink-3);
}

#a1 .ee a {
  text-decoration: none;
  color: var(--ink-2);
  transition: color 0.2s ease;
}

#a1 .ee a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--acid);
  text-underline-offset: 5px;
  text-decoration-thickness: 2px;
}
</style>

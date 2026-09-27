/// <reference types="vite/client" />

// 不声明的话自定义变量是 any,拼错名字不报错,baseURL 会拿到 undefined
interface ImportMetaEnv {
  readonly VITE_API_BASE: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, object, any>
  export default component
}

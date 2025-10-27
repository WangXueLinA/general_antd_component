# react/vue相同点
- 都使用Virtural DOM
- 都使用组件化思想，流程基本一致
- 都遵循数据驱动视图，推崇单向数据流
- 都有成熟的社区，都支持服务端渲染

## 虚拟DOM
Vue和React实现原理和流程基本一致，都是使用Virtual DOM + Diff算法。不管是Vue的template模板 + options api写法，还是React的Class或者Function（js 的class写法也是function函数的一种）写法，底层最终都是为了生成render函数，render函数执行返回VNode（虚拟DOM的数据结构，本质上是棵树）。当每一次UI更新时，总会根据render重新生成最新的VNode，然后跟以前缓存起来老的VNode进行比对，再使用Diff算法（框架核心）去真正更新真实DOM（虚拟DOM是JS对象结构，同样在JS引擎中，而真实DOM在浏览器渲染引擎中，所以操作虚拟DOM比操作真实DOM开销要小的多）。

Vue和React通用流程：vue template/react jsx -> render函数 -> 生成VNode -> 当有变化时，新老VNode diff -> diff算法对比，并真正去更新真实DOM。

## 为什么选择Virtual DOM

为什么Vue和React都选择Virtual DOM（React首创VDOM，Vue2.0开始引入VDOM）？主要有以下几点：

1. 减少直接操作DOM。框架给我们提供了屏蔽底层dom书写的方式，减少频繁的整更新dom，同时也使得数据驱动视图

由于vue跟react的框架他的颗粒的只能精确到组件，也就是说vue跟react里面，数据变化了，更新的整个组件， 如果组件里面有1000个真实的dom的话，只需要更新一个真实的dom，如果在组件内部1000个真实的dom又重新生成了的代价太大， 因此选择一种比较小的代价，生成虚拟dom，然后通过diff算法去精准的对比真实的dom哪里需要更新

2. 可以跨平台。在设计框架的时候，他是希望移植到其他不仅仅是浏览器的环境中的，不如像小程序，app等平台，所以这时候就不能绑定真实dom，因为真实dom只有在浏览器环境里才有，别的环境里面没有，所有他用js对象来模拟dom，js对象属于ES范畴，只要环境支持ES，那么就一定支持js对象的，然后到真实的运行环境中进行不用的渲染，移动端就渲染成原生组件，浏览器就渲染成真实的dom


| 特性 |	React | 	Vue |	说明 |
| :----- | :----: | :----: | :-- |
| 组件化	| ✅	| ✅ | 	将 UI 拆分为独立组件 | 
| 虚拟 DOM	| ✅	| ✅	| 	提高渲染性能  | 
| 数据驱动	| ✅	| ✅	| 	数据变化自动更新视图 | 
| 响应式	| ✅	| ✅	| 	状态更新机制 | 
| 生命周期	| ✅	| ✅	| 	组件各阶段钩子函数 | 
| 条件 / 列表渲染 | 	✅	| ✅	| 	动态生成 DOM | 
| JSX / 模板	| ✅（JSX）	| ✅（模板 / JSX）| 		UI 描述方式 | 
| 生态系统	| ✅	| ✅	| 	完善的配套工具 | 
| 跨平台	| ✅（React Native）	| ✅（Vue Native/Weex/uni-app）	| 	多端运行能力 | 


## 相似api

| React Hook | Vue 3 Composition API | 功能描述 |
|------------|-----------------------|----------|
| `useState` | `ref` / `reactive` | 状态管理 |
| `useEffect` | `watch` / `watchEffect` | 副作用处理 |
| `useContext` | `provide` / `inject` | 跨组件通信 |
| `useMemo` | `computed` | 计算属性/缓存 |
| `useCallback` | `computed` (缓存函数) | 缓存函数引用 |
| `useRef` | `ref` (非响应式) | 获取DOM元素或持久化值 |
| `useLayoutEffect` | `onBeforeMount` / `onMounted` | DOM更新前执行 |
| `useImperativeHandle` | `defineExpose` | 暴露组件方法 |
| `useDeferredValue` | `watchPostEffect` | 延迟更新非紧急状态 |
| `useTransition` | `transition` | 状态过渡效果 |
| `Suspense` | `Suspense` | 异步组件加载 |
| `createPortal` | `Teleport` | 将子组件渲染到父组件 DOM 结构之外的机制 |
| `Fragment` | `Fragment` | 片段组件, 多个子元素作为一个整体返回 |


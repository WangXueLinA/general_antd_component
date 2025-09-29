# react/vue不同

核心思想不同
Vue早期定位是尽可能的降低前端开发的门槛（这跟Vue作者是独立开发者也有关系）。所以Vue推崇灵活易用（渐进式开发体验），数据可变，双向数据绑定（依赖收集）。

React早期口号是Rethinking Best Practices。背靠大公司Facebook的React，从开始起就不缺关注和用户，而且React想要做的是用更好的方式去颠覆前端开发方式（事实上跟早期jquery称霸前端，的确是颠覆了）。所以React推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的React适合大型应用，根本原因还是在于其函数式编程。

由于两者核心思想的不同，所以导致Vue和React许多外在表现不同（从开发层面看）。

#1.1 核心思想不同导致写法差异
Vue推崇template（简单易懂，从传统前端转过来易于理解）、单文件vue。而且虽然Vue2.0以后使用了Virtual DOM，使得Vue也可以使用JSX（babel工具转换支持），但Vue官方依然首先推荐template，这跟Vue的核心思想和定位有一定关系。

React推崇JSX、HOC、all in js。

#1.2 核心思想不同导致api差异
Vue定位简单易上手，基于template模板 + options API，所以不可避免的有较多的概念和api。比如template模板中需要理解slot、filter、指令等概念和api，options API中需要理解watch、computed（依赖收集）等概念和api。

React本质上核心只有一个Virtual DOM + Diff算法，所以API非常少，知道setState就能开始开发了。

#1.3 核心思想不同导致社区差异
由于Vue定义简单易上手，能快速解决问题，所以很多常见的解决方案，是Vue官方主导开发和维护。比如状态管理库Vuex、路由库Vue-Router、脚手架Vue-CLI、Vutur工具等。属于那种大包大揽，遇到某类通用问题，只需要使用官方给出的解决方案即可。

React只关注底层，上层应用解决方案基本不插手，连最基础的状态管理早期也只是给出flow单向数据流思想，大部分都丢给社区去解决。比如状态管理库方面，有redux、mobx、redux-sage、dva等一大堆（选择困难症犯了），所以这也造就了React社区非常繁荣。同时由于有社区做上层应用解决方案，所以React团队有更多时间专注于底层升级，比如花了近2年时间把底层架构改为Fiber架构，以及创造出React Hooks来替换HOC，Suspense等。 更多框架设计思想可看 尤雨溪 - 在框架设计中寻求平衡 (opens new window)。

#1.4 核心思想不同导致未来升级方向不同
核心思想不同，决定了Vue和React未来不管怎么升级变化，Vue和React考虑的基本盘不变。

Vue依然会定位简单易上手（渐进式开发），依然是考虑通过依赖收集来实现数据可变。这点从Vue3核心更新内容可以看到：template语法基本不变、options api只增加了setup选项（composition api）、基于依赖收集（Proxy）的数据可变。更多Vue3具体更新内容可看笔者总结 Vue3设计思想 (opens new window)或者 尤雨溪 - 聊聊 Vue.js 3.0 Beta 官方直播 (opens new window)。

React的函数式编程这个基本盘不会变。React核心思想，是把UI作为Basic Type，比如String、Array类型，然后经过render处理，转换为另外一个value（纯函数）。从React Hooks可以看出，React团队致力于组件函数式编程，（纯组件，无class组件），尽量减少副作用（减少this，this会引起副作用）。

#2. 组件实现不同
Vue源码实现是把options挂载到Vue核心类上，然后再new Vue({options})拿到实例（vue组件的script导出的是一个挂满options的纯对象而已）。所以options api中的this指向内部Vue实例，对用户是不透明的，所以需要文档去说明this.$slot、this.$xxx这些api。另外Vue插件都是基于Vue原型类基础之上建立的，这也是Vue插件使用Vue.install的原因，因为要确保第三方库的Vue和当前应用的Vue对象是同一个。

React内部实现比较简单，直接定义render函数以生成VNode，而React内部使用了四大组件类包装VNode，不同类型的VNode使用相应的组件类处理，职责划分清晰明了（后面的Diff算法也非常清晰）。React类组件都是继承自React.Component类，其this指向用户自定义的类，对用户来说是透明的。

3. 响应式原理不同
这个问题网上已经有许多优秀文章都详细讲解过，这里就不具体展开讲，对Vue3响应式原理有兴趣可以看笔者 Vue3响应式原理 (opens new window)(Vue2和Vue3响应式原理基本一致，都是基于依赖收集，不同的是Vue3使用Proxy)。

Vue

Vue依赖收集，自动优化，数据可变。
Vue递归监听data的所有属性,直接修改。
当数据改变时，自动找到引用组件重新渲染。
React

React基于状态机，手动优化，数据不可变，需要setState驱动新的State替换老的State。
当数据改变时，以组件为根目录，默认全部重新渲染
#4. diff算法不同
两者流程思维上是类似的，都是基于两个假设（使得算法复杂度降为O(n)）：

不同的组件产生不同的 DOM 结构。当type不相同时，对应DOM操作就是直接销毁老的DOM，创建新的DOM。
同一层次的一组子节点，可以通过唯一的 key 区分。
但两者源码实现上有区别：

Vue基于snabbdom库，它有较好的速度以及模块机制。Vue Diff使用双向链表，边对比，边更新DOM。

React主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。


5. 事件机制不同
Vue

Vue原生事件使用标准Web事件
Vue组件自定义事件机制，是父子组件通信基础
Vue合理利用了snabbdom库的模块插件
React

React原生事件被包装，所有事件都冒泡到顶层document监听，然后在这里合成事件下发。基于这套，可以跨端使用事件机制，而不是和Web DOM强绑定。
React组件上无事件，父子组件通信使用props
#Vue 和 React源码流程图
# 动态获取属性

对象属性支持getter和setter

```js
const obj = {
  get name() {
    return "小红"
  }
}

console.log(obj.name) // 小红
```

等价于用 Object.defineProperty：

```js 
const obj = {}
Object.defineProperty(obj, "name", {
  get: function() {
    return "小红"
  }
})
```

支持setter

```js 
const obj = {
  _name: '小红',
  get name() { return this._name },
  set name(val) { this._name = val }
}
console.log(obj.name) // 小红
```
<!-- 
getter 不能跟属性值同时存在

```js
const obj = {
  get name() { return "小红" },
  name: "小红" //  会报错
}
``` -->


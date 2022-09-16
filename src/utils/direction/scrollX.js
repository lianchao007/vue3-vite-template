/*
 * @Descripttion: 横向滚动
 * @version: 
 * @Author: lc
 * @Date: 2022-08-19 13:49:13
 * @LastEditors: lc
 * @LastEditTime: 2022-08-19 14:01:01
 */
let isMoving = false
const scrollX = {
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
    el.onmousedown = () => {
      isMoving = true
    }
    el.onmouseleave = () => {
      isMoving = false
    }
    el.onmouseup = () => {
      isMoving = false
    }
    el.onmousemove = (event) => {
      if (isMoving) {
        el.scrollLeft = el.scrollLeft - event.movementX
      }
    }
    el.onmousewheel = (event) => {
      el.scrollLeft = el.scrollLeft + event.deltaY
    }
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
export default scrollX
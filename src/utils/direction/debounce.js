/*
 * @Descripttion: 防抖
 * @version: 
 * @Author: lc
 * @Date: 2022-08-19 14:54:51
 * @LastEditors: lc
 * @LastEditTime: 2022-08-19 15:17:43
 */

const debounce = {
    // 或事件监听器应用前调用
    created(el, binding, vnode, prevVnode) {
      // 下面会介绍各个参数的细节
      el.addEventListener('click', e => {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, 500)
      })
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
  export default debounce
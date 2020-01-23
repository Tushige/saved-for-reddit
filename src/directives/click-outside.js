export default {
  bind(el, binding) {
    el._clickOutsideHandler__ = event => {
      if (!el === event.target || event.target.contains(el)) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el._clickOutsideHandler__)
  },
  unbind(el) {
    document.body.removeEventListener('click', el._clickOutsideHandler__)
  }
}
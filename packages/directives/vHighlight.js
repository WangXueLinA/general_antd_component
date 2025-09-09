// textHighlightDirective.js
export default {
  beforeMount(el, binding) {
    highlightText(el, binding.value);
  },
  
  // 在元素更新后调用
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      highlightText(el, binding.value);
    }
  },
  
  unmounted(el) {
    if (el._originalText) {
      el.innerHTML = el._originalText;
    }
  }
};

function highlightText(el, options) {
  if (!el._originalText) {
    el._originalText = el.innerHTML;
  }
  
  if (!options || !options.searchText) {
    el.innerHTML = el._originalText;
    return;
  }
  
  const { 
    searchText, 
    caseSensitive = false, 
    highlightClass = 'highlighted-text',
    // 默认高亮样式：红色字体
    highlightStyle = {
      color: '#ff0000',
      padding: '0',           
      borderRadius: '0'
    }
  } = options;
  
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(`(${escapeRegExp(searchText)})`, flags);
  
  const originalText = el._originalText;
  const highlightedText = originalText.replace(regex, (match) => {
    return `<span class="${highlightClass}" style="${getStyleString(highlightStyle)}">${match}</span>`;
  });
  
  el.innerHTML = highlightedText;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getStyleString(styleObj) {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      // 转换驼峰命名为短横线命名（如backgroundColor -> background-color）
      const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      return `${cssKey}: ${value};`;
    })
    .join(' ');
}

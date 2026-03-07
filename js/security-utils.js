/**
 * AMBROSE Health - Security Utilities
 * 安全工具函数 - 防止XSS攻击
 */

const SecurityUtils = {
  /**
   * 转义HTML特殊字符，防止XSS攻击
   * @param {string} text - 需要转义的文本
   * @returns {string} - 转义后的安全HTML
   */
  escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  },

  /**
   * 验证输入是否为有效的字符串
   * @param {*} value - 输入值
   * @param {object} options - 验证选项
   * @returns {object} - { valid: boolean, msg: string, value: any }
   */
  validateInput(value, options = {}) {
    const { 
      type = 'string', 
      required = true, 
      minLength = 0, 
      maxLength = 1000,
      min = null,
      max = null,
      pattern = null,
      allowEmpty = false
    } = options;

    // 空值检查
    if (value === null || value === undefined || value === '') {
      if (required && !allowEmpty) {
        return { valid: false, msg: '输入不能为空', value: null };
      }
      return { valid: true, msg: '', value: allowEmpty ? value : null };
    }

    const strValue = String(value).trim();

    // 长度验证
    if (strValue.length < minLength) {
      return { valid: false, msg: `输入长度不能少于 ${minLength} 个字符`, value: null };
    }
    if (strValue.length > maxLength) {
      return { valid: false, msg: `输入长度不能超过 ${maxLength} 个字符`, value: null };
    }

    // 类型验证
    switch (type) {
      case 'number': {
        const num = parseFloat(strValue);
        if (isNaN(num)) {
          return { valid: false, msg: '请输入有效的数字', value: null };
        }
        if (min !== null && num < min) {
          return { valid: false, msg: `数值不能小于 ${min}`, value: null };
        }
        if (max !== null && num > max) {
          return { valid: false, msg: `数值不能大于 ${max}`, value: null };
        }
        return { valid: true, msg: '', value: num };
      }
      
      case 'phone': {
        if (!/^1[3-9]\d{9}$/.test(strValue)) {
          return { valid: false, msg: '手机号格式不正确', value: null };
        }
        return { valid: true, msg: '', value: strValue };
      }
      
      case 'email': {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue)) {
          return { valid: false, msg: '邮箱格式不正确', value: null };
        }
        return { valid: true, msg: '', value: strValue };
      }
      
      case 'date': {
        const date = new Date(strValue);
        if (isNaN(date.getTime())) {
          return { valid: false, msg: '日期格式不正确', value: null };
        }
        return { valid: true, msg: '', value: date };
      }
      
      case 'string':
      default: {
        // 自定义正则验证
        if (pattern && !pattern.test(strValue)) {
          return { valid: false, msg: '输入格式不正确', value: null };
        }
        return { valid: true, msg: '', value: strValue };
      }
    }
  },

  /**
   * 清理URL，防止开放重定向
   * @param {string} url - 需要清理的URL
   * @returns {string|null} - 安全的URL或null
   */
  sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return null;
    
    // 禁止javascript:协议
    const sanitized = url.trim().replace(/^[\x00-\x20]+/, '');
    if (/^[\w-]+:/i.test(sanitized) && !/^https?:/i.test(sanitized)) {
      return null;
    }
    
    return sanitized;
  },

  /**
   * 安全地设置innerHTML（仅在必要时使用）
   * @param {HTMLElement} element - 目标元素
   * @param {string} html - HTML内容
   */
  setInnerHTML(element, html) {
    if (!element || !html) return;
    
    // 清理元素上的事件处理器
    const clone = element.cloneNode(false);
    element.parentNode?.replaceChild(clone, element);
    
    // 使用DOMPurify风格的清理（简化版）
    const allowedTags = ['div', 'span', 'p', 'br', 'strong', 'em', 'b', 'i', 'u'];
    const cleaned = html.replace(/<\/?([a-z][a-z0-9]*)[^>]*>/gi, (match, tag) => {
      return allowedTags.includes(tag.toLowerCase()) ? match : '';
    });
    
    clone.innerHTML = cleaned;
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecurityUtils;
} else {
  window.SecurityUtils = SecurityUtils;
}

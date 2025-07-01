import { defineConfig } from "unocss";

// 极简配置 - 仅包含实际使用的样式，不包含任何字体和预设
export default defineConfig({
  presets: [],
  
  // 手动定义所有用到的样式规则
  rules: [
    // 自定义主题颜色
    [/^bgc-(.+)$/, ([, colorName]) => ({ "background-color": `var(--${colorName}-color)` })],
    [/^borderc-(.+)$/, ([, colorName]) => ({ "border-color": `var(--${colorName}-color)` })],
    [/^textc-(.+)$/, ([, colorName]) => ({ color: `var(--${colorName}-color)` })],
    
    // 基础布局
    ['flex', { display: 'flex' }],
    ['flex-col', { 'flex-direction': 'column' }],
    ['flex-auto', { flex: 'auto' }],
    ['items-center', { 'align-items': 'center' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    ['min-h-screen', { 'min-height': '100vh' }],
    
    // 间距系统 (基于4px)
    [/^p-(\d+(?:\.\d+)?)$/, ([, d]) => ({ padding: `${Number(d) * 4}px` })],
    [/^px-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'padding-left': `${Number(d) * 4}px`, 'padding-right': `${Number(d) * 4}px` })],
    [/^py-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'padding-top': `${Number(d) * 4}px`, 'padding-bottom': `${Number(d) * 4}px` })],
    [/^m-(\d+(?:\.\d+)?)$/, ([, d]) => ({ margin: `${Number(d) * 4}px` })],
    [/^mx-auto$/, () => ({ 'margin-left': 'auto', 'margin-right': 'auto' })],
    [/^ml-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'margin-left': `${Number(d) * 4}px` })],
    [/^mt-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'margin-top': `${Number(d) * 4}px` })],
    [/^mb-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'margin-bottom': `${Number(d) * 4}px` })],
    
    // 文字
    ['text-center', { 'text-align': 'center' }],
    ['text-sm', { 'font-size': '14px' }],
    ['text-lg', { 'font-size': '18px' }],
    ['font-bold', { 'font-weight': 'bold' }],
    ['no-underline', { 'text-decoration': 'none' }],
    
    // 圆角
    ['rounded', { 'border-radius': '4px' }],
    ['rounded-lg', { 'border-radius': '8px' }],
    ['rounded-full', { 'border-radius': '50%' }],
    
    // 其他
    ['cursor-pointer', { cursor: 'pointer' }],
    ['cursor-default', { cursor: 'default' }],
    ['transition', { transition: 'all 0.3s ease' }],
    ['duration-300', { 'transition-duration': '300ms' }],
    
    // 尺寸
    [/^size-(\d+(?:\.\d+)?)$/, ([, d]) => ({ width: `${Number(d) * 4}px`, height: `${Number(d) * 4}px` })],
    
    // 阴影
    ["shadow-button", { "box-shadow": "rgba(0, 0, 0, 0.10) 0px 4px 6px" }],
    ["shadow-card", { "box-shadow": "0px 0px 15px 0px rgba(0, 0, 0, 0.03), 0px 2px 30px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)" }],
    
    // 简化图标支持 - 仅Material Symbols
    [/^i-material-symbols:(.+)$/, ([, name]) => ({
      'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath fill='currentColor' d='M0 0h24v24H0z'/%3e%3c/svg%3e")`,
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'background-size': 'contain',
      width: '1.2em',
      height: '1.2em',
      display: 'inline-block',
      'vertical-align': 'middle'
    })],
  ],
  
  safelist: [
    'color-scheme-auto', 'color-scheme-light', 'color-scheme-dark',
    'is-open', 'is-active', 'write'
  ]
});
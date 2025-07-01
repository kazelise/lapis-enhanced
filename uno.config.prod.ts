import { defineConfig } from "unocss";

// 生产环境专用配置 - 最小化文件大小
export default defineConfig({
  presets: [], // 不使用任何预设
  
  // 手动定义只有用到的样式
  shortcuts: {
    // 常用组合
    'btn-primary': 'px-4 py-2 bgc-primary text-white rounded cursor-pointer hover:bgc-primary3',
    'container-main': 'max-w-840px mx-auto px-4',
  },
  
  rules: [
    // 自定义颜色变量
    [/^bgc-(.+)$/, ([, colorName]) => ({ "background-color": `var(--${colorName}-color)` })],
    [/^borderc-(.+)$/, ([, colorName]) => ({ "border-color": `var(--${colorName}-color)` })],
    [/^textc-(.+)$/, ([, colorName]) => ({ color: `var(--${colorName}-color)` })],
    
    // 布局
    ['flex', { display: 'flex' }],
    ['flex-col', { 'flex-direction': 'column' }],
    ['flex-auto', { flex: 'auto' }],
    ['grid', { display: 'grid' }],
    ['items-center', { 'align-items': 'center' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    
    // 尺寸
    ['w-full', { width: '100%' }],
    ['h-full', { height: '100%' }],
    ['min-h-screen', { 'min-height': '100vh' }],
    [/^max-w-(\d+)px$/, ([, d]) => ({ 'max-width': `${d}px` })],
    [/^size-(\d+(?:\.\d+)?)$/, ([, d]) => ({ width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` })],
    
    // 间距
    [/^p-(\d+(?:\.\d+)?)$/, ([, d]) => ({ padding: `${Number(d) / 4}rem` })],
    [/^px-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'padding-left': `${Number(d) / 4}rem`, 'padding-right': `${Number(d) / 4}rem` })],
    [/^py-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'padding-top': `${Number(d) / 4}rem`, 'padding-bottom': `${Number(d) / 4}rem` })],
    [/^m-(\d+(?:\.\d+)?)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
    [/^mx-auto$/, () => ({ 'margin-left': 'auto', 'margin-right': 'auto' })],
    [/^ml-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'margin-left': `${Number(d) / 4}rem` })],
    [/^mt-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'margin-top': `${Number(d) / 4}rem` })],
    [/^mb-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'margin-bottom': `${Number(d) / 4}rem` })],
    
    // 文字
    ['text-center', { 'text-align': 'center' }],
    ['text-left', { 'text-align': 'left' }],
    ['text-sm', { 'font-size': '0.875rem' }],
    ['text-lg', { 'font-size': '1.125rem' }],
    ['text-xl', { 'font-size': '1.25rem' }],
    ['text-2xl', { 'font-size': '1.5rem' }],
    ['font-bold', { 'font-weight': 'bold' }],
    ['font-semibold', { 'font-weight': '600' }],
    
    // 边框圆角
    ['rounded', { 'border-radius': '0.25rem' }],
    ['rounded-lg', { 'border-radius': '0.5rem' }],
    ['rounded-xl', { 'border-radius': '0.75rem' }],
    ['rounded-full', { 'border-radius': '9999px' }],
    
    // 其他常用
    ['cursor-pointer', { cursor: 'pointer' }],
    ['cursor-default', { cursor: 'default' }],
    ['no-underline', { 'text-decoration': 'none' }],
    ['transition', { transition: 'all 0.3s ease' }],
    ['duration-300', { 'transition-duration': '300ms' }],
    ['object-cover', { 'object-fit': 'cover' }],
    
    // 响应式
    ['hidden', { display: 'none' }],
    ['block', { display: 'block' }],
    ['inline-block', { display: 'inline-block' }],
    
    // 阴影
    ["shadow-button", { "box-shadow": "rgba(0, 0, 0, 0.10) 0px 4px 6px" }],
    ["shadow-card", { "box-shadow": "0px 0px 15px 0px rgba(0, 0, 0, 0.03), 0px 2px 30px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)" }],
    
    // 字体
    ["font-source-han-serif", { "font-family": "Cantarell,Lora,source-han-serif-tc,serif" }],
  ],
  
  safelist: [
    'color-scheme-auto', 'color-scheme-light', 'color-scheme-dark',
    'is-open', 'is-active', 'write'
  ]
});
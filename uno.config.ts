import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      preflight: false, // 完全禁用预设样式和字体
      dark: 'class',
    }), 
    presetIcons({
      collections: {
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json', { with: { type: 'json' } }).then(i => i.default)
      },
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      }
    })
  ],
  content: {
    filesystem: ["./templates/**/*.html", "./src/**/*.ts"],
  },
  extractors: [
    {
      extractor: (code) => {
        // 更精确的提取器，避免误匹配
        const matches = code.match(/class['"]\s*([^'"]*)['"]/g) || [];
        const classes = matches.flatMap(match => 
          match.replace(/class['"]\s*/, '').replace(/['"]/g, '').split(/\s+/)
        );
        return [...new Set(classes.filter(c => c.length > 0))];
      },
      extensions: ['html', 'ts']
    }
  ],
  safelist: [
    // 主题相关
    'color-scheme-auto', 'color-scheme-light', 'color-scheme-dark',
    // 动态类
    'is-open', 'is-active',
    // 核心布局
    'min-h-screen', 'flex', 'flex-col'
  ],
  rules: [
    [/^bgc-(.+)$/, ([, colorName]) => ({ "background-color": `var(--${colorName}-color)` })],
    [/^borderc-(.+)$/, ([, colorName]) => ({ "border-color": `var(--${colorName}-color)` })],
    [/^textc-(.+)$/, ([, colorName]) => ({ color: `var(--${colorName}-color)` })],
    [/^(.+)\$(.+)$/, ([, property, colorName]) => ({ [property]: `var(--${colorName}-color)` })],
    ["font-source-han-serif", { "font-family": "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }],
    [/^size-(\d+)$/, ([, d]) => ({ width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` })],
    ["shadow-button", { "box-shadow": "rgba(0, 0, 0, 0.10) 0px 4px 6px" }],
    [
      "shadow-card",
      {
        "box-shadow": `0px 0px 15px 0px rgba(0, 0, 0, 0.03),
                       0px 2px 30px 0px rgba(0, 0, 0, 0.08),
                       0px 0px 1px 0px rgba(0, 0, 0, 0.3)`,
      },
    ],
  ],
});

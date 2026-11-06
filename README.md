# 个人作品集网站

纯 HTML / CSS / JavaScript 实现,无需构建工具,直接部署即可。

## 本地预览

```bash
npx serve .        # 或 python3 -m http.server 8000
```

## 需要替换的内容

| 位置 | 内容 |
| --- | --- |
| `index.html` | 名字、简介、经验年限、技能标签、项目卡片、邮箱、微信、社交链接 |
| `main.js` 顶部 | `CONTACT_EMAIL`(你的邮箱)、`FORM_ENDPOINT`(表单服务地址,可选) |
| `i18n.js` | 中英文文案(修改文字时两种语言一起改) |
| 根目录 | 放入 `resume.pdf`(简历下载按钮使用) |

## 联系表单

- `FORM_ENDPOINT` 留空:点击发送会打开访客的邮件客户端,内容已预填。
- 想让访客直接在页面上发送:去 [Formspree](https://formspree.io) 免费注册一个表单,把地址(如 `https://formspree.io/f/xxxx`)填进 `FORM_ENDPOINT`。

## 功能

- 中英文切换(跟随浏览器语言,记住访客选择)
- 深浅色主题切换
- 鼠标光晕与液态玻璃卡片效果
- 一键复制联系方式、带校验的联系表单

## 部署

任意静态托管均可:GitHub Pages、Vercel、Netlify、Cloudflare Pages。

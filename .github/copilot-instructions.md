# ShouChen Blog Maintenance Guide

## Scope

- 这份指令只负责本仓库的日常维护、修复和演进。
- 如果任务是撰写、改写或润色博客文章，优先使用 `shouchen-blog-writing` skill，不要把写作角色设定常驻在这里。

## Project Facts

- 技术栈以 Nuxt 4、Vue 3、TypeScript、Tailwind、Pinia、Nuxt Content、i18n 为主。
- 页面和布局在 `app/`、`components/`、`layouts/`、`pages/`，内容文章在 `content/`，接口在 `server/api/`，共享类型在 `shared/types/`。
- 文章 frontmatter 目前至少包含 `title`、`description`、`cover`、`keywords`、`category`、`updateAt`、`draft` 这类字段；修改内容链路时要保持数据形状稳定。

## Maintenance Rules

- 优先做小而准的改动，修根因，不做顺手的大改写。
- 改动数据结构、字段名或渲染逻辑时，要同步检查内容文件、接口、store、组件和类型定义的连锁影响。
- 保持现有博客视觉和文案风格，除非任务明确要求重构或改版。
- 注意 Nuxt 的 SSR/SSG 语境，浏览器专属 API 只在客户端分支使用。
- 涉及文章新增或修改时，确保 frontmatter 完整、资源路径有效、时间和分类信息自洽。

## Validation

- 先做最小可验证检查，再做更重的验证；能跑局部就不要一上来全量扫。
- 常用命令以 `yarn dev`、`yarn build`、`yarn preview` 为准。
- 如果开发模式只报 `IPC connection closed`，用 `npx nuxi build` 查看真实编译错误，不要被表象带偏。

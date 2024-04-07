---
cover: /imgs/chatbot.webp
title: Runtime API Examples
tags: Linux Java
description: asds
author: ShouChen
category: tech
updateTime: 2024-03-31T16:48:00+08:00
isHide: false
isArchived: true
---

## abab

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>
```

## Results

### Theme Data

```json
{{ theme }}
```

### Page Data

```json
{{ page }}
```

### Page Frontmatter

```json
{{ frontmatter }}
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

```json
{{ theme }}
```

### Page Data

```json
{{ page }}
```

### Page Frontmatter

```json
{{ frontmatter }}
```

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).

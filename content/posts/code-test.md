+++
date = '2026-11-26T01:25:23+08:00'
draft = true
title = 'Code Test'
+++

!more

hello

```nginx
server {
    listen 80;
    server_name blog.mihirniyogi.com;  # the blog
    root /var/www/blog;
    error_page 404 /404.html;
}
```

```bash
for i in 1 2 3; do echo "quack $i"; done
```

```js
export function initThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  return button !== null;
}
```
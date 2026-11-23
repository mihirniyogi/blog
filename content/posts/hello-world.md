+++
date = '2026-11-15T10:00:00+08:00'
draft = true
title = 'Formatting test page'
tags = ['meta']
+++

A kitchen-sink page for checking every kind of formatting the theme supports: headings, lists, quotes, code, tables, callouts and footnotes.

<!--more-->

Intro paragraph with some `inline code` and **bold text**.

## A heading

- A list item
- Another one

> A plain quote, with no [!TYPE], so it should keep the normal quote style.

```
server {
    listen 80;
}
```

| Option | Weight |
|---|---|
| Hugo | Light |

## Callout tests

> [!NOTE]
> Because the tunnel connects out to Cloudflare, the Rock never accepts incoming connections from the internet.

> [!TIP]
> Run `watch -n 1 cat /proc/net/wireless` and open the case lid to see the signal change live.

> [!WARNING]
> Keep the repository **private** if you deploy with a self-hosted GitHub runner.

> [!IMPORTANT]
> This one should look like a Note, but with the label "Important".

> [!CAUTION]
> This one should look like a Warning, but with the label "Caution".

> [!NOTE]
> A callout with more inside it:
>
> - a list item with a [link](https://gohugo.io)
> - another item with `inline code`

> [!TIP]
> A callout containing a code block:
>
> ```
> server {
>     listen 80;
> }
> ```

A sentence with a footnote.[^1]

[^1]: The footnote text.
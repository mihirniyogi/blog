# duck: a Hugo theme

The theme behind [blog.mihirniyogi.com](https://blog.mihirniyogi.com). It's a clean, slightly old-style blog design: a framed page on a tinted background, an indigo header band, tab navigation, a sidebar of boxes with title bars, dotted dividers and a small duck.

This README explains how the theme is put together and where to make changes. For running the site and writing posts, see the [main README](../../README.md).

---

## Overview

- **Layout:** the framed site is about 3/4 of the screen width on desktop, with the content on the left and a sidebar on the right. On phones it goes edge to edge and the sidebar moves below the content.
- **Fonts:** IBM Plex Sans for everything, and JetBrains Mono for code, both self-hosted (see [Assets and static files](#assets-and-static-files)).
- **Colours:** an indigo palette, with a light and a dark version.
- **Duck touches:** the duck logo in the header, a "bill yellow" stripe under the header and on the active tab and current page number, a small duck at the end of each post, pale yellow text selection, the duck favicon, and the 404 page.

Requires Hugo v0.146.0 or newer (standard edition).

---

## How a page is built

Every page is assembled from three layers:

```
baseof.html                  ← the frame, shared by every page
├── <head>        head.html → head/*
├── <header>      site/header.html  (duck, title, tagline, theme toggle)
├── nav tabs      site/menu.html
├── <main>        ← filled by ONE page template: {{ define "main" }}…{{ end }}
├── sidebar       sidebar.html → sidebar/*  (decides its own boxes)
└── <footer>      site/footer.html
```

1. **`baseof.html`** is the frame. It leaves one slot, `{{ block "main" . }}`, for the page's content.
2. **A page template** (for example `page.html`) fills that slot with `{{ define "main" }}`.
3. **Partials** are reusable pieces pulled in with `{{ partial "name.html" . }}`.

---

## Templates

| Page | Address | Template |
|---|---|---|
| Home | `/` | `home.html` |
| Single post | `/posts/<slug>/` | `page.html` |
| All posts | `/posts/` | `section.html` |
| One tag | `/tags/<tag>/` | `term.html` |
| All tags | `/tags/` | `taxonomy.html` |
| Subscribe | `/subscribe/` | `subscribe.html` |
| Not found | any missing page | `404.html` |

- **`home.html`:** the latest posts, 5 per page with numbered pagination. Posts from the same day share one date heading. Each entry shows its title, a plain-text excerpt (formatting and code are stripped, and the text is capped at 280 characters, so every entry has the same shape whatever the post contains), its tags and "Read more".
- **`page.html`:** a header "plate" (a "Post" label, title, date, reading time and tags), the post content, a duck end mark, and an "Older · Home · Newer" bar. The bar is always shown, so there's always a way home.
- **`section.html` and `term.html`:** a compact list of posts grouped by year, through the same partial (`posts/list.html`). The tag pages show only that tag's posts.
- **`taxonomy.html`:** one box per tag, most-used first, listing that tag's newest 5 posts, with an "All N posts" link when there are more.
- **`subscribe.html`:** used by `content/subscribe.md` through `layout = 'subscribe'`. It explains RSS and shows the feed address. A normal page is used instead of styling the feed file itself.
- **`404.html`:** "This page has flown south", with the duck facing away and buttons back to Home and the Posts list. There's no sidebar.

---

## Partials

Partials are grouped by area in `layouts/_partials/`:

| Folder / file | Contents |
|---|---|
| `head.html` + `head/` | Everything in `<head>`: `meta.html` (description, canonical link, link previews), `feeds.html` (RSS autodiscovery), `theme-init.html` (applies a saved dark theme before the page draws), `favicon.html`, `css.html` and `js.html` (bundle the CSS and JavaScript) |
| `site/` | The site frame: `header.html`, `menu.html`, `theme-toggle.html`, `footer.html` |
| `sidebar.html` + `sidebar/` | `sidebar.html` decides which boxes a page gets; each box is its own file: `toc`, `about`, `tags`, `archive`, `subscribe` |
| `posts/` | `list.html` (compact list grouped by year) and `tags.html` (a post's tag links) |
| `ui/` | Small reusable pieces: `icon.html` and `pagination.html` |

Usage notes:

- **Icons:** `{{ partial "ui/icon.html" "duck" }}` inlines `assets/icons/duck.svg` into the page. Inline SVGs can be coloured with CSS (through `currentColor` and variables), which is how the duck and icons follow the light/dark theme.
- **Tag links:** `{{ partial "posts/tags.html" (dict "page" . "sep" " · ") }}`. The separator is optional and defaults to `", "`.
- **Pagination:** `{{ partial "ui/pagination.html" $pager }}`, where `$pager := .Paginate …`. It only appears when there's more than one page.
- Each partial starts with a short comment explaining what it does and how to use it.

### Sidebar rules

`sidebar.html` decides per page type:

- **404:** no sidebar.
- **A post:** only the "On this page" box (Hugo's table of contents), and only if the post has headings. It stays in view while scrolling.
- **Other single pages** (like Subscribe): no sidebar.
- **Everything else:** About, Tags, Archive and Subscribe. The Tags box is left off the Tags page, and the Archive box off the Posts page, because each would repeat that page.

The sidebar partial writes its own `<aside>`, so a page without a sidebar gets none at all, and the content uses the full width.

---

## CSS

All styles live in `assets/css/`. Hugo bundles them into one file (`head/css.html`), minified for the real site. `main.css` contains only `@import` lines, in this order:

| Folder | What goes there | Files |
|---|---|---|
| `base/` | Foundations | `fonts.css` (@font-face), `tokens.css` (colour and font variables), `base.css` (body, links, text selection, `.visually-hidden`) |
| `layout/` | The site frame | `site.css` (page width, content and sidebar columns), `header.css`, `nav.css`, `sidebar.css`, `footer.css` |
| `components/` | Pieces used on more than one page | `post-header.css`, `prose.css`, `callouts.css`, `duck.css`, `buttons.css`, `pagination.css`, `post-list.css`, `theme-toggle.css` |
| `pages/` | Styles for one page type | `home.css`, `post.css`, `lists.css`, `tags.css`, `subscribe.css`, `not-found.css` |

- **Order matters:** when two rules conflict, the later file wins, so general styles come first and page-specific ones last.
- **Phone styles live with their component:** each file ends with its own `@media (max-width: 640px)` block, so changing a component means opening only one file.
- **Where does new CSS go?** Styles for one page type go in `pages/`; anything used on more than one page goes in `components/`; changes to the frame go in `layout/`. A new file needs an `@import` line in `main.css`.
- `components/post-header.css` is the plate at the top of a post. The Subscribe page borrows it, which is why it's a component.
- `components/prose.css` styles Markdown content: headings, lists, quotes, code, tables and footnotes.
- **Widths:** the site is `min(calc(100% - 24px), max(75%, 680px), 1480px)` wide: 3/4 of the screen on desktop, at least 680px on medium screens, nearly full width on phones, and capped on very large monitors. Posts are capped at 780px so lines stay readable when there's no sidebar.

### Colours and dark mode

- **Colours are only defined in `assets/css/base/tokens.css`.** Light colours are on `:root`, and dark colours on `[data-theme="dark"]`. Everything else uses the variables (for example `var(--accent)`), so changing a colour there changes it everywhere, in the matching theme.
- **Main variables:** `--page-bg` (outside the frame), `--surface-bg` (the frame), `--band-bg` / `--band-text` / `--band-muted` (header), `--nav-footer-strip-bg` (tab strip and footer), `--border-divider`, `--sidebar-header-bg` (box title bars), `--quote-bg` (code and quotes), `--text`, `--text-soft`, `--muted`, `--heading`, `--accent` / `--accent-hover` (links), `--bill` (the yellow), `--select-bg` / `--select-text`, and `--note-*`, `--tip-*`, `--warn-*` for callouts.
- **How the switch works:**
  1. `layouts/_partials/head/theme-init.html` is a tiny inline script that runs before anything is drawn. If the visitor chose dark mode before, it sets `data-theme="dark"` on `<html>`, so there's no white flash.
  2. `layouts/_partials/site/theme-toggle.html` is the header button. It starts `hidden`, so visitors without JavaScript never see a button that does nothing.
  3. `assets/js/theme-toggle.js` shows the button, switches `data-theme` when clicked, and saves the choice in the browser's localStorage. It's imported by `assets/js/main.js`, the JavaScript entry point, which `layouts/_partials/head/js.html` bundles and loads with `defer` (so it runs once the page is ready). This switch is the site's only JavaScript.
- The storage key `"theme"` appears in both `layouts/_partials/head/theme-init.html` and `assets/js/theme-toggle.js`. If you change it, change both.
- `color-scheme` is set in each theme, so scrollbars and built-in controls match.

---

## Render hooks

Render hooks in `layouts/_markup/` change how Hugo turns certain Markdown into HTML:

- **`render-blockquote.html` (callouts):** a quote starting with `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]` or `[!CAUTION]` becomes a callout box with an icon. Important uses the Note style and Caution uses the Warning style. Any other quote stays a normal quote. This syntax is GitHub's alert syntax, so posts also read well as plain Markdown.
- **`render-codeblock.html` (plain code):** every fenced code block is output as plain `<pre><code>`, styled by `prose.css`. The blog isn't code-focused, and Hugo's built-in highlighting uses its own colours, which clash with the theme. The language name is kept as a class in case it's ever needed.

---

## Assets and static files

- `assets/icons/`: SVG icons (duck, note, tip, warning, rss, moon, sun), used through `ui/icon.html`. Each has a default `width` and `height`, so it never shows up huge, and CSS sets the real size where it's used.
- `static/fonts/`: the five font files (IBM Plex Sans 400, 400 italic, 600 and 700, and JetBrains Mono 400). Each file contains its copyright notice and a link to its licence in its built-in metadata; the full credits are in the [main README](../../README.md#credits). `css.html` marks `/fonts/*` as external, so Hugo's CSS bundler leaves those paths alone.
- `static/`: `favicon.svg` (modern browsers), `favicon.ico` (older browsers) and `apple-touch-icon.png` (phone home screens).

---

## Adding things

**An icon:** save it as `assets/icons/<name>.svg` with `aria-hidden="true"`, a default `width` and `height`, and `currentColor` for colours that should follow the theme. Then use `{{ partial "ui/icon.html" "<name>" }}`.

**A sidebar box:** create `layouts/_partials/sidebar/<box>.html`, wrapped in `<section class="box"><h2>Title</h2><div class="box-body">…</div></section>`. Then include it in `sidebar.html`, in the branch for the pages that should show it.

**A page with its own layout** (like Subscribe):
1. Create `content/<page>.md` with `layout = '<page>'`. Add `[build] list = 'never'` if it shouldn't appear in post lists or the RSS feed.
2. Create `layouts/<page>.html` with `{{ define "main" }}…{{ end }}`.
3. Put its styles in `assets/css/pages/<page>.css` and import that file in `main.css`.
4. If it should have a sidebar, add a rule for it in `sidebar.html`. Single pages have none by default.

**A menu item:** add an entry under `menus.main` in `themes/duck/hugo.yaml`, with `name`, `pageRef` and `weight`. A lower weight comes first.

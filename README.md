# Mihir's Blog

The source code for [blog.mihirniyogi.com](https://blog.mihirniyogi.com): a small personal blog, built with [Hugo](https://gohugo.io) and a custom theme called **duck**, and self-hosted on a single-board computer at home.

---

## About this repository

*For anyone browsing on GitHub.*

- **What it is:** everything needed to build the blog. Posts are written in Markdown and turned into a plain, static website by Hugo. There's no database and no server-side code.
- **How it's hosted:** a Radxa Rock 5B on a shelf at home runs nginx, and a Cloudflare Tunnel connects it to the internet without opening any ports on the router.
- **The design:** a clean, slightly old-style blog with a framed page, tab navigation, sidebar boxes and a small duck. Light and dark themes, no tracking, and almost no JavaScript (only the light/dark switch).
- **Where things are:** posts live in `content/posts/`; the look of the site lives in `themes/duck/`, which has [its own README](themes/duck/README.md) explaining how it's built.
- **Reusing it:** the code (including the duck theme) is MIT-licensed, so you're welcome to learn from it or reuse it with credit. The posts themselves are not; see [License](#license).

---

## Development

*Notes for working on the site.*

### Requirements

- **Hugo, standard edition, v0.146.0 or newer.** The theme uses Hugo's newer template layout from v0.146; the minimum is also set in `themes/duck/hugo.yaml`.
- The Rock 5B should run the **same Hugo version** as the laptop, so a site that builds locally also builds there. Check with `hugo version` on both.
- No Node.js or other tools are needed. Hugo bundles the CSS and JavaScript itself.

### Run it locally

```powershell
hugo server -D        # preview at http://localhost:1313, drafts included
hugo --minify         # build the real site into public/
```

`public/` is build output and is not committed.

### Site settings

The root `hugo.yaml` holds the site-wide settings:

| Setting | What it does |
|---|---|
| `title` | Site name in the header and browser tab |
| `params.description` | Tagline under the title; also the default page description for search engines |
| `params.author` | Name in the footer copyright line |
| `params.about` | Text of the sidebar's About box |
| `pagination.pagerSize` | Posts per page on the home page (5) |
| `capitalizeListTitles: false` | Keeps tag names lowercase; list pages take their titles from `content/posts/_index.md` and `content/tags/_index.md` |

The navigation menu (Home, Posts, Tags, Subscribe) is defined in `themes/duck/hugo.yaml`.

### Project structure

```
.
├── archetypes/default.md   ← template for new content files
├── content/
│   ├── posts/              ← blog posts (_index.md sets the Posts page title)
│   ├── tags/_index.md      ← title of the Tags page
│   └── subscribe.md        ← the Subscribe (RSS) page
├── themes/duck/            ← the theme: layouts, CSS, JavaScript, icons, fonts
├── hugo.yaml               ← site settings
├── LICENSE                 ← MIT licence for the code
└── README.md
```

Everything visual lives in the theme. See [themes/duck/README.md](themes/duck/README.md).

### Deployment (planned)

How the site will go live:

1. Push to the `main` branch of this repository.
2. The Rock 5B builds the site with Hugo and copies `public/` into `/var/www/blog`.
3. nginx serves it, using a site with `server_name blog.mihirniyogi.com;`, `root /var/www/blog;` and `error_page 404 /404.html;`.
4. Cloudflare Tunnel routes `blog.mihirniyogi.com` to `http://localhost:80` on the Rock.

Because this repository is public, the build step must never run code from other people's pull requests on the Rock. Either the Rock simply pulls `main` on a timer and builds it, or a self-hosted GitHub Actions runner is restricted to pushes on `main` only. This is still to be decided.

---

## Credits

- **[Hugo](https://gohugo.io)** builds the site.
- **[IBM Plex Sans](https://github.com/IBM/plex)**, the main font. Copyright © 2017 IBM Corp., with Reserved Font Name "Plex". Licensed under the [SIL Open Font License 1.1](https://github.com/IBM/plex/blob/master/LICENSE.txt).
- **[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono)**, the code font. Copyright 2020 The JetBrains Mono Project Authors. Licensed under the [SIL Open Font License 1.1](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt).
- The **RSS icon** is a redrawn version of the standard feed symbol. The duck, the other icons and the design are original to this project.

## License

- **Code** (templates, CSS, JavaScript, icons, configuration): MIT. See [LICENSE](LICENSE).
- **Writing** (posts and pages in `content/`): © Mihir Niyogi. All rights reserved. Please don't republish them without permission.
- **Fonts:** SIL Open Font License 1.1, as described under [Credits](#credits). The font files are used as downloaded, without changes; each one contains its copyright notice and a link to the licence in its built-in metadata.

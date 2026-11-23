+++
date = '2026-11-22T11:00:00+08:00'
draft = true
title = 'Hosting this blog on a Rock 5B'
tags = ['self-hosting', 'rock5b']
+++

This blog runs on a single-board computer that sits on a shelf at home. There's no cloud server and no monthly bill: just a Radxa Rock 5B, a few small programs, and a domain name.

<!--more-->

## The setup

- **Hugo** turns Markdown files into plain HTML.
- **nginx** serves those files on port 80.
- **Cloudflare Tunnel** carries visitors from `blog.mihirniyogi.com` to the Rock.

## Serving the site

nginx needs one small config block per site:

```
server {
    listen 80;
    server_name blog.mihirniyogi.com;
    root /var/www/blog;
    index index.html;
}
```

## Deploying

The plan is a self-hosted GitHub Actions runner on the Rock. Pushing to `main` builds the site and copies it into place.[^1]

> [!WARNING]
> Keep the repository private if you use a self-hosted runner. Pull requests on a public repository could run code on your machine.

[^1]: The runner connects out to GitHub, so this needs no open ports either.

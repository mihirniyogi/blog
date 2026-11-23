+++
date = '2026-11-18T21:15:00+08:00'
draft = true
title = 'Cloudflare Tunnel: no open ports at home'
tags = ['networking', 'self-hosting']
+++

My portfolio and this blog are both served from a board on a shelf at home, yet my router has no ports open to the internet. Cloudflare Tunnel is what makes that work.

<!--more-->

## How it works

A small program called `cloudflared` runs on the Rock 5B. It makes an **outgoing** connection to Cloudflare and keeps it open. When someone visits the site, Cloudflare sends the request back down that connection.

> [!NOTE]
> Because the connection starts from inside my network, nothing on the internet can connect to the Rock directly.

## Routing a hostname

Each public hostname maps to a local service:

| Hostname | Goes to |
|---|---|
| `mihirniyogi.com` | `http://localhost:80` |
| `blog.mihirniyogi.com` | `http://localhost:80` |

nginx then decides which site to serve based on the hostname.

+++
date = '2026-11-21T20:45:00+08:00'
draft = true
title = 'Why I picked Hugo over Ghost'
tags = ['hugo', 'blogging']
+++

I wanted a blog that was free, light and fully mine. Ghost has a lovely editor, but Hugo won for one reason: nothing runs on the server at all.

<!--more-->

## The options

- **Ghost:** a polished editor and built-in newsletters, but it needs Node.js and MySQL running all the time.
- **Hugo:** turns Markdown into plain HTML. nginx serves the files and that's it.
- **Writing my own generator:** fun, but I'd end up rebuilding tags, pagination and drafts by hand.

> Simple things should be simple, complex things should be possible.

> [!IMPORTANT]
> Ghost's newsletters need Mailgun when self-hosted, and its free tier is small.

In the end, Hugo gives me tags, pagination, drafts and RSS out of the box, with nothing to keep running.

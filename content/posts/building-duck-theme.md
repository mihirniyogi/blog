+++
date = '2026-11-23T15:30:00+08:00'
draft = true
title = 'Building my own Hugo theme'
tags = ['hugo', 'design']
+++

Rather than use a ready-made theme, I designed this one myself: a slightly old-style blog with a framed page, tab navigation and sidebar boxes, plus a small duck.

<!--more-->

## Starting from the design

I mocked up a few directions first and settled on a clean sans-serif look with an indigo palette.

## How a Hugo theme fits together

- `baseof.html` is the frame shared by every page.
- Page templates like `page.html` and `home.html` fill its `main` slot.
- Partials are reusable pieces like the header and sidebar.

> [!NOTE]
> Hugo v0.146 changed the template layout, so many older tutorials use a different folder structure.

## Colours as variables

Every colour is a CSS variable, with a light set and a dark set, so switching themes only means swapping one attribute on `<html>`.

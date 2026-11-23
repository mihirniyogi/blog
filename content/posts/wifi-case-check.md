+++
date = '2026-11-21T14:00:00+08:00'
draft = true
title = 'Is the case blocking my Wi-Fi?'
tags = ['rock5b', 'networking']
+++

I put the Rock 5B in a case and immediately worried the Wi-Fi antennas were boxed in. Here's how I checked, using nothing but what the kernel already reports.

<!--more-->

## Reading the signal

```
cat /proc/net/wireless
```

The **level** column is the signal strength in dBm. Mine read −56, which is comfortably good.

| Signal | Quality |
|---|---|
| −30 to −55 dBm | Excellent |
| −55 to −67 dBm | Good |
| below −75 dBm | Poor |

> [!TIP]
> Run it under `watch -n 1` and open the case lid to see the number change live.

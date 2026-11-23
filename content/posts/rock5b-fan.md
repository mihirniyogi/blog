+++
date = '2026-11-20T22:30:00+08:00'
draft = true
title = "Getting the Rock 5B's fan to behave"
tags = ['rock5b', 'linux']
+++

After fitting a heatsink fan to the Rock 5B, I wanted to check it actually worked.

<!--more-->

## Forcing it on

The fan shows up as a hardware monitoring device. Writing to it sets the speed directly:

```
echo 255 | sudo tee /sys/class/hwmon/hwmon8/pwm1
```

It spun up for about a second, then stopped.

## Why it stopped

The kernel's thermal governor was in charge. The board was cool, so it decided the fan wasn't needed and turned it back off.

> [!TIP]
> Put the CPU under load and watch the temperature. The fan starts on its own once it gets warm.

So the fan was fine all along: it only runs when it needs to.

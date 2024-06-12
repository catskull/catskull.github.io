---
title: Now served with valid HTML
tags: [programming, web development, html]
date: 2024-06-12 16:47:14 -0600
category: post
layout: post
---

I was reminiscing about the cool HTML validator tags that used to be everywhere online, so I decided to run this site (and [gizzhead.org](https://gizzhead.org)) through the W3C's [validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcatskull.net). Turns out, I had some issues!

> The core reason to run your HTML documents through a conformance checker is simple: <mark>To catch unintended mistakes</mark>—mistakes you might have otherwise missed—so that you can fix them.
>  - [Why Validate? - W3 validator about page](https://validator.w3.org/nu/about.html#why-validate)

My issues:

 - [trailing slash on void elements (meta, etc)](https://github.com/validator/validator/wiki/Markup-»-Void-elements#trailing-slashes-in-void-element-start-tags-do-not-mark-the-start-tags-as-self-closing)
 - alt text on a tags (???)
 - random invalid attributes like aria, role, etc
 - invalid time format for time tags (timezone wrong format)

I got them cleaned without too much trouble. Turns out, the W3C knows what they are talking about. I caught a lot of random unintended mistakes! Some of them were trivial, some of them bloating, but all were very helpful as I continue to learn basic HTML.

![Valid HTML 2.0](https://www.w3.org/Icons/basic/check.gif)

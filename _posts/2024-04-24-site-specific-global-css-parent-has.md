---
layout: post

date: 2024-04-24
title: Use :has() to scope CSS
tags: [web, css, programming]
---

> **TL;DR**: Use `:has()` with SEO meta tags and nested CSS selectors to scope styles to a specific website `html:has(head meta[property="og:site_name"][content="catskull.net"])`.

I've given up on ad blockers. I use NextDNS + Stop The Madness, and ads still get through. In addition to the ads themselves, there are all kinds of things on websites I just don't want to see, such as announcement banners, chat bubbles, etc. Various strategies for defeating these annoyances have been deployed, including browser extensions and web proxies. That's all just too much for me.

Safari has this weird feature where you can give it a custom user agent style sheet. I can't find any documentation on it, and very little mention online but maybe I'm bad at search. I figured why not just write an adblock CSS file? I've had a lot of fun staring at the absolutely obscene HTML today's content generators spit out. Reverse engineering HTML is not something I thought I'd ever have to do but thank you content providers for the learning opportunity.

I've added a bit of tooling and notes and [put it up on GitHub↗](https://github.com/catskull/adblock.css){:target="_blank"}. Simply download `adblock.css` and tell Safari to use it!

One big issue I ran into early on was the fact that the custom style sheet applies globally. So if you remove a `.hero-banner` with an annoying image on Site A, then the actually useful `.hero-banner` on Site B is also hidden. You can get tricky with CSS [child/relative selectors↗](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selector_structure#relative_selector){:target="_blank"} and such, but sometimes there's just something that cannot be cleanly selected using traditional CSS selectors. ChatGPT _really_ wants me to do this with javascript. It practically begs.

Enter [`:has()`↗](https://developer.mozilla.org/en-US/docs/Web/CSS/:has){:target="_blank"}

`:has()` is a really fancy new thing [as of 2023 that is supported in all evergreen browsers↗](https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility){:target="_blank"}. It's pretty much a "parent selector". You can target a raw `div` by some contents of its children! For example:

```css
.queue:has(h3.sponsored)
```

This will select an element with the class `queue` that contains an `h3` tag with the class `sponsored`. If another `queue` element exists but does not have a sponsored `h3` inside, we know that it's a real item that we want to see and not an ad!

Turns out, we can also use `:has()` to scope otherwise global styles to a specific site! What do potentially scammy content sources love more than scammy content? SEO! The `<head>` is chock-full of very precise tags to tell us _exactly_ what site we're on. But we can't use those without javascript right? Wrong!

```css
html:has(head meta[property="og:site_name"][content="catskull.net"]) {
  background-color: pink !important;
}
```

In this example, I'm using the `site_name` meta tag to apply a style to the `html` tag of the site `catskull.net`. Boom baby!

We _could_ combine that with [nesting selectors↗](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector){:target="_blank"} but that doesn't work using the Safari style sheet setting as of 17.4.1. Once that works, we can easily scope entire styles to a certain site very easily!

```css
html:has(head meta[property="og:site_name"][content="catskull.net"]) {
  background-color: pink !important;

  & p {
    color: yellow;
  } 
}
``` 

This will make all `<p>` tags yellow and the background pink.

### Footnote

Another tip to select sneaky unlabeled ad content is by using automation/accessibility attributes on otherwise generically named elements: `button[data-testid="close-button"]`.

> AI Use Disclaimer:
<br>
I researched and wrote this post. ChatGPT 4 assisted in formatting, correcting, and validating code and grammar.

[Discuss on Hacker News↗](https://news.ycombinator.com/item?id=40159280)

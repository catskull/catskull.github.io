---
title: Winning The Fight Against OG Images
tags: [og image, jekyll, ruby]
date: 2026-04-30 20:45:20 -0600
layout: post
---
Open Graph images are the bane of my existence. Seeing a beautiful one in a link preview in iMessage or Discord is just a chef's kiss. But for whatever reason, generating them has nearly destroyed me. Last June, nearly a full year ago, I spent 4 hours on stream designing and coding up some super fancy solution using Cloudflare Workers. I thought I'd be super smart and cool and use an _SVG_ to do it since an SVG is technically an "image" and of course og:image supports SVG, right??? Wrong! I honestly don't even know what formats _are_ supported, but I know for sure SVG is not.

## The Backstory

The "Open Graph protocol" ([wiki](https://en.wikipedia.org/wiki/Open_Graph_protocol)) is some random crap that Facebook cooked up back in 2010 to make web content shared on Facebook look better. It's not an official specification and how applications use it is pretty much just random. At it's core, it's just a bunch of special [<meta>](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta) tags. However, as of the Year of our Lord 2026, the only thing that you really need to worry about is `og:image`, `og:title`, `og:site_name` and `og:description`.

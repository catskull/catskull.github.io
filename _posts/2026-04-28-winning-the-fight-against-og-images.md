---
title: Winning The Fight Against OG Images
tags: [og image, jekyll, ruby]
date: 2026-04-30 20:45:20 -0600
layout: post
---
[Open Graph images are the bane of my existence.](https://samwarnick.com/blog/winning-the-fight-against-og-images/) Seeing a beautiful one in a link preview in iMessage or Discord is just a chef's kiss. But for whatever reason, generating them has nearly destroyed me. Last June, nearly a full year ago, I spent 4 hours on stream designing and coding up some super fancy solution using Cloudflare Workers. I thought I'd be super smart and cool and use an _SVG_ to do it since an SVG is technically an "image" and of course og:image supports SVG, right??? Wrong! I honestly don't even know what formats _are_ supported, but I know for sure SVG is not.

insert stream youtube link

## The Backstory

The "Open Graph protocol" ([wiki](https://en.wikipedia.org/wiki/Open_Graph_protocol)) is some random crap that Facebook cooked up back in 2010 to make web content shared on Facebook look better. It's not an official specification and how applications use it is pretty much just random. At it's core, it's just a bunch of special [<meta>](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta) tags. However, as of the Year of our Lord 2026, the only thing that you really need to worry about is `og:image`, `og:title`, `og:site_name` and `og:description`. Rather than describe what each of these are, I'll just show you:

insert screenshot of og image

## The Problem

Websites serve web content. Web content at the end of the day almost always boils down to HTML, CSS, and JavaScript. We don't use things like Flash any more. Even a complicated application like YouTube is still just HTML, CSS, and JS. Like most websites, this blog is optimized to work with HTML, CSS, and JS. In order to have unique og:images for each page of a website, there needs to be some kind of pipeline to generate images. Image generation and web content are fundamentally different things. Properly rendering HTML, CSS, and JS is actually quite complicated. I think generally speaking modern web browsers are the most complex and high quality software we use on a daily basis. They work _really well_. Figuring out a way to render images on the fly with dynamic content inside feels less mature than the modern web. You can get pretty close by raw dogging ImageMagick or ffmpeg, but the templating and design for whatever they'd produce feels very brittle and difficult to use.

## My Solution

This blog is produced with the Jekyll static site generator. I want to design and produce my images the same way I design and produce the rest of the content on the blog - as web content! I prototyped a basic og:image design with HTML and CSS. One really nice feature of web content is that it is pretty good at fitting dynamic content into fixed size content areas. For example if a blog post has a title of "My Story" and another has a title of "My Incredible Journey: In and Out of the World's Top Businesses", web layout engines are smart enough to fit both of those into the same content area. For og:images, this is important because the images are (almost) _always_ exactly 1200x630 pixels. 

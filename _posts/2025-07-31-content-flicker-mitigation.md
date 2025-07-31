---
title: Content Flicker Mitigation
tags: [html, css, web,]
date: 2025-07-31 13:31:47 -0600
layout: post
---
"Flash of unstyled content" has been an issue for the duration of styling. Images used to load extremely slowly, so we didn't need to worry about flashing things. But with fast internet speeds came responsibility to ensure our content is as accesible as possible. If nothing else, it just _feels_ janky. Like some potentially shady things are going on behind the scenes. In this post, I'll go over my simple problem and how I solved it using `aspect-ratio` and a well-placed `preload`.

## Vertical Layout Shift
I recently noticed that upon loading the catskull.net homepage, there was some kind of nasty content shift that looked very bad.

Press play on the video. It should loop but maybe not.

<video style="aspect-ratio: 866/346;" controls loop muted playsinline>
  <source src="/assets/images/posts/content-flicker-mitigation/baadreload.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

I'm doing a bit of trickery with that logo image behind the scenes, and it appears that some of the trickery is causing a really gnarly vertical layout shift! I'm all for fun and games but if it's going to be a problem it needs to stop.

In my 20 years of web development experience, any time there's a layout shift like that, it's because something that really should be fixed height or width is not fixed height or width. And you know what? It's also not the end of the world. But I'm a _professional_ (this is what I tell my wife).

My logo image is precisely 640px by 56px. If you'd like your own pixel art logo, the artist who made mine [KeFF](/new-art.html) is currently taking on new work! I've worked with him on several projects over the years and obviously it's still something I personally use and get a ton of value out of.

The logo is actually an html `<video>` tag with a `:before` psuedo-element that adds the plain grey .webp image. Then, that same image is used as a mask for a little looping video I recorded using an old MS-DOS virus called `lsd.bat`. A simple `:hover` selector to hide the `:before` image and show the masked out video. The result is kind of fun, see for yourself:

<div style="padding: 1em; padding-bottom: 0.5em; border: 1px solid;">
{% include logo_tagline.html %}
</div>

Initially I was tempted to just throw a `height: 56px;` on and call it a day. This would prevent the vertical layout shift, but on narrow screens it causes extra white space as the image scaled to meet the `max-width` of the page.

> aspect ratio is a super power  
> - Sam

> The `aspect-ratio` CSS property allows you to define the desired width-to-height ratio of an element's box. This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio.  
> - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)

Because my image has a predictable aspect ratio, simply adding `aspect-ratio: 640/56` to the `<video>` element fixed the problem! Notice I didn't even reduce the fraction. What do I look like to you, a computer?!?

## Flash of Blank Content

Great! We solved the vertical shift, but now another problem manifests!

<video style="aspect-ratio: 798/320;" controls loop muted playsinline>
  <source src="/assets/images/posts/content-flicker-mitigation/betterload.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

Look at that. _Look at that!_ A flash of white before my logo appears? I'm not trying to hypnotize anyone. As I said before, I'm a professional!

It's 2025 and you can `preload`, `lazyload`, and `auto` load anything on the web. In this one, very specific case, I will preload my site's .webp logo to prevent a flash of white content. It's above the fold, and it's used multiple times on the page. Not to mention it's only 3.7 KB and it will cache extremely well - it will never change. If you have 18 "hero" images in a carousel and you try to preload them all, this strategy will not work. You're doing it wrong. You don't want to preload 328 MB of hi-res images. You want to go home, and rethink your life.

{% capture compiled_preview %}
{% comment %}
```html
<link rel="preload" href="/public/images/logos/davysgray.webp" as="image" type="image/webp" />
```
{% endcomment %}
<div class="highlight highlight-text-html-basic"><pre><span class="pl-kos">&lt;</span><span class="pl-ent">link</span> <span class="pl-c1">rel</span>="<span class="pl-s">preload</span>" <span class="pl-c1">href</span>="<span class="pl-s">/public/images/logos/davysgray.webp</span>" <span class="pl-c1">as</span>="<span class="pl-s">image</span>" <span class="pl-c1">type</span>="<span class="pl-s">image/webp</span>" <span class="pl-kos">/&gt;</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="head"
%}

Now check this baby out, or just go see for yourself. At least as far as I can test, this is what I see when reloading the page. This is a video, not a screenshot.

<video style="aspect-ratio: 798/320;" controls loop muted playsinline>
  <source src="/assets/images/posts/content-flicker-mitigation/goodreload.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

Wow, it feels so nice to have a homepage completely free of any "content flashes"! I will sleep better tonight knowing I've solved my problem*.

<sub><sup>*We are investigating reports that my mastodon rss feed causes a layout shift and are ignoring the problem until we feel like fixing it.</sup></sub>

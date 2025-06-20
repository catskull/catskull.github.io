---
title: Wiki Archive
tags: [development, meta, wiki, html, projects, blog]
date: 2025-06-20 10:33:15 -0600
layout: post
---
I read a lot of Wikipedia. A _lot_.

Sometimes I heavily research a single topic and take notes in my "thoughts + ideas" book. Most of the time, however, I'm simply reading about random things. I wanted a fun way to keep track of what I find on Wikipedia!

I'm pretty happy with the interface I came up with. A simple chronologically ordered index page, with a navbar on the side in alphabetical order, complete with a pure HTML typeahead. I have recieved some negative feedback for the way the sidebar jumps around as you're scrolling the page because the sidebar and the main index page are not in the same order. The chronology of the wiki posts is actually more relevant to me as I go back and read them than their alphabetical order, but I still want to see the alphabetical order when I'm quickly scrolling through all of them. In my mind, it makes perfect sense. 🙂

<video autoplay="" loop="" muted="">
  <source src="assets/images/posts/wiki-archive/wiki.webm" type="video/webm">
</video>

I built out an Apple Shortcut that lives in the "Share Sheet" so I can easily and quickly share the current page I'm reading, either from a browser or from the Wikipedia app. The Shortcut will take the URL and `POST` it to a Cloudflare Worker.

The Worker takes the URL, then calls Wikipedia's awesome (and free!) [/page/summary/](https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_) API endpoint to get title, image, summary text, a shorter description text.

My site is built with Jekyll, so I created a `_data/wiki.yml` file that is structured like so:

{% capture compiled_preview %}
{% comment %}
```yaml
- url: https://en.wikipedia.org/wiki/Thoughts_on_Government
  created: '2025-06-18T19:02:14Z'
  title: Thoughts on Government
  image_url: https://upload.wikimedia.org/wikipedia/commons/c/c7/Thoughts_on_Government.jpg
  image_wh: 250x402
  description: 1776 essay by John Adams
  extract: Thoughts on Government, or in full Thoughts on Government, Applicable to the Present State of the American Colonies, was written by John Adams during the spring of 1776 in response to a resolution of the North Carolina Provincial Congress which requested Adams' suggestions on the establishment of a new government and the drafting of a constitution. Adams says that "Politics is the Science of human Happiness—and the Felicity of Societies depends on the Constitutions of Government under which they live." Many of the ideas put forth in Adams' essay were adopted in December 1776 by the framers of North Carolina's first constitution.

```
{% endcomment %}
<div class="highlight highlight-source-yaml"><pre>- <span class="pl-ent">url</span>: <span class="pl-s">https://en.wikipedia.org/wiki/Thoughts_on_Government</span>
  <span class="pl-ent">created</span>: <span class="pl-s"><span class="pl-pds">'</span>2025-06-18T19:02:14Z<span class="pl-pds">'</span></span>
  <span class="pl-ent">title</span>: <span class="pl-s">Thoughts on Government</span>
  <span class="pl-ent">image_url</span>: <span class="pl-s">https://upload.wikimedia.org/wikipedia/commons/c/c7/Thoughts_on_Government.jpg</span>
  <span class="pl-ent">image_wh</span>: <span class="pl-c1">250x402</span>
  <span class="pl-ent">description</span>: <span class="pl-s">1776 essay by John Adams</span>
  <span class="pl-ent">extract</span>: <span class="pl-s">Thoughts on Government, or in full Thoughts on Government, Applicable to the Present State of the American Colonies, was written by John Adams during the spring of 1776 in response to a resolution of the North Carolina Provincial Congress which requested Adams' suggestions on the establishment of a new government and the drafting of a constitution. Adams says that "Politics is the Science of human Happiness—and the Felicity of Societies depends on the Constitutions of Government under which they live." Many of the ideas put forth in Adams' essay were adopted in December 1776 by the framers of North Carolina's first constitution.</span>
</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="_data/wiki.yml"
%}


The worker will retrieve the current version of `_data/wiki.yml` using the GitHub API, append the newly shared wiki info to the end of it, then commit the result.

GitHub Pages automatically rebuilds and deploys the site.

It's not perfect, I have bugs when there is odd/unexpected text. But that just breaks the deploy, not the worker. I can easily pull and fix the botched YML by hand.

The Worker code is open source, see [github.com/catskull/notes-server](https://github.com/catskull/notes-server). You can also [see how I built the wiki page itself](https://github.com/catskull/catskull.github.io/blob/master/wiki.html) with Jekyll.

I'm enthused, and a little worried about how fast the wiki page is already filling up. Still, what a fun experiment!

Please leave a reply if you have any questions and I'll try to get back to you quickly.

---
layout: post
category: post
title: HTML 'components' with Jekyll and Liquid
tags: [web, jekyll, html, liquid, programming]
---
I've been working on [Gizzhead.org](https://gizzhead.org) for a few years now. Initially, it was supposed to be a place where I could put links to various bootlegs/recordings of King Gizzard & The Lizard Wizard live shows on YouTube, Archive.org, or elsewhere. I kind of ran out of steam on that because I stopped listening to so many of them. When they put out 9 hours of Red Rocks bootlegs, my time for the other shows gets soaked up! I might keep doing it someday, but for now sites like [KGLW.net](https://KGLW.net) mostly scratch that itch.

I thought it might be fun to turn the site into a more traditional news blog for Gizz related news. There's a lot to keep track of and I can still post live show videos!

{% include figure.html src="/public/media/posts/jekyllcomponents/meme.png" alt="And yet, one must imagine the blogger happy." caption="And yet, one must imagine the blogger happy." %}

One thing I'm super hip on is [modern semantic HTML]({% link _posts/2023-08-01-html.md %}). Semantic HTML makes everyone's lives easier in ways that pay dividends. For example, [Safari Reader mode](https://support.apple.com/guide/safari/hide-ads-when-reading-sfri32632/mac) displays semantic HTML in a more coherent way by default, with no CSS required on your part. Indeed, I look towards a future where documents on the web are distributed without opinions on how the user might want to consume the document. For example, if a user is blind.

One of the super hip things about modern semantic HTML is the [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) tag. What is a figure and what does it do? Look at the image above! The MDN docs describe it nicely:

> The `<figure>` HTML element represents self-contained content, potentially with an optional caption, which is specified using the `<figcaption>` element. The figure, its caption, and its contents are referenced as a single unit.

I can hardly believe in the year 2024 we finally have a nice way to add a caption to an image!`</s>` But it's more than just images, the MDN docs give examples of quotes, poems, or other content. As MDN puts it, a figure is any 'self-contained content'.

As an HTML zealot, I must strive to use the most perfect HTML structure I can. So when I started building a new blog from the ground up, I just had to use it! The problem - I like to write my posts in markdown and I don't really want to have a bunch of repeated html every time I want to use a figure.

For a while now, I've wondered how I could make HTML "components" in Jekyll. Turns out,  you totally can!

_\_includes/figure.html_:
{% raw %}
```
<figure>
	<img src="{{include.src}}" alt="{{include.alt}}">
	{% if include.caption %}
		<figcaption>{{include.caption}}</figcaption>
	{% endif %}
</figure>
```
{% endraw %}

_your-post.md_
{% raw %}
```
{% include figure.html src="/meme.png" alt="Alt text is mandatory for accessibility." caption="Optional." %}
```

You can even use variables like `caption=page.title`. Note that within the template, variables are accessed via `include.caption`.
{% endraw %}

That's it! Super simple and make the markdown a lot cleaner, in my opinion.

PS -

If you want to display some liquid syntax and not process it, you can use this:

{% raw %}
```
{% raw %}
	{{ liquid }}
{ % endraw %}
```
{% endraw %}

Remove the extra space.

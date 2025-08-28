---
title: Stop Using Grey Text
tags: [rant, css, web]
date: 2025-08-27 13:57:25 -0600
layout: post
---
Dear web designers:

Please, for the love of Glob, stop using <span style="color: #6d6d6d;">grey text</span>. And especially do not use <span style="color: #6d6d6d; background-color: #efefef;"> grey text on an off-white background</span>. It doesn't make you look more "design-ey", it makes you look inept.

Why‽ Why use grey text on a grey background? This requires you to _specifically_ overwrite the default text color - you literally have to _ship code_ (in the form of CSS) to construct this monstrosity.

Do you explictly want to limit your potential audience? Do you need a more creative way to express identity? Did you just see it one time and decide "okay, ship it"?

And please, if you _must_ use poorly contrasting colors for your blog, support the [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) CSS media query to undo your sloppy workmanship. Here, I'll do it for you:



{% capture compiled_preview %}
{% comment %}
```css
.grey-text {
  color: #6d6d6d;
}

@media (prefers-contrast: more) {
  .grey-text {
    color: unset;
  }
}
```
{% endcomment %}
<div class="highlight highlight-source-css"><pre>.<span class="pl-c1">grey-text</span> {
  <span class="pl-c1">color</span><span class="pl-kos">:</span> <span class="pl-pds"><span class="pl-kos">#</span>6d6d6d</span>;
}

<span class="pl-k">@media</span> (<span class="pl-c1">prefers-contrast</span><span class="pl-kos">:</span> more) {
  .<span class="pl-c1">grey-text</span> {
    <span class="pl-c1">color</span><span class="pl-kos">:</span> unset;
  }
}</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="o,rly?"
%}

It's literally _that_ easy! Or, you could just not do it in the first place which would look like this:

{% capture compiled_preview %}
{% comment %}
```css
/* oh... uhhhhh... no code needed at all */
```
{% endcomment %}
<div class="highlight highlight-source-css"><pre><span class="pl-c">/* oh... uhhhhh... no code needed at all */</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="much hard, very CSS"
%}

I don't even technicallly have vision imparement. But the amount of times per day I ask myself if I'm literally going blind, only to find out the "designer" decided for me how I should best read their website.

Still not convinced? Here's a little "demo" for you:

<p style="color: #6d6d6d;">Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn't.</p>

<p>Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn't.</p>

I actually believe increasing contrast for everyone improves the information density of our content. It literally becomes higher fidelity. It's like taking a WAV file, converting to a 1kbps MP3, and then re-converting to a WAV file. You just footgunned yourself my dude! You should not do that.

"web design is my passion"

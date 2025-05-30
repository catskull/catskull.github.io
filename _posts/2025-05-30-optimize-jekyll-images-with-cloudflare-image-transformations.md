---
title: Optimize Jekyll images with Cloudflare Image Transformations
tags: [development, cloudflare, AV1, avif, encoders, images, web]
date: 2025-05-30 13:11:06 -0600
layout: post
---
Recently I did a [deep-dive on AV1/AVIF encoder performance](/libaom-vs-svtav1-vs-rav1e-2025.html), which wasn't extremely conclusive. However, it proved to me that I can use modern image formats to deliver the same quality at significantly lower file sizes.

"I'd like to make all the images on my site use AVIF, why not?" I asked myself. What's the best way? Should I go through and manually convert all the files?

## Converting images on the fly

Cloudflare offers a nice product for this - [image transformations](https://developers.cloudflare.com/images/transform-images/#_top). It can do a few handy things like resizing, as well as convert to a more optimized format, all on the fly. From there Cloudflare will cache the resulting optimized image so the operation only needs to run a single time!

From your Cloudflare dashboard, click the "Images" dropdown and then "Transformations".

![Select Transformations in the Images dropdown menu](/assets/images/posts/optimize-jekyll-images-with-cloudflare-image-transformations/transformations.jpg)

From there, you will see a list of your "zones" (domain names). Click "Enable" on the one you'll be serving the images from.

We will be using Cloudflare's automatic URL transform. [The docs are pretty handy.](https://developers.cloudflare.com/images/transform-images/transform-via-url/)

When you enable image transformations on your zone, it will automatically turn on Cloudflare's built-in worker. To access, use the following URL scheme:
<br>
`https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>`

I'll let you review the full docs to see all the bells and whistles, but for my purposes I'm only going to make use of a single option. I use this URL to transform my images to whatever Cloudflare deems best in the situation. For more information, see [their note about "format limitations"](https://developers.cloudflare.com/images/transform-images/#format-limitations).
<br>
`https://catskull.net/cdn-cgi/image/format=auto/`

Just look at pretty much any image on my site and you'll see they all use a URL like this:
`https://catskull.net/cdn-cgi/image/format=auto//public/images/logos/1.png`, which actually returns a freshly converted .avif image in it's place!

Another great use case would be to dynamically generate appropriately sized thumbnails for a gallery of images, by using the resizing feature.

## Integration into Jekyll

Now that we have image conversion taken care of, we need to figure out how to update all the image URLs on the entire site. I could maybe do some kind of CMD+F but it would take a few hours to get right I'm sure and it would be throw-away work.

Instead, I turned to my first [Jekyll Plugin!](https://jekyllrb.com/docs/plugins/). Jekyll's plugin API exposes pretty much everything Jekyll has under the hood including custom build hooks, filters, tags, and even entirely new converters.

For my use, I'll use a custom Hook. What I want to do is after every file has been rendered to HTML, look through the resulting HTML and replace any image files served locally and prefix their source URL with `/cdn-cgi/image/format=auto/`.

{% capture compiled_preview %}
{% comment %} 
```ruby
require 'nokolexbor'

@prefix = nil

Jekyll::Hooks.register :site, :after_init do |site|
  @prefix = site.config['image_prefix'] if Jekyll.env == 'production'
end

[:documents, :pages].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |doc|
    unless @prefix.nil?
      document = Nokolexbor::HTML(doc.output)
      document.css('img').each do |img|
        src = img['src']
        next if !img['raw'].nil? || src.nil? || src.start_with?('http', '//', @prefix) || !src.end_with?('.jpeg', '.jpg', '.png', '.gif')
        img['src'] = @prefix + src
      end
      doc.output = document.to_html
    end
  end
end
```
{% endcomment %}
<div class="highlight highlight-source-ruby"><pre><span class="pl-en">require</span> <span class="pl-s">'nokolexbor'</span>

<span class="pl-c1">@prefix</span> <span class="pl-c1">=</span> <span class="pl-c1">nil</span>

<span class="pl-v">Jekyll</span>::<span class="pl-v">Hooks</span><span class="pl-kos">.</span><span class="pl-en">register</span> <span class="pl-pds">:site</span><span class="pl-kos">,</span> <span class="pl-pds">:after_init</span> <span class="pl-k">do</span> |<span class="pl-s1">site</span>|
  <span class="pl-c1">@prefix</span> <span class="pl-c1">=</span> <span class="pl-s1">site</span><span class="pl-kos">.</span><span class="pl-en">config</span><span class="pl-kos">[</span><span class="pl-s">'image_prefix'</span><span class="pl-kos">]</span> <span class="pl-k">if</span> <span class="pl-v">Jekyll</span><span class="pl-kos">.</span><span class="pl-en">env</span> == <span class="pl-s">'production'</span>
<span class="pl-k">end</span>

<span class="pl-kos">[</span><span class="pl-pds">:documents</span><span class="pl-kos">,</span> <span class="pl-pds">:pages</span><span class="pl-kos">]</span><span class="pl-kos">.</span><span class="pl-en">each</span> <span class="pl-k">do</span> |<span class="pl-s1">hook_owner</span>|
  <span class="pl-v">Jekyll</span>::<span class="pl-v">Hooks</span><span class="pl-kos">.</span><span class="pl-en">register</span> <span class="pl-s1">hook_owner</span><span class="pl-kos">,</span> <span class="pl-pds">:post_render</span> <span class="pl-k">do</span> |<span class="pl-s1">doc</span>|
    <span class="pl-k">unless</span> <span class="pl-c1">@prefix</span><span class="pl-kos">.</span><span class="pl-en">nil?</span>
      <span class="pl-s1">document</span> <span class="pl-c1">=</span> <span class="pl-v">Nokolexbor</span>::<span class="pl-c1">HTML</span><span class="pl-kos">(</span><span class="pl-s1">doc</span><span class="pl-kos">.</span><span class="pl-en">output</span><span class="pl-kos">)</span>
      <span class="pl-s1">document</span><span class="pl-kos">.</span><span class="pl-en">css</span><span class="pl-kos">(</span><span class="pl-s">'img'</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">each</span> <span class="pl-k">do</span> |<span class="pl-s1">img</span>|
        <span class="pl-s1">src</span> <span class="pl-c1">=</span> <span class="pl-s1">img</span><span class="pl-kos">[</span><span class="pl-s">'src'</span><span class="pl-kos">]</span>
        <span class="pl-k">next</span> <span class="pl-k">if</span> !<span class="pl-s1">img</span><span class="pl-kos">[</span><span class="pl-s">'raw'</span><span class="pl-kos">]</span><span class="pl-kos">.</span><span class="pl-en">nil?</span> || <span class="pl-s1">src</span><span class="pl-kos">.</span><span class="pl-en">nil?</span> || <span class="pl-s1">src</span><span class="pl-kos">.</span><span class="pl-en">start_with?</span><span class="pl-kos">(</span><span class="pl-s">'http'</span><span class="pl-kos">,</span> <span class="pl-s">'//'</span><span class="pl-kos">,</span> <span class="pl-c1">@prefix</span><span class="pl-kos">)</span> || !<span class="pl-s1">src</span><span class="pl-kos">.</span><span class="pl-en">end_with?</span><span class="pl-kos">(</span><span class="pl-s">'.jpeg'</span><span class="pl-kos">,</span> <span class="pl-s">'.jpg'</span><span class="pl-kos">,</span> <span class="pl-s">'.png'</span><span class="pl-kos">,</span> <span class="pl-s">'.gif'</span><span class="pl-kos">)</span>
        <span class="pl-s1">img</span><span class="pl-kos">[</span><span class="pl-s">'src'</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">@prefix</span> + <span class="pl-s1">src</span>
      <span class="pl-k">end</span>
      <span class="pl-s1">doc</span><span class="pl-kos">.</span><span class="pl-en">output</span> <span class="pl-c1">=</span> <span class="pl-s1">document</span><span class="pl-kos">.</span><span class="pl-en">to_html</span>
    <span class="pl-k">end</span>
  <span class="pl-k">end</span>
<span class="pl-k">end</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="image_prefix.rb"
%}

[View source](https://github.com/catskull/catskull.github.io/blob/master/_plugins/image_prefix.rb)

Just a few implementation notes:
- Using the [nokolexbor](https://github.com/serpapi/nokolexbor) gem over nokogiri since I have PTSD from using nokogiri. nokolexbor worked (and installed) great locally and in GitHub CI so that's a win.
- I'm using a site hook (`after_init`) so I can retrieve a configuration setting once instead of every time we transform a page.
- The prefix is set with `image_prefix` in `_config.yml`. You could set this to anything but for cloudflare image transform, `/cdn-cgi/image/format=auto/` is a good default.
- It's just a local plugin but if literally one person asks I'll make a proper gem.

## That's all, folks!

That's really it! Now, when our Jekyll site builds, all our images will be run through Cloudflare Image Transformations and return as nicely optimized versions. From there, it's already on Cloudflare's network so future loads will be quite literally, as fast as it possibly could be.

I know I'm a Cloudflare shill but nothing makes me like building stuff more than using Cloudflare products. Their free tier is extremely generous, and I use them at my day job as well to do very similar things. 

## A rant about compression

> The term _silver bullet_ is also a metaphor for a simple, seemingly magical, solution to a difficult problem: for example, penicillin c. 1930 was a "silver bullet" or magic bullet that allowed doctors to treat and successfully cure many bacterial infections.
> - [Wikipedia](https://en.wikipedia.org/wiki/Silver_bullet)

Often times in tech, people propose solutions they think will simply solve all the problems. A "silver bullet".

In September 1986, Frederick P. Brooks, Jr. (who would later go on to write the seminal book _The Mythical Man Month_ which I have not read) published a papter titled "No Silver Bullet". In the introduction, he states:

> There is no single development, in either technology or management technique, which by itself promises even one order of magnitude improvement in productivity, in reliability, in simplicity.

He then goes on to define complexity, necessary versus accidental - concepts he's further explore and reflect on in _The Mythical Man Month_.

I don't disagree with him. There are current carpetbaggers convincing middle management that "AI can replace the workforce". A silver bullet. Maybe they will.

However, I'd now like to reserve one specific technology development I feel is a silver bullet: file compression. Specifically lossless compression[^1].

Imagine that I remove every vowel from this blog post. Lk ths. Y cn stll rd t, t's jst hrdr. "Why waste time say lot word when few word do trick?" This is a form of "lossy" compression. We're still able to represent and communicate the ideas, just at a lower fidelity due to a limited character set. Lossy compression is very useful in situations where space is a concern, such as a limited speed data connection such as cellular or dial-up internet.

Now that we know what "lossy" compression is, you can probably guess what "lossless" compression is. There is no analog I'm aware of to this concept in the real world. Imagine if you could read a book that was shorter but contained the exact same words. How could that be? Telepathy? Magic? You could invent a new language encoding method, but it wouldn't really be the same book would it? If you compare the output of two different violin players playing the same sheet of music, _in theory_ the output would be the same, but in practice it is not. It physically could not be! Even the same violinist playing the music twice would not be identical.

We could debate if a WAV file has the same fidelity as a FLAC, but I think for any archival purposes, we can consider modern lossless compression algorithms to be really just that - lossless.

Below is an excellent example of what lossless image compression can look like. Drag the slider to see if you can tell which one is the original vs the AVIF optimized version.

<image-compare label-text="JPEG vs AVIF image comparison slider">
  <img slot="image-2" alt="Optimized AVIF 180.71 KB" raw="true" src="/public/media/posts/tokyo/tokyo2018.jpeg"/>
  <img slot="image-1" alt="Original JPEG 443.38 KB" src="/public/media/posts/tokyo/tokyo2018.jpeg"/>
</image-compare>

While the visual distinction is imperceptible, the result is very much perceptible. The original JPEG is 446 KB. Not bad. The automatically converted AVIF? 180.68 KB. Again, I'm reminded of replacing an incandescent light bulb with an LED bulb. It's the same thing, but _vastly more efficient_.

Since we don't operate on any kind of fixed file budget, I don't think using more efficient file formats lends itself to [the tragedy of the commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons). It just makes what we're already doing that much more efficient, quick, reliable, and accessible.

I think my favorite part about this cloudflare approach is that it's totally reversible. If there is some loss in quality in the conversion, we have our original source files ready to run through whatever the latest and greatest is.

## Final thoughts

A few directions we can take this even further would be:
- Use the HTML `<picture>` element to define multiple sources, including the cloudflare optimized and the original for graceful fallback. But I'm not really motivated to support anything other than evergreen browsers and they all support all of this. I'm also not really interested in building redundancy for Cloudflare itself.
- Use a custom cloudflare worker with some kind of LLM to do the conversion and also add alt text. I think [Sam](https://samwarnick.com) does this. But with AI tools, I feel like we should leave them to the end user. I'm sure a user that actually needs alt text for visibility reasons can use their own AI to do it just as good or better, but maybe I should make a best effort. I'm historically bad at alt text.
- I submitted a feature request for Cloudflare to support [JPEG XL](https://en.wikipedia.org/wiki/JPEG_XL), which is arguably better than AVIF and just as widely supported. That would be fun to play with and if they add support, we'll get support without doing anything! 

<script src="https://unpkg.com/@cloudfour/image-compare/dist/index.min.js"></script>

[^1]: Okay it's not actually a silver bullet. AV1/AVIF encoding is _significantly_ more CPU intensive than comparable "traditional" encodings. Our computers are super fast these days, faster and more efficient than they've ever been! As these next-generation encoding formats become more common, additional hardware will be included to make this process even faster and more efficient. Even today, running a single computer hard a single time to make everyone's computer run 1/10 as hard later on seems to be worth it.

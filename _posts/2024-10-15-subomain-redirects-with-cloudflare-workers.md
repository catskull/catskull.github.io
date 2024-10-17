---
title: Subdomain Redirects with Cloudflare Workers Routes
tags: [html, programming, web, cloudflare, dns, '301']
date: 2024-10-15 18:39:19 -060
layout: post
---
I needed a way to redirect `charm.catskull.net` to an absolute URL path such as `https://subdomain.site.com/path/to/page/index.html`. I am a DNS noob and was surprised to learn this isn't possible through DNS alone. You can set a `CNAME` record to point the subdomain to another (sub)domain, but it's not an arbitrary URL value. I don't know why.

Instead, I set up a quick [Cloudflare Worker](https://developers.cloudflare.com/workers/){:target="_blank"} to return a [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301){:target="_blank"} redirect to the URL I wanted. The code is simple, I edited this in their browser-based code editor:

{% capture compiled_preview %}
{% comment %}
export default {
  async fetch(request, env, ctx) {
    return Response.redirect('https://bullpen.dev', 301);
  },
};
{% endcomment %}
<div class="highlight highlight-source-js"><pre><span class="pl-k">export</span> <span class="pl-k">default</span> <span class="pl-kos">{</span>
  <span class="pl-k">async</span> <span class="pl-en">fetch</span><span class="pl-kos">(</span><span class="pl-s1">request</span><span class="pl-kos">,</span> <span class="pl-s1">env</span><span class="pl-kos">,</span> <span class="pl-s1">ctx</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-v">Response</span><span class="pl-kos">.</span><span class="pl-en">redirect</span><span class="pl-kos">(</span><span class="pl-s">'https://bullpen.dev'</span><span class="pl-kos">,</span> <span class="pl-c1">301</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span><span class="pl-kos">,</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="/worker.js"
%}

Next, we'll set up a [Route](https://developers.cloudflare.com/workers/configuration/routing/routes/){:target="_blank"} for our Worker. If you don't want to use a custom domain, then you don't need to worry about this. I'm going to assume your domain's DNS records are already with Cloudflare.

Simply go to the "Settings" tab for your worker and add a route for whatever subdomain you want!

{% include figure.html src="public/media/posts/cf301/routersetting.png" alt="the configuration page for a cloudflare worker route." caption="A route can be set up either on the worker, or on the domain/zone." %}

Now you have a full 301 redirect to whatever page you desire! If you take advantage of [Cloudflare's Proxy](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/){:target="_blank"} (enable on the DNS record), you should also protect the downstream provider from any additional traffic. Very nice!

That's as far as I need to go for now, but a next step would be to take advantage of [Cloudflare's D1 (SQLite) database](https://developers.cloudflare.com/d1/){:target="_blank"} to build your own link shortener! These are very useful to use for your personal archives since you can update and proxy whatever resource the URL represents (including embedding data in the URL or QR code). But more on that later!

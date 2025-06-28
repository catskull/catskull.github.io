---
title: The Most Dangerous App I've Ever Built
tags: [cloudflare, javascript, little chat, programming, development]
date: 2025-06-25 13:43:09 -0600
layout: post
---
## Preamble

"I wonder how hard it would be to build a chat app for my blog in 2025?"

At this point, if I'm going to write some front-end JavaScript, I'm going to build a web component. I simply have no appetite nor desire to `npm install` anything on the client. As for the back-end, I usually reach for a Cloudflare Worker since their free tier is more than enough to get my hands dirty with.

Fortunately for me, they have an [example](https://github.com/cloudflare/templates/tree/main/durable-chat-template) [Durable Object](https://developers.cloudflare.com/durable-objects/) I just ripped off! A "durable object" is a Cloudflare idea - essentially it's just a [Worker](https://developers.cloudflare.com/workers/) and a [D1 database](https://developers.cloudflare.com/d1/). I think really it's just a special config for Cloudflare under the hood to run your worker and your D1 instance next to each other, but I'm not an infrastructure engineer. At the end of the day, it gives you some compute and some SQL storage so you can quickly and easily build stateful apps.

I quickly forked their example and had it running on my own account quickly. The issue? The example is using "PartyKit" on the client and server, which is a cool, but custom wrapper around websockets.

As I mentioned before, I would rather puke than `npm install` react, so I quickly threw away their entire front end. Well, who would have thought that a basic chat app can be implemented as a simple web component with 0 external dependencies? No way - that's illegal. You _have_ to use at least one special thing like _Lit_. Well, I didn't. Meet me in the chat, it's going down.

## Little Chat

<little-chat></little-chat>

Want your own little chat?

{% capture compiled_preview %}
{% comment %}
```html
<little-chat></little-chat>
<script src="https://catskull.net/public/js/components/little-chat.js"></script>
```
{% endcomment %}
<div class="highlight highlight-text-html-basic"><pre><span class="pl-kos">&lt;</span><span class="pl-ent">little-chat</span><span class="pl-kos">&gt;</span><span class="pl-kos">&lt;/</span><span class="pl-ent">little-chat</span><span class="pl-kos">&gt;</span>
<span class="pl-kos">&lt;</span><span class="pl-ent">script</span> <span class="pl-c1">src</span>="<span class="pl-s">https://catskull.net/public/js/components/little-chat.js</span>"<span class="pl-kos">&gt;</span><span class="pl-kos">&lt;/</span><span class="pl-ent">script</span><span class="pl-kos">&gt;</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="little-chat"
  copy="1"
%}

And here is the entire poorly written JS for the component. Make sure to [view on GitHub](https://github.com/catskull/catskull.github.io/blob/master/public/js/components/little-chat.js) for the latest version.

{% capture compiled_preview %}
{% comment %}
see /public/js/components/little-chat.js
{% endcomment %}
<div class="highlight highlight-source-js"><pre><span class="pl-k">class</span> <span class="pl-v">LittleChat</span> <span class="pl-k">extends</span> <span class="pl-v">HTMLElement</span> <span class="pl-kos">{</span>
  <span class="pl-en">constructor</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">super</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">socket</span> <span class="pl-c1">=</span> <span class="pl-c1">undefined</span><span class="pl-kos">;</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">messages</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">color</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">floor</span><span class="pl-kos">(</span><span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">random</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">*</span> <span class="pl-kos">(</span><span class="pl-c1">360</span> <span class="pl-c1">-</span> <span class="pl-c1">0</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">)</span> <span class="pl-c1">+</span> <span class="pl-c1">0</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>
  
  <span class="pl-en">renderMsg</span><span class="pl-kos">(</span><span class="pl-s1">msg</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-s">`&lt;div class="message" style="--hue: <span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">msg</span><span class="pl-kos">.</span><span class="pl-c1">user</span><span class="pl-kos">}</span></span>; color: light-dark(oklch(0.72 0.15 var(--hue, 70)),oklch(0.72 0.15 var(--hue, 70)));"&gt;<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">msg</span><span class="pl-kos">.</span><span class="pl-c1">content</span><span class="pl-kos">}</span></span>&lt;/div&gt;`</span>
  <span class="pl-kos">}</span>

  <span class="pl-en">render</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">innerHTML</span> <span class="pl-c1">=</span> <span class="pl-s">`</span>
<span class="pl-s">      &lt;div class="messages" style="max-height: 400px; overflow-y: scroll; border: 1px solid; padding: 1rem;"&gt;</span>
<span class="pl-s">        <span class="pl-s1"><span class="pl-kos">${</span><span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">messages</span><span class="pl-kos">.</span><span class="pl-en">map</span><span class="pl-kos">(</span><span class="pl-s1">msg</span> <span class="pl-c1">=&gt;</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">renderMsg</span><span class="pl-kos">(</span><span class="pl-s1">msg</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">join</span><span class="pl-kos">(</span><span class="pl-s">''</span><span class="pl-kos">)</span><span class="pl-kos">}</span></span></span>
<span class="pl-s">      &lt;/div&gt;</span>
<span class="pl-s">      &lt;audio id="notification-sound" style="display: none; visibility: hidden;"  src="/assets/aim.ogg"&gt;&lt;/audio&gt;</span>
<span class="pl-s">      &lt;form&gt;</span>
<span class="pl-s">        &lt;input type="text" placeholder="Add a message..." size="50"&gt;</span>
<span class="pl-s">        &lt;button type="submit"&gt;Post&lt;/button&gt;</span>
<span class="pl-s">      &lt;/form&gt;</span>
<span class="pl-s">    `</span><span class="pl-kos">;</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'form'</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'submit'</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
      <span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-en">preventDefault</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
      <span class="pl-k">const</span> <span class="pl-s1">input</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'input'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
      <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">input</span><span class="pl-kos">.</span><span class="pl-c1">value</span><span class="pl-kos">.</span><span class="pl-en">trim</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">addMessage</span><span class="pl-kos">(</span><span class="pl-s1">input</span><span class="pl-kos">.</span><span class="pl-c1">value</span><span class="pl-kos">.</span><span class="pl-en">trim</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-s1">input</span><span class="pl-kos">.</span><span class="pl-c1">value</span> <span class="pl-c1">=</span> <span class="pl-s">''</span><span class="pl-kos">;</span>
      <span class="pl-kos">}</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>

  <span class="pl-en">idk</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">socket</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">WebSocket</span><span class="pl-kos">(</span><span class="pl-s">`wss://little-chat.degraw.workers.dev/parties/chat/<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">location</span><span class="pl-kos">.</span><span class="pl-c1">hostname</span><span class="pl-kos">}</span></span>`</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">socket</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">"message"</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
      <span class="pl-k">const</span> <span class="pl-s1">json</span> <span class="pl-c1">=</span> <span class="pl-c1">JSON</span><span class="pl-kos">.</span><span class="pl-en">parse</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
      <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">json</span><span class="pl-kos">.</span><span class="pl-c1">type</span> <span class="pl-c1">===</span> <span class="pl-s">'all'</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">messages</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span>...<span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">messages</span><span class="pl-kos">,</span> ...<span class="pl-s1">json</span><span class="pl-kos">.</span><span class="pl-c1">messages</span><span class="pl-kos">]</span>
        <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">render</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
      <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">json</span><span class="pl-kos">.</span><span class="pl-c1">type</span> <span class="pl-c1">===</span> <span class="pl-s">'add'</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">messages</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span>...<span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">messages</span><span class="pl-kos">,</span> <span class="pl-s1">json</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
        <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'.messages'</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-c1">innerHTML</span> <span class="pl-c1">+=</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">renderMsg</span><span class="pl-kos">(</span><span class="pl-s1">json</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
      <span class="pl-kos">}</span>
      <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'.messages'</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-c1">scrollTop</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'.messages'</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-c1">scrollHeight</span><span class="pl-kos">;</span>
      <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'#notification-sound'</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">play</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>

  <span class="pl-en">connectedCallback</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-en">idk</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>

  <span class="pl-en">addMessage</span><span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">const</span> <span class="pl-s1">msg</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-s">"type"</span>:<span class="pl-s">"add"</span><span class="pl-kos">,</span><span class="pl-s">"id"</span>:<span class="pl-s1">crypto</span><span class="pl-kos">.</span><span class="pl-en">randomUUID</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">,</span><span class="pl-s">"content"</span>:<span class="pl-s1">message</span><span class="pl-kos">,</span><span class="pl-s">"user"</span>:<span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">color</span><span class="pl-kos">,</span><span class="pl-s">"role"</span>:<span class="pl-s">"user"</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">socket</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-c1">JSON</span><span class="pl-kos">.</span><span class="pl-en">stringify</span><span class="pl-kos">(</span><span class="pl-s1">msg</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>
<span class="pl-kos">}</span>

<span class="pl-s1">customElements</span><span class="pl-kos">.</span><span class="pl-en">define</span><span class="pl-kos">(</span><span class="pl-s">'little-chat'</span><span class="pl-kos">,</span> <span class="pl-v">LittleChat</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="little-chat.js"
%}

Huge, major, incredibly big shout-out deserved to [Carter](https://carter.works) for cooking up some sweet, sweet CSS magic to get the chat messages a unique color that also contrasts well on both light _and_ dark schemes. This is a suprisngly _unsovled_ problem in CSS... until now? Maybe Carter will share his wealth of knowledge with us at some point, but for now study this code.

## Dangerous?

How could a simple, anonymous text-only chat app such as this possibly be _dangerous_ to the public? Some would even say it's irresponsible to release something like this.

The free-market has a nightmare. Worse than recession. Worse than war. Legislation. Legislation is the _only_ means by which we, the people, can constrain the unbridled passions a purely capitalist endeavor intuitively seeks out. The Children's Online Privacy Protection Act of 1998, commonly referred to by "COPPA" is the bane of any supposedly well-meaning profit-seeking internet communications service companies. What encompasses "internet communications"? Video games, social media, email, anywhere people are communicating digitally.

Simply providing a platform for individuals to chat in plain text, with absolutely no identifying information, is considered hazardous in 2025. How sad! Does that mean the criminals have won?

No, they have not.

## Embracing user-hostile development

Turns out complying with legislation is pretty simple if your a normal, non-evil, non profit-seeking individual. I am not building apps to entice you to use. I approach my personal application development as user-hostile. Hostile, that is, to anyone but pretty much myself. If you want to use it, that's ok (unless you are under 13, then [gtfo](https://en.wikipedia.org/wiki/GTFO)). Oh you want a feature like DM's? Literally, go **_frick_** yourself. Why do you want DM's? You pathetic weasel. Go build DM's and you can deal with the consequences. You want rich media? No. Text is enough. More than enough. Too much, even.

I have _no_ incentive for you to use my apps. I don't make money. Fame? lol. So just chat, if you want to.

I'm too lazy to store any of your personal information, and I'm too poor to store your messages forever. I only store the latest 500 messages, and I will probably tone that down.

So there you go. When you're poor and ethical, complying with random legislation is fun and easy and actually makes your life easier. Don't let the criminals convince you it makes your life worse. They just want to track little kids and make money doing the things they do, who knows why. 

Also - don't abuse online services. Don't be a jerk. Just knock it off. Criminals make everything so much worse. We don't need to let them make our lives worse.

## I want you

I build apps for me - and for you! Not for them. I want _you_ to use it. I want you to chat. Just have fun!

Meet me in da chad!

<script src="/public/js/components/little-chat.js"></script>

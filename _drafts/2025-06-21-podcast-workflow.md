---
title: Podcast Workflow
tags: [podcast, interrobang, meta, tools, cloudflare, r2, jekyll]
date: 2025-06-21 11:26:34 -0600
layout: post
---

I started a podcast! It's called _Interrobang with Dave DeGraw_ and the first 4 episodes are already out. I describe it as "Mr. Rogers for adults if he was an alien." [You should go listen to it](/podcast)!

Here's the latest video:

{% include youtube.html embed="lyBZmba1FZA" title="Mike: Confidence & Self Perception, AI & Copyright, Human Nature & Politics ‽⸘ Interrobang #4" %}

Luckily, my esteemed colleague Sam already more or less figured out all the bits and bobs about having a podcast.

I've treated the first few episodes as a learning opportunity to really figure out _what_ a podcast is and _how_ to make one. Here's the process I use to make _Interrobang_:

### Call on Discord
Discord has the best video telephony I'm aware of. I don't know what kind of special sauce they're cooking up, but it's good. So far, Discord has been a natural and easy solution for both myself and the people I interview. If I branch out more, I'm not sure how I'll do it. I see a lot of podcasts on YouTube where they have a great guest over video call and the audio is horrific. I'm not going to do it if it's not decent.

### Record in OBS
<video autoplay="" loop="" muted="">
  <source src="assets/images/posts/podcast-workflow/obs.webm" type="video/webm">
</video>

I really love OBS. It's pretty janky, I'd love a clean pass at the UI to get it super MacOS native, but I'm not going to bite the hand that feeds in any way. It's the only solution I know of to let me make the crazy "[video collages](https://mastodon.social/@dareelcatskull/114496121586893741)" I like to make.

I set up a basic scene, complete with a background gif of a waterfall, my catskull logo scrolling on page, and two boxes for the talking heads to go in. I simply capture the Discord window (audio and video) in discord. I have an Elgato Wave XLR, Rode PodMic, and some Sony MDR-7506's on hand because I work from home and I'm a creative professional. The Elgato lets me monitor my own voice, and also pipes the Discord audio out to my headphones.

The Wave XLR has a nice "mute" capacitive touch area on top, so it's nice to be able to quickly cut the audio out when chaos breaks out. The one snafu I've had is that you can adjust the levels between audio input and your mic monitor. On the episode with Sam, I accidentally had the Discord audio too quiet in OBS so my voice was a lot louder than his.

A big part of the "learning" part of this experience was optimizing for me being super lazy. Recording it all "live" in OBS minimizes the amount of time I have to waste in Final Cut Pro. I think it's a bit of a "tool to fit the job" situation, if I was more competent in Final Cut, I might be more inclined to use that more. I just love ending the podcast recording with a high quality video with audio levels more or less correct. I'm 90% of the way there already!

### Edit in Final Cut Pro
I have a simple show intro/theme song I made in Logic. I add a stock Final Cut title and put that audio on top of it. I also like to record a little "intro" before each interview, so I'll record that in OBS and then bring that clip and put it in between the title and the main interview. I also add the title and theme song at the end of the video. I have a simple synth pulse sound I made in Logic, and I put that on top of my intro, as well as play it at the end of the interview to indicate it's about to end. It makes sense to me.

I use this time to also review the episode for highlights and standouts. Essentially, I start writing the title for the episode during this process. I cut out interruptions, but leave most of it in.  I try to keep my time in Final Cut quick and precise!

From the snafu I had with Sam's audio, I actually made a huge learning discovery. I'm not going to get into the whole space of audio mastering, but suffice to say adding and configuring the "Limiter" audio effect in Final Cut literally saved the day. [This video is all you need to know](https://www.youtube.com/watch?v=kSKKLn7N8w0). Going forward, I can use the limiter to make the podcast even better!

### What is a podcast?
From Final Cut, I export a 1080p video file. This gets uploaded to YouTube. I start this first thing since it has a fixed amount of time it will take and it's not a blocker for any of the rest of the process. In fact, continuing on with my process is actually the next step I need to take anyways! 

I use ffmpeg to extract the audio from the video as an mp3 like `ffmpeg -i interview.mov interview.mp3`.

Our podcast is finished, right? We have a nice video on YouTube, and an mp3 people can listen to. Wrong!

What _is_ a podcast, exactly? From a technical perspective, a podcast is literally just a regular RSS feed with a few little extra parts specifically for the podcast. At this point, I've written RSS/Atom feeds in my sleep so that felt easy! I build this site with Jekyll, and it can generate feeds very well!

In Jekyll, I made a new folder `_podcasts/` which will be picked up as a "collection". This is a pattern I've done more times than I can count, a collection is the basic data structure that Jekyll is built around and it's really powerful. In my `_podcasts/` folder, each file will be treated as a part of that collection.

I simply create a new markdown file like `2025-06-21-guest.md`. The file has some basic front-matter, which looks like this:

{% capture compiled_preview %}
{% comment %}
```yaml
---
title: Guest Name - Topic 1, Topic 2, Topic 3
media: /guestname.mp3
explicit: true/false
size: more on this later
---
{% include youtube.html embed="embed" title="Guest Name: Topic 1, Topic 2, Topic 3 ‽⸘ Interrobang #0" %}
```
{% endcomment %}
<div class="highlight highlight-source-yaml"><pre>---
<span class="pl-ent">title</span>: <span class="pl-s">Guest Name - Topic 1, Topic 2, Topic 3</span>
<span class="pl-ent">media</span>: <span class="pl-s">/guestname.mp3</span>
<span class="pl-ent">explicit</span>: <span class="pl-s">true/false</span>
<span class="pl-ent">size</span>: <span class="pl-s">more on this later</span>
---
<span class="pl-s">{%raw%}{% include youtube.html embed="embed" title="Guest Name: Topic 1, Topic 2, Topic 3 ‽⸘ Interrobang </span><span class="pl-c"><span class="pl-c">#</span>0" %}{%endraw%}</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="_podcasts/2025-06-21-guest.md"
%}

Next, I created a file in the `_podcasts/` folder `feed.xml`. This really could be placed anywhere, I just put it here. This will be the full liquid-powered XML template of our podcast's RSS feed!


{% capture compiled_preview %}
{% comment %}
```liquid
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:cc="http://web.resource.org/cc/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/"  xmlns:podcast="https://podcastindex.org/namespace/1.0"  xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <channel>
    <atom:link href="https://catskull.net/podcasts/feed.xml" rel="self" type="application/rss+xml"/>
    <title>Interrobang with Dave DeGraw</title>
    <pubDate>{{ site.podcasts.last.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</pubDate>    <lastBuildDate>{{ "now" | date: "%a, %d %b %Y %H:%M:%S %z" }}</lastBuildDate>
    <generator>Your Mom's Podcast Engine 2.0</generator>
    <link>https://catskull.net/podcast</link>
    <language>en-us</language>
    <copyright><![CDATA[Copyright © 2025 catskull.net]]></copyright>
    <docs>https://catskull.net/podcast</docs>
    <managingEditor>bro@catskull.net (bro@catskull.net)</managingEditor>
    <itunes:summary><![CDATA[It's Mr. Rogers for adults if he was also an alien.]]></itunes:summary>
    <image>
      <url>https://catskull.net/assets/images/podcasts/logo.png</url>
      <title>Interrobang with Dave DeGraw</title>
      <link><![CDATA[https://catskull.net/podcast]]></link>
    </image>
    <itunes:author>Dave DeGraw</itunes:author>
    <itunes:category text="Society &amp; Culture">
    </itunes:category>
    <itunes:image href="https://catskull.net/assets/images/podcasts/logo.png" />
    <itunes:explicit>false</itunes:explicit>
    <itunes:owner>
      <itunes:name><![CDATA[Dave DeGraw]]></itunes:name>
      <itunes:email>bro@catskull.net</itunes:email>
    </itunes:owner>
    <description><![CDATA[It's Mr. Rogers for adults if he was also an alien.]]></description>
    <itunes:type>episodic</itunes:type>
    <podcast:locked owner="bro@catskull.net">no</podcast:locked>
    
    {% for podcast in site.podcasts reversed %}
    {% unless podcast.name == 'feed.xml' %}
    <item>
      {% assign index = site.podcasts.size | minus: forloop.index | plus: 1 %}
      <title>{{ index }}: {{ podcast.title | escape }}</title>
      <itunes:title>{{ podcast.title | escape }}</itunes:title>
      <pubDate>{{ podcast.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</pubDate>
      <guid isPermaLink="false"><![CDATA[episode-{{ index }}-{{ podcast.title | escape | slugify }}]]></guid>
      <link><![CDATA[{{site.url}}/podcast#episode-{{ index }}-{{ podcast.title | slugify }}]]></link>
      <itunes:image href="https://catskull.net/assets/images/podcasts/logo.png" />
      <description><![CDATA[{{ podcast.content }}]]></description>
      <content:encoded><![CDATA[{{ podcast.content }}]]></content:encoded>
      <enclosure type="audio/mpeg" length="{{ podcast.size }}" url="https://media.catskull.net{{ podcast.media }}" />
      <itunes:duration>{{ podcast.duration }}</itunes:duration>
      <itunes:explicit>{{ podcast.explicit | default: false }}</itunes:explicit>
      <itunes:keywords />
      <itunes:subtitle><![CDATA[{{ podcast.content | strip_html }}]]></itunes:subtitle>
      <itunes:episode>{{ index }}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
    </item>
    {% endunless %}
    {% endfor %}

  </channel>
</rss>
```
{% endcomment %}
{%raw%}
<div class="highlight highlight-text-html-liquid"><pre>---
layout: null
---
&lt;?<span class="pl-ent">xml</span> <span class="pl-e">version</span>=<span class="pl-s"><span class="pl-pds">"</span>1.0<span class="pl-pds">"</span></span> <span class="pl-e">encoding</span>=<span class="pl-s"><span class="pl-pds">"</span>UTF-8<span class="pl-pds">"</span></span>?&gt;
&lt;<span class="pl-ent">rss</span> <span class="pl-e">version</span>=<span class="pl-s"><span class="pl-pds">"</span>2.0<span class="pl-pds">"</span></span> <span class="pl-e">xmlns:atom</span>=<span class="pl-s"><span class="pl-pds">"</span>http://www.w3.org/2005/Atom<span class="pl-pds">"</span></span> <span class="pl-e">xmlns:cc</span>=<span class="pl-s"><span class="pl-pds">"</span>http://web.resource.org/cc/<span class="pl-pds">"</span></span> <span class="pl-e">xmlns:itunes</span>=<span class="pl-s"><span class="pl-pds">"</span>http://www.itunes.com/dtds/podcast-1.0.dtd<span class="pl-pds">"</span></span> <span class="pl-e">xmlns:media</span>=<span class="pl-s"><span class="pl-pds">"</span>http://search.yahoo.com/mrss/<span class="pl-pds">"</span></span> <span class="pl-e">xmlns:content</span>=<span class="pl-s"><span class="pl-pds">"</span>http://purl.org/rss/1.0/modules/content/<span class="pl-pds">"</span></span>  <span class="pl-e">xmlns:podcast</span>=<span class="pl-s"><span class="pl-pds">"</span>https://podcastindex.org/namespace/1.0<span class="pl-pds">"</span></span>  <span class="pl-e">xmlns:googleplay</span>=<span class="pl-s"><span class="pl-pds">"</span>http://www.google.com/schemas/play-podcasts/1.0<span class="pl-pds">"</span></span> <span class="pl-e">xmlns:rdf</span>=<span class="pl-s"><span class="pl-pds">"</span>http://www.w3.org/1999/02/22-rdf-syntax-ns#<span class="pl-pds">"</span></span>&gt;
  &lt;<span class="pl-ent">channel</span>&gt;
    &lt;<span class="pl-ent">atom:link</span> <span class="pl-e">href</span>=<span class="pl-s"><span class="pl-pds">"</span>https://catskull.net/podcasts/feed.xml<span class="pl-pds">"</span></span> <span class="pl-e">rel</span>=<span class="pl-s"><span class="pl-pds">"</span>self<span class="pl-pds">"</span></span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>application/rss+xml<span class="pl-pds">"</span></span>/&gt;
    &lt;<span class="pl-ent">title</span>&gt;Interrobang with Dave DeGraw&lt;/<span class="pl-ent">title</span>&gt;
    &lt;<span class="pl-ent">pubDate</span>&gt;{{ <span class="pl-smi">site</span>.<span class="pl-smi">podcasts</span>.<span class="pl-smi">last</span>.<span class="pl-smi">date</span> | <span class="pl-c1">date:</span> <span class="pl-s">"%a, %d %b %Y %H:%M:%S %z"</span> }}&lt;/<span class="pl-ent">pubDate</span>&gt;    &lt;<span class="pl-ent">lastBuildDate</span>&gt;{{ <span class="pl-s">"now"</span> | <span class="pl-c1">date:</span> <span class="pl-s">"%a, %d %b %Y %H:%M:%S %z"</span> }}&lt;/<span class="pl-ent">lastBuildDate</span>&gt;
    &lt;<span class="pl-ent">generator</span>&gt;Your Mom's Podcast Engine 2.0&lt;/<span class="pl-ent">generator</span>&gt;
    &lt;<span class="pl-ent">link</span>&gt;https://catskull.net/podcast&lt;/<span class="pl-ent">link</span>&gt;
    &lt;<span class="pl-ent">language</span>&gt;en-us&lt;/<span class="pl-ent">language</span>&gt;
    &lt;<span class="pl-ent">copyright</span>&gt;&lt;!<span class="pl-c1">[CDATA[Copyright © 2025 catskull.net]]</span>&gt;&lt;/<span class="pl-ent">copyright</span>&gt;
    &lt;<span class="pl-ent">docs</span>&gt;https://catskull.net/podcast&lt;/<span class="pl-ent">docs</span>&gt;
    &lt;<span class="pl-ent">managingEditor</span>&gt;bro@catskull.net (bro@catskull.net)&lt;/<span class="pl-ent">managingEditor</span>&gt;
    &lt;<span class="pl-ent">itunes:summary</span>&gt;&lt;!<span class="pl-c1">[CDATA[It's Mr. Rogers for adults if he was also an alien.]]</span>&gt;&lt;/<span class="pl-ent">itunes:summary</span>&gt;
    &lt;<span class="pl-ent">image</span>&gt;
      &lt;<span class="pl-ent">url</span>&gt;https://catskull.net/assets/images/podcasts/logo.png&lt;/<span class="pl-ent">url</span>&gt;
      &lt;<span class="pl-ent">title</span>&gt;Interrobang with Dave DeGraw&lt;/<span class="pl-ent">title</span>&gt;
      &lt;<span class="pl-ent">link</span>&gt;&lt;!<span class="pl-c1">[CDATA[https://catskull.net/podcast]]</span>&gt;&lt;/<span class="pl-ent">link</span>&gt;
    &lt;/<span class="pl-ent">image</span>&gt;
    &lt;<span class="pl-ent">itunes:author</span>&gt;Dave DeGraw&lt;/<span class="pl-ent">itunes:author</span>&gt;
    &lt;<span class="pl-ent">itunes:category</span> <span class="pl-e">text</span>=<span class="pl-s"><span class="pl-pds">"</span>Society <span class="pl-c1">&amp;<span class="pl-en">amp</span>;</span> Culture<span class="pl-pds">"</span></span>&gt;
    &lt;/<span class="pl-ent">itunes:category</span>&gt;
    &lt;<span class="pl-ent">itunes:image</span> <span class="pl-e">href</span>=<span class="pl-s"><span class="pl-pds">"</span>https://catskull.net/assets/images/podcasts/logo.png<span class="pl-pds">"</span></span> /&gt;
    &lt;<span class="pl-ent">itunes:explicit</span>&gt;false&lt;/<span class="pl-ent">itunes:explicit</span>&gt;
    &lt;<span class="pl-ent">itunes:owner</span>&gt;
      &lt;<span class="pl-ent">itunes:name</span>&gt;&lt;!<span class="pl-c1">[CDATA[Dave DeGraw]]</span>&gt;&lt;/<span class="pl-ent">itunes:name</span>&gt;
      &lt;<span class="pl-ent">itunes:email</span>&gt;bro@catskull.net&lt;/<span class="pl-ent">itunes:email</span>&gt;
    &lt;/<span class="pl-ent">itunes:owner</span>&gt;
    &lt;<span class="pl-ent">description</span>&gt;&lt;!<span class="pl-c1">[CDATA[It's Mr. Rogers for adults if he was also an alien.]]</span>&gt;&lt;/<span class="pl-ent">description</span>&gt;
    &lt;<span class="pl-ent">itunes:type</span>&gt;episodic&lt;/<span class="pl-ent">itunes:type</span>&gt;
    &lt;<span class="pl-ent">podcast:locked</span> <span class="pl-e">owner</span>=<span class="pl-s"><span class="pl-pds">"</span>bro@catskull.net<span class="pl-pds">"</span></span>&gt;no&lt;/<span class="pl-ent">podcast:locked</span>&gt;
    
    {% <span class="pl-k">for</span> <span class="pl-smi">podcast</span> <span class="pl-k">in</span> <span class="pl-smi">site</span>.<span class="pl-smi">podcasts</span> <span class="pl-k">reversed</span> %}
    {% <span class="pl-k">unless</span> <span class="pl-smi">podcast</span>.<span class="pl-smi">name</span> <span class="pl-k">==</span> <span class="pl-s">'feed.xml'</span> %}
    &lt;<span class="pl-ent">item</span>&gt;
      {% <span class="pl-ent">assign</span> <span class="pl-smi">index</span> = <span class="pl-smi">site</span>.<span class="pl-smi">podcasts</span>.<span class="pl-smi">size</span> | <span class="pl-c1">minus:</span> <span class="pl-c1">forloop</span>.<span class="pl-smi">index</span> | <span class="pl-c1">plus:</span> <span class="pl-c1">1</span> %}
      &lt;<span class="pl-ent">title</span>&gt;{{ <span class="pl-smi">index</span> }}: {{ <span class="pl-smi">podcast</span>.<span class="pl-smi">title</span> | <span class="pl-c1">escape</span> }}&lt;/<span class="pl-ent">title</span>&gt;
      &lt;<span class="pl-ent">itunes:title</span>&gt;{{ <span class="pl-smi">podcast</span>.<span class="pl-smi">title</span> | <span class="pl-c1">escape</span> }}&lt;/<span class="pl-ent">itunes:title</span>&gt;
      &lt;<span class="pl-ent">pubDate</span>&gt;{{ <span class="pl-smi">podcast</span>.<span class="pl-smi">date</span> | <span class="pl-c1">date:</span> <span class="pl-s">"%a, %d %b %Y %H:%M:%S %z"</span> }}&lt;/<span class="pl-ent">pubDate</span>&gt;
      &lt;<span class="pl-ent">guid</span> <span class="pl-e">isPermaLink</span>=<span class="pl-s"><span class="pl-pds">"</span>false<span class="pl-pds">"</span></span>&gt;&lt;!<span class="pl-c1">[CDATA[episode-{{ index }}-{{ podcast.title | escape | slugify }}]]</span>&gt;&lt;/<span class="pl-ent">guid</span>&gt;
      &lt;<span class="pl-ent">link</span>&gt;&lt;!<span class="pl-c1">[CDATA[{{site.url}}/podcast#episode-{{ index }}-{{ podcast.title | slugify }}]]</span>&gt;&lt;/<span class="pl-ent">link</span>&gt;
      &lt;<span class="pl-ent">itunes:image</span> <span class="pl-e">href</span>=<span class="pl-s"><span class="pl-pds">"</span>https://catskull.net/assets/images/podcasts/logo.png<span class="pl-pds">"</span></span> /&gt;
      &lt;<span class="pl-ent">description</span>&gt;&lt;!<span class="pl-c1">[CDATA[{{ podcast.content }}]]</span>&gt;&lt;/<span class="pl-ent">description</span>&gt;
      &lt;<span class="pl-ent">content:encoded</span>&gt;&lt;!<span class="pl-c1">[CDATA[{{ podcast.content }}]]</span>&gt;&lt;/<span class="pl-ent">content:encoded</span>&gt;
      &lt;<span class="pl-ent">enclosure</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>audio/mpeg<span class="pl-pds">"</span></span> <span class="pl-e">length</span>=<span class="pl-s"><span class="pl-pds">"</span>{{ <span class="pl-smi">podcast</span>.<span class="pl-smi">size</span> }}<span class="pl-pds">"</span></span> <span class="pl-e">url</span>=<span class="pl-s"><span class="pl-pds">"</span>https://media.catskull.net{{ <span class="pl-smi">podcast</span>.<span class="pl-smi">media</span> }}<span class="pl-pds">"</span></span> /&gt;
      &lt;<span class="pl-ent">itunes:duration</span>&gt;{{ <span class="pl-smi">podcast</span>.<span class="pl-smi">duration</span> }}&lt;/<span class="pl-ent">itunes:duration</span>&gt;
      &lt;<span class="pl-ent">itunes:explicit</span>&gt;{{ <span class="pl-smi">podcast</span>.<span class="pl-smi">explicit</span> | <span class="pl-c1">default:</span> <span class="pl-c1">false</span> }}&lt;/<span class="pl-ent">itunes:explicit</span>&gt;
      &lt;<span class="pl-ent">itunes:keywords</span> /&gt;
      &lt;<span class="pl-ent">itunes:subtitle</span>&gt;&lt;!<span class="pl-c1">[CDATA[{{ podcast.content | strip_html }}]]</span>&gt;&lt;/<span class="pl-ent">itunes:subtitle</span>&gt;
      &lt;<span class="pl-ent">itunes:episode</span>&gt;{{ <span class="pl-smi">index</span> }}&lt;/<span class="pl-ent">itunes:episode</span>&gt;
      &lt;<span class="pl-ent">itunes:episodeType</span>&gt;full&lt;/<span class="pl-ent">itunes:episodeType</span>&gt;
    &lt;/<span class="pl-ent">item</span>&gt;
    {% <span class="pl-k">endunless</span> %}
    {% <span class="pl-k">endfor</span> %}

  &lt;/<span class="pl-ent">channel</span>&gt;
&lt;/<span class="pl-ent">rss</span>&gt;</pre></div>
{% endraw %}
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="_podcasts/feed.xml"
%}



The keen eyed among you will note that the description of the podcast includes a link to the video. That link will actually show up in Apple Podcasts. I like that a lot!

An extremely helpful tool while debugging this process is [Cast Feed Validator](https://www.castfeedvalidator.com). This tool helped me get everything just right. Some of the errors were not super helpful, but they were all caused by stupid issues like mistyping my domain as "castkull.com" doh.

### Distribution

I'm getting a bit ahead of myself. Let's quickly recap what I've built so far:
- a video, that's uploaded to YouTube, but does not have any metadata (title, etc)
- an mp3 of the audio from that video
- a podcast feed that I can use catkull.net & jekyll to publish

I view YouTube as a short term convenience. I don't expect them to continue to host my content for free. I keep the source video file locally. If I don't "own the means of distribution", I don't fully trust it long term. I still rely on a hosting provider (GitHub Pages) but with all engineering challenges, there's tradeoffs. I could reasonably replace GitHub Pages with another provider, or self host. I don't know that's true for video, yet. Therefore, YouTube is a closed platform good for convenience and discovery. I think we're pretty close to being able to do our own distributed YouTube as "free tiers" get more generous thanks to the powers of a free economy.

The mp3's are surprisingly "large", around 100MB. I think GitHub would _probably_ be okay if I put these all in my main Jekyll site repo, but long term that just annoying to have to deal with and is an anti-pattern. Plus, I know that static file hosting is more or less a solved problem in 2025.

I'd actually never used [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/). It's pretty much AWS S3, but, you know, good/not evil. Their free tier is awesome, up to 10GB of file storage and I think _ulimited_ egress (bandwidth)? Seems to good to be true. But surely they're happy to host my silly show for me and my friends.

I manually drag and drop each .mp3 into the R2 web interface. I set up my R2 bucket to point to a subdomain `media.catskull.net` and then voila! The mp3's are directly exposed to anyone who wants to listen!

The only other detail is to make a logo for your show. Apple demands this is _at least_ 3000x3000 (not a typo). They will reject your show if it's not, more on that later. I fired up Affinity Designer and threw a simple ‽ interrobang in SF Pro Rounded and called it a day. This file _can_ live on my blog, but it could also live on R2. Either way, make sure your image is a PNG of a JPG.

### Process optimization
Now that the video is hopefully uploaded, we can edit the title and other data. You can go as crazy as you want with the show notes, and ideally that will come from the Jekyll .md file we already made. I keep it minimal with a link back to catskull.net/podcast. I copy and paste the YouTube title from the one I already made in the markdown file. YouTube actually supports creating a playlist that's actually a podcast, so I did that and mark the video as part of that playlist.

This is what I referred to earlier - learning. Physically going through the process of doing all of this is more enlightening than any amount of "Podcast 101" articles I could read. I know that the Final Cut export and YouTube upload are the two single longest parts of the process. I optimize for them, to begin as soon as possible. Unfortunately they are also locked to each other; I can't upload the video until it's been exported. My process is designed to allow _all_ of the other work - the title creation, mp3 uploading, literally _everything else_ - to happen concurrently with the longest parts. To me, the effort is worth it because knowing how to do it quickly and efficiently pays huge dividends. I can pretty much just "go" with little to no technical preparation or setup. Using technology to reduce, not add to, the friction of the creative process should be our goal.

### Finishing touches
Everything is uploaded and ready to go. I simply `git push` the new podcast markdown file, and the show is live! It will show up in your podcast feed, and in your YouTube inbox.

After the show is out, it's a good idea to let your guest know and share a link. Depending on the guest, sometimes I will offer to share a private link with them for review before publishing. But the goal is to reduce friction and just get the episode out as fast as possible.

I also like to ask them for feedback for me as an interviewer. I talk about using this as a learning process, and that's _very much_ true of the actual interview itself. I'm learning how to interview someone. The rest of it is really just superfluous.

While you can use the Apple Podcasts app to subscribe to an RSS feed, if you want your show to show up in their library, you need to add it deliberately. Luckily it's super easy since we've already done all the hard work! Just head over [podcastsconnect.apple.com](https://podcastsconnect.apple.com) and add your show's RSS feed and the rest should import automatically. Take a moment to review all the info, then just hit "Publish" and you're live! I think it takes a while for the show to work it's way through and actually show up, so don't stress out. It will give you a link to your show in Apple Podcasts you can use to check, and link to from your website or other page.

### Closing thoughts
This whole podcast business has been a total blast. I've built a lot of random technical knowledge honestly through my entire life that's allowed me to execute something like this with relative ease. I don't want to say my entire life has built up to this moment, but I think I've used every skill I've ever practiced in order to pull it off. It's a total blast.

There are further optimizations to this process I could make. All of these services I manually upload assets to have APIs. I could simply drop the raw interview file into a directory and script out almost everything else. But for now, this whole thing seems to work well. I've run through it four times so far and each time gets faster and quicker. I want to focus on the podcast, not the technical side of it. So the sooner I can get this all ironed out, the faster I can move towards my real goal!

You should blog. You should podcast. Email your friends. Tell people you love them. Share who you are. Be genuine. Seek to uplift and promote virtue. If that's your goal, you will be successful.

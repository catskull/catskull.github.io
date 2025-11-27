---
title: "Google Search is hallucinating preview text"
tags: [google, web, rant]
date: 2025-11-26 15:26:27 -0700
layout: post
---
It is well known online that Google Search has been deteriorating at an exponential rate.<sup>[citation needed]</sup> Anecdotally, I feel that Google as a company peaked around 2013 with the release of the Nexus 5 and the "Google Now Launcher". It all worked incredibly well! If my memory serves, this was also the official introduction of the "OK Google" keyword and man, it was the best of times, it was the worst of times. To this day, I believe this software worked better than any following voice assistant including any incantation of the abomination Apple calls "Siri".

The specific ways that Google is deteriorating are unpredictable and especially discouraging. First, they prioritized unrelated ad spots in our searches. Then they force-fed us their "AI Overview" at the top of the page. I myself personally use a specific "adblock.css" user agent style sheet to hide most of the slop they've shoved into search ([see the project's GitHub for more information](https://github.com/catskull/adblock.css)). The writing has been pretty clearly on the wall for some time now.

However, it now appears that Google is replacing a page's meta description with their own AI halucinated slop. At the time of writing, a google search for "meta description" lands you at Google's own documentation page for what it is ([archive](https://web.archive.org/web/20251004154925/https://developers.google.com/search/docs/appearance/snippet)). Here's what their page says about how the search "snippet" is produced:

> Google primarily uses the content on the page to automatically determine the appropriate snippet. We may also use descriptive information in the meta description element when it describes the page better than other parts of the content.

This came to my attention only recently. In a [Hacker News discussion on Ghostty shaders](https://news.ycombinator.com/item?id=46036895#46039176), I referenced a [blog post I'd written showing off some off the shelf shaders](https://catskull.net/fun-with-ghostty-shaders.html). I use Cloudflare Analytics so I've known this blog post is one of my most hit pages. I guess a lot of people are interested in Ghostty and using shaders. However, another commenter let me know that the link preview text (the text that shows up under the link in search) did not appear anywhere on the actual blog post. More than that, it was factually incorrect!

If you do a Google search for "ghostty shaders", my blog post should be the first or second link. Here's the preview text:

> Feb 22, 2025 — Ghostty doesn't directly support shaders, but a repo with shaders can be cloned to ~/.config/ghostty/shaders. Examples include 'drunkard+retro- ...

Screenshot, for posterity:
![go home drunk, you're google](/public/media/posts/games/2025/frickgoogleman/googlesux.jpg)

"Ghostty doesn't directly support shaders" - o, rly??? [The Ghostty docs would suggest otherwise!](https://ghostty.org/docs/config/reference#custom-shader)

As another example, here's what a search engine that hasn't been completely captivated by large language model shoehorned feature development shows as the preview text:

> Feb 22, 2025 Back when Ghostty released I played around with the entire config, including trying to get some shaders to work. iTerm2 has the ability to have an image background in your terminal and ghostty does not, at least not directly. I wanted to get a custom image with a shader but couldn't get it working.

Another screenshot:
![duckduckgoogle](/public/media/posts/games/2025/frickgoogleman/durkdurkgor.jpg)

If you go inspect the page source of that blog post, you'll see that this preview text is _exactly_ what is in the meta description tag. Nothing more, though apparently their UI does truncate the text at some point.

So yes, Google Search is replacing the established meta description tag with their own hallucinated AI slop in 2025! [Someone tell MDN their docs need to be updated.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata#exploring_the_descriptions_use_in_search_engines)

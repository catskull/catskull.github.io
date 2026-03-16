---
title: You and Your Spinner Can Go to Hell
tags: [rant, web]
date: 2026-03-16 12:29:23 -0600
layout: post
---
There's a new cancer on the web. It's been around for at least 20 years, but recently it's gotten to unprecedented ubiquity. I'm talking about the _spinner_.

What's a _spinner_?

<blockquote cite="https://getbootstrap.com/docs/5.3/components/spinners/">
  <p>“spinners” can be used to show the loading state in your projects.</p>
</blockquote>
<p><cite><a target="_blank" href="https://getbootstrap.com/docs/5.3/components/spinners/">Bootstrap 5.3 Docs↗</a></cite></p>

Still don't know? I'll show you. This is from the absolute latest cutting edge UX research out of The World's Most User-Focused Company™, ~~Alphabet~~ Google.

![material design 3 circular progress indicator](/assets/images/posts/you-and-your-spinner-can-go-to-hell/material-spinner.gif)

_Squiggle spinner isn't real. It can't hurt me._

![nananananana](/assets/images/posts/you-and-your-spinner-can-go-to-hell/jim.gif)

Maybe this from the United Kingdom Home Office "User-Centred Design Manual" is better:

<blockquote cite="https://design.homeoffice.gov.uk/design-system/components?name=Loading%20spinner">
<b>Loading spinner</b>
<p>Tell a user they need to wait, because something is happening.</p>
</blockquote>
<p><cite><a target="_blank" href="https://design.homeoffice.gov.uk/design-system/components?name=Loading%20spinner">User-Centred Design Manual↗</a></cite></p>

Every website in the world anytime I click anything:

![I'm doing something!](/assets/images/posts/you-and-your-spinner-can-go-to-hell/doingsomething.png)

At least they have some instructions on _when_ a spinner should be used (emphasis my own):

<blockquote cite="https://design.homeoffice.gov.uk/design-system/components?name=Loading%20spinner">
<p>Use a loading spinner to inform users they need to wait for something to happen. For example, you can use a loading spinner to show that a result is taking time to process.</p>
<strong>Consider whether the speed and responsiveness of the service can be technically improved before using a loading spinner.</strong>
</blockquote>
<p><cite><a target="_blank" href="https://design.homeoffice.gov.uk/design-system/components?name=Loading%20spinner">User-Centred Design Manual↗</a></cite></p>

So what's up with this? Why does it feel like the new default on the web is to serve up a dummy HTML page as soon as possible and then make the user stare at 15 spinners and skeleton loaders. "Skeleton loader" you ask? You know, that thing where a bunch of grey boxes flash at you:

![skelenton improves UX by 90%!](/assets/images/posts/you-and-your-spinner-can-go-to-hell/skelenton.gif)

Why has this user hostile design consumed everything? Some might simply say that it's a "Big JavaScript" conspiracy. Instead of lean HTML files with simple semantic markup, we ship 80 megabytes of JavaScript to render a single blog post. I believe this is at least partly true, but it's also a chicken-or-the-egg problem. How many megabytes of JS is needed in order to toggle your loader classes and detect when the _real_ content is loaded?

More concretely I can point to two things.

First, the "Doherty Threshold". As far as I can tell, this is more fiction than fact. Here's the TL;DR from the boldly named "Laws of UX"

<blockquote cite="https://lawsofux.com/doherty-threshold/">
<p>In 1982 Walter J. Doherty and Ahrvind J. Thadani published, in the IBM Systems Journal, a research paper that set the requirement for computer response time to be 400 milliseconds, not 2,000 (2 seconds) which had been the previous standard. When a human being’s command was executed and returned an answer in under 400 milliseconds, it was deemed to exceed the Doherty threshold, and use of such applications were deemed to be “addicting” to users.</p>
</blockquote>
<p><cite><a target="_blank" href="https://lawsofux.com/doherty-threshold/">Laws of UX, Doherty Threshold↗</a></cite></p>

Wow, that sounds very sciencey and as my 2008 Facebook profile will proudly tell you, "I F\*\*\*ing Love Science!" Come on, a uncited and unsourced research paper? If that's not the very definition of _science_ I don't know what is!

Maybe [the term "addicting" isn't a great look↗](https://www.pbs.org/newshour/nation/lawyers-deliver-closing-arguments-in-landmark-social-media-addiction-trial){:target="_blank"} in the year of our Lord 2026. Or maybe that's Meta's true crime - mastering the sub-400ms Dohrety Threshold! That's it, that's how they did it, I just know it. They read the _Laws of UX_ and added a spinner to every page element in every app. It doesn't matter how long the spinner took to spin, the interface was deemed responsive and the users became addicted. Maybe I should take a note out of that book.

Jokes aside, what I'm trying to say is that at some point we started valuing "any response at all" over "a useful response". I believe my second point really is the smoking gun: [Google Core Web Vitals (CWV)↗](https://developers.google.com/search/docs/appearance/core-web-vitals){:target="_blank"}.

You really should just go review that page for yourself. The TL;DR is that Google uses a set of statistics that are intended to rank a web page on how "fast" it loads. They have really specific data points they look at like "Largest Contentful Paint" that measure how long before content on the page shows for the user.

Now, any discussion about the actual specifics of any of Google's algorithm need an important disclaimer. _We don't actually know how it works._ Google keeps their algorithms opaque, adopting a "security by obscurity" model under the premise that any metric if known can be gamed. It's likely that at one point, their algorithm wasn't good enough to properly detect "false loading" via spinners and skeletons. I would guess that today, it handles it much better. However, the damage has been done.

Teams of developers and UX researchers utilized tools that improperly measured the "responsiveness" of a web page. I myself spent many hours running Chrome Lighthouse on my production apps, trying to minimize the total weight of my assets and optimize for the few key metrics that Google deems to be "good". I'm not necessarily saying that this is all a wasted effort.

Over the course of my career, I've observed many (all) metrics being gamed and abused to the point where the metric ceases to hold any value. This is actually a phenomenon colloquially described as ["Goodhart's law"↗](https://en.wikipedia.org/wiki/Goodhart%27s_law){:target="_blank"}. The Wikipedia article has a nice summary: "When a measure becomes a target, it ceases to be a good measure".

So, the goal became "nice numbers from Google" and not "nice user interface". Over time, as people correctly applied good UX research to their designs, the [cargo cult↗](https://en.wikipedia.org/wiki/Cargo_cult){:target="_blank"} effect became "show a spinner, because good apps use a lot of spinners". Somewhere along the line we lost sight of what we're actually trying to do.

We have teams of designers so drunk on their own power that they're spending time designing and implementing an animation of a worm circumnavigating my butt hole in the guise of "better UX".

I'll end this rant with a few bullet points I've personally used and found to be potentially useful to increase _actual_ responsiveness without simply throwing a spinner in front of everything.

- Optimize assets. Use modern HTML to ship images in multiple formats including JPEG XL, avif, and webp. Animated gifs and videos can even be delivered using avif and webp at usually a vast size savings. [See how I'm using Cloudflare Image Transformations to optimize and deliver my assets.](/optimize-jekyll-images-with-cloudflare-image-transformations.html) [See also my experiment with encoding gif to avif.](/libaom-vs-svtav1-vs-rav1e-2025.html)
- Properly set an [aspect-ratio↗](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio){:target="_blank"} on your content to prevent layout shifts. You actually don't need a skeleton or a spinner to just show that some content is still loading.
- Strategically [preload↗](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload){:target="_blank"} content that is vital for initial load. [See how I improved my home page's loading with some content flicker mitigation strategies.](/content-flicker-mitigation.html)
- [Lazy load↗](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) as much as you possibly can. This is especially useful for heavy third party scripts such as analytics.
- Reconsider whether you really need all that CSS. Do you _really_ need a custom font? Consider using a [system font stack↗](https://systemfontstack.com){:target="_blank"}. Lean on default browser styling as much as possible. Blue links are fine.
- Evaluate new third party scripts by viewing the site with JavaScript disabled. I'm not saying you should really support a no-JS environment, but if you're about to throw some new A/B testing tool on your homepage, just take a gander at how it behaves when it can't run to try and better understand what it's really doing.
- Know, understand, and appropriately use [semantic HTML↗](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/){:target="_blank"}. Not only will this help your page simply work better without any extra asset bloat, it's a huge win for accessibility.
- Lean on the web browser for as much as you possibly can. Optimize for the latest evergreen browsers. Web browsers are actually very complex software and the major browser developers do a wonderful job optimizing them so you don't have to.
- Know your tools. Why do you have a tool? What does it do for you? What would happen if you got rid of it? What alternatives exist?
- [Bet on HTML](/html.html)

End of rant! Please don't take this personally. I recognize that I'm at least a little too passionate about this stuff and that to most people a few spinners for a few seconds isn't that big a deal. I just think we, as web developers, could be better. If you've been around the block a few times, help the young guns know what alternatives exist. Just because claude pumped it out doesn't mean it's correct. I believe we should strive for excellence, not perfection. I'm not perfect. This site is not perfect. But I do strive to be excellent little by little.

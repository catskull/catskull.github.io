---
title: "Re: Opinions [about vibe coding]"
tags: [reply, email, AI]
date: 2026-04-10 12:07:50 -0600
layout: post
---

Reader George writes in with this:

> Hello,
>
> What do you think about Vibe Coding and AI-Software Development? My fellow developers use it but it feels very stupid to me. Seriously, you are effectively making AI do your work. You do some job but you have no idea what's going on. This AI bubble made people braindead. I haven't even talked about maintenance hell it causes. Hackers are too happy they easily exploit these rookies. When I tell these, they ignore me. 
>
>
> Dang, I wonder what we'll see in the next few years.

Over the course of my career, I've developed a small informal list of "DeGraw's Laws of Software Engineering". I've recently been moved to create a 4th law:

> Any proposed efficiency gains from using LLM and AI tools will be consumed twofold by discussion and debate surrounding said efficiency gains.

Yet, here I am writing this blog post. Ironic.

Disclaimer: In this post, when I use the term "AI", I use it as a colloquilism for the large language model based tools such as ChatGPT and Claude Code. I reject the term "AI" in general as it implies we even have a good definition of what intelligence is, much less what artificial intelligence might look like.

## No new problems

I don't believe that AI development tools have introduced any new problems in software development. Crappy code has existed as long as code has. Lazy developers have existed forever. I've worked with people who could write and ship great code that powered real features that made people's lives better. I've also worked with people who were either incompetent or simply didn't care enough about their work to strive for quality or greatness. It's not suprising to see that the exact same spread of developers are now using AI tools to more or less the same spread in quality. Perhaps it's accelerated the overall quantity of code being written, but I also don't think simply more volume is a problem either.

For example, I've seen AI bots review a pull request on every push. With each push, there will be a fresh batch of comments from the bot, not just on the newly pushed code, but on _everything_. Before AI tools, if a coworker reviewed your PR and left a batch of comments, which you fixed, and then that coworker re-reviewed and left a fresh batch of comments on the previous code they didn't see the first time, that coworker would be bad at reviewing pull requests. It's not a new problem. If I download 300 lines of code from GitHub and submit them as my own without ever reading or understanding them, I would be an unskilled developer. If I have AI write my code and I expect you to read it and make sure it works, I'm a bad developer. I suppose you could argue that the _scale_ at which these problems seem to be manifesting is itself a new problem, but for my purposes here I don't believe it is.

## Learn the tool, don't tool the learn

I keep saying this and I know it makes no sense. What I mean by it is just use the tool as is. Don't build a ton of custom stuff to make the tool work better. I think particularly with the fundamental way that LLM tools work, adding hundreds of line of "context" and additional instructions is a real foot gun. There's hype and there's this existential dread that this AI tool feels like it's better at my job than I am, so then what do I do to protect myself? I must become an expert at the tool! I think that thinking is couterproductive. Think about someone who is an expert user of their code editor. We've all worked with the hardcore vim, DVORAK-toting, custom-Linux-distribution people. Rarely are they "better" at their job than someone who's using the built in terminal and Notepad++. I'm not arguing against building prociency with your tools. I'm not saying you shouldn't seek out and use the best tools for your job. But if you have to buy a thing and spend an entire work week tweaking and learning how to use it "correctly", you're probably trying to optimize the wrong thing.

I'm only about a month into my use of Claude Code. I came in pretty blind. I don't participate in the zeitgeist surrounding it. I don't really talk to people about it. I don't know the latest and greatest tips and tricks. I couldn't tell you what the difference between "medium" and "high" effort is; I couldn't even tell you how to change the level of effort. I don't optimize my workflow to make things easier for Claude. I give it pretty stupid queries. I work in small increments and iterate. Just like I did before I used AI tools, I commit frequently and when I go off in the wrong direction, I'll revert my changes. I don't actually know what a "skill" is. I have a vague understanding of what an "MCP" is, only to the extent that it seems to allow Claude to use external services more efficiently. Just like random code off the internet, I'm skeptical of it's output. I review it's changes before committing (and I sure as hell review them before asking someone else to). Overall, it's been pretty good. I rarely open my editor any more.

I also like using Claude to explain things to me. It's eliminated a lot of the vocabulary friction I run into when trying to pick up new technlogies. Is it a hash or an object? Is it an input or a prop? It's really good at that.

## Disclosure is important

It's a bit ironic to me that some people feel afraid to acknowledge their AI use. Again, it's not a new problem. One time I was interviewing with a company and they sent me a little take home challenge. It was tricky. I banged my head against it for a bit and then turned to Stack Overflow. I tried out the solution and it worked and met all the challenge's requirements. I actually copy pasted the Stack Overflow solution with a comment saying that I had done so. I got the job.

I'm reminded of an excellent quote from possibly the greatest sports comedy of all time: _Cool Runnings_.

> Derice, a gold medal is a wonderful thing. But if you're not enough without it, you'll never be enough with it.

[insert youtube partial here with tYRtTqx-IK8 as the video id]

If you feel like you're not smart enough to write a blog post yourself and instead you need AI to write it for you then using AI and then lying about or not disclosing it won't make you smart enough. In fact, it will make you look even worse. It makes it look like you not only think you are stupid, but that everyone of your potential readers is also stupid. It's fine to submit a pull request that you gave your best effort on, acknowledge there are major gaps in your understanding and that you're learning, and humbly ask for feedback or help if it's not up to par. Acknowledging that you lack skill or knowledge is the first and _only_ step you can take to gain skill or knowledge.

I find Claude Code's default behavior when committing to be a really sensible default here. It will use your credentials, but tag Claude Code as a co-author. There's been some debate about if this means you should disclose _all_ tool use, but that's stupid in my opinion. When I copy and paste code from Stack Overflow, which I have done multiple times, I leave a comment linking to the answer for future reference. It's relevant context. The fact that I copy and pasted the code into nano is not relevant. Similarly, acknowledging AI tool use is helpful context. Perhaps we find out in a year that Opus 4.6 accidentally introduced a vulnerability every time it tried to write a `console.log` statement, somehow. Having the context of all the commits that were written using Opus 4.6 makes cleanup a thousand times easier.

## Commodification of code is not new

Can I spot a website built with Wix.com from a thousand miles away? Yes, I can. Did the person who made that site also probably not really understand how web development worked? Yes. Is that website likely less functional than something a competent professional could churn out? Probably. Does it matter? No. The development budget for the Wix.com website was $0. Can a professional code up a better website than Wix.com for $0? Not one that values their time, and life is too short to commit acts of charity every time someone wants to put up a web page for their barbershop. Maybe the budget is greater than $0 but still not whatever a professional would charge? There have been cheap contractors available since the dawn of the internet.

Whenever I come across a new technology service or company, I like to look at their job postings becuase it gives me an idea of what they're using to make it. The job posting is also a pretty good indication of the overall competence of the company. More often than not, the janky horrific service has been offshored. Things we have to use and don't really have a choice like health insurance websites. I'm not saying that people simply living in certain places in the world are somehow less capable of producing quality work. But you get what you pay for and usually the cheapest labor comes from developing countries. In general I think this is good and fine actually. That gives someone else an opportunity to compete and deliver a higher quality product.

The fact that an otherwise untechnical sales rep can "vibe code" up some abomination of a prototype is fine! It's good even. We can iterate. If that person then tries to launch and sell that product without understanding how it works, well then I say good luck. This is not a new problem. Shoddy engineering is shoddy engineering. Plain and simple.

## Is code a form of art?

I think this is the same debate about craftsmanship vs trades. Generally speaking, we don't really craft things anymore. Things are still crafted, but they're reserved for premium prices and services. Clothing used to be tailor made. Then, during the Civil War out of necessity, standard clothing sizes were introduced, because we needed uniforms to be made at a scale that hadn't really been seen before. Today, clothing is made at an incomprehenisble global scale. Here's a quote from [Carter's recent post](https://carter.works/blog/2026-04-07-im-enjoying-having-opinions/):

> [Temu's] parent company, Zoetop, produces 1.2 million articles of clothing _a day_.

Is it still possible to get tailor made clothing? Yep! Maybe you should! But the vast majority of clothing is _not_ tailor made. There are also a lot less kids running around that can't afford clothing than there was during the Civil War.

I think software development _can_ be a form of art. But if you're hired to work in a mass garment factory and you wake up each day to make _art_, it's probably not going to work out super well for you long term. Carter calls himself a "code plumber". I've viewed most software development as the modern day factory/blue collar job for a long time. We're not code to craft works of art. We build products that are marketed and sold almost exclusively for profit. Engineering means working within constraints. Time and money are the two ever present constraints. If you feel like you go work for an S&P 500 and you're coding up works of art, I'd really like to hear more about that because I think you're going to be in for a reckoning sooner than later. Imagine if a paint contractor working on the newest mass scale subdivision project thought of themselves as an artist. I hope they go home and pump out some Bob Ross landscapes! 

This is why personal projects are more important now than ever. This is why you should have a digital garden. If you believe code is a form of art and you are sad you don't get to make as much art as you'd like, do it at home! I understand work is exhausting and the last thing you want to do after a frustrating day is _more code_. Separate it mentally! For me, AI tools help me care a little less about my trade and a little more about my art.

We do things at home because at home they can be perfect. At home, our constraints are time and interest, not money. Your blog post doesn't need to increase revenue. You don't have to write yourself a performance review to justify spending 18 hours optimizing the semantic HTML of your website. If you don't care about code as a form of art, that's fine too! Put your energy where you feel like putting it.

<hr>

Have a burning question you'd like to ask me? Shoot me an email.

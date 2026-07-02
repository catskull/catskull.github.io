---
title: A Kanban of My Own
tags: [productivity, kanban, ohnoban]
date: 2026-07-02 14:04:34 -0600
layout: post
---
**TL;DR - I built my own kanban and [you can play with it](https://catskull.net/ohnoban).**

About two years ago [I wrote about how I use 3x5 index cards for productivity](/index-card-productivity.html). It was a lot of words about basically saying I use a little paper to write down a daily todo list and save the cards in an archive. I also designed a neat little monthly calendar to print out on a 3x5 card and keep on my desk. I still use that daily.

Soon after, [I designed a daily bullet journal to be printed on the back of my calendar card](/index-card-journaling.html). I still use that daily as well. Just a few words about my day. Some times it's simply "work".

Since then, I [resigned from my job](/resigning.html), [spent 6 months substitute teaching public school](/a-few-thoughts-about-teaching-school.html), and got a new web development job. My daily productivity workflow needed to change to adapt to the new workplace. Before, I was mostly working independently on fewer long-term projects. Now, I'm daily collaborating and iterating with a small team. Put simply, I have my fingers in more pies now.

I never had any formal project management training or education. I mostly just learned on the job and adapted to whatever system was in place, not feeling a need to give it a name. However, in retrospect I now realize that by far the most productive times of my career have been when I was able to work off a pure kanban board. A pile of work "to do" is very motivating to me. I love the principles of kanban, as I understand them. Only do one thing at a time. It's not done until it's merged and deployed. Back then it was trello. It was simple and worked very well. Later we moved to more formal planning sessions, "groomings", and pre-assigned issues which still worked okay but felt limiting to me. I'd rather explore the question "What _could_ I get done?" than "What do I _have_ to get done?". It feels like a carrot versus a stick.

The issue for me is the project management software we ~~choose~~ are forced to use. I won't name names, but it labels itself as "Software to replace all software", which not only violates the [Unix philosophy of "do one thing and do it well"](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well) but is also an affront to my very morality. I can promise you that this "everything software" truly does _nothing_ well. Not one thing. It is extremely slow. I actually just timed it and it takes _15 full seconds_ to load our current sprint. It is extremely limiting to my workflow. I hate it.

The rest of my team feels less passionately than I do on this subject, and honestly I'm happy to yield my personal feelings in the spirit of cooperation. It's more important to me to get along with people that are doing things well enough than to seek absolute perfection in every preference I have. Honestly, I use Safari and I'd be willing to bet the experience is much better in Chrome but I'm just not going to use Chrome, sorry. I'll work around slow loading times.

For the last few months at The Bullpen Inc., we've been very interested in pure kanban. We've had a lot of discussions about productivity workflows. This dovetails with the current zeitgeist around "AI fatigue" which seems to me to largely be caused by trying to do too much at once. There's a real temptation to spin up 20 agents working on different things all at once. Perhaps that works for some people, but I'm just not smart enough for that. I can do a single thing at once, or perhaps 1.5 things poorly. It doesn't really matter what tools I use. I [truly believe that AI tools have not introduced any fundamentally "new" problems in software development.](/re-opinions-about-vibe-coding.html) It was entirely possible 10 years ago to try to do 20 things at once, get totally overwhelmed, and flame out hard. Maybe the temptation is new, maybe the productivity hype is new, but the fundamental issue is not new.

Sam in particular seems to be very concerned with two questions: "What am I doing right now?" and "What should I be doing right now?". The harder those two questions are to answer, the more hopeless your situation becomes. If your goal is to get things done, things need to be as easy to do as they possibly can be. We can still do very hard, complicated, and long things by breaking them down into very small actionable items. "Rome wasn't built in a day." This is where a system like kanban truly shines for me. Individual things queued up that can be done one at a time in a sane and orderly manner.

While I can't force my team to become kanban zealots, I can supplant my team workflow with a kanban of my own. Ideally, something that doesn't take 15 seconds to answer either of those questions.

I looked around at some basic kanban software a bit. The simpler the better. Please no sparkle emojis. Nothing that's going to send me marketing emails. Nothing that is going to change the UI every 3 months. I'm by no means an expert on the current kanban software landscape, but I wasn't able to find anything that scratched my itch. So I did what any bad engineer does - I built it myself.

I call it "ohnoban". It's fun to say. I named it after Taiichi Ohno, the absolute GOAT and Toyota engineer who developed the kanban process. I truly believe this innovation is what made Toyota into the global powerhouse it still is. It's just _the best_. Kanban is practically my religion. The tenets are so simple, a bit restrictive, but empower so much great work to happen.

My kanban only has four columns: backlog, doing, done, and archive. Backlog is almost not used at all other than keeping a personal list of things I probably won't ever do. When I pick up a new ticket at work, I make a card in "doing" that links to the work system, any notes I need, and eventually a link to the pull request. "Done" is usually empty. It doesn't mean the work is totally done, it just means I'm done with it for now. For example, if something is waiting on a code review, I will put it in "done" while waiting. Once the code is merged and deployed, I move it to "archive". When I'm working fast, I might have a few things in "done" and a single thing in "doing", but if there's a lot of back and forth things might juggle around quite a bit. That's okay, for me.

Technically, I took a minimal approach. I could probably talk more about things it _does not_ do than things it does do. There is absolutely no cloud storage at all. It's all local to the browser. There is no collaboration. I can't share my board with you. There's no way for you to leave a comment for me. It's entirely offline, private, personal. There's no sparkle emoji. There are no analytics.

I believe that modern web browsers are the most complicated and high quality software that has ever been created and I want to lean on them as much as I possibly can. I hate installing node modules. I don't want to run a build pipeline. It should just be as plain as possible. Turns out, in 2026, you can actually build a functional kanban without installing 18 CVEs. It only has a single dependency, [Marked.js](https://github.com/markedjs/marked) which is downloaded to the repo and included as a regular JS asset. No bundle, no pack, no bloat. I like markdown and it works very well for what I need. There's no wysiwyg, it's just a textbox you can type markdown into. Turns out, I love the blind speed of raw text after having to fight with the latency every wysiwyg has. It just gets out of my way! It's fully keyboard navigable. Everything is stored in local storage, which isn't great, but it also works quite well. I did build in a JSON export/import but don't really use it. Yes, this means that from one device to another I can't track my work. But I only really use it for my job so syncing across devices hasn't been something I've cared about. I have some fun ideas about using webauthn and passkeys to encrypt the board data to store in the cloud, but I just haven't been chuffed to deal with it.

Since my initial MVP, I've added surprisingly little. I felt like I wanted tags, so I added them. I wanted a timestamp for when I create and update cards. I wanted to add a background image. The biggest feature I've added is a simple notes section. Functionally it's exactly the same as a card - a title, a body, and tags. Just the UI is more "notes" style.

I keep the app pinned to my dock so it renders kind of like it's own app, which is pretty slick. It's been about two months since I built it and I use it every day to track my work. I feel like the proof is in the pudding: I currently have 53 cards in the "archived" column which represents quite literally every single thing I've done at work (and a few at home) in that time.

Compared with someone's crafted Obsidian vault with every life data possibly imaginable, it's hilariously lacking. Compared to a 3x5 notecard with that day's to do list, it's quite nice for me. Sure, there are many like it, but this one is mine.

It's a kanban of my own.

{% include figure.html
	src="/assets/images/posts/a-kanban-of-my-own/ohnoban.jpg"
	alt="ohnoban screenshot"
	caption="ohnoban"
%}

Further reading:
- {% include external_link.html href="https://samwarnick.com/blog/kombating-fatigue-with-kanban/" text="Sam Warnick - Kombating Fatigue With Kanban" %}
- {% include external_link.html href="https://www.lucasfcosta.com/blog/scrum-versus-kanban" text="Lucas F. Costa - You don't need Scrum. You just need to do Kanban right." %}
- {% include external_link.html href="https://en.wikipedia.org/wiki/Kanban" text="Wikipedia - Kanban" %}
- {% include external_link.html href="https://en.wikipedia.org/wiki/Taiichi_Ohno" text="Wikipedia - Taiichi Ohno" %}


---
title: Thoughts on Debugging
tags: [engineering, software development, debugging, programming, web development, quick]
date: 2024-09-23 14:59:29 -0600
layout: post
---

I was recently asked to help resolve an escalation at work. It had already bounced around between a few people, and was very muddied with conflicting reports not to mention frustration that the issue existed in the first place. Apparently I am insane, because I like situations like this.

I don't mean that I like they they exist, but I like getting involved, because I'm good at debugging. I've been being paid to write code professionally for at least the last 10 years, of which at least 5 of them I've had any idea what I was doing. I've never taken a college level computer science course. But I've learned a thing or two about engineering in the last few years.

Debugging is a very strange skill to develop. It requires a certain intuitive distrust in all technological systems, developed over the course of continually observing engineering decisions that make you question the fabric of reality. It requires excellent written and verbal communication, and the ability to focus on the facts at hand instead of emotions, which typically also run high especially in high profile or otherwise intense debugging sessions.

I prefer to debug and coordinate asynchronously, others prefer to huddle. I've seen both be effective and I think both are worth trying out if the other approach doesn't seem to be working. On especially complex issues, it's important to get the right people "in a room" together. The Right People are the people who need to be in communication with one another to resolve the issue. This could be software or support engineers, integrations specialists, managers, or possibly even architect-level software generalists depending on the rest of the team's ability to communicate and debug.

Debugging skills are not difficult to practice, but they are counter intuitive to learn and easy to be relegated. It seems like Engineers like to Engineer, and debugging _usually_ doesn't result in very much Software Engineering. In _all_ of the most complicated debugging situations I have seen, the solution is _always_ a single line, config issue, or misunderstanding about expected and actual functionality.

Here's my one simple rule for debugging:

_Reproduce the issue._

That's the only thing, really. There are a lot of barriers to this. This is the antithesis to "it works on my machine". Debugging is answering the question "why?".

Magic exists, but I've never seen any in software. Problems are logical. Nothing is impossible. You _can_ solve this problem. You just need to _reproduce the issue_. Reproducing the issue should be the team's number 1 priority. The issue must be reproduced _exactly_, not just symptoms of the same behavior.

If two symptoms exist and they are equally pressing, both should be investigated independently until it can be confirmed that the issues are identical. What exactly an "independent investigation" looks like will vary. It could include you noting two _different_ items on your to-do list. Or, it could be two entire teams doing full blown investigations. I've seen too many times that issues were assumed to be related which did nothing but make each issue harder to investigate.

Logging is important in debugging situations, hopefully you or a team member is extremely proficient in your logging software. If you don't love your logging system, proactively fix that problem. Ideally a team member will be able to monitor the logs real-time while the reproduction procedures are taking place. If we can observe the patterns in the logs while reproducing the issue, then we can observe the patterns for the original instances of the issue.

Often the solution will naturally present itself in the course of debugging, usually by the time you're successfully reproducing the issue. It could be that by reproducing the problem, you are gaining the required knowledge to fix it. However I think there very few actually _hard_ problems and you're probably not smart and/or lucky enough to work on one. I'm not sure that I've ever worked on a hard problem, at least not for work. We're mostly just shoveling mud around in various forms with various amounts of efficiency.

But mud isn't that bad really, it feels kind of nice and you can build some cool things.

After you find and resolve the issue, it's important to summarize and recap what you've done. This is probably best in the original reporting mechanism (bug ticket), but if the issue is on the radar of people that aren't involved, know about the issue, and has decision making power in your compensation, you need to let them know what you did. A good manager should do this for you, assuming you provide a summary for your manager. I've seen too many times someone's role in a situation be misrepresented after the fact. It's like telling your boss "Look at my mud thing" and they say "What mud thing?". Now you wasted a bunch of time for nothing.

Finally a word of caution to those junior engineers among us:

_There is no such thing as a favor in business._



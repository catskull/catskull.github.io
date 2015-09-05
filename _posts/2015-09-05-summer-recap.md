---
layout: post
title:  "Summer Recap"
date:   2015-09-05
categories: general
---

School is back in session, so I thought I'd take a minute to recap this last summer. I've blogged about a lot of my projects, but not everything.

We started the summer off with a trip to Mount Rushmore. For some unknown reason, I've always wanted to go there. The baby would be due in less than a month, so we decided to get out of dodge for a while and take a little trip. South Dakota is a cool 10 hour drive from our house in Provo. It was a little scary driving through remote Wyoming with a wife that pregnant, but thankfully we were okay. Mount Rushmore was pretty cool, I guess. It's kind of smaller in real life than you'd think. The pictures I saw of it made it seem like the entire mountain is carved out, but really it's just the very top. Still, the mountain is much bigger than I expected it to be, so it was still massive. I didn't reflect on America or anything, because Mount Rushmore is kind of one of those "WTF?" things we Americans seem to like. There's no reason for it's existence. On the way home, we stopped by Devil's Tower which was... important. That was actually super cool. It's just this huge pillar thing in the middle of nowhere, super random. Really mysterious in a way, and really neat.

![Mount Rushmore](http://i.imgur.com/bRGeUOO.png)

After that, I started an internship working for Digi International, which I've mentioned in other posts. I'm actually still working there during the school year, just in reduced hours. I really like it! See my post on the poop-o-meter for more details.

A few weeks after that, on May 25, our son Wolfgang was born. It was an incredible experience to go through, and it's incredible every day! We love him so much and he's a really good little boy with a unique personality. He was 9 lbs 3 oz and 22 in long. 3 months in and he's up to like 17 lbs now, so he's really a gaint! I would recommend everyone have a baby of their own!

![Me and my boy playing streets of rage](http://i.imgur.com/qYs9Je3.png)

From there, we went into survival mode. Well not really survival, but just kind of the grind. I found it harder and harder to find time to work on side projects, getting maybe an hour every night if I was lucky. Not that that's a bad thing in my mind.

At one point I started playing with an arduino TFT screen my friend Ultifinitus sent me. Digging the library for that screen, I found some of the worst code I've ever seen. I think I'll try to make a separate post about that at some point. The idea was to make a cell phone built inside an original Gameboy shell, with the original buttons being used to control the phone's UI. I got as far as drawing a grid for a keyboard, and getting text to display in a landscape orientation on the screen. That was really only about one day of work. I would be surprised if I ever touch it again, just because it would be a HUGE time sink for just a novelty project. It would also be close to $100 in parts, and there's other things I need to buy (like diapers).

![LCD](http://i.imgur.com/vS2lqX2.png)

I also worked on the poop-o-meter on and off through the summer, but there's a whole seperate post on that.

I bought an A/V Famicom for optimum 8-bit Nintendo goodness. I've had a copy of Lagrange Point for a while now so I wanted to do an eprom swap to make it English. I also blogged about a lot of those ventures, but it was cool to get burning some eproms and learning about that. One thing I didn't write about was building a cynthcart for my Commodore 64. There's not really a ton there, but it was cool to do!

![A/V Famicom](http://i.imgur.com/dc0xyba.png)

At some point, Digi held a "hackathon" (seperate from the intern challenge I made the poop-o-meter for). The idea was for employees to take an existing Digi product and improve on it in some way. A few of the engineers I work with as well as some of the other interns teamed up to make a database for xbee AT commands. If you're not familiar, you can communicate with xbee by sending AT commands over RS-232. For example, I read a radio's baud rate by sending it "ATBD" and it would return what it's currently set at. The problem is that a lot of the commands vary from product to product and sometimes documentation gets out of sync. We wanted to build the database that would be easy for developers to update as they changed different parameters. All we really needed was a proof of concept. Having web development experience, I was assigned to work on the back end. It would be an api we could hit with a url that would return a bunch of data in the form of json. Form there the front end would be able to display and sort it all pretty like. I decided to use node.js since it would be so easy to connect it to an SQL database, format the data, and then return it as json. It was really incredibly easy. The hard part is populating the data for the database. Luckily some other team members handled that for me. I ended up getting a mockup of the front end working as well, using a bootstrap template. In the end, we were the only team that presented and as a reward for "winning" we were each given $100 to Amazon. Being a selfish cuss, I bought a Hakko FX-888D soldering station that was right at $100. I absolutely love it! So that was really cool.

![Hakko FX-888D](http://i.imgur.com/0buwjuK.png)

Towards the end of the summer, I decided to finally break down and figure out how to use Eagle well enough to design a PCB and get it produced. I've wanted to make a simple Arduinoboy board for a long time, with the goal of getting it as cheap as possible as a kit, then charging more to assemble it. Someone else did all the hard work of designing and writing the code, so I feel bad profiting off of it. I justify that by selling the bare kit for as close to cost as possible, and my time is my time so selling that is totally okay for me to do. Anyways, I got the board designed and sent off to OSH Park. When it finally came back, I assembled everything and it didn't work! I have absolutely no clue why, my only guess is that the MIDI hardware I'm using with it with just isn't up to par. I'd like to get someone with known good hardware to try it for me. I found an open source board design, so I've sent off for some of those just so I can verify that it is indeed my hardware and not my design that is the problem. I'll probably make another post about that if I ever get it working.

![Arduinoboy](http://i.imgur.com/DfSdG3t.png)

Really other than that, I spend a lot of time making messes, cleaning them up, watching TV with my wife, and helping out with the baby. It was a great summer and I'm pretty sad to be back in school. I wish my hobbies could support my family so I could just do that all the time! Oh well.

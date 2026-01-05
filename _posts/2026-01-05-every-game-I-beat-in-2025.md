---
title: Every Game I Beat in 2025
tags: [meta, games]
layout: post
---

I've always played video games. Growing up, I think that was our primary form of childcare when my mom was busy doing other things. I have fond memories of playing on our computer in Windows 98 for hours on end during long summer vacation days. In 2024 I decided to start writing down all the games I beat as I beat them, and then at the end of the year I made a [big list of all of them for this blog]({% post_url 2025-01-03-games-i-played-in-2024 %}). That took a lot of time, so in 2025 I started writing them down as I played them along with a little mini review. This made my life now much easier and simpler!

I'm really excited to share what I've been up to gaming-wise over the last year with you! I'm proud to announce that I "beat" **{{ site.data.games.twenty-five | size }}** games this year! Note that when I say "beat", I mean that I got to the credits scroll. In some games, this takes a long time. Others, a credits screen means you've just barely scratched the surface, so no two entries on this list are created equally.

I'd also love to point out that I also stream a decent majority of these games on my YouTube channel! Most of the time I have no viewers, just me and the stream. A lot of times my brother at least lurks. But occasionally random internet strangers show up to make fun of my skills! It really evokes my favorite gaming memories as a child. Gathering around a random TV in the neighborhood and watching and offering tips to the one kid who was actually playing. I stream mostly just for my posterity, so if I want to remember how a game was I can just go back and look at it myself. It would mean a lot if you checked out the channel and dropped a subscription so you can hang out the next time I'm playing something! My channel is [@dareelcatskull](https://www.youtube.com/@dareelcatskull).

Let's go!

{% for game in site.data.games.twenty-five %}
<h3 id="{{game.title | slugify }}"># <a href="#{{game.title | slugify}}">{{game.title}}</a></h3>
{{ game.platform }} [{{game.year}}] | {{ game.developer }} | {{ game.publisher }} 
{% include external_link.html href=game.wiki text="wiki" %}
{% include figure.html src=game.image %}
{{ game.date }}

{{ game.text }}
{% endfor %}

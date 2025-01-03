---
title: Games I played in 2024
tags: [meta, games]
date: 2025-01-03 10:51:29 -0700
layout: post
---
I claim to not play very many video games, but apparently that is not true because I not only played some games last year, but beat **{{ site.data.games.twenty-four | size }}** of them! When I say "beat", I mean I got to a credits screen. I did not complete any of these games. I also put significant time into a few games that I did not beat for whatever reason; hopefully they make it onto a future list!

{% for game in site.data.games.twenty-four %}
### {{game.title}}
{{ game.platform }} [{{game.year}}] | {{ game.developer }} | {{ game.publisher }} 
{% include external_link.html href=game.wiki text="wiki" %}
{% include figure.html src=game.image %}
{{ game.date }}

{{ game.text }}
{% endfor %}

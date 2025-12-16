---
title: Every Game I Beat in 2025
tags: [meta, games]
layout: post
---

Total games: **{{ site.data.games.twenty-five | size }}**

{% for game in site.data.games.twenty-five %}
### {{game.title}}
{{ game.platform }} [{{game.year}}] | {{ game.developer }} | {{ game.publisher }} 
{% include external_link.html href=game.wiki text="wiki" %}
{% include figure.html src=game.image %}
{{ game.date }}

{{ game.text }}
{% endfor %}

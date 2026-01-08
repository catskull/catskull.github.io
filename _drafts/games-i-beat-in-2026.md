---
title: Every Game I Beat in 2026
tags: [meta, games]
layout: post
---
Games beat: **{{ site.data.games.twenty-six | size | minus: 1}}**

{% for game in site.data.games.twenty-six %}
<h3 id="{{game.title | slugify }}"># <a href="#{{game.title | slugify}}">{{game.title}}</a></h3>
{{ game.platform }} [{{game.year}}] | {{ game.developer }} | {{ game.publisher }} 
{% include external_link.html href=game.wiki text="wiki" %}
{% include figure.html src=game.image %}
{{ game.date }}

{{ game.text }}
{% endfor %}

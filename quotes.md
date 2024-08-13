---
layout: default
title: quotes - catskull.net
---
{% include topnav.html %}

These are various quotes, adages, laws, idioms, sayings, and other things that I have found particular insights into the nature of human existence. In some ways, this is a collection of rules I try to live by. I am writing them down here so I don't forget, and hopefully might inspire others to do the same.

# quotes

<section id="quotes">
  {% for quote in site.data.quotes %}
  <blockquote cite="{{quote.cite}}">
    <p>{{quote.quote}}</p>
  </blockquote>
  <p>{{quote.author}}{% if quote.cite and quote.source %}, <cite><a target="_blank" href="{{quote.cite}}">{{quote.source}}↗</a></cite>{% endif %}</p>
  {% endfor %}
</section>


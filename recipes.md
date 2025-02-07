---
layout: default
title: recipes - catskull.net
---
{% include topnav.html %}

I absolutely hated cooking until a few years ago. The problem is I'm too lazy to care about food - I'll just starve for 18 hours then eat an entire pacakge of lunch meat and call it a meal. But having a family changes things and they very much appreciate a meal and I really enjoy cooking for them.

It's important to document who we are – including what we eat. Here's some recipes I come back to from time to time. Exprimentation is encouraged.

{% for recipe in site.recipes %}
  <h2>
    <a href="{{ recipe.url }}">
      {{ recipe.name }}
    </a>
  </h2>
  <p>{{recipe.description}}</p>
{% endfor %}

---
layout: default
title: tags - catskull.net
---
{% include topnav.html %}

# tags

{% assign all_tags = "" %}
{% for post in site.posts %}
  {% for tag in post.tags %}
    {% assign all_tags = all_tags | append: tag | append: "|" %}
  {% endfor %}
{% endfor %}
{% assign sorted_tags = all_tags | split: "|" | uniq | sort_natural %}

<p>{{ sorted_tags | join: ", " }}</p>

{% include footer.html %}

---
layout: default
title: clouds - catskull.net
---
{% include topnav.html %}

{% assign image_files = site.static_files | where: "extname", ".avif" %}
{% for image in image_files %}
  {% if image.path contains '/assets/images/clouds/' %}
![{{ image.basename }}]({{ image.path | relative_url }})
  {% endif %}
{% endfor %}

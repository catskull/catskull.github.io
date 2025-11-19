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

<hr class="final">
<div style="text-align:center;">
  <page-likes confetti></page-likes>
</div>
<page-replies open default="https://catskull.net/public/images/outlook_express-4.png"></page-replies>

{% include footer.html %}

<script src="https://catskull.net/public/js/components/replies.js"></script>
<script src="https://catskull.net/public/js/components/likes.js"></script>

---
layout: default
title: projects - catskull.net
---
{% include topnav.html %}

# projects

{% assign sorted_projects = site.data.projects | sort: 'date' %}
{% for p in sorted_projects reversed %}
<section class="projects-section" id="{{ p.title | slugify }}">
	<h2><a href="#{{ p.title | slugify }}">{{ p.title }}</a></h2>
	<a href="{{ p.hyperlink }}">{{ p.hyperlink }}</a>
	<p class="era-tag">{{ p.era }} (circa)</p>
	<p class="status-tag {{ p.status }}">
	<svg height="8px" width="8px" {% if p.status == 'active' %}class="blinking"{% endif %}>
	  <circle cx="4px" cy="4px" r="2.8px" fill="{% if p.status == 'active' or p.status == 'completed'%}green{% elsif p.status == 'defunct' %}red{% else %}orange{% endif %}" />
	  Sorry, your browser does not support inline SVG.
	</svg>
    {{ p.status }}
	</p>
	<p>{{ p.meta }}</p>
	<div class="img-frame">
		<img src="{{ p.image }}">
	</div>
</section>
{% endfor %}

<footer style="float: right;">
  <a href="/">{{ site.theme_config.back_home_text }}</a>
</footer>

<hr class="final">
<div style="text-align:center;">
  <page-likes></page-likes>
</div>
<page-replies open default="https://catskull.net/public/images/outlook_express-4.png"></page-replies>

<footer style="float: right;">
  {% unless page.collection == "newsletters" %}{% include random.html %}{% endunless %}
  <a href="/newsletter">newsletter</a><sup><mark>(new)</mark></sup>
  <a href="/">{{ site.theme_config.back_home_text }}</a>
</footer>

<script src="https://catskull.net/public/js/components/replies.js"></script>
<script src="https://catskull.net/public/js/components/likes.js"></script>

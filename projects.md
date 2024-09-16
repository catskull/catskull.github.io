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

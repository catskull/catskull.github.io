---
layout: default
title: projects - catskull.net
---
<a href="/">{{ site.theme_config.back_home_text }}</a>

# projects

{% for p in site.projects reversed %}
<section class="projects-section">
	<h2>{{ p.title }}</h2>
	<a href="{{ p.hyperlink }}">{{ p.hyperlink }}</a>
	<p class="era-tag">{{ p.era }} (circa)</p>
	<p class="status-tag {{ p.status }}">
    <svg height="0.5rem" width="0.5rem" {% if p.status == 'active' %}class="blinking"{% endif %}>
      <circle cx="0.25rem" cy="0.25rem" r="0.175rem" fill="{% if p.status == 'active' or p.status == 'completed'%}green{% elsif p.status == 'defunct' %}red{% else %}yellow{% endif %}" />
      Sorry, your browser does not support inline SVG.
    </svg>
    {{ p.status }}
	</p>
	<p>{{ p.meta }}</p>
	<div class="img-frame">
		<img src="{{ p.image }}">
	</div>
</section>
<hr>
{% endfor %}
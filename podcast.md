---
layout: default
title: interrobang - catskull.net
---
{% include topnav.html %}

# Interrobang with Dave DeGraw

I love a good conversation. I've never met someone I didn't like and I didn't find interesting. "Interrobang" is me inquiring others about their passions, to see the world from their perspective. Let's have fun!

[Want to be my guest?](mailto:bro@catskull.net?subject=Interrobang)


## Episodes

[feed](/podcasts/feed.xml)

<a href="https://podcasts.apple.com/us/podcast/interrobang-with-dave-degraw/id1821937590?itscg=30200&itsct=podcast_box_badge&ls=1&mttnsubad=1821937590" style="display: inline-block;">
<img src="https://toolbox.marketingtools.apple.com/api/v2/badges/listen-on-apple-podcasts/badge/en-us" alt="Listen on Apple Podcasts" style="width: 258px; height: 82px; vertical-align: middle; object-fit: contain;" />
</a>
    

<ul id="index-list">
{% for podcast in site.podcasts reversed %}
	{% unless podcast.name == 'feed.xml' %}
	{% assign index = site.podcasts.size | minus: forloop.index | plus: 1 %}
	{% capture url %}episode-{{ index }}-{{ podcast.title | slugify }}{% endcapture %}
	<li class="index-list-item">
		<time datetime="{{ podcast.date | date: '%Y-%m-%dT%H:%M:%SZ' }}">{{ podcast.date | date: site.theme_config.date_format }}</time>
		<h3 id="{{ url }}" class="index-list-title"><a href="#{{ url }}">{{ index }}: {{ podcast.title }}</a>{% if podcast.explicit %}🅴{% endif %}</h3>
		<p>{{ podcast.content }}</p>
		audio:
		<br>
		<audio controls src="https://media.catskull.net{{ podcast.media }}"></audio>
	</li>
	{% endunless %}
{% endfor %}
</ul>

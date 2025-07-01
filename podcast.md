---
layout: default
title: interrobang - catskull.net
---
{% include topnav.html %}

# Interrobang with Dave DeGraw

> The interrobang ‽ is an unconventional punctuation mark intended to combine the functions of the question mark (also known as the interrogative point) and the exclamation mark (also known in the jargon of printers and programmers as a "bang"). The glyph is a ligature of these two marks and was first proposed in 1962 by Martin K. Speckter
> - [Wikipedia](https://en.wikipedia.org/wiki/Interrobang)

I love a good conversation. I've never met someone I didn't like and I didn't find interesting. "Interrobang" is me inquiring others about their passions, to see the world from their perspective. Let's have fun!

People I would like to talk to:
{% assign people = "Barack Obama, David Crank - Production Designer, Alfred Matthew 'Weird Al' Yankovic, Bronzson, Nate, Colton, Tony Hawk, Steve Meretzky, Michael Levin, Bruce Hornsby" | split: ", " | sort %}
{% for person in people %}
- {{ person }}
{% endfor %}
- [you?](mailto:bro@catskull.net?subject=Interrobang)


## Episodes

[feed](/podcasts/feed.xml)

<a href="https://podcasts.apple.com/us/podcast/interrobang-with-dave-degraw/id1821937590?itscg=30200&itsct=podcast_box_badge&ls=1&mttnsubad=1821937590" style="display: inline-block;">
<img src="https://toolbox.marketingtools.apple.com/api/v2/badges/listen-on-apple-podcasts/badge/en-us" alt="Listen on Apple Podcasts" style="width: 258px; height: 82px; vertical-align: middle; object-fit: contain;" />
</a>
    

<ul id="index-list">
{% for podcast in site.podcasts reversed %}
	{% unless podcast.name == 'feed.xml' %}
	{% assign index = site.podcasts.size | minus: forloop.index | plus: 1 %}
	{% capture url %}
	episode-{{ index }}-{{ podcast.title | slugify }}
	{% endcapture %}
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

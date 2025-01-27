---
layout: default
title: notes - catskull.net
---
{% include topnav.html %}

Here's random links and my short thoughts about them. Mostly for my own reference but you're welcome to them.

# notes

<section id="notes">
  {% for note in site.data.notes %}
  <article>
  	<time>{{note.date}}</time> 
	  <p>{{note.note}}</p>
	  {% include external_link.html href=note.link text=note.link %}
	</article>
	<hr>
  {% endfor %}
</section>

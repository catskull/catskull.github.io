---
layout: default
title: bookshelf - catskull.net
---
{% include topnav.html %}

# bookshelf

A log of books I've read.

{% if site.data.books %}
{% assign years = site.data.books | sort: "date" | reverse | group_by_exp: "book", "book.date | date: '%Y'" %}
<section id="bookshelf">
{% for year in years %}
<h2 id="{{ year.name }}">{{ year.name }}</h2>
{% for book in year.items %}
{% assign slug = book.title | slugify %}
<h3 id="{{ slug }}"># <a href="#{{ slug }}">{{ book.title }}</a></h3>
<p>{{ book.author }} [{{ book.published }}]{% if book.wiki %} | {% include external_link.html href=book.wiki text="wiki" %}{% endif %}</p>
<p><time datetime="{{ book.date | date: '%Y-%m-%d' }}">{{ book.date | date: '%B %-d %Y' }}</time></p>
{% if book.text %}
{{ book.text | markdownify }}
{% endif %}
{% endfor %}
{% endfor %}
</section>
{% else %}
Nothing logged yet.
{% endif %}

<hr class="final">
<div style="text-align:center;">
  <page-likes confetti></page-likes>
</div>
<page-replies open default="https://catskull.net/public/images/outlook_express-4.png"></page-replies>

{% include footer.html %}

<script src="https://catskull.net/public/js/components/replies.js"></script>
<script src="https://catskull.net/public/js/components/likes.js"></script>

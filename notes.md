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

<hr class="final">
<div style="text-align:center;">
  <page-likes></page-likes>
</div>
<page-replies open default="https://catskull.net/public/images/outlook_express-4.png"></page-replies>

{% include footer.html %}

<script src="https://catskull.net/public/js/components/replies.js"></script>
<script src="https://catskull.net/public/js/components/likes.js"></script>

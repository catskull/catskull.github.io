---
layout: default
title: quotes - catskull.net
---
{% include topnav.html %}

# bookshelf

<section id="bookshelf">
  <ul>
    {% for book in site.data.books %}
      <li class="book-item">
        <h3 class="book-title">{{ book.title }} {% if book.wiki %}<a href="{{book.wiki}}" target="_blank">↗</a>{% endif %}</h3>
        <p class="book-author">{{ book.author }} (<time datetime="{{ book.published }}">{{ book.published }}</time>)</p>
      </li>
    {% endfor %}
  </ul>
</section>

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

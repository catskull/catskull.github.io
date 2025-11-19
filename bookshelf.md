---
layout: default
title: bookshelf - catskull.net
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
  <page-likes confetti></page-likes>
</div>
<page-replies open default="https://catskull.net/public/images/outlook_express-4.png"></page-replies>

{% include footer.html %}

<script src="https://catskull.net/public/js/components/replies.js"></script>
<script src="http://localhost:8000/likes.js?true=false"></script>

---
layout: default
title: feeds - catskull.net
---
{% include topnav.html %}

# feeds

<style>
.feed {
  height: 600px;
  border: 1px solid;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.feed h3 {
  margin: 0;
  flex-shrink: 0;
  padding-left: 3px;
  border-bottom: 2px solid;
}

.feed-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
}

.feed-content p {
  margin: 0;
}

.feeds {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  max-width: none;
  width: auto;
  padding: 1rem;
}
</style>

<section id="feeds">
    <div class="feeds">
      {% for feed in site.data.feeds %}
        <div class="feed">
            <h3><a href="{{ feed.link }}" target="_blank">{{ feed.name }}↗</a></h3>
            <div class="feed-content">
                <rss-feed count="999" url="{{ feed.url }}"></rss-feed>
            </div>
        </div>
      {% endfor %}
    </div>
</section>

<script src="https://catskull.net/public/js/components/rss-feed.js" async></script>

---
layout: default
title: wiki - catskull.net
---
{% include topnav.html %}

# wiki

I use this to keep track of wikipedia articles I find interesting. This page needs more work, but this suffices for now.

{% assign wikis = site.data.wiki | sort: 'created' | reverse %}
{% for wiki in wikis %}
## [{{ wiki.title }}](#{{wiki.title | slugify}}) {#{{wiki.title | slugify}}}
{{ wiki.description }}
{% if wiki.image_url %}
![{{wiki.title}}]({{wiki.image_url}})
{% endif %}
{{ wiki.extract }}
{% include external_link.html href=wiki.url text="Wikipedia" %} ‽⸘ <small>{{ wiki.created | date: "%-m/%-d/%y" }}</small>
<hr>
{% endfor %}

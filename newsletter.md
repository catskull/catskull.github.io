---
layout: default
title: newsletter - catskull.net
---
{% include topnav.html %}

I started a newsletter to keep track of my activity over a longer period. If you like the content on this website and want to know when there's something new to check out, [sign up](mailto:bro@catskull.net?subject=Sign%20me%20up%20for%20your%20newsletter&amp;body=Sign%20me%20up!%0D%0A%0D%0AThanks)!


## Archive

{% for newsletter in site.newsletters %}
- [{{ newsletter.created | date: site.theme_config.date_format }}: {{ newsletter.title }}]({{ newsletter.url }})
{% endfor %}

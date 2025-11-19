---
layout: default
title: playlist archive - master list - catskull.net
permalink: /playlist/archive/master-list/
---
<header>
	<nav>
		<a href="/">catskull.net</a> / <a href="/playlist">playlist</a> / <a href="/playlist/archive/">archive</a> / master list
	</nav>
</header>

[CSV](/playlist/archive/master-list.csv) (right-click "Save As...")

{% assign index = 1 %}
{% assign playlistcount = 0 %}

{% capture content %}
<table class="monospace">
	<thead>
		<tr>
			<th>The Master List</th>
		</tr>
	</thead>
	<tbody>
{% for year in site.data.playlists %}
	{% assign playlistids = "" | split: "" %}
	{% assign playlists = site.data.playlists[year.first] %}
	{% for playlist in playlists %}
		{% assign playlistid = playlist.first | to_integer %}
		{% assign playlistids = playlistids | push: playlistid | sort %}
	{% endfor %}
	{% for id in playlistids %}
	{% assign idstring = id | append: "" %}
		{% for song in site.data.playlists[year.first][idstring] %}
			<tr>
				<td>
					{{ index }}. {{ song["Artist"] }} - "{{ song["Name"] }}" <a href="/playlist/archive/{{ year.first }}/{{ idstring }}">↗</a>
				</td>
			</tr>
			{% assign index = index | plus: 1 %}
		{% endfor %}
		{% assign playlistcount = playlistcount | plus: 1 %}
	{% endfor %}
{% endfor %}
	</tbody>
</table>
{% endcapture %}

Total songs: {{ index | minus: 1 }}
<br>
Total playlists: {{ playlistcount }}

{{ content }}

<hr class="final">
<div style="text-align:center;">
  <page-likes confetti></page-likes>
</div>
<page-replies open default="https://catskull.net/public/images/outlook_express-4.png"></page-replies>

{% include footer.html %}

<script src="https://catskull.net/public/js/components/replies.js"></script>
<script src="https://catskull.net/public/js/components/likes.js"></script>

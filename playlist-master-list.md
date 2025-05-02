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

[CSV](/playlist/archive/master-list.csv)

{% assign index = 1 %}
{% assign songs = "" | split: "" %}

<table class="monospace">
	<thead>
		<tr>
			<th>The Master List</th>
		</tr>
	</thead>
	<tbody>
{% for year in site.data.playlists %}
	{% assign size = site.data.playlists[year.first].size %}
	{% for i in (1..size) %}
		{% assign istring = i | append: "" %}
		{% assign songs = site.data.playlists[year.first][istring] %}
		{% for song in songs %}
		<tr>
			<td>
				{{ index }}. {{ song["Artist"] }} - "{{ song["Name"] }}"
			</td>
		</tr>
		{% assign index = index | plus: 1 %}
		{% endfor %}
	{% endfor %}
{% endfor %}
	</tbody>
</table>



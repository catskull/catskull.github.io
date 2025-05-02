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
					{{ index }}. {{ song["Artist"] }} - "{{ song["Name"] }}"
				</td>
			</tr>
			{% assign index = index | plus: 1 %}
		{% endfor %}
	{% endfor %}
{% endfor %}
	</tbody>
</table>

---
layout: default
title: playlist - catskull.net
---
{% include topnav.html %}

I've been doing a weekly playlist with a few friends for a few years now. I'd like to share them with you. Come back each week for a fresh playlist, or hit the archive to see past playlists.

{% assign year = site.data.playlist_meta.first.first %}
{% assign week = site.data.playlist_meta.first.last.first.first %}
{% assign yearstring = year | append: "" %}
{% assign weekstring = week | append: "" %}
{% assign songs = site.data.playlists[yearstring][weekstring] %}
{% assign meta = site.data.playlist_meta[year][week] %}
{% capture apple_url %}https://music.apple.com/us/playlist/{{ meta.apple }}{% endcapture %}
{% capture spotify_url %}https://open.spotify.com/playlist/{{ meta.spotify }}{% endcapture %}

<table class="monospace">
	<thead>
		<tr>
			<th>{{year}} / Week {{week}}</th>
		</tr>
	</thead>
{% for song in songs %}
	<tr>
		<td>
			{{ forloop.index }}. {{ song["Artist"] }} - "{{ song["Name"] }}"
		</td>
	</tr>
{% endfor %}
	<tfoot>
		<tr>
			<td><b>NOTE:</b> {{meta.notes}}</td>
		</tr>
		<tr>
			<th>{% include external_link.html href=apple_url text=" Music" %} | {% include external_link.html href=spotify_url text="Spotify" %}</th>
		</tr>
	</tfoot>
</table>

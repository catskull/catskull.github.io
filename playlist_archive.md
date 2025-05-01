---
layout: default
title: playlist archive - catskull.net
permalink: /playlist/archive/
---
<header>
	<nav>
		<a href="/">catskull.net</a> / <a href="/playlist">playlist</a> / archive
	</nav>
</header>

Non-exhaustive. See {% include external_link.html href="https://open.spotify.com/user/31xmbux3qst7zwosj7xgc4qrl47e?si=0465a2e74838448e" text="Danny's Spotify profile" %} or {% include external_link.html href="https://music.apple.com/profile/gizzheaddotorg" text="my Apple Music profile" %} for the ones I haven't imported here yet.

{% assign playlists = site.playlists | group_by_exp: "playlist", "playlist.path | split: '/' | slice: 1, 1 | first" %}

{% for year in playlists %}
<h2>{{year.name}}</h2>
<ul>
	{% for playlist in year.items %}
		<li>
			<a href="{{playlist.url}}">Week {{playlist.title}}</a>
		</li>
	{% endfor %}
</ul>
{% endfor %}

---
layout: default
title: playlist - catskull.net
---
{% include topnav.html %}

I've been doing a weekly playlist with a few friends for a few years now. I'd like to share them with you. Come back each week for a fresh playlist, or hit the [archive](/playlist/archive/) to see past playlists.

{% assign year = site.playlists | group_by_exp: "playlist", "playlist.path | split: '/' | slice: 1, 1 | first" | last %}
{% assign playlists = year.items | sort: "slug" %}
{% assign playlist = playlists.last %}
{% assign id = playlist.path | split: "/" %}
{% assign year = id[1] %}
{% assign week = id[2] | split: "." | first %}
{% assign songs = site.data.playlists[year][week] %}

{% include playlist.html apple=playlist.apple spotify=playlist.spotify songs=songs year=year week=week notes=playlist.notes %}

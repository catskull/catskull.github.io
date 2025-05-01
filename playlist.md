---
layout: default
title: playlist - catskull.net
---
{% include topnav.html %}

I've been doing a weekly playlist with a few friends for a few years now. I'd like to share them with you. Come back each week for a fresh playlist, or hit the [archive](/playlist/archive/) to see past playlists.

{% assign id = site.playlists.last.path | split: "/" %}
{% assign yearstring = id[1] %}
{% assign weekstring = id[2] | split: "." | first %}
{% assign year = yearstring | plus: 0 %}
{% assign week = weekstring | plus: 0 %}
{% assign songs = site.data.playlists[yearstring][weekstring] %}

{% include playlist.html apple=site.playlists.last.apple spotify=site.playlists.last.spotify songs=songs year=year week=week notes=site.playlists.last.notes %}

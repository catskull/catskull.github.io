---
title: Using TSV data with Jekyll
tags: [web, jekyll, html, liquid, programming, music, playlist]
date: 2025-05-01 16:22:51 -0600
layout: post
---

I recently added a new page to my website: [/playlist](/playlist). I have been kicking the idea around for some time, unsure of the best path forward for both archival reasons and ease of access (actually listening to the music). A custom web component that you feed an M3U playlist that does all the web audio streaming magic? I decided to tackle the most pressing problem first - data retrieval and archival. In other words: how do we get the song data, and how can we display it? Thankfully, Apple Music has some built-in methods for exporting a playlist! It can do XML, but it ignores the track ordering as far as I could tell. It claims to be able to do an M3U, but that resulted in an empty file for me. Finally, plain text to the rescue! Except... it's not plain text, it's a hidden tab-separated value (TSV[^2]) file! Does that count as plain text?

{% capture compiled_preview %}
{%comment%}
```TSV
Name	Artist	Composer	Album	Grouping	Work	Movement Number	Movement Count	Movement Name	Genre	Size	Time	Disc Number	Disc Count	Track Number	Track Count	Year	Date Modified	Date Added	Bit Rate	Sample Rate	Volume Adjustment	Kind	Equalizer	Comments	Plays	Last Played	Skips	Last Skipped	My Rating	Location
All Your Hiding	Moonrisers	Elizabeth Ann Nowicki	Harsh & Exciting						Instrumental	7126978	172	1	1	3	10		4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:13 PM			
So Hot You're Hurting My Feelings	Squirrel Flower		Take It or Leave It / So Hot You're Hurting My Feelings - Single						Alternative	7475706	209	1	1	2	2	2020	12/1/23, 2:16 PM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:17 PM			
Here's Your Song	Fatal Flowers	Fatal Flowers	Fatal Flowers / Younger Days						Pop	6362459	176	1	1	16	16	1986	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:20 PM			
Barbarian Kings	Morgan Delt		Morgan Delt						Indie Pop	8453329	233	1	1	2	11	2014	4/24/25, 6:29 PM		256	44100		Apple Music AAC audio file			3	4/30/25, 12:23 PM			
Should've Been a Cowboy	Toby Keith	Toby Keith	Should've Been a Cowboy (25th Anniversary Edition)						Country	8108461	209	1	1	1	13	1993	4/26/25, 3:22 PM	4/26/25, 3:22 PM	256	44100		Apple Music AAC audio file			4	4/30/25, 12:27 PM			
A Horse with No Name	America	Dewey Bunnell	Made in America						Rock	9612543	252	1	1	1	22	1971	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			2	4/30/25, 12:31 PM			
On the Road	Rattlesnake Milk	SEAN LEWIS	Chicken Fried Snake						Americana	8035663	219	1	1	1	9	2022	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:35 PM			
Bei Mir Bist Du Schoen	Charley Crockett	Sholom Secunda	A Stolen Jewel						Blues	6146267	166	1	1	13	13	2015	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:38 PM			
Hi Dee Dee	Ty Segall	Ty Segall	Three Bells						Alternative	6918311	191	1	1	4	15	2024	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:41 PM			
Her Eyes Are a Blue Million Miles	Captain Beefheart & His Magic Band	Captain Beefheart	Clear Spot						Rock	6281232	177	1	1	10	12	1972	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:44 PM			
King Of The Road	Roger Miller	Roger Miller	Golden Hits						Country	5339317	147	1	1	1	11	1965	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:46 PM			
Touch Me I'm Sick	Mudhoney	Mudhoney, Steve Turner, Dan Peters, Mark McLaughlin & Matt Lukin	Superfuzz Bigmuff (Deluxe Edition)						Alternative	5568110	152	1	2	1	17	1988	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:49 PM			
Thick As a Brick (Edit No. 1)	Jethro Tull	Ian Anderson	The Best of Acoustic Jethro Tull (Remastered)						Rock	7427506	182	1	1	6	24	2001	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:52 PM			
Steam Powered Aereo Plane	John Hartford	John Hartford	Aereo-Plain						Singer/Songwriter	8838764	223	1	1	11	16	1971	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 12:56 PM			
The Landkeeper	Men I Trust	Jessy Caron, Emmanuelle Proulx & Dragos Chiriac	Equus Asinus						Folk	8179625	224	1	1	6	14	2025	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 1:04 PM			
Con Te Partiro	Andrea Bocelli	Francesco Sartori	Bocelli						Pop	8895872	250	1	1	1	10	1995	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 1:08 PM			
Pyramid of Health	Viagra Boys	Sebastian Murphy, Henrik Höckert, Tor Sjödén, Elias Jungqvist, Oskar Carls, Linus Hillborg & Pelle Gunnerfeldt	viagr aboys						Punk	7095223	195	1	1	4	11	2025	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 1:12 PM			
Thruck Diebes	YYARD	Yannis Anft	Pattern Gardening						House	14223591	389	1	1	9	22	2025	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 1:18 PM			
So Hot You're Hurting My Feelings	Caroline Polachek	Caroline Polachek, Daniel Nigro & Teddy Geiger	Pang						Indie Pop	6656021	183	1	1	12		2019	4/30/25, 8:52 AM		256	44100		Apple Music AAC audio file			1	4/30/25, 1:21 PM			
```
{%endcomment%}
<div class="highlight highlight-source-generic-db"><pre><span class="pl-c1">Name</span>	<span class="pl-c1">Artist</span>	<span class="pl-c1">Composer</span>	<span class="pl-c1">Album</span>	<span class="pl-c1">Grouping</span>	<span class="pl-c1">Work</span>	<span class="pl-c1">Movement Number</span>	<span class="pl-c1">Movement Count</span>	<span class="pl-c1">Movement Name</span>	<span class="pl-c1">Genre</span>	<span class="pl-c1">Size</span>	<span class="pl-c1">Time</span>	<span class="pl-c1">Disc Number</span>	<span class="pl-c1">Disc Count</span>	<span class="pl-c1">Track Number</span>	<span class="pl-c1">Track Count</span>	<span class="pl-c1">Year</span>	<span class="pl-c1">Date Modified</span>	<span class="pl-c1">Date Added</span>	<span class="pl-c1">Bit Rate</span>	<span class="pl-c1">Sample Rate</span>	<span class="pl-c1">Volume Adjustment</span>	<span class="pl-c1">Kind</span>	<span class="pl-c1">Equalizer</span>	<span class="pl-c1">Comments</span>	<span class="pl-c1">Plays</span>	<span class="pl-c1">Last Played</span>	<span class="pl-c1">Skips</span>	<span class="pl-c1">Last Skipped</span>	<span class="pl-c1">My Rating</span>	<span class="pl-c1">Location</span>
<span class="pl-c1">All Your Hiding</span>	<span class="pl-c1">Moonrisers</span>	<span class="pl-c1">Elizabeth Ann Nowicki</span>	<span class="pl-c1">Harsh &amp; Exciting</span>						<span class="pl-c1">Instrumental</span>	<span class="pl-c1">7126978</span>	<span class="pl-c1">172</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">3</span>	<span class="pl-c1">10</span>		<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">13 PM</span>			
<span class="pl-c1">So Hot You're Hurting My Feelings</span>	<span class="pl-c1">Squirrel Flower</span>		<span class="pl-c1">Take It or Leave It / So Hot You're Hurting My Feelings - Single</span>						<span class="pl-c1">Alternative</span>	<span class="pl-c1">7475706</span>	<span class="pl-c1">209</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">2</span>	<span class="pl-c1">2</span>	<span class="pl-c1">2020</span>	<span class="pl-c1">12/1/23, 2</span>:<span class="pl-c1">16 PM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">17 PM</span>			
<span class="pl-c1">Here's Your Song</span>	<span class="pl-c1">Fatal Flowers</span>	<span class="pl-c1">Fatal Flowers</span>	<span class="pl-c1">Fatal Flowers / Younger Days</span>						<span class="pl-c1">Pop</span>	<span class="pl-c1">6362459</span>	<span class="pl-c1">176</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">16</span>	<span class="pl-c1">16</span>	<span class="pl-c1">1986</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">20 PM</span>			
<span class="pl-c1">Barbarian Kings</span>	<span class="pl-c1">Morgan Delt</span>		<span class="pl-c1">Morgan Delt</span>						<span class="pl-c1">Indie Pop</span>	<span class="pl-c1">8453329</span>	<span class="pl-c1">233</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">2</span>	<span class="pl-c1">11</span>	<span class="pl-c1">2014</span>	<span class="pl-c1">4/24/25, 6</span>:<span class="pl-c1">29 PM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">3</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">23 PM</span>			
<span class="pl-c1">Should've Been a Cowboy</span>	<span class="pl-c1">Toby Keith</span>	<span class="pl-c1">Toby Keith</span>	<span class="pl-c1">Should've Been a Cowboy (25th Anniversary Edition)</span>						<span class="pl-c1">Country</span>	<span class="pl-c1">8108461</span>	<span class="pl-c1">209</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">13</span>	<span class="pl-c1">1993</span>	<span class="pl-c1">4/26/25, 3</span>:<span class="pl-c1">22 PM</span>	<span class="pl-c1">4/26/25, 3</span>:<span class="pl-c1">22 PM</span>	<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">4</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">27 PM</span>			
<span class="pl-c1">A Horse with No Name</span>	<span class="pl-c1">America</span>	<span class="pl-c1">Dewey Bunnell</span>	<span class="pl-c1">Made in America</span>						<span class="pl-c1">Rock</span>	<span class="pl-c1">9612543</span>	<span class="pl-c1">252</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">22</span>	<span class="pl-c1">1971</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">2</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">31 PM</span>			
<span class="pl-c1">On the Road</span>	<span class="pl-c1">Rattlesnake Milk</span>	<span class="pl-c1">SEAN LEWIS</span>	<span class="pl-c1">Chicken Fried Snake</span>						<span class="pl-c1">Americana</span>	<span class="pl-c1">8035663</span>	<span class="pl-c1">219</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">9</span>	<span class="pl-c1">2022</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">35 PM</span>			
<span class="pl-c1">Bei Mir Bist Du Schoen</span>	<span class="pl-c1">Charley Crockett</span>	<span class="pl-c1">Sholom Secunda</span>	<span class="pl-c1">A Stolen Jewel</span>						<span class="pl-c1">Blues</span>	<span class="pl-c1">6146267</span>	<span class="pl-c1">166</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">13</span>	<span class="pl-c1">13</span>	<span class="pl-c1">2015</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">38 PM</span>			
<span class="pl-c1">Hi Dee Dee</span>	<span class="pl-c1">Ty Segall</span>	<span class="pl-c1">Ty Segall</span>	<span class="pl-c1">Three Bells</span>						<span class="pl-c1">Alternative</span>	<span class="pl-c1">6918311</span>	<span class="pl-c1">191</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">4</span>	<span class="pl-c1">15</span>	<span class="pl-c1">2024</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">41 PM</span>			
<span class="pl-c1">Her Eyes Are a Blue Million Miles</span>	<span class="pl-c1">Captain Beefheart &amp; His Magic Band</span>	<span class="pl-c1">Captain Beefheart</span>	<span class="pl-c1">Clear Spot</span>						<span class="pl-c1">Rock</span>	<span class="pl-c1">6281232</span>	<span class="pl-c1">177</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">10</span>	<span class="pl-c1">12</span>	<span class="pl-c1">1972</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">44 PM</span>			
<span class="pl-c1">King Of The Road</span>	<span class="pl-c1">Roger Miller</span>	<span class="pl-c1">Roger Miller</span>	<span class="pl-c1">Golden Hits</span>						<span class="pl-c1">Country</span>	<span class="pl-c1">5339317</span>	<span class="pl-c1">147</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">11</span>	<span class="pl-c1">1965</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">46 PM</span>			
<span class="pl-c1">Touch Me I'm Sick</span>	<span class="pl-c1">Mudhoney</span>	<span class="pl-c1">Mudhoney, Steve Turner, Dan Peters, Mark McLaughlin &amp; Matt Lukin</span>	<span class="pl-c1">Superfuzz Bigmuff (Deluxe Edition)</span>						<span class="pl-c1">Alternative</span>	<span class="pl-c1">5568110</span>	<span class="pl-c1">152</span>	<span class="pl-c1">1</span>	<span class="pl-c1">2</span>	<span class="pl-c1">1</span>	<span class="pl-c1">17</span>	<span class="pl-c1">1988</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">49 PM</span>			
<span class="pl-c1">Thick As a Brick (Edit No. 1)</span>	<span class="pl-c1">Jethro Tull</span>	<span class="pl-c1">Ian Anderson</span>	<span class="pl-c1">The Best of Acoustic Jethro Tull (Remastered)</span>						<span class="pl-c1">Rock</span>	<span class="pl-c1">7427506</span>	<span class="pl-c1">182</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">6</span>	<span class="pl-c1">24</span>	<span class="pl-c1">2001</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">52 PM</span>			
<span class="pl-c1">Steam Powered Aereo Plane</span>	<span class="pl-c1">John Hartford</span>	<span class="pl-c1">John Hartford</span>	<span class="pl-c1">Aereo-Plain</span>						<span class="pl-c1">Singer/Songwriter</span>	<span class="pl-c1">8838764</span>	<span class="pl-c1">223</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">11</span>	<span class="pl-c1">16</span>	<span class="pl-c1">1971</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 12</span>:<span class="pl-c1">56 PM</span>			
<span class="pl-c1">The Landkeeper</span>	<span class="pl-c1">Men I Trust</span>	<span class="pl-c1">Jessy Caron, Emmanuelle Proulx &amp; Dragos Chiriac</span>	<span class="pl-c1">Equus Asinus</span>						<span class="pl-c1">Folk</span>	<span class="pl-c1">8179625</span>	<span class="pl-c1">224</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">6</span>	<span class="pl-c1">14</span>	<span class="pl-c1">2025</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 1</span>:<span class="pl-c1">04 PM</span>			
<span class="pl-c1">Con Te Partiro</span>	<span class="pl-c1">Andrea Bocelli</span>	<span class="pl-c1">Francesco Sartori</span>	<span class="pl-c1">Bocelli</span>						<span class="pl-c1">Pop</span>	<span class="pl-c1">8895872</span>	<span class="pl-c1">250</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">10</span>	<span class="pl-c1">1995</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 1</span>:<span class="pl-c1">08 PM</span>			
<span class="pl-c1">Pyramid of Health</span>	<span class="pl-c1">Viagra Boys</span>	<span class="pl-c1">Sebastian Murphy, Henrik Höckert, Tor Sjödén, Elias Jungqvist, Oskar Carls, Linus Hillborg &amp; Pelle Gunnerfeldt</span>	<span class="pl-c1">viagr&nbsp;aboys</span>						<span class="pl-c1">Punk</span>	<span class="pl-c1">7095223</span>	<span class="pl-c1">195</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">4</span>	<span class="pl-c1">11</span>	<span class="pl-c1">2025</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 1</span>:<span class="pl-c1">12 PM</span>			
<span class="pl-c1">Thruck Diebes</span>	<span class="pl-c1">YYARD</span>	<span class="pl-c1">Yannis Anft</span>	<span class="pl-c1">Pattern Gardening</span>						<span class="pl-c1">House</span>	<span class="pl-c1">14223591</span>	<span class="pl-c1">389</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">9</span>	<span class="pl-c1">22</span>	<span class="pl-c1">2025</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 1</span>:<span class="pl-c1">18 PM</span>			
<span class="pl-c1">So Hot You're Hurting My Feelings</span>	<span class="pl-c1">Caroline Polachek</span>	<span class="pl-c1">Caroline Polachek, Daniel Nigro &amp; Teddy Geiger</span>	<span class="pl-c1">Pang</span>						<span class="pl-c1">Indie Pop</span>	<span class="pl-c1">6656021</span>	<span class="pl-c1">183</span>	<span class="pl-c1">1</span>	<span class="pl-c1">1</span>	<span class="pl-c1">12</span>		<span class="pl-c1">2019</span>	<span class="pl-c1">4/30/25, 8</span>:<span class="pl-c1">52 AM</span>		<span class="pl-c1">256</span>	<span class="pl-c1">44100</span>		<span class="pl-c1">Apple Music AAC audio file</span>			<span class="pl-c1">1</span>	<span class="pl-c1">4/30/25, 1</span>:<span class="pl-c1">21 PM</span>			</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="Playlist.tsv"
%}

It turns out, Jekyll has the native ability to work with TSV files[^1]. Nice! There's even a pretty nice blog post to show you how to get started (with a CSV at least)[^3]. However, in Jekyll, so-called "Data Files" are unique from regular posts. They're just raw YAML, JSON, CSV, or TSV data. You are expected to import and use the data on individual pages. The data files are not rendered to anything directly[^5]. A good example of (another) place I make use of data files is my [/about](/about) page, which is just a bunch of tables organized by a single `.yml` file[^4].

There is a similar construct in Jekyll called the `collection`[^7]. However, a collection is more like a fancy category of pages. In fact, the default `_posts` and `_drafts` directories are actually just collections under the hood. So a custom collection allows you to have a custom directory, such as `_playlists`. A collection, like a page, is designed to be rendered to an HTML file.

Possibly the most straightforward approach would be to write some kind of TSV to YAML converter and store all the song and playlist data in the collection item itself. But that just sounded bad to me, not very fun. Plus, we have super clean and high-quality TSV data from Apple, and Jekyll can read them natively, and I really just did not want to deal with it. I think of the TSV files as the gold source of truth and leaving those clean and as-is will be useful down the road.

Leaving the TSV's clean and as-is meant that I also couldn't easily _add_ my own metadata. Maybe some playlists I want to include a little note for? I also want to include the Apple Music and Spotify playlist IDs for easy linking. I also need something for Jekyll to render.

What I settled on was a joint approach. The easiest way to illustrate is to examine the file structure:

{% capture compiled_preview %}
{%comment%}
```bash
_data/playlists
└── 2025
    ├── 7.tsv
    ├── 8.tsv
    └── 9.tsv
_playlists
└── 2025
    ├── 7.md
    ├── 8.md
    └── 9.md
```
{%endcomment%}
<div class="highlight highlight-source-shell"><pre>_data/playlists
└── 2025
    ├── 7.tsv
    ├── 8.tsv
    └── 9.tsv
_playlists
└── 2025
    ├── 7.md
    ├── 8.md
    └── 9.md</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="catskull.net/"
%}

Each TSV playlist file has an accompanying playlist markdown file inside the `_playlists` collection. As we discussed before, the TSV files contain the data directly from Apple Music as-is, which Jekyll will helpfully process into a hash for us. The markdown file contains optional front-matter for my own metadata such as the notes and IDs I mentioned before. An example markdown file with front matter might look like:

{% capture compiled_preview %}
{%comment%}
```yml
---
notes: A note about the playlist.
apple: 2025-week-17/pl.u-gxblYeJs3lYDvk
spotify: 6uz3rlHSLGW8R4TVO2o8T8
---
```
{%endcomment%}
<div class="highlight highlight-source-yaml"><pre>---
<span class="pl-ent">notes</span>: <span class="pl-s">A note about the playlist.</span>
<span class="pl-ent">apple</span>: <span class="pl-s">2025-week-17/pl.u-gxblYeJs3lYDvk</span>
<span class="pl-ent">spotify</span>: <span class="pl-s">6uz3rlHSLGW8R4TVO2o8T8</span>
---</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="_playlists/2025/9.md"
%}

However, most playlist markdown files are empty since the front matter is optional and I'm too lazy to go take the time to go fill it out for all the old playlists.

Note that the only thing that "links" a playlist markdown file to a playlist TSV file is the naming convention. There may have been a way to link to the specific playlist with a variable in front matter, but it for sure would require me to at least type a few extra characters and I'm literally too lazy. So a nice naming and file structure convention fits the bill quite nicely for me!

Inside of my liquid template, I can find the correct data for the current markdown file by parsing out some of the current file's information:

{% capture compiled_preview %}
{%comment%}
```liquid
<!-- page.path: "_playlists/2025/17.md" -->
{% assign id = page.path | split: "/" %}
{% assign year = id[1] %}
{% assign week = id[2] | split: "." | first %}
{% assign songs = site.data.playlists[year][week] %}
```
{%endcomment%}
{% raw %}
<div class="highlight highlight-text-html-liquid"><pre><span class="pl-c"><span class="pl-c">&lt;!--</span> page.path: "_playlists/2025/17.md" <span class="pl-c">--&gt;</span></span>
{% <span class="pl-ent">assign</span> <span class="pl-smi">id</span> = <span class="pl-c1">page</span>.<span class="pl-smi">path</span> | <span class="pl-c1">split:</span> <span class="pl-s">"/"</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">year</span> = <span class="pl-smi">id</span>[1] %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">week</span> = <span class="pl-smi">id</span>[2] | <span class="pl-c1">split:</span> <span class="pl-s">"."</span> | <span class="pl-c1">first</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">songs</span> = <span class="pl-smi">site</span>.<span class="pl-smi">data</span>.<span class="pl-smi">playlists</span>[year][<span class="pl-smi">week</span>] %}</pre></div>
{% endraw %}
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="_layouts/playlist.html"
%}

At this point, `songs` is an array of hashes with all our glorious song data!

I went an extra step and made my playlist UI it's own Jekyll include. See my previous post about Jekyll includes as re-usable components[^6] for more information on motivation and implementation details there. The full source of my playlist "component" (and everything else on this site) is available on GitHub[^8].

I wanted to have a dedicated [/playlist](/playlist) page in addition to the usual index. In fact, that's the primary interface into the data. You can dig deeper into the "[archive](/playlist/archive)", but I wanted my fancy playlist partial to render in both places cleanly. Because I'd done the work to break out the playlist into a partial, it's as simple as grabbing a few data points. I had to do some tricky logic to sort all my posts by year and get the most recent one, but I think it's working.

{% capture compiled_preview %}
{%comment%}
```liquid
{% assign year = site.playlists | group_by_exp: "playlist", "playlist.path | split: '/' | slice: 1, 1 | first" | last %}
{% assign playlists = year.items | sort: "slug" %}
{% assign playlist = playlists.last %}
{% assign id = playlist.path | split: "/" %}
{% assign year = id[1] %}
{% assign week = id[2] | split: "." | first %}
{% assign songs = site.data.playlists[year][week] %}
```
{%endcomment%}
{% raw %}
<div class="highlight highlight-text-html-liquid"><pre><span class="pl-c"><span class="pl-c">&lt;!--</span> get the most recent playlist <span class="pl-c">--&gt;</span></span>
{% <span class="pl-ent">assign</span> <span class="pl-smi">year</span> = <span class="pl-smi">site</span>.<span class="pl-smi">playlists</span> | <span class="pl-c1">group_by_exp:</span> <span class="pl-s">"playlist"</span>, <span class="pl-s">"playlist.path | split: '/' | slice: 1, 1 | first"</span> | <span class="pl-c1">last</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">playlists</span> = <span class="pl-smi">year</span>.<span class="pl-smi">items</span> | <span class="pl-c1">sort:</span> <span class="pl-s">"slug"</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">playlist</span> = <span class="pl-smi">playlists</span>.<span class="pl-smi">last</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">id</span> = <span class="pl-smi">playlist</span>.<span class="pl-smi">path</span> | <span class="pl-c1">split:</span> <span class="pl-s">"/"</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">year</span> = <span class="pl-smi">id</span>[1] %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">week</span> = <span class="pl-smi">id</span>[2] | <span class="pl-c1">split:</span> <span class="pl-s">"."</span> | <span class="pl-c1">first</span> %}
{% <span class="pl-ent">assign</span> <span class="pl-smi">songs</span> = <span class="pl-smi">site</span>.<span class="pl-smi">data</span>.<span class="pl-smi">playlists</span>[year][<span class="pl-smi">week</span>] %}</pre></div>
{% endraw %}
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="playlist_archive.md"
%}

Once I have a reference to the collection item (either the current `page`, or the `playlist` variable above), I can simply render my partial:

{% capture compiled_preview %}
{%comment%}
```liquid
{% include playlist.html apple=playlist.apple spotify=playlist.spotify songs=songs year=year week=week notes=playlist.notes %}
```
{%endcomment%}
{% raw %}
<div class="highlight highlight-text-html-liquid"><pre>{% <span class="pl-ent">include</span> <span class="pl-smi">playlist</span>.<span class="pl-smi">html</span> <span class="pl-smi">apple</span>=<span class="pl-smi">playlist</span>.<span class="pl-smi">apple</span> <span class="pl-smi">spotify</span>=<span class="pl-smi">playlist</span>.<span class="pl-smi">spotify</span> <span class="pl-smi">songs</span>=<span class="pl-smi">songs</span> <span class="pl-smi">year</span>=<span class="pl-smi">year</span> <span class="pl-smi">week</span>=<span class="pl-smi">week</span> <span class="pl-smi">notes</span>=<span class="pl-smi">playlist</span>.<span class="pl-smi">notes</span> %}</pre></div>
{% endraw %}
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="Use anywhere!"
%}

Adding new playlists consists of exporting the TSV from Apple Music, and then `touch`ing the markdown file (and adding notes manually). I'd really like to get rid of that last step, needing the markdown file at all - but like I outlined above, I want to keep the Apple Music TSV "pristine" and keep my personal metadata in it's own place.

The two-pronged approach to using raw Jekyll data files, in conjunction with a Jekyll collection are what make this work. Following the same naming convention for both file types allows me to programmatically generate pages for each playlist data file. I'm sure there will be future iterations here, but for now I'm pretty happy to finally scratch this one off the to-do list!


[^1]: [https://jekyllrb.com/docs/datafiles](https://jekyllrb.com/docs/datafiles)
[^2]: [https://en.wikipedia.org/wiki/Tab-separated_values](https://en.wikipedia.org/wiki/Tab-separated_values)
[^3]: [https://jekyllrb.com/tutorials/csv-to-table/](https://jekyllrb.com/tutorials/csv-to-table/)
[^4]: [https://github.com/catskull/catskull.github.io/blob/master/_data/about.yml](https://github.com/catskull/catskull.github.io/blob/master/_data/about.yml)
[^5]: There may be a way to dynamically render data files, but I couldn't figure out how.
[^6]: [https://catskull.net/jekyll-components.html](https://catskull.net/jekyll-components.html)
[^7]: [https://jekyllrb.com/docs/collections/](https://jekyllrb.com/docs/collections/)
[^8]: [https://github.com/catskull/catskull.github.io/blob/master/_includes/playlist.html](https://github.com/catskull/catskull.github.io/blob/master/_includes/playlist.html)

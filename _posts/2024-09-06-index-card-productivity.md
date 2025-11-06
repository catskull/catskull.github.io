---
title: Index Card Productivity System
tags: [productivity, demo, tools, makes, 35PS]
date: 2024-09-06 05:31:39 -0600
layout: post
---

<style>
	#calendar {
		height: 20rem;
		min-height: 2.5in;
		width: 100%;
		min-width: 5in;
    margin: 0;
    padding: 0;
    table-layout: fixed;
	}

	#calendar thead tr td, #calendar thead tr th {
		padding: 0 0.5rem;
	}

	#calendar thead tr th {
		font-weight: bolder;
	}

	#calendar thead {
		border-bottom: 2px solid;
	}

	#calendar tbody tr td {
		vertical-align: top;
		padding: 0;
	}

	#calendar .box {
		border: 1px solid;
		width: 3ch;
		text-align: center;
		font-size: 9px;
		padding-left: 0;
		margin-left: -1px;
		margin-top: -1px;
		border-radius: 0 0 3px 0;
	}

@media print {
  @page {
    size: 3in 5in;
    margin: 0;
  }

  * {
    visibility: hidden;
    margin:0; padding:0;
  }

  #calendar, #calendar * {
    visibility: visible;
  }

  #calendar {
		position: absolute;
		top: 91px;
		left: 173px;
		page-break-inside: avoid;
		transform: rotate(90deg);
		height: 263px;
		width: 415px;
		margin: 0;
		padding: 0;
		min-height: unset;
		min-width: unset;
  }
}
</style>

<h1>Calendar for {{ 'now' | date: "%B %Y" }}</h1>

{% assign year = site.time | date: "%Y" | plus: 0 %}

{% assign divisible_by_4 = year | modulo: 4 %}
{% assign divisible_by_100 = year | modulo: 100 %}
{% assign divisible_by_400 = year | modulo: 400 %}
{% assign days_in_months = "31,28,31,30,31,30,31,31,30,31,30,31" | split: ',' %}
{% assign current_month = site.time | date: "%m" | plus: 0 %}
{% assign month_index = current_month | minus: 1 %}
{% assign days_this_month = days_in_months[month_index] %}
{% assign leap_year = false %}
{% if divisible_by_4 == 0 %}
  {% if divisible_by_100 == 0 %}
    {% if divisible_by_400 == 0 %}
      {% assign leap_year = true %}
    {% endif %}
  {% else %}
    {% assign leap_year = true %}
  {% endif %}
{% endif %}
{% if current_month == 2 and leap_year %}
	{% assign days_this_month = days_this_month | plus: 1 %}
{% endif %}
{% assign date_string = year | append: "-" | append: current_month | append: "-01" %}
{% assign first_day_of_month = date_string | date: "%w" %}
{% assign first_day_of_month_minus_one = first_day_of_month | minus: 1 %}

<table border="1" id="calendar">
  <thead>
  	<tr>
  		<td colspan="7">
  		{{ site.time | date: "%B %Y" }}
  		<span style="float: right;"><small>catskull.net</small></span>
  	</td>
  	</tr>
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    	{% assign first_day_of_month_minus_one = first_day_of_month | minus: 1 %}
      {% for day in (0..first_day_of_month_minus_one) %}
        <td></td>
      {% endfor %}
      {% assign day_counter = first_day_of_month %}
      {% for day in (1..days_this_month) %}
        <td><div class="box">{{ day }}</div></td>
        {% assign day_counter = day_counter | plus: 1 %}
        {% if day_counter == 7 %}
          </tr><tr>
          {% assign day_counter = 0 %}
        {% endif %}
      {% endfor %}
      {% if day_counter > 0 %}
        {% for empty_cells in (day_counter..6) %}
          <td></td>
        {% endfor %}
      {% endif %}
    </tr>
  </tbody>
</table>

I've been using a 3x5 blank white index card as my personal finance and productivity system for about the last year. I've always liked writing down to-do lists on paper and crossing them out one by one (some people prefer boxes you can check off). It's totally fluid, you can add and remove things at will. Often if I get distracted from my list but I do something I think could or should have been on there, I'll write it down and cross it off. It's a great reference. Something else I've learned is to add a date any time you make a list. I also cycle through different pens (I have a lot that I like) and the various ink types and colors also add to the sense of history and timeliness. Index cards also make great temporary surfaces for mixing glue, cutting, scooping, and countless other things. Not to mention they are cheap enough to be ubiquitous. They're just handy to have around!

{% include figure.html src="public/media/posts/calendar/stand.jpeg" alt="a photo of a 3x5 index card tray and stand sitting on a desk" caption="A small slot allows cards to be inserted vertically or horizontally. Turning them horizontally when I'm done reminds me of playing Yu-Gi-Oh!" %}

My friend [Sam](https://samwarnick.com){:target="_blank"} recommended an [index card holder off of Etsy](https://www.etsy.com/listing/977230268){:target="_blank"}. I keep it up on my desk shelf and I put my old to-do lists in it, for future reference. I'm not sure what the plan is when it fills up.

I usually write on the cards front and back. Having a few day's worth of notes on hand is like making my short-term memory 3x longer and my working memory twice as effective.

{% include figure.html src="public/media/posts/calendar/cardscan.jpg" alt="a scan of the front and back side of a 3x5 card, depicting various to-do items and other notes." caption="My current list. I tested out some white-out and red nail polish I got for labeling things." %}


I take a "shotgun blast" approach to work: I work on 8 things at the same time. If I didn't write them down, I'd just lose a good idea I'd like to explore later. Later also comes with the added perspective of your future self, you'll be smarter then and if it is a truly stupid idea you'll be that much more likely to notice. It's like multi-tasking on a computer. I can leave a task and come back to it later without losing context.

A simple list is also extremely effective at helping you get things done. I usually start my day with a hot shower where my brain fires rapidly and I like to "brain dump" on my note card. Maybe sometimes it happens on the toilet. I have full confidence I can revisit all my tangents.

I should note that this is exclusively a _personal_ productivity system. My note cards do not leave my office. Not because they can't, just because I only write things down on them that I can do in my office. For household tasks, I actually use Apple's To Do app on my phone.

Recently I felt like I wanted to have a calendar in my office. I don't know how to describe it but since I started working from home I have a hard time perceiving the days as they go by. What month is it? I heard that life is like a roll of toilet paper, the closer you get to the end, the faster it goes. A calendar would help me keep track of my months at a glance, hopefully extending my existing productivity system to a longer period of time. Perhaps I could clear out my old note pile each month in a neat recipe box!

Being so small, note cards can be hard to organize (just a few words per line). You can buy lined cards or graph cards but I wanted something permanent for my calendar. After finding out that not only is it possible to print on a 3x5 card with a laser printer (despite Reddit users profusely insisting it was not possible), but that I owned a laser printer with this capability that was not even being used. I've been itching to bring it up to the office for a while. Now it's here!

I don't know why, but Apple adds at least a 0.25" margin to anything it prints. Safari adds even more. When you only have 3 inches, 0.5" is a lot to spare! Don't ask me how I know. After a lot of trial and error, I eventually got CSS `@print` media queries working to the point that I could print it from Safari as an 8.5x11 and have it print very near the edges of the index card. In fact it happily prints off the edges. Is that bad for the printer? It can be a little tricky because the printer has some variability in the feed direction, it's not always square. But it's close enough!

{% include figure.html src="public/media/posts/calendar/cards.jpeg" alt="A stack of cards, depicting various iterations of a calendar with the final product sitting on top." caption="This feels unexpected!" %}

If you ctrl+p this page and have a Brother HL-L2370DW that feeds the index card directly in the middle of the page, then you can print your own calendars. If you know of a better way to print on a 3x5 card in software, you can submit a pull request to this page. You can also "Force print media styles" in Safari or similar dev tools.

Something about a tiny card with this much information density on it just tickles me. When I was a kid I'd ride along with my Grandpa on his farm and he'd have one of these little calendars on the dash. They give them for free at mechanical kinda stores as promotion, like a matchbox. I always loved looking at them, seeing the subtle but distinct variations in design, the different companies that they came from. At that young age, I think it gave me a sense of place, or permanence.

{% include figure.html src="public/media/posts/calendar/dashboard.jpg" alt="An artistic representation depicting a stick-and-peel calendar attached to the glove box of a vintage chevy truck with a beautiful sunset in the background." caption="Forensic recreation." %}

That truly was the inspiration behind this calendar. I would sit in his tractor for _hours_. Too loud to talk, not that I had much to say. But I'd stare at those calendars. He'd let me check off the days. When you're in the middle of nowhere, Southern Idaho, it can be hard to feel like you have a place. But coming back to that calendar each time, I was different. 

The calendar is just a basic HTML table, generated each time this site is regenerated. I could add tools to set the month/year, or you could, if you want that. But like... why would you want that? It's okay if you do!

PS -

Leap years... why?

---
title: Index Card Journaling System
tags: [productivity, demo, tools, makes, 35PS]
date: 2024-09-24 04:31:39 -0600
layout: post
---

<style>
	#calendar {
		height: 20rem;
		min-height: 5in;
		width: 3in;
		min-width: 3in;
    margin: 0;
    padding: 0;
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

  .top {
    border-bottom: none;
  }

  .bottom {
    border-top: 1px dashed rgba(0, 0, 0, 10%);
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

  small {
    font-size: x-small;
  }

  tbody td small {
    position: absolute;
    margin-left: 1px;
    font-size: xx-small;
    opacity: 50%;
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
		top: 0;
		left: 226px;
		page-break-inside: avoid;
		width: 263px;
		height: 415px;
		margin: 0;
		padding: 0;
		min-height: unset;
		min-width: unset;
  }
}
</style>

<h1>Journal for {{ 'now' | date: "%B %Y" }}</h1>

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
{% assign alpha_dates = "UMTWRFSU" | split: "" %}

<table border="1" id="calendar">
  <thead>
  	<tr>
  		<td colspan="7">
  		{{ "now" | date: "%B %Y" }}
  		<span style="float: right;"><small>catskull.net</small></span>
  	</td>
  	</tr>
  </thead>
  <tbody>
    {% for day in (1..days_this_month) %}
    {% assign date_string = year | append: "-" | append: current_month | append: "-" | append: day %}
    {% assign day_of_week = date_string | date: "%u" %}
    {% assign day_of_week_d = day_of_week | plus: 0 %}
    {% assign day_mod = day | modulo: 2 %}
      {% if day_mod == 1 %}<tr>{% endif %}
        <td class="top">
          <small>{{ alpha_dates[day_of_week_d] }}{{ date_string | date: "%d" }}</small>
        </td>
      {% if day_mod == 0 %}
        </tr>
        <tr><td class="bottom"></td><td class="bottom"></td></tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>

video here yt-lite

I've been exploring the concept of information communication effectiveness. A great video from David Malawey on YouTube titled "How labels multiply your knowledgebase, cash, time, on LOW effort." explores simple ways to "tend your workspace towards order". In it, he explores not only labeling items with text, but with simple colors and shapes. For example, if all the things go in a certain drawer, you can paint the things and the drawer blue so it's obvious the blue things go in the blue drawer. Add a red drawer full of red things, and it becomes even more obvious. The distinction doesn't even matter, it's completely arbitrary.

pic of taped label

He also explores altering and/or removing product labels in order to maintain the passive information we take in. This is something I have done passively. I tape over all brand names and product logos of everything in my office with black electrical tape. There are no logos visible anywhere. If there is a model number or name, I don't tape over that. I also tape over any annoying power LEDs. You can actually use a small chunk of black electrical tape as a webcam cover, it can be removed and replaced with little residue. Same goes for questionable microphone holes and most speakers/buzzers (but sometimes those require more aggressive terms).  Additionally, I use white vinyl tape and a sharpie to add my own labels. It adds a great flair of personalization and maintains a spartan utility, and it's not permanent.

pic 2

I've started documenting my equipment in the form of diagrams. This helps me have all the actual relevant product information such as name and model number without having to turn things over, pull things out, and generally disturb the peace. I'm iteratively going through my hardware, most recent was documenting each type of connector (USB-C, Type-A) and protocol (USB3, TB4) every cable uses. Next up is my power cables. I have a fairly complicated and compact desk setup so this has been a great way to know how I can replace or re-route something without pulling it all apart and losing my mind in the rats' nest.

Diagram

My primary note taking method is a 3.5" x 5.5" black notebook (dotted). I've been using this system for the past 2.5 years. I call it my "Thoughts + Ideas" book. I keep it in my office except special occasions, not because it can't come out but because this is where it stays. The only thing I do consistently is try to date any time I start writing. I usually makes lists, or notes of things I'm researching. Sometimes I'll sketch physical dimensions, sometimes outlines. Trace a coin for a Venn Diagram! This book is like a physical extension of my memory. Flipping through it's pages have a certain time and place to them, like a memory transport through time and space back to the person I was when I thought those thoughts. Some times I'm proud of them, some times I want to tear them out.

As I've been using my "3x5 Productivity System" and calendar, I've noticed that the pen and writing style have some kind of data encoded within them. I can recall choosing a pen, or color of ink, or how much time I spent on the writing itself. It adds to the sense of presence the writings have. Someone else might intuit that those nuances mean _something_ but I don't think they'd have the same meaning as they do to me. It's like an encoding, or physical encryption.

This led me to seek out the idea of "visual density" as it relates to document creation, and I stumbled on a great post from Matthew Ström which defines the term "UI Density". There are a lot of really eye-opening ideas in that post so I'd recommend you read the whole thing. It's from a software design perspective, but I believe that software is ultimately fancy documents, so I think all of the concepts are applicable to all forms of document design. He introduces the idea of "temporal density" - software with long loading times is "temporally dense".

Thought experiment:<br>
<mark>Q</mark>: When is the best time to present a user with some information?<br>
<mark>A</mark>: Exactly the moment the user needs the information.

It seems like the Human Species' greatest ability overall is to document and retell our history. We do this in the form of creating "artefacts" (sic). An artefact is anything that conveys information: a footprint, an echo, a published book, a photo, polluting the environment, building things. Our lives themselves are a living artefact of our ancestors. We cannot help but leaving behind a trail of artefacts, it's as inevitable as entropy. The mere fact that we are alive means that we will leave behind a body one day.

We cannot escape our artefacts. We _can_ chose to be deliberate about how we create our artefacts. What does this mean? It means observing the role your decisions play in the trail you leave behind. Do you leave behind smiles? Do you leave behind trash? If I collected everything you've ever left behind, how would you feel about it? How does that feeling inform your decisions from today on?

Most artefacts are temporal, momentary, or inconsequential. These on their own bear little meaning, but trends emerge which inform the secondary artefacts. The things we write down, the things people remember, the things you hang on the fridge. I'm not sure how artefacts interact with each other, but there is fractal-like pattern in which new artefacts incomprehensibly resemble past artefacts.

These artefacts are the letters in the book of your life. They are in a shared history, known or unknown from our current perspective. Your choices about how you create artefacts will be known and remembered. Every moment is connected with every thought and decision of you and everyone you've ever interacted with and also all of your ancestors and everyone they interacted with. Maybe the connection is slim, or irrelevant. Maybe it's not. How could you know?

I've decided my best bet is to be deliberate about the artefacts I leave behind. I invest my moments into building testaments to my life, not something that will be thrown away or forgotten. Testaments are the artefacts we care about, the ones we cherish, the ones we watch every holiday, the ones we keep locked away, the ones that carry weight.

Digital artefacts are the easiest to reproduce, and the easiest to create. Analog, or physical artefacts are also very important - all artefacts resemble previous artefacts regardless of medium. The largest distinction between digital and analog artefacts is their temporal density. A digital artefact's value _decreases_ with temporal density. An analog artefact's value _increases_ with temporal density. The engraving on the statue gains significance as it's worn by time, more effort must be made to decode it's message, it's testament grows. The picture of the statue has no additional value no matter how quickly it loads. Ideally, you will see the picture of the statue exactly when you need to see it such as a photograph in an encyclopedia. Or it could be the other way around, you get the information about the statue exactly after seeing it and wondering "What in the world is that about?"

When we're deliberate about our artefacts, we leave breadcrumbs for ourselves and those who follow. A big limitation of our artefacts is that it can very difficult to truly convey the intent behind them, deliberate or not. General intent is easier to grasp, but why _specific_ choices were made are often mystery. Systems, modes, standards and patterns are ways we encode morality and intent into our artefacts. What has more meaning to you: a bottle of water you bought mid-flight somewhere sometime, or the mug you drank out of every day for 5 years? What if that was the last trip you took with your grandpa and he bought you that bottle of water? I'd take a selfie with grandpa and the water and keep using the mug, personally.

The primary reason that systems enable us to convey our intent is because patterns are the way we communicate. We use patterns called characters in text, but we use patterns of writing in that text that is somehow more than the characters could be on their own. When the idiosyncrasies of individuals are repeated in patterns among their artifacts, we can infer intent, and even character or morality.

When groups of individuals communicate and share their systems and patterns, it further accelerates the next iteration of artefacts' ability to incorporate their true ideas more faithfully. You can even start to grasp someone's state of mind, albeit crudely.

In that continual effort to more deliberately produce my artefacts, I've thought about journaling. I've kept a journal in various forms at various stages of my life but it just feels like a lot. Maybe some day I'll appreciate those deep dives but for now I feel like I'd like to approach from the "less is more" perspective.

I've enjoyed crossing off each day of my calendar, and noting significant events that happen. As I do this, I've enjoyed pondering the temporal state I was in on those previous days, recalling my presence as I marked it. I've thought about leaving something more significant than crossing a box for each day, but it needed to be deliberate.






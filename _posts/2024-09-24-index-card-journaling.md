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

  .last-row td:last-child {
    border-left-style: none;
  }

  .last-row td:first-child {
    border-right-style: none;
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
{% assign current_month = site.time | date: "%m" | plus: 1 %}
{% assign month_index = current_month | minus: 1 %}
{% assign days_this_month = days_in_months[month_index] | plus: 0 %}
{% if current_month == 2 %}
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
  {% if leap_year %}
  	{% assign days_this_month = days_this_month | plus: 1 %}
  {% endif %}
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
      {% if day_mod == 1 %}<tr {% if day == days_this_month %} class="last-row" {%endif%} >{% endif %}
        <td class="top">
          <small>{{ alpha_dates[day_of_week_d] }}{{ date_string | date: "%d" }}</small>
        </td>
      {% if day_mod == 0 %}
        </tr>
        <tr><td class="bottom"></td><td class="bottom"></td></tr>
      {% elsif day == days_this_month %}
        <td class="top double"></td>
        </tr>
        <tr class="last-row"><td class="bottom"></td><td class="bottom double"></td></tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>


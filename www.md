---
layout: null
title: WWW - catskull.net
---
<html lang="{{ page.lang | default: "en" }}">
  {%- include head.html -%}
  <body>
    <a href="/" style="position: fixed; background: var(--main-bg-color); right: 0; z-index: 1;">catskull.net</a>
<div class="page-content">
<style>
.container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  overscroll-behavior-y: contain;
}

#sidebar-header {
  position: sticky;
  top: 0;
  background: var(--main-bg-color);
  border-bottom: 1px solid;
}

#sidebar-header input {
  width: 100%;
  padding: 1px 5px;

}

.toc-title {
  margin-bottom: 0;
  margin-top: 0;
  padding: 1rem;
}

.toc-nav {
  list-style: none;
  padding-left: 1rem;
  overflow-x: hidden;
  display: list-item;
}

.toc-nav li {
  margin-bottom: 0.5rem;
}

.toc-nav a {
  display: block;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
}

.toc-nav a:hover {
  background-color: Highlight;
  color: HighlightText;
}

/* Active link styling */
.toc-nav a.active {
  background-color: Mark;
  color: MarkText;
  font-weight: 500;
}

/* Main Content */
.main-content {
  margin-left: 201px;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: nowrap;
}

/* Content sections */
section {
  width: 100%;
  display: inline-block;
  vertical-align: top;
  margin: 0 1vw;

  iframe {
  	width: 100%;
  	height: 99%;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .main-content {
    margin-left: 0;
    max-width: 100%;
  }
}

/* Intersection observer styles for active states */
.section[data-visible="true"] {
  /* Optional: Add visual feedback for visible sections */
  background: pink;
}
</style>
<div class="container">

<nav class="sidebar" id="sidebar">
  <div id="sidebar-header">
    <h3 class="toc-title"><a href="#www">WWW</a></h3>
    <label for="sidebar-search" style="visibility: hidden; display: none;">Choose a browser from this list:</label>
    <input list="wiki-list" id="sidebar-search" name="sidebar-search">
    <datalist id="wiki-list">
    </datalist>
  </div>
  <ul class="toc-nav">
    {% for s in site.data.www %}
	    <li><a href="#{{ s[0] }}" data-target="{{ s[0] }}">{{ s[0] }}</a></li>
    {% endfor %}
  </ul>
</nav>

<main class="main-content">
	<section id="www">
	  {% include topnav.html %}
	  <h2 id="wiki-archive">wiki archive</h2>
	  <p>I use this to keep track of wikipedia articles I find interesting. By no means do I endorse, sponsor, hold, or promote any of these ideas. It's just random wikipedia articles.</p>
	  <p>There are currently <b>{{ sites.size }}</b> articles referenced here.</p>
	  <p><a href="/wiki-archive.html">Read more about how this page is built.</a></p>
	  <a href="#balls">balls</a>
 </section>
{% for s in site.data.www %}
<section id="{{ s[0] }}">
	<iframe loading="lazy" src="{{ s[1] }}"></iframe>
</section>
{% endfor %}
</main>
</div>
</div>
</body>
<script src="/public/js/components/i-frame.js"></script>
</html>

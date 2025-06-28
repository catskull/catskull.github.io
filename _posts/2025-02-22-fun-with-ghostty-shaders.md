---
title: Fun with Ghostty Shaders
tags: [development, ghostty, terminal, fun, retro, visuals]
date: 2025-02-22 00:03:02 -0700
layout: post
---

Back when Ghostty released I played around with the entire config, including trying to get some shaders to work. iTerm2 has the ability to have an image background in your terminal and ghostty does not, at least not directly. I wanted to get a custom image with a shader but couldn't get it working.

Well, today in the Bullpen Sam [posted this link](https://github.com/hackr-sh/ghostty-shaders) to a repo full of shaders so I decided to give them a go. Pretty soon I realized I should take a picture or video of these so other people don't have to go through the pain.

I ended up finding a couple of combinations I really liked so I'll highlight those at the top, then the rest is just each shader with a link to the repo. I recommend cloning the entire repo into `~/.config/ghostty/shaders` and then you can specify your shaders in the order they will be applied. 

{% capture compiled_preview %}
{% comment %}
```bash
custom-shader = ./shaders/tft.glsl
custom-shader = ./shaders/bettercrt.glsl
custom-shader = ./shaders/bloom.glsl

# only set this during testing, defaults to "true" which animates only active windows
# custom-shader-animation = always
```
{% endcomment %}
<div class="highlight highlight-source-shell"><pre>custom-shader = ./shaders/tft.glsl
custom-shader = ./shaders/bettercrt.glsl
custom-shader = ./shaders/bloom.glsl

<span class="pl-c"><span class="pl-c">#</span> only set this during testing, defaults to "true" which animates only active windows</span>
<span class="pl-c"><span class="pl-c">#</span> custom-shader-animation = always</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="~/.config/ghostty/config"
%}

{% for image in site.static_files %}
  {% if image.path contains 'images/shaders' %}
  {% if image.path contains '+' %}
  {% unless image.path contains '.avif' %}
    {% assign slug = image.path | split: '/' | last | split: '.' | first %}
<h2>{{ slug }}</h2>
    {% if image.path contains 'webm' %}
<video preload="none" controls muted loop playsinline poster="{{ image.path | replace: '.webm', '.avif' }}">
  <source src="{{ image.path }}" type="video/webm">
  Your browser does not support the video tag.
</video>
    {% elsif image.path contains '.jp' %}
<img loading="lazy" src="{{ image.path }}" alt="{{ slug }}" />
    {% endif %}
  {% endunless %}
  {% endif %}
  {% endif %}
{% endfor %}

<hr>

{% for image in site.static_files %}
  {% if image.path contains 'images/shaders' %}
  {% unless image.path contains '+' %}
  {% unless image.path contains '.avif' %}
    {% assign slug = image.path | split: '/' | last | split: '.' | first %}
    {% assign href = "https://github.com/hackr-sh/ghostty-shaders/blob/main/" | append: slug | append: ".glsl" %}
<h2>{% include external_link.html href=href text=slug %}</h2>
    {% if image.path contains 'webm' %}
<video preload="none" controls muted loop playsinline poster="{{ image.path | replace: '.webm', '.avif' }}">
  <source src="{{ image.path }}" type="video/webm">
  Your browser does not support the video tag.
</video>
    {% elsif image.path contains '.jp' %}
<img loading="lazy" src="{{ image.path }}" alt="{{ slug }}" />
    {% endif %}
  {% endunless %}
  {% endunless %}
  {% endif %}
{% endfor %}

<hr>

Finally for all you young players at home here's my full current daily ghostty config:

{% capture compiled_preview %}
{% comment %}
```bash
ont-family = TX-02
font-size = 19
font-thicken = true
theme = light:xcodelighthc,dark:xcodedarkhc
quick-terminal-animation-duration = 0
keybind = global:super+grave_accent=toggle_quick_terminal
cursor-style = block
shell-integration-features = no-cursor
cursor-style-blink = false
link-url = true
window-inherit-working-directory = true
window-inherit-font-size = true
window-theme = system
clipboard-trim-trailing-spaces = true
mouse-hide-while-typing = true
macos-titlebar-proxy-icon = hidden
macos-icon = custom-style
macos-icon-frame = plastic
macos-icon-ghost-color = FFFFFF
macos-icon-screen-color = 000000
```
{% endcomment %}
<div class="highlight highlight-source-shell"><pre>ont-family = TX-02
font-size = 19
font-thicken = <span class="pl-c1">true</span>
theme = light:xcodelighthc,dark:xcodedarkhc
quick-terminal-animation-duration = 0
keybind = global:super+grave_accent=toggle_quick_terminal
cursor-style = block
shell-integration-features = no-cursor
cursor-style-blink = <span class="pl-c1">false</span>
link-url = <span class="pl-c1">true</span>
window-inherit-working-directory = <span class="pl-c1">true</span>
window-inherit-font-size = <span class="pl-c1">true</span>
window-theme = system
clipboard-trim-trailing-spaces = <span class="pl-c1">true</span>
mouse-hide-while-typing = <span class="pl-c1">true</span>
macos-titlebar-proxy-icon = hidden
macos-icon = custom-style
macos-icon-frame = plastic
macos-icon-ghost-color = FFFFFF
macos-icon-screen-color = 000000</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="~/.config/ghostty/config"
%}



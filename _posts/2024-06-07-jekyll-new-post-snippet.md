---
title: Jekyll post generator snippet (with timestamps!)
tags: [web, programming, web development, jekyll, ssg, ruby]
date: 2024-06-07 18:10:17 -0600

layout: post
---
I love jekyll but I hate making new posts and I can't be bothered to figure out a real solution so I made this script.

{% capture compiled_preview %}
{%comment%}
```bash
# from jekyll project root
$ mkdir bin
$ nano bin/new-post
# paste/edit the below script
$ chmod +x bin/new-post
$ bin/new-post
> File created at ./_posts/2024-06-07-title.md
```
{%endcomment%}
<div class="highlight highlight-source-shell"><pre><span class="pl-c"><span class="pl-c">#</span> from jekyll project root</span>
$ mkdir bin
$ nano bin/new-post
<span class="pl-c"><span class="pl-c">#</span> paste/edit the below script</span>
$ chmod +x bin/new-post
$ bin/new-post
<span class="pl-k">&gt;</span> File created at ./_posts/2024-06-07-title.md</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="~/jekyll-project $ _"
%}

I have it open my site in sublime but you can edit it as you see fit.

{% capture compiled_preview %}
{%comment%}
```ruby
#!/usr/bin/env ruby

require 'date'

def create_post_file()
  # Get the current date in YYYY-MM-DD format
  date = Date.today.strftime('%Y-%m-%d')
  
  # Create the filename
  filename = "./_posts/#{date}-title.md"
  
  # Define the content of the file
  content = <<~CONTENT
    ---
    title: newpost
    tags: []
    date: #{DateTime.now.strftime('%Y-%m-%d %H:%M:%S %z')}
    ---
  CONTENT

  # Write the content to the file
  File.write(filename, content)
  
  puts "File created at #{filename}"

  system("subl", "./", filename)
end

create_post_file()

```
{%endcomment%}
<div class="highlight highlight-source-ruby"><pre><span class="pl-c">#!/usr/bin/env ruby</span>

<span class="pl-en">require</span> <span class="pl-s">'date'</span>

<span class="pl-k">def</span> <span class="pl-en">create_post_file</span><span class="pl-kos">(</span><span class="pl-kos">)</span>
  <span class="pl-c"># Get the current date in YYYY-MM-DD format</span>
  <span class="pl-s1">date</span> <span class="pl-c1">=</span> <span class="pl-v">Date</span><span class="pl-kos">.</span><span class="pl-en">today</span><span class="pl-kos">.</span><span class="pl-en">strftime</span><span class="pl-kos">(</span><span class="pl-s">'%Y-%m-%d'</span><span class="pl-kos">)</span>
  
  <span class="pl-c"># Create the filename</span>
  <span class="pl-s1">filename</span> <span class="pl-c1">=</span> <span class="pl-s">"./_posts/<span class="pl-s1"><span class="pl-kos">#{</span><span class="pl-s1">date</span><span class="pl-kos">}</span></span>-title.md"</span>
  
  <span class="pl-c"># Define the content of the file</span>
  <span class="pl-s1">content</span> <span class="pl-c1">=</span> <span class="pl-s">&lt;&lt;~CONTENT</span><span class="pl-s"></span>
<span class="pl-s">    ---</span>
<span class="pl-s">    title: newpost</span>
<span class="pl-s">    tags: []</span>
<span class="pl-s">    date: <span class="pl-s1"><span class="pl-kos">#{</span><span class="pl-v">DateTime</span><span class="pl-kos">.</span><span class="pl-en">now</span><span class="pl-kos">.</span><span class="pl-en">strftime</span><span class="pl-kos">(</span><span class="pl-s">'%Y-%m-%d %H:%M:%S %z'</span><span class="pl-kos">)</span><span class="pl-kos">}</span></span></span>
<span class="pl-s">    ---</span>
<span class="pl-s">  CONTENT</span>

  <span class="pl-c"># Write the content to the file</span>
  <span class="pl-v">File</span><span class="pl-kos">.</span><span class="pl-en">write</span><span class="pl-kos">(</span><span class="pl-s1">filename</span><span class="pl-kos">,</span> <span class="pl-s1">content</span><span class="pl-kos">)</span>
  
  <span class="pl-en">puts</span> <span class="pl-s">"File created at <span class="pl-s1"><span class="pl-kos">#{</span><span class="pl-s1">filename</span><span class="pl-kos">}</span></span>"</span>

  <span class="pl-en">system</span><span class="pl-kos">(</span><span class="pl-s">"subl"</span><span class="pl-kos">,</span> <span class="pl-s">"./"</span><span class="pl-kos">,</span> <span class="pl-s1">filename</span><span class="pl-kos">)</span>
<span class="pl-k">end</span>

<span class="pl-en">create_post_file</span><span class="pl-kos">(</span><span class="pl-kos">)</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="~/jekyll-project $ _"
%}

Someday I'll have it take a title param but not today.

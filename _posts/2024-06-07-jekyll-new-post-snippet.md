---
title: Jekyll post generator snippet (with timestamps!)
tags: [web, programming, web development, jekyll, ssg, ruby]
date: 2024-06-07 18:10:17 -0600

layout: post
---
I love jekyll but I hate making new posts and I can't be bothered to figure out a real solution so I made this script.

```
# from jekyll project root
$ mkdir bin
$ nano bin/new-post
# paste/edit the below script
$ chmod +x bin/new-post
$ bin/new-post
> File created at ./_posts/2024-06-07-title.md
```

I have it open my site in sublime but you can edit it as you see fit.

```
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

Someday I'll have it take a title param but not today.

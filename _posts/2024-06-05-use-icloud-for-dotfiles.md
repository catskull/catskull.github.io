---
title: Should you use iCloud Drive to store your dotfiles?
tags: [programming, apple, bash, zsh, ssh]

layout: post
---

Should you? I can't answer that. What I _can_ say is here's how I did it.

Where is iCloud Drive even on your computer? [Jeffrey Morgan](https://jeffreymorgan.io/articles/access-icloud-drive-folder-in-terminal/) told me it's here:

`~/Library/Mobile\ Documents/com~apple~CloudDocs`

I took it a step further and symlinked the folder:

`ln -s ~/Library/Mobile\ Documents/com~apple~CloudDocs ~/iCloud`

Then I `mkdir ~/iCloud/dotfiles` and started linking my configs:

{% capture compiled_preview %}
{%comment%}
```bash
# ssh
mv ~/.ssh ~/iCloud/dotfiles/
ln -s ~/iCloud/dotfiles/.ssh .ssh

# zshrc
mv ~/.zshrc ~/iCloud/dotfiles/
ln -s ~/iCloud/dotfiles/.zshrc ~/.zshrc

# POSIX config
mv .config/ ~/iCloud/dotfiles/.config/
ln -s ~/iCloud/dotfiles/.config .config
```
{%endcomment%}
{%raw%}
<div class="highlight highlight-source-shell"><pre><span class="pl-c"><span class="pl-c">#</span> ssh</span>
mv <span class="pl-k">~</span>/.ssh <span class="pl-k">~</span>/iCloud/dotfiles/
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/.ssh .ssh

<span class="pl-c"><span class="pl-c">#</span> zshrc</span>
mv <span class="pl-k">~</span>/.zshrc <span class="pl-k">~</span>/iCloud/dotfiles/
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/.zshrc <span class="pl-k">~</span>/.zshrc


<span class="pl-c"><span class="pl-c">#</span> POSIX config</span>
mv .config/ <span class="pl-k">~</span>/iCloud/dotfiles/.config/
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/.config .config</pre></div>
{%endraw%}
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="~ $"
%}

Then you can make a bash script if you're cool or a blog post if you're me!

PS -

Sam says to make sure your iCloud Drive is e2e encypted (sup NSA call me 🤙) by going into system settings and turning on "advanced data protection"

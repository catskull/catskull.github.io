---
title: Should you use iCloud Drive to store your dotfiles?
tags: [programming, apple, bash, zsh, ssh]
category: post
layout: post
---

Should you? I can't answer that. What I _can_ say is here's how I did it.

Where is iCloud Drive even on your computer? [Jeffrey Morgan](https://jeffreymorgan.io/articles/access-icloud-drive-folder-in-terminal/) told me it's here:

`~/Library/Mobile\ Documents/com~apple~CloudDocs`

I took it a step further and symlinked the folder:

`ln -s ~/Library/Mobile\ Documents/com~apple~CloudDocs ~/iCloud`

Then I `mkdir ~/iCloud/dotfiles` and started linking my configs:

```
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

Then you can make a bash script if you're cool or a blog post if you're me!
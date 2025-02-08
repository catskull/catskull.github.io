---
title: Per-repo GitHub accounts
tags: [github, git, development, ssh, programming]
date: 2025-02-07 15:35:11 -0700
layout: post
---
I primarily [use the GitHub Desktop app](/uses) for my git needs. It's a lot less cool than the `git` cli, and I _am_ comfortable with it but if I'm being 100% serious with you I switched to the Desktop app because it makes it super easy to chunk your changes up into multiple commits in visual/interactive way that I never quite learned to do on the command line – and when you have a CTO who looks at how many commits each dev is doing "but it's not a metric you are judged by *wink*" you don't really have time to deal with accidentally messing up a rebase and bringing down CI for an afternoon.

<img src="loljk" alt="the big bonus I got for being 'top committer of the fiscal year'" width="20%"/>

Well, my work uses some kind of GitHub Enterprise setup I don't understand and as it turns out, I also like doing a little code here on the side for fun so I find myself in a situation where I need to have two GitHub accounts all the time. The Desktop app does not support that, so I'd just sign in and out of the app depending on what code I needed to do. The app does a magic browser login link so as long as the browser is logged in to the correct account, it "just works".

One day I decided that _I have had enough and there must be a better way_. ChatGPT provided instructions that were not only not helpful, but actively incorrect. Stack Overflow leads you to the `gh` cli or other weird things that also did not work with my setup. I think the problem is that I have literally two **GitHub** accounts that I need to use at the same time, most assume... something else.

Well, I figured it out and it's not that complicated and I'm sure at least 2 Hacker News commenters will enjoy pointing out that this is so obvious it's shocking I wasn't born with this knowledge and should seriously look into a mental diagnosis.

Each account needs an SSH key:

{% capture compiled_preview %}
<pre><code>$ ssh-keygen -f urmom
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in urmom
Your public key has been saved in urmom.pub
The key fingerprint is:
SHA256:tCZ+0HmuiN2d3SfGqwXFmKOzEJTFZbPaWs6EkDmjnZs urmom@hotmail.com
The key's randomart image is:
+--[ED25519 256]--+
|        .+..+    |
|       ..o.. *   |
|        O   = o  |
|       = O = o   |
|      + S * =    |
|     . + * O .   |
|      . E + o..  |
|     o + o o o+ .|
|    . o o o ooo+ |
+----[SHA256]-----+
</code></pre>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="$ ssh-keygen"
%}


Use whatever filename makes sense to you, like `personal` or `work`.

Next copy your public key to GitHub. [Add a new SSH key.](https://github.com/settings/keys) Copy your public id to the clipboard. Change the key name to match yours, I just found this one laying around. `pbcopy < ~/.ssh/urmom.pub`

Add a new SSH key, give it a title, and paste the public key into the field.

![Github](/public/media/posts/ssh/github.jpg)

If your GitHub account is enrolled in SSO, you'll need to configure that on the SSH key. It should look like a "Configure SSO" dropdown with your org's information somewhere to do your 2fa - but I'm not going to elaborate on that detail any further.

Now, clone the repo using ssh (not https!)

{% capture compiled_preview %}
<pre><code>
GIT_SSH_COMMAND="ssh -i ~/.ssh/urmom" git clone git@github.com:urmom/email-inbox.git
</code></pre>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="$ git clone with custom ssh id"
  copy=1
%}

`CD` into the repo and tell git to always use the `urmom` key when sending emails to her inbox:
{% capture compiled_preview %}
<pre><code>
git config core.sshCommand "ssh -i ~/.ssh/urmom"
</code></pre>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="permanently set the ssh id"
  copy=1
%}

Any respectable git client will honor these settings without any additional configuration. I've tested this with both GitHub Desktop as well as Sublime Merge. Command-line git works great as well.

I feel actually a little silly blogging this but I have been signing in and out of GitHub.com like an animal and I'm sorry about that! I swear GitHub wants you to think you need their `gh` cli tool to do this as well - to be honest I have no idea what that tool is used for.

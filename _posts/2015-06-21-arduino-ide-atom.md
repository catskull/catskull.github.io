---
layout: post
title:  "Ditching the Arduino IDE"
date:   2015-06-21
categories: tutorials arduino
---

Recently, my good friend and crazy talented hacker Ultifinitus gave me some sweet hardware. Out of the goodness of his heart. What a nice guy! It consisted of an Arduino Mega and some other stuff that I'll go more into in a later post. I haven't done a ton of arduino stuff in the past, but I've done enough to know that the default Arduino IDE sucks. Those may be strong words I guess, it's open source and cross platform and it works, but it just has a pretty poor text editor. I decided if I was going to do anything worthwhile with the hardware, I needed an environment I could be productive in. Specifically, I like using Github's excellent editor, Atom. It's open source, cross platform, and is a pretty great text editor! This post will serve as a reference for what I was able to get set up.

Atom needs almost no customization out of the box. The only package to install is [language-arduino](https://atom.io/packages/language-arduino) which "adds syntax highlighting and snippets to Arduino files in Atom".

The real meat and potatoes is [Ino](http://inotool.org/). This is a command line interface for building and uploading arduino code. It works pretty well. Install it with pip by executing `pip install ino`. (As a side note, I use python every day at work and a _still_ fell a little gross every time I use pip. It's like the inbred step brother of RubyGems and it makes me wish everything was written in Ruby.)

Perhaps the reason I feel gross for using pip is that usually the packages I'm installing are a little gross. Don't get me wrong, I commend the men and women who spend hours upon end doing the thankless task of contributing to open source projects, only to be berated with senseless issues and internet trolls. I guess if I have issues with some open source software I'm using I should just contribute and try to fix it, but one project at a time right? Ino has more good than bad all things considered.

So once you've gotten ino installed, there's very little you need to do in the way of setting it up. Navigate to the directory you want to keep your project. For me its `ddegraw/code/new_project` and execute an `ino init` command. This will create a src and a lib directory. src is where you'll keep your code, and lib is useless. lib is _supposed_ to be where you put libraries you want to use, but I ([and some other people](https://github.com/amperka/ino/issues/164) couldn't get that to work so I just stuck everything in the src directory. One important thing to note is that ino _will not_ automatically scan your arduino libraries, so if you want to include anything you have to copy it over to the src directory.

Inside the src folder there should be a sketch.ino created. This is where you can write the bulk of your code, consider it you "main".

Once you have all of that set up, you're pretty much good to go. There are a few caveats that I'd like to mention however.

First, you should create a ino.ini file in the root of your project. Inside, you can specify which serial port to use and which board you're targeting. For example, I'm using a mega 2560 so mine looks like this:

    [build]
    board-model = mega2560

    [upload]
    board-model = mega2560
    serial-port = /dev/tty.usbmodem1421

    [serial]
    serial-port = /dev/tty.usbmodem1421

Each one of the [] blocks defines settings for a command. I would like it if that wasn't the case, and instead you just chose _one_ board and _one_ serial port. How likely is it that you're wanting to build for a mega2560 but upload for an Uno _within the same project_? Fail. Whatever.

I think you can also put those settings in ~/.inorc, but I haven't tried that and don't really care to. The only advantage of that would be that those settings would be used as your global defaults.

To build, simply execute `ino build` from the root of your project. To upload, simply execute `ino upload` from the same place. Pretty simple. I made an alias to do both of those at the same time because more often than not that's what I want to do.

That's really it as far as the environment is concerned. It works fairly well and is easily as featured as the Arduino IDE is.

I would like to take a moment at the end to talk about a fork of Ino called Arturo. The creators of Ino no longer have time or motivation to maintain it. A quick look at the issues section of the GitHub repo will be a prime example of what open source hell looks like. [Scott Dixon](https://github.com/scottdarch) offered to take over management of the repo, but the creators preferred him to fork it. In my opinion that is a poor decision on their end, but at the same time I can understand why they would chose that. It doesn't look like he's made too many changes yet, but he is a very good maintainer. Issues are clear, valid, and labeled. While he doesn't have time to work on every little feature, he does keep the issues well under control. Unfortunately, I was not able to get it to work with my device, but I've opened an issue and would love to help contribute to make it better. I have opened a pull request for a seperate tiny issue and it will be exciting to see how he handles contributions!

And lastly, it looks like there is [something similar](http://hackaday.com/2014/04/20/sublime-text-as-an-arduino-ide/) that relies on Sublime Text. I have no desire to use or pay for Sublime Text though, but it may be worth checking out.

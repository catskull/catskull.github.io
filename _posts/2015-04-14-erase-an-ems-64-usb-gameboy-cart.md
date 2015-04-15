---
layout: post
title:  "How To: Completely Erase the ROM of an EMS 64m USB Gameboy Cart"
date:   2015-04-14
categories: gameboy hack
---
Recently, I've been playing around with my EMS 64m USB gabmeboy cartridge. The cart itself works well for what it is, but the flashing software is completely lacking. It's Windows only, and that's if you're even able to get the drivers installed (which is basically impossible). The cart has two "pages" each 32mbit for a total of 64. It changes between the two pages with a ghetto power cycle. Basically it just has a little capacitor that gets charged when the gameboy is on, and if the cap still has a charge when the cartridge is booted it goes to page 2. This works pretty well for getting from page 1 to page 2, but getting from page 2 back to 1 is a hassle because you just have to wait for the capacitor to discharge. That makes me wonder how hard it would be to replace the capacitor with a switch or button of some kind, but that's beyond the scope of this post.

Another interesting drawback to the cart is that it can only support one sav at a time. In other words, if you had Pokemon Blue on page 1, and Pokemon Gold on page 2, you could only keep one save for each at a time. Save in Blue, then switch to Gold and save and guess what? Your blue save is gone.

The windows flashing utility that ships with the cart has support for multi rom. I don't know the intricacies of it, but basically it just patches all the roms you give it into one big rom, and then throws on a custom menu rom they made. So the short story is that the cart itself is "dumb", and their patched multirom menu could be used just as well on almost any flash cart. Because of the wackyness of switching pages, usually I just like to put the exact same roms on both pages, so I don't have to deal with it. I mean, how many roms could you possibly want on the same cart, especialy given the limited sav space? So I have LSDJ as my "main" rom (intended for use saves), and then a bunch of non-save roms (like tetris).

Fortunately, Mike Ryan wrote a command-line driver for *nix systems. You can find more information about that [here](http://lacklustre.net/projects/ems-flasher/). It works extremely well and is ultra reliable. The one caveat is that it does not support multi rom. It can write to both pages, but only one rom on each.

Talented "Gameboy Genius" nitro2k01 has been working on a file manager called LittleFM for LSDJ for some time. The goal is to add better song management to LSDJ, as well as other cool features like the ability to transfer songs over a link cable. He achieved this by writing a rom that is then patched onto the LSDJ rom. So rather then booting straight to LSDJ, you're greeted by his file manager that can then load a song and boot into LSDJ. As an experiment he wrote a multi rom menu specifically for the EMS cart. It's a dirty hack; you have to manually append the roms you want to the patched LSDJ rom with a tool like cat on Unix or copy on Windows. The end result is one large gameboy rom with LSDJ, the file manager, and your other roms all nicely tucked into one big rom. More information about that can be found [here](http://blog.gg8.se/wordpress/2013/02/04/gameboy-project-week-5-littlefm-05-finally-released/). Now we have a nice multi rom image ready to flash with Mike Ryan's custom *nix driver!

It works great!

***This is where the blog post gets on topic.***

The one issue is that it appears that the *nix driver only overwrites the sectors of the of the memory that it needs to. Say you're flashing an 8 megabit rom, it will only overwrite the first 8 megabits of the memory. This is normal operation for memory writing. Deleting a file on your computer doesn't actually delete it, it just tells the system that space can now be safely overwritten. The issue comes from how nitro2k01's multi rom menu works. From my understanding it just looks for any other rom headers in the memory. But what happens if you flash a multi rom image that takes up all the memory, but then later decide that you don't want all those roms and flash a smaller rom, the other roms will still show up in the menu because they haven't actually been overwritten! If I'm not explaining this very well, just let met know. I will include pictures below as well for clarification.

I worked up a solution to this that's extremely simple. If you're reformatting a drive on your computer and want to make sure none of the files can be recovered, you have to not only reformat the drive, but overwrite all data with 0's or something like that. Knowning that, I fired up my hex editor and wrote a file that's 32 mbit in size and contains only 0's. Then I wrote that to my cart. I booted it up to make sure everything was gone, and then re-wrote my multi rom. And just like that, all the old roms were gone, and only the new ones were there!

To expand on this, it would be nice to contribute more to the *nix driver to include either support for writing to specific locations or for multi rom support out of the box. Unfortunately my C driver coding skills are nonexistent so that's not happening any time soon.

[The blank rom can be downloaded here.](http://goo.gl/2gFbTT)

![Bad rom! I don't want all of those!](/public/ems/badrom.jpg)
I only want the top two roms to show up in the menu.

![Blank](/public/ems/blank.jpg)
Just what I want, a totally blank rom!

![Good rom!](/public/ems/goodrom.jpg)
The payoff, after re flashing the multi rom image, only to two that I want are there!

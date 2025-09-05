---
title: Use 86Box for Windows 98 Gaming
tags: [tutorial, 86box, windows, gaming]
date: 2025-08-28 16:47:49 -0600
layout: post
---
> 86Box is a low level x86 emulator that runs older operating systems and software designed for IBM PC systems and compatibles from 1981 through fairly recent system designs based on the PCI bus.
> - 86box.net

I really love [86Box](https://86box.net)! However, learning how to use it was quite daunting. I was just little kid using the family's computer to play games. I don't know anything about BIOS configuration or Windows setup/maintinence. I just want to play some games and use old software.

I realize that I'm not alone in this - many find 86Box too daunting and confusing to configure. It took me some time to get it working correctly, but I think I've finally learned enough to share what I know with you. And with the relase of **5.0**, what better time to put a little blog post together than now!

This guide is based on the most recent stable build, 5.0 (build 7600). I am on macOS but these instructions should work just as well on Windows and Linux, though I have not tested myself.

Once you have 86Box downloaded, you'll be greeted with the new "VM manager" UI just added in 5.0. From the "File" menu, select "New Machine..." and you'll be greeted with the "new system wizard". Select "Use existing configuration".

Click to load the configuration and select my config. Review the imported configuration for your own enjoyment and to familiarize yourself with the various configuration settings. You technically don't need to mess with the config at all, but I feel that spending a minute or two reviewing it will help you have a smoother time in the future.

Note that in my configuration, I'm using a 200mhz Pentium II. You can crank the clock speed up, but anything more than this on my M3 Max causes stuttering and slowdown. Do not simply crank it to the max unless you're on a host machine with better single-core performance than me. Looking at Geekbench, my M3 Max scores **3070** on single-core performance. I believe if you're on a beefy desktop such as a Ryzen 9 or Intel i9 you may be able to crank this up. The best way to tell if the CPU is bottlenecking is if audio begins to stutter! Later in this guide, we will use the Windows 98 startup chime as a crude benchmark. RAM is less of an issue, assuming you have plenty. I used 128MB for mine, which should be more than plenty for anything you throw at it. I also use a 20GB HDD image but that is dynamically sized, meaning it's not simply going to take up 20GB of your disk space until you actually fill it up.

Give your new system a clever name, such as "catskull is cool" or "balls". Hit "continue" and you'll be dropped into the 86Box configuration UI. You can take a moment to look around here, but since you already checked out the config you just imported, this isn't going to have any new information for you, so you're free to simply close it.

Back in the main 86Box VM Manager window, you'll now have your new system populated. Double click it, or select it and hit the green play icon to boot! You should be greeted with some nice beeps and the beautiful retro Compaq logo. Truly, a thing of beauty. Annoyingly, the BIOS will halt the boot because the CMOS technically has not been set yet. Hit F1 (fn+F1 on an Apple keyboard) to enter the BIOS. Simply select "Load optimum settings", then "Y" to confirm. Then, "Save and Exit". Your system will reboot and you'll hear another glorious BIOS beep and the Compaq logo again.

We have our system configured, but there's nothing on the hard drive to boot yet! From the "Media" menu item (or by clicking the floppy/CD icon in the bottom right of the VM window), select your win98 quick install floppy and CD image. Hit any key to reboot and you will now see a short message that says "Press a key to run QuickInstall". Press any key. After about 20 seconds, you will be in the Win98 QuickInstall welcome screen! Press enter a few times until you are at the Main Menu. "Where do you want to go today?" - hmmm [I've never heard of that before](/where-do-you-want-to-go-today.html)!

First step - format and partition our hard disk by selecting the "CFDISK" option. Hit enter to select the default (and only) disk. Hit enter again to create the MBR partition. Hit enter again to create a new partition. On the next screen, use your right arrow key to select "Write" and hit enter. Then, hit left arrow to go back to "Quit". On the following "Partition Wizard" screen, hit down to select "FINISHED" otherwise you'll be back in the same partition screen we just exited. I bet you can't guess  how many times I've accidentally gone back into the partition editor.

Back on the main menu, select "[INSTALL] Install selected Operating System variant". Hit enter again to install to the default, and only partition available. Enter again to format the drive before installation. The

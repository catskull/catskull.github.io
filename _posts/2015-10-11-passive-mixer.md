---
layout: post
title:  "10 Minute Project: Passive Mixer"
date:   2015-10-11
categories: old
---

The other night, I was making a cover of a song on a Gameboy. Usually the way I do that is by listen to a few measures of a song, then programming it into the gameboy. It ends up being super annoying though because I have to repeatedly plug and unplug my headphones into my computer and gameboy. I've tried things like having the headphones plugged into the gameboy and only having one earphone in while listening to the source music over my computers speakers, but that just doesn't really work. It sucks for composing and I end up missing a ton of little nuances in the source song.

Frustrated by this, I decided once and for all to build a little passive mixer. Basically it's like a headphone splitter but in reverse. You can plug two or more source inputs in and it will combine them into a merged output. The passive part just means that there's no "active" components doing things like amplification or filtering. It's super simple, but due to the passive nature of the mixer, you loose quite a bit of volume on from the inputs. Generally it would be considered unsuitable for use with headphones, but in my testing it was adequate. I had to have each device turned up to 100% volume to get a good total volume out of it, but that's okay for me.

All I had to do was take 3 female 1/8 inch (headphone) jacks, a few 1k resistors, and I was in business! I will try to describe the circuit but I'll probably fail so just look at the schematic I made. A <s>picture</s> schematic is worth a thousand words!

Stereo jacks have three connectors on them: ground, left, and right. First thing is to simply tie all the grounds together with some wire. Easy. Next, attach a 1k resistor to each the left and right sides of each input. In total you will have 4 resistors. Now, for the two left input resistors, tie them together, then to the left side of the output jack. The result is some kind of "Y" connector, if that makes sense. Now do the same thing of the right side and you're all set!

![image](http://i.imgur.com/Ni0yIUj.png)

As a disclaimer, I know nothing about audio so I don't know why you have to use a 1k resistor. Basically the bigger your resistor is, the quieter your output will be. But why not use like a 500 ohm resistor instead of a 1k? Then the output will be twice as loud? I assume that you might end up overloading the destination with too much current and blow something up. I didn't play around with that, but if you have a good answer please let me know.

In the future, it would be nice to be able to control the volume of each input individually. A potentiometer (basically a variable resistor) might do the trick. The problem with that is that since each side of the input has it's own resistor, you'd end up with 4 pots for only two inputs so you'd end up adjusting the left and right channels of each input individually which would be annoying.

Also, it should be noted that you can tie even more inputs into your mixer. Just do the exact same thing you did for each input already: tie the ground and add the resistors. Easy peasy.

I mounted mine in one of my favorite enclosure boxes that I've used for like every single one of my projects. I drilled three holes in places I thought made sense. My audio connectors are "panel mount" which basically means they have a little screw nut on the end so you can tighten them onto an enclosure.

Here are some pictures of the finished product:

![inside](http://i.imgur.com/7ZfvXPR.png)

![inputs](http://i.imgur.com/k7AdT9Z.png)

![output](http://i.imgur.com/7A2aANO.png)

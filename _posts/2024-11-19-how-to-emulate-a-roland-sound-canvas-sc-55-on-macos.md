---
title: How to emulate a Roland Sound Canvas SC-55 on macOS
tags: []
date: 2024-11-19 13:26:54 -0700
layout: post
---
## Preamble

In the 1980's and 90's, PC games had two options for music and sound effects: a "PC Speaker", or MIDI. Because of size limitations, any kind of "analog audio" was strictly out of the question. There wasn't enough space on the floppy disks! While some developers were able to get surprisingly sophisticated sounds out of a device that is literally supposed to only buzz, compared to anything that you'd typically refer to as "music" it did not hold up. PC's weren't really designed to make good music, that's what Commodore and Atari were for.

{% include youtube.html embed="d63s8BxzQp8" title="Shadilay 1-bit (MONOTONE, PC speaker)" %}

Various so-called "sound cards" eventually hit the market, which were standalone PC cards with dedicated sound synthesis hardware on-board. Typically in the form of various Yamaha FM chips, but really they could be anything.

Game developers would have to choose which sound devices to support. PC Speaker was almost a given, but very little effort usually went into that device. It was "better than nothing" (debatable). In addition, music producers were beginning to use these hardware synthesizers with their computers and other devices, and there needed to be some standardized way to communicate.

[MIDI](https://en.wikipedia.org/wiki/MIDI){:target="_blank"} (Musical Instrument Digital Interface) is a serial protocol designed to send musical instrument data between devices. But it's just the communication protocol, it doesn't dictate what is on the other end. MIDI has 16 "channels" that can each independently transmit their own musical data simultaneously over the same physical cable. But what's on MIDI channel 1? Is it a piano synthesizer? Some kind of 8-bit PSG? Sure, if you were in the studio producing music, you'd know that your keyboard was plugged in your synth and what sounds the synth would be making. But what about later playback?

Game developers wanted to be able to use MIDI because the files are very small compared to compressed analog audio. They only store information about how to produce the note, but they don't actually produce the sound. That's what the synthesizer does! Developers needed a way to ensure that the end user would have a similar enough MIDI setup as the composer of the video game soundtrack.

Some game developers, such as Sierra, decided to target specific synthesizer devices with their MIDI soundtracks, such as the [Roland MT-32](https://en.wikipedia.org/wiki/Roland_MT-32){:target="_blank"}. Sure, you could use your PC speaker but if you really just went through all the trouble to not only have a PC but to own a relatively expensive piece of software for it, it wouldn't really be out of the question to go ahead and spend another $600 on a dedicated piece of sound hardware.

{% include youtube.html embed="PNbXTKuObCQ" title="Space Quest III - Intro/Opening - (Roland MT-32)" %}

Thus, in 1991 the "[General MIDI](https://en.wikipedia.org/wiki/General_MIDI){:target="_blank"}" specification was released. General MIDI is a standardized layout of the MIDI note space. Peep the hot new vectorized logo on wiki courtesy of ya boi 👀

{% include figure.html
	src="https://upload.wikimedia.org/wikipedia/commons/a/a4/GENERAL_MIDI_LOGO.svg"
	caption="MIDI, in General"
%}

If MIDI is the conductor, and it expects the strings to be to their right, then General MIDI is what makes sure the violins are actually sitting where they ought to be so when the conductor points at them and tells them to really give it, it will be violins and not french horns. Believe me, I've heard the french horn. It would be bad!

Eventually both Roland and Yamaha would release their own "extensions" to the General MIDI specification named "GS" and "XG" respectively. Going back to the orchestra analogy, these were like adding in a few more sections of each instrument. Music played fine without them, but if you had a compatible MIDI file and synth, it sounded "extra good".

In my humble opinion, the Roland Sound Canvas series was the last great consumer MIDI synthesizer. By the late 90's, optical media was cheap and common enough that instead of 1.44MB, they now had literally about 500x that with a 700MB CD-ROM. Not to mention CD's were also cheaper! Developers had so much space they didn't even know what to do with it all! Literally! The first wave of CD-ROM games infamously live to this day as some of the cringiest media ever produced. They eventually kind of figured it out, but that lost era of the General MIDI sound canvas has a unique and special place not only in my heart, but in the history of PC computer games.

The other day I decided to revisit one of my childhood favorites, Space Quest 6. Look, I'm not saying it's a 'good' game, or that you should play it, but it is a 'game' that has a MIDI soundtrack targeted at the SC-55. I booted it up in ScummVM and was literally aghast at the "FM farts" instrumentation on the title screen. Like... seriously? Surely we can do better.

{% include youtube.html embed="rvFRX2P2NTU" title="Space Quest 6 - Title Screen (poop version)" %}

Well it just so happened that in February of this year (2024), seasoned sound-chip emulation dev "nukeykt" released their work on SC-55 emulation. Since then, there has been more or less regular activity on the code and they've added support for a few different SC-55 models. They offer a binary distribution, but it's Windows only. The code doesn't explicitly say it's cross-platform, but considering that it uses SDL2 for as far as I can tell, everything besides the emulation itself, it must be more-or-less portable.

I contacted [Alexander Kaiser](https://mastodon.social/@alexkaiser){:target="_blank"} and [vga256](https://dialup.cafe/@vga256){:target="_blank"} on Mastodon and they helpfully provided some needed tips on building and running on macOS. Turns out, there's a [fork from jcmoyer on GitHub](https://github.com/jcmoyer/Nuked-SC55?tab=readme-ov-file){:target="_blank"} with a lot of quality of life improvements as it seems nukeykt isn't accepting feature pull requests. Additionally, Alex helpfully put up an archive of everything you need to get running on Archive.org. [See the full thread or join the convo on Mastodon](https://mastodon.social/@alexkaiser/113512249902818871){:target="_blank"}.

## Installation & Usage

- Install rtmidi via [homebrew](https://brew.sh){:target="_blank"}: `brew install rtmidi`
- [Download the zip from Archive.org](https://archive.org/details/nuked-sc55-for-macos){:target="_blank"}
- Either double click the nuked-sc55 binary, or navigate and run in the command line

Open "Audio MIDI Setup" with Spotlight search (CMD+Space), or navigate in Finder to /Applications/Utilities and open it there.

{% include figure.html
	src="public/media/posts/sc55/midisetup.jpg"
%}

If the MIDI Studio window doesn't show, hit CMD+2, or Window - Show MIDI Studio. There is one red device named "IAC Driver". Double click it. Check "This device is online" and hit apply and close it. The IAC Driver is what will route MIDI data from whatever program is spitting it out (in my case ScummVM) into the SC-55 emulator. You'd think Nuked SC-55 would show up as it's own MIDI device on it's own, but nope.

{% include figure.html
	src="public/media/posts/sc55/iacdriver.jpg"
%}

If when you opened MIDI Studio, there were "other" things in there besides the IAC Driver that are also active (not greyed out), then you'll probably have to tell Nuked SC-55 which MIDI port to use. Run the binary from the command line and pass in the `-p <port-number>` flag, default is 0. To find out which port your IAC Driver is on, run `nuked-sc55 --help`. My output includes this:

>Known midi devices:
>
>  0: UMC404HD 192k
>
>  1: eDrumIn BLACK
>
>  2: IAC Driver Bus

In my case, I used `nuked-sc55 -p 2`

I used the handy dandy "[MidiKeys](https://flit.github.io/projects/midikeys/){:target="_blank"}" app (`brew install --cask midikeys`) to send some test MIDI data. Choose the IAC driver as the destination and press some of the keys. If the SC-55 window reacts and you hear music, congrats!

<video autoplay loop muted>
  <source src="public/media/posts/sc55/playing.webm" type="video/webm">
</video>

Oh, and one more thing - the emulator is so accurate that it reproduces a bug in some models of the SC-55. Select the SC-55 window, press Q, then hold U and press Q again. Q turns the device on and off, and holding U will tell it to initialize in Roland GS mode. You can also hold Y for MT-32 mode, and T for General MIDI mode. It will ask for confirmation "Init GS    Sure?" and hit W to proceed. You have to do this every time the application boots otherwise the audio levels are not set correctly!

<video autoplay loop muted>
  <source src="public/media/posts/sc55/reset.webm" type="video/webm">
</video>

At this point you have the SC-55 fully working and responding to MIDI data. You'll probably want to tell DOSBox or ScummVM to use this as the MIDI destination.

{% include figure.html
	src="public/media/posts/sc55/scummvm.jpg"
%}

In ScummVM open "Game Options" and chose the "Audio" tab. Check "override global audio settings" and then chose "IAC Driver Bus 1 [CoreMIDI]" as the music device. Leave everything else the same and hit OK. In my case, I fired up Space Quest 6 and after the unskipable Sierra intro animation which uses recorded audio, the title screen should start playing on the SC-55 in perfect glory!

{% include youtube.html embed="TZu2ureESFQ" title="Space Quest 6 - Title Screen (Nuked SC-55)" %}

I don't know how to set it up in DOSBox, I've never tried, but I imagine it's the same exact process for setting any MIDI device via some config or maybe a menu if you're using DOSBox-X.

Another fun test is to fire up [Chiptune.app](https://chiptune.app){:target="_blank"} with Google Chrome (for web MIDI) and try playing some of the _excellent_ Sound Canvas MIDI files on "real hardware". Might I suggest trying the _incredible_ album "[Bossa Nova Time](https://chiptune.app/browse/Roland%20SMF%20MIDI%20Disks/RJL-2007J%20-%20Bossa%20Nova%20Time%20(1992)%20(Masashi%20&%20Kazuko%20Hirashita%20+%20Ikuo%20Kakehashi)/){:target="_blank"} (1992)" from Masashi & Kazuko Hirashita + Ikuo Kakehashi? You may be teleported to a familiar and relaxing place! In fact, you might find that listening to these amazing MIDI files on a "real" Sound Canvas is actually more enjoyable than most of the games! Just click any file name and it will start playing but using the default children's toy-esque GMGSx Plus SoundFont. Open the settings tab in the top right and change the synth engine to "MIDI Device (Web MIDI)" and make sure you select the "IAC Driver" as the MIDI device. Your ears will immediately be bathed in the glory of Sound Canvas bossa nova.

{% include youtube.html embed="lJhAmelZxMo" title="Nova Bossa Nova (1995) Masashi & Kazuko Hiroshima" %}

Congratulations, you are now living!

What do you think, was that worth it? Let me know what you think!

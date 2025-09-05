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

This is still a work-in-progress! For now, follow along with my video tutorial:


{% include youtube.html embed="jkLAUAuQYNM" title="How to install Windows 98 on 86Box" %}

[**Download 86box.cfg↘**](/public/86box.cfg)

{% include external_link.html href="https://86box.net" text="86box.net" %}

{% include external_link.html href="https://github.com/oerg866/win98-quickinstall" text="win98-quickinstall" %}

{% capture compiled_preview %}
{% comment %}
```ini
[3dfx Voodoo3 3500 SI]
bilinear = 1
chromakey = 1
dithersub = 1
dacfilter = 0
render_threads = 2

[General]
emu_build_num = 7600
sound_gain = 4
vid_renderer = qt_software
video_filter_method = 0
video_fullscreen_scale = 3

[Machine]
cpu_family = pentium2_deschutes
cpu_multi = 3
cpu_speed = 200000000
cpu_use_dynarec = 1
fpu_type = internal
machine = prosignias31x_bx
mem_size = 131072

[Video]
gfxcard = voodoo3_3500_si_agp

[Input devices]
keyboard_type = keyboard_at
mouse_type = ps2

[Sound]
sndcard = sb16_pnp

[Network]
net_01_link = 0
net_02_link = 0
net_03_link = 0
net_04_link = 0

[Storage controllers]
fdc = none

[Hard disks]
hdd_01_fn = catskull.vhd
hdd_01_ide_channel = 0:0
hdd_01_parameters = 63, 16, 40634, 0, ide
hdd_01_speed = ramdisk
hdd_01_vhd_blocksize = 4096

[Floppy and CD-ROM drives]
cdrom_01_ide_channel = 0:1
cdrom_01_image_path = 
cdrom_01_parameters = 1, atapi
cdrom_01_speed = 72
fdd_01_image_history_01 = 
fdd_01_type = 35_2hd
fdd_02_type = none
```
{% endcomment %}
<div class="highlight highlight-source-ini"><pre><span class="pl-en">[3dfx Voodoo3 3500 SI]</span>
<span class="pl-k">bilinear</span> = 1
<span class="pl-k">chromakey</span> = 1
<span class="pl-k">dithersub</span> = 1
<span class="pl-k">dacfilter</span> = 0
<span class="pl-k">render_threads</span> = 2

<span class="pl-en">[General]</span>
<span class="pl-k">emu_build_num</span> = 7600
<span class="pl-k">sound_gain</span> = 4
<span class="pl-k">vid_renderer</span> = qt_software
<span class="pl-k">video_filter_method</span> = 0
<span class="pl-k">video_fullscreen_scale</span> = 3

<span class="pl-en">[Machine]</span>
<span class="pl-k">cpu_family</span> = pentium2_deschutes
<span class="pl-k">cpu_multi</span> = 3
<span class="pl-k">cpu_speed</span> = 200000000
<span class="pl-k">cpu_use_dynarec</span> = 1
<span class="pl-k">fpu_type</span> = internal
<span class="pl-k">machine</span> = prosignias31x_bx
<span class="pl-k">mem_size</span> = 131072

<span class="pl-en">[Video]</span>
<span class="pl-k">gfxcard</span> = voodoo3_3500_si_agp

<span class="pl-en">[Input devices]</span>
<span class="pl-k">keyboard_type</span> = keyboard_at
<span class="pl-k">mouse_type</span> = ps2

<span class="pl-en">[Sound]</span>
<span class="pl-k">sndcard</span> = sb16_pnp

<span class="pl-en">[Network]</span>
<span class="pl-k">net_01_link</span> = 0
<span class="pl-k">net_02_link</span> = 0
<span class="pl-k">net_03_link</span> = 0
<span class="pl-k">net_04_link</span> = 0

<span class="pl-en">[Storage controllers]</span>
<span class="pl-k">fdc</span> = none

<span class="pl-en">[Hard disks]</span>
<span class="pl-k">hdd_01_fn</span> = catskull.vhd
<span class="pl-k">hdd_01_ide_channel</span> = 0:0
<span class="pl-k">hdd_01_parameters</span> = 63, 16, 40634, 0, ide
<span class="pl-k">hdd_01_speed</span> = ramdisk
<span class="pl-k">hdd_01_vhd_blocksize</span> = 4096

<span class="pl-en">[Floppy and CD-ROM drives]</span>
<span class="pl-k">cdrom_01_ide_channel</span> = 0:1
<span class="pl-k">cdrom_01_image_path</span> = 
<span class="pl-k">cdrom_01_parameters</span> = 1, atapi
<span class="pl-k">cdrom_01_speed</span> = 72
<span class="pl-k">fdd_01_image_history_01</span> = 
<span class="pl-k">fdd_01_type</span> = 35_2hd
<span class="pl-k">fdd_02_type</span> = none</pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="86box.cfg"
  copy=1
%}

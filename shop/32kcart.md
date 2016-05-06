---
layout: store
title: 32k Gameboy Flash Cart
description: The shop page where I sell a 32k Gameboy Flash cart
---
# 32k Gameboy Flash Cart

<div class="gallery">
	<img src="{{ site.baseurl }}public/gallery/1.jpg" alt="Arduinoboy front" id="gallery_image" onclick="cycle(1); return false;">
	<p id="gallery_subtitle">Arduinoboy front</p>
	<p id="gallery_pos_text">1/12</p>
	<div id="gallery_nav">
		<p id="gallery_nav_left" onclick="cycle(0); return false;">←</p>
		<p id="gallery_nav_right" onclick="cycle(1); return false;">→</p>
	</div>
</div>

## Carts go on sale in:

<div class="countdown"></div>

<table>
	<form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
	<input type="hidden" name="cmd" value="_s-xclick">
	<input type="hidden" name="hosted_button_id" value="HR9N7YC3CJ52L">
	<table>
	<tr><td><input type="hidden" name="on0" value="Rom">Rom</td></tr><tr><td><select name="os0">
		<option value="Chord 1.0.5">Chord 1.0.5</option>
		<option value="Deathray">Deathray (free version)</option>
		<option value="Nintendo Test Cartridge">Nintendo Test Cartridge</option>
		<option value="Drum Tech">Drum Tech (free version)</option>
		<option value="GB Sound">GB Sound</option>
		<option value="Gradual Decline">Gradual Decline</option>
		<option value="Ikinari Bopper">Ikinari Bopper 1.5</option>
		<option value="mGB">mGB</option>
		<option value="Muddy GB">Muddy GB</option>
		<option value="Music Tech V1">Music Tech V1 (free version)</option>
		<option value="Music Tech V2">Music Tech V2 (free version)</option>
		<option value="nanosynth">Nanosynth</option>
		<option value="nanovoice">Nanovoice</option>
		<option value="Nanoloop 1.5 Demo">Nanoloop 1.5 Demo</option>
		<option value="Pushpin">Pushpin</option>
		<option value="REZ">REZ</option>
		<option value="Shitwave">Shitwave</option>
		<option value="Sound Demo">Sound Demo</option>
		<option value="Stepgirl">Step Girl</option>
	</select> </td></tr>
	</table>
	<!-- <input type="image" src="http://i.imgur.com/F8q9q3g.png" border="0" name="submit"> -->
	</form>
</table>

## Details:

**International buyers: [contact me](mailto:bro@catskull.net) before purchasing.**

Carts ship within **5** business days.

Shipping is flat rate $3 in the US.

These carts are dead simple, only capable of handling roms up to 32k in size. There is no mapper, no SRAM, no battery, no RTC. Just a rom. It cannot play Pokemon or LSDJ so please don't ask me.

You can send me a custom rom and I'll make sure it works before I send it to you! No commercial roms please.

The price includes an aftermarket Gameboy cartridge shell. The quality is not as good as official shells, but it's still quite good. The PCB will fit in an official shells so if you really wanted you could swap the shell out. The PCB will also fit inside a Gameboy Advance shell. It will not boot GBA games, but the idea is that you can have original Gameboy roms on a cart that will not protrude out of the GBA. A small modification is required in order for the GBA to boot in Gameboy Color mode. Contact me for more information.

No cartridge label is included.

Rom is re-flashable with most cart flashers. If you don't have a flasher but would like your cart re-flashed in the future, you can ship it back to me and provide me return postage and I'll re-flash it for you. Or you could just buy another cart, since it's probably cheaper than shipping it back and forth.

All boards are HASL coated. What that means is that they're more susceptible to corrosion than OEM games. For most people, that will not cause any issues, but if you're worried about it I suggest you do not buy a cart.

I will ship to the address entered on the PayPal checkout page, so please double check to make sure it's correct.

By purchasing from me, you are agreeing to these terms and conditions and acknowledging that you have read this page.

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="/public/js/flipclock.min.js"></script>
<script type="text/javascript">
	var current = (new Date().getTime())/1000;
	var end = (new Date('May 9, 2016 18:00:00 UTC').getTime())/1000;
	var offset = new Date().getTimezoneOffset() * 60;
	var clocktime = (end - current + offset);

	var clock = $('.countdown').FlipClock(clocktime, {
		clockFace: 'DailyCounter',
		countdown: true
	});
</script>

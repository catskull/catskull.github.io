---
layout: post
title:  "Bluetooth Arduinoboy"
date:   2016-03-02
category: old
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/WFhn3Nysnh0" frameborder="0" allowfullscreen></iframe>

I've been selling Arduinoboys [in my shop](http://shop.catskull.net) for a few months now. It's been going good, I've done a few revisions that add some features and make it easier to use.

One idea I had was to make the arduinoboy fully wireless by using a cheap bluetooth to UART adapter. There are several varieties available, and they're all equally cheap and crappy. I chose the HC-06 model since it seemed easy to use.

If you didn't know, the MIDI protocol is just a regular old UART, with a few special things added on the input lines for isolation. What that means is that pretty much any UART device could potentially act as a MIDI device. So in my case, all I needed to do was to hook up the TX/RX lines of the HC-06 to the RX/TX lines of the arduino, and I should be in business!

One thing about the HC-06 is that it uses 3.3v logic level on the RX/TX pins. It it NOT 5v tolerant. I learned that the hard way by blowing a module up! For my use, I would be interfacing with a 5v Arduino that the arduinoboy runs on. Luckily, 3.3v logic level is compatible with the Arduino, so sending data in to the arduino works great. It's sending data out that's the problem. You could use a simple voltage divider to convert it though, it's just two resistors.

For my purpose, I just decided with sending midi data in to the arduinoboy, and left the RX line of the HC-06 disconnected. Maybe in the future I'll do midi out as well, but not now.

The HC-06 is programmed using old-school AT commands. Thanks to my internship working with XBEE's though, I am well versed in dealing with AT commands. The XBEE really makes a module like the HC-06 look like a piece of crap though! The HC-06 supports a few standard baud rates that are set by an AT command, but it doesn't support non-standard rates at all. MIDI uses a baud of 31250 bps. That is non-standard. What that means is I couldn't just plug the HC-06 into a midi device and expect it to work. Instead, I chose a baud rate that was in the ballpark: 38400. Note that at this point the baud doesn't matter. If it's not the same, it might as well be any value.

Fortunately, I have full control over the code that runs on the arduinoboy. I can reprogram it to respond to a different baud rate! And that's exactly what I did. My first attempt was to use some of the unused digital I/O to create a software serial. That actually worked! So I could have both worlds at the same time, standard MIDI in, and my wireless creation!

I noticed a pretty big issue though. Notes were dropping like crazy. If I played too fast, it was just not working at all. I assumed that it was due to the software serial having some lag, so I hooked it up to the regular RX pin of the arduino and just changed the baud rate the code was working on. Well, I got the exact same results.

As I thought about it more and more, trying to determine where the lag was coming from, it occurred to me that bluetooth isn't super great about real-time communication. I mean, it's pretty good depending on what you're doing, but a $3 Chinese bluetooth module was probably the bottleneck.

I posted my progress on Twitter and Peter Swimm suggested using a Bluetooth low-energy module, as he had heard those had lower latency. A quick consultation to the wikipedia article confirmed that. Standard bluetooth has about a 100ms latency, while BTLE has only a 3ms latency! 100ms seems to be about what I was seeing as well.

So at this point, the cheapie bluetooth modules are probably out of the question. I could maybe find a Chinese BTLE module that does the same thing though. Adafruit sells a module that is exactly what I need, but it's like $17. My goal with this project was just to add wireless functionality for as little cost as possible. Given that my arduinoboys start at just $16 each, it seemed uneconomical. I might order the Adafruit module just to see if it would work, but at this point it's not going to be super cheap.

Still, the proof of concept is there. If you REALLY have to have a bluetooth MIDI device, then I could probably make you one.

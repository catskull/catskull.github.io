---
layout: post
category: post
date: 2024-03-25
title: History & Overview of Graphics APIs on Apple MacOS
---

On June 22, 2020, in the midst of a worldwide pandemic and lockdowns, Apple CEO Tim Cook announced that Apple would begin a 2-year transition to move their desktop computers away from Intel produced x86-64 microprocessors to their own design based in ARM's 64 bit architecture. When the first M1 Macbook Air was released a few months later, I couldn't resist. Having been very underwhelmed by the Intel chip's performance in my Macbooks, despite being high end options (anyone remember "fans going to 11"?). From my perspective, that was the single greatest leap in personal computer performance in my lifetime. It seemed almost not possible how much performance you could get out of a chip at such low power. I eventually traded in that base model (only 8GB ram!!) for a 14" M1 Pro (16GB/512GB). The 14" Macbook Pro is the the single best computer ever made.

I am very interested in emulation - specifically the huge advancements that have been made emulating Xbox, Xbox 360, Wii U/Switch, PS2/3, and even regular old x86 via PCem or 86Box. I grew up playing NESticle, SNES9x, DOSBox, Project64, and others. I spent a summer in middle school softmodding an OG Xbox and installing various emulators on it. In a lot of ways, I think I could credit the concept of emulation for the success I've had as a professional software engineer. However, as an adult I haven't had any Windows computers to play games on because I use Mac. Gaming on Mac has historically been pretty terrible. I remember playing Bioshock Infinite on my specced-out 2013 15" MBP and I seriously thought it was going to melt or warp somehow due to how hot it got. There were a few highlights with Mac ports such as OpenEmu and StarCraft but for the most part we're in the dark. I actually bought an Xbox One but found it too hard to use - I only have time to play infrequently and every time I turned it on it would need hours to update.

So when the transition to Apple Silicon happened, we finally had enough compute to do some pretty decent gaming. This has resulted in a lot of additional interest in using that compute for emulation. Turns out, thanks to a lot of mostly thankless works by some developers who I aspire to be, you can get really great emulation peformance out of even base model chips. We've also had some first-party AAA games launch on MacOS native including Death Stranding, Resident Evil 4, and Assasin's Creed Origin. I find it hard to believe that just 10 years ago the best Macbook you could buy would experience a nuclear meltdown playing a not even that new of a game.

As I've researched and configured various modern emulators, I have become fascinated specifically with the history of Apple's use of graphics APIs. I've spent countless hours reading the various excellent Wikipedia pages about all of these libraries, APIs, companies, and their histories. I thought I'd compile this knowledge into a single article. I will do my best to reference the related Wikipedia pages or direct sources where applicible.

Below I've created a chart depicting the rough timeline of coomputer graphics APIs in general but specifically as they relate to Apple's use.

<aside>
<figure style="margin:0;">
<div class="highlighter-rouge">
  <pre>
    <code style="border-left:none;font-size:70%;padding:0;white-space:pre;color:initial;background:initial;">    
┌───────────────╖                     
│ 2024+       ┅ ║   𝘛𝘪𝘮𝘦𝘭𝘪𝘯𝘦 𝘰𝘧 𝘊𝘰𝘮𝘱𝘶𝘵𝘦𝘳  
├───────────────╢   𝘎𝘳𝘢𝘱𝘩𝘪𝘤𝘴 𝘈𝘗𝘐𝘴        
│ Translation   ║                     
│  APIs         ║                     
│               ║    ┌───────────────╖
│ AAA Games     ◀────┤ 2023        ┅ ║
╘═══════════════╝    ├───────────────╢
                     │ D3DMetal/     ║
┌───────────────╖    │  GPTK         ║
│ 2022        ┅ ╠════▶               ║
├───────────────╢    ╘═══════════════╝
│ Metal 3/      ║                     
│  MetalFX      ║    ┌───────────────╖
│               ◀────┤ 2020        ┅ ║
╘═══════════════╝    ├───────────────╢
                     │ Apple         ║
                     │ Silicon       ║
┌───────────────╖    │               ║
│ 2018        ┅ ╠════▶ DX12 Ultimate ║
├───────────────╢    ╘═══════════════╝
│ OpenGL        ║                     
│ deprecated    ║                     
│               ║                     
│ MoltenVK      ║    ┌───────────────╖
│ Open Sourced  ◀────┤ 2016        ┅ ║
╘═══════════════╝    ├───────────────╢
                     │ Vulkan        ║
┌───────────────╖    │               ║
│ 2015        ┅ ╠════▶ MoltenVK 1.0  ║
├───────────────╢    ╘═══════════════╝
│               ║                     
│ DirectX 12    ║    ┌───────────────╖
│               ◀────┤ 2014        ┅ ║
╘═══════════════╝    ├───────────────╢
                     │               ║
┌───────────────╖    │ Metal         ║
│ 2001        ┅ ╠════▶               ║
├───────────────╢    ╘═══════════════╝
│ MacOS X       ║                     
│ with OpenGL   ║    ┌───────────────╖
│               ◀────┤ 1996        ┅ ║
╘═══════════════╝    ├───────────────╢
                     │               ║
                     │ Direct3D      ║
┌───────────────╖    │ (DirectX 2.0) ║
│ 1995        ┅ ╠════▶               ║
├───────────────╢    ╘═══════════════╝
│ Windows Game  ║                     
│  SDK          ║                     
│ (DirectX 1.0) ║                     
│               ║                     
│ Apple         ║    ┌───────────────╖
│ Quickdraw 3D  ◀────┤ 1992        ┅ ║
╘═══════════════╝    ├───────────────╢
                     │               ║
┌───────────────╖    │ OpenGL 1.0    ║
│ 1982        ┅ ╠════▶               ║
├───────────────╢    ╘═══════════════╝
│ Silicon       ║                     
│  Graphics     ║      2024 catskull  
│ IRIS GL 1.0   ║           CC BY-SA  
╘═══════════════╝                     
    </code>
  </pre>
</div>
</figure>
</aside>

In the beginning, there was Silicon Graphics (SGI). They developed the first graphics-specific API as IRIS GL in 1982. Despite dominance in the PC space, large competitors such as IBM apparently skipped their geometry classes. Instead of innovating on their own, industry partners eventually pressured SGI to open source a version of their IRIS GL as OpenGL 1.0 in 1992.

One afternoon in 1994 Bill Gates rolled out of bed, jumped in his imported 1983 Toyota AE86 and thought to himself "If I can't own computer graphics, I don't want to be alive." Windows was getting ready to launch and he didn't a have anything for gaming. Luckilly and unbeknowst to him, a couple of really smart Microsoft engineers causally working in their free time on some graphics stuff for gaming. It was pretty chill, they named their work the "Manhattan Project" because they wanted to drop a nuke on the stranglehold Japanese companies had on video games. The project was released in 1995 as "Windows Game SDK". Everything was great until Bill Gates showed up at the '95 Game Developers Conference in his '86 and Hideo Kojima ran up to say how much he loved the car (being a huge fan of the anime) but it turns out Bill Gates didn't even watch Initial D - HE JUST SAW THE CAR ON A CALENDAR IN THE OFFICE - so everyone in the industry thought Microsoft was pretty lame for a while. Until - one night, Bill Gates called John Carmack at like 3am or something and literally begged him to let Microsoft port Doom to Windows and finally after (I swear) an hour John just said 'fine' and hung up.

Here's where the story gets really crazy.

One of the very biggest gamers of all time worked for Bill - Gabe Newell. Gabe had been a producer for Windows OS releases for the last 13 years but when Doom came out only on MS-DOS, he felt like a complete joke. "If I can't game on Windows, what game can on I?" he said to himself. So one day, Gabe walked past Bill's office and happened to see him playing Doom. Being an out-of-character cool moove for the otherwise snail-like Gates, Gabe decided to investigate. Apparently Bill could not even get past the first level of Doom. Gabe could tell Bill had been crying but decided to just let it slide. After Gabe showed Bill that the green stuff on the ground was acid and killed you, he showed him the secret chainsaw and Bill had a lot more fun with that. "Hey, you're pretty good at games for being a janitor - was it Grape?" Bill said disinterestedly. "John Carmack called me last night crying about how they were trying to port Doom to Windows but our graphics API is so advanced (he specifically said it was better than anything SGI has ever made) they were having trouble so I told him I could probably take care of it this weekend for him. I'm totally just going to blow him off though, this game isn't even fun and I've been playing for 9 hours straight."

Gabe walked out of Bill's office and went to tell the two smartest engineers he'd worked with on Windows about how bad Bill sucked at Doom. "I could literally frag him while afk. He was getting killed by the acid ffs!" It came up during the conversation about how John was crying about Windows so the three of them took a peek under the hood and it turns out they could port it pretty easily to Windows, probably only a week or two. However they'd just released Windows 95 and had capped out their bonus for the year so they decided to take the rest of the year off playing Doom and making fun of Bill Gates behind his back.

In August of 1995 Gabe remembered they had ported Doom to Windows and he sent the files back to John Carmack. It was released as _technically_ the first DirectX game. After it came out Bill totally tried to pretend he loved Doom. He made a bunch of commercials staring himself takling about how good he was at Doom. Already chaffed, Gabe overheard someone talking about how Bill didn't even know what Initial D was and decided that was the last straw. One of Gabe's friends had recently quit Microsoft after years of that kind of BS to work at id Software to work on Quake and kept emailing Gabe pictures of cool cars to make him jeleous. It worked. Gabe called up his buddy Mike and said "You ready to blow this joint?" "I'm in.", Mike replied.

They named their new company Valve.

"A Valve? You can't even see through that!" exclaimed Bill Gates when he heard the news. Rebuffed and desparate to make up for his huge faux pas at last years' GDC, Bill went all out for GDC 1996. He showed up wearing a toga in a chariot pulled by actual lions (is that technically even legal?). Luckily, his team had a secret weapon: Direct3D. Direct3D is a component of the DirectX suite of game development tools and was designed to compete directly with OpenGL. Most people thought the tech was pretty cool, but the lions weren't enough to make up for the Initial D mishap so a lot of people were still hesitant to use Direct3D over the open source OpenGL. Nevertheless, Microsoft made a video showing Bill Gates pretending to play MechWarrior against Charles Barkley over a network so a lot of people thought that was cool and decided to use Direct3D.

Meanwhile, Apple was going through some strong emotions. They were feeling a little left out with all this graphics business so they released their own graphics API - QuickDraw 3D. This was powered by a low level RAVE rendering engine which is a lot of names to call something pretty much nobody cared about. Apparently there were ports of Quake and Unreal and this cool game called WaterRace which is now open source. In 1999 Steve Jobs took a heroic dose and realized he could combine NeXT and Apple to make a cool new operating system called "OS X" but a pillar of fire appeared and forbade him from using QD3D so he had to go with OpenGL. Then these weird guys from Chicago named "Bungie" showed up talking about some "Halo" game they were going to make so Steve told them it would be chill if he announced the game as coming to the new OS at Macworld 1999. By the time it actually realeased two years later, Bungie had entered an exclusive agreement with Microsoft to debut Halo on the Xbox. Steve Jobs hated video games ever since.

In November 1999, Valve released their first game: Half-Life. Exclusively for Microsoft Windows, built using Direct3D. It sold a bajillion copies. Over the following two decades, Microsoft would continue to develop and support DirectX, porting it to their Xbox platform as DirectXbox and generally dominating the PC gaming sphere. 

OSX ended up being a pretty popular consumer desktop platform, eventually building a small but significant minority share in the overall PC OS market, monopolized by Microsoft. Valve made a few more hit games and Gabe ended up batteling a balrog for 1000 years but was resurrected as "Gaben". Gaben made a distribution platform for Valve's games called "Steam". By the late 2000's, Steam had become the defacto solution to PC game distribution and largely solved piracy thanks to mostly being DRM-free. Occasionally, Steve Jobs would troll Gaben by pretending to care about gaming but never really did anything to make it happen.

Over Thanksgiving 2009, Gaben's neice was visiting from college and asked him to help her get Crysis running on max settings on her 11" Macbook Air. Gaben took a look around to see what games were available on Mac and after playing Super Tux Kart for 8 seconds - immedediately decided he couldn't live in a world where Mac users were submitted to such horrific gaming. Even though Steve Jobs was still kind of a jerk, Gaben knew that as the one true gaming messiah, he needed to bring gaming to the masses. Valve released Steam on MacOS and started porting all their games to Mac. All purchases were cross platform, if you owned the Windows version you go the Mac for free. Portal 2, released in 2011, was the first game Valve game with both native Mac and Windows ports at launch. Not that it ran very well on Mac, but, I mean, _techincally_ it was pro-gaming.

A big part of the reason Steve Jobs trolled Gaben so much was that his iPhone thing was a really big deal. Everybody knew it, especially Bill Gates, and _espcially_ Steve Ballmer who had a bright career ahead of him as a basketball team owner and not as a technology CEO. That success allowed the Apple beehive to do it's thing and start efficiency optimizing everything which resulted in them aquiring companies to design their own iPhone SOC's in-house. Starting in 2010 with the iPhone 4's A4 processor, all subsequent iOS devices, including iPad, Apple TV, Apple Watch, Homepod, AirPods, etc have used so-called "Apple silicon". This level of vertical integration is topped probably only by Samsung because they _are_ the fab. In fact Samsung manufacutred that first A4 and is still a constant silicon fabrication partner for Apple.

In 2011 Steve decided he was ready to do something else for a while, so he called up his good buddy Tim Cook and told him he needed him to be the CEO of Apple for a while. "But what if I don't know what to do?" Tim asked Steve. "Just follow your heart, like you did when you were at Compaq. Remember that Tim?" "Yeah. I remember." Tim replied. Steve had a lot of great reasons to chose Tim as well - he had somehow navigated the insanity of the 00's era Apple product launches and kept those iDevices on the shelves. Remember when you couldn't buy a Wii for a year? Remember how you still can't really buy an Xbox or Playstation?

In late September 2011, Steve Jobs called Gaben on the phone. "Listen," Steve said. "I want you to know that I really respect the work you've done in PC gaming. You took the success of a platform like iTunes and fixed the entire gaming market. If I had a few more years I'd love to work together on some fun stuff." "Don't worry Steve" Gaben replied "I get it. Just so you know my first computer was an Apple II" "Oh wow." Steve replied.

Turns out, Steve was right about Tim Cook. There was this creepy guy who'd always kind of just hang around creepily at parties and stuff named Larry Elison who went all on the news saying Apple would tank because it tanked the last time Steve Jobs left. But nobody really took Larry very seriously anymore after him and John McAfee got caught snorting a line in the bathroom at an airport Chili's in Tuscon. Tim kept the ball rolling pretty much without a hitch except for this weird stint he had where he suddenly became _obessed_ with butterflies for a few years. Other than that, it was pretty good.

The Apple beehive kept doing it's thing and they decided they needed to do something about GPUs in their silicon. By 2014 OpenGL was kind of a piece of crap that everyone hated. Some people claimed that Super Tux Kart was a fun game but pro gamers knew better. Because of the way that the consumer GPU industry converged into just a few major vendors with extremely closed-source architectures, they'd usually be the ones to code up an OpenGL or Direct3D compliant driver unless you were crazy enough to reverse engineer the driver and make your own and call it MESA. But nobody was that crazy. And here's the thing about when hardware vendors do software dev in-house: by the time the boards have all been soldered together, everyone in the building is so high from the solder fumes that when they try to write the software the best they can do is 2+2=5 and the developers and users of games have to play a game where it's trying to tell them 2+2=5 and Nvidia will literally sit there with a straight face and say "It does. Gonna cry?"

Apple themselves had been subjected to this Nvidia tomfoolery a few times so they decided to go ahead and design their own low level graphics API to replace OpenGL called Metal. They claimed to name it that because it's "close to the metal" as in "you pretty much have to be a demoscene assembly coder to use this", but I am actually very pleased to announce that I know for a fact it's because Craig Federighi saw Van Halen live at age 10. Metal launched in 2014 on iOS devices using the A7 chip. A year later they brought the API to OS X.

By 2017, things at Apple were going even better than before. Metal was doing great, literally everyone is happy. Steve Jobs appeared at WWDC 2017 as an Obi-Wan Kenobi style Jedi hologram and unvealied the first physical evidence of Apple's master plan: the A11 Bionic. They named it bionic because it had a GPU designed by Apple. We now have a situation where for the first time possibly ever a company has attained complete vertical integration in their CPU, GPU, OS, SDK, etc. They designed the API _and_ the hardware. Very interesting. The results were solid too, a 30% increase in graphics performance over the previous years' A10.

Secretly Nvidia was really pissed that Apple was dissing their drivers so bad but deep down they knew it was true. Some of the OpenGL people thought "What if we make our own low-level graphics API that's open source? Since it's so low-level, it will be a lot easier for the Nvidia people to write a driver after they fill their building with reflow fumes." They had to beg for a while but eventually Vulkan was released in 2016 as the successor to OpenGL. Unfortunately that ship had already sailed at Apple and in 2018 they deprecated OpenGL on all platforms in favor of  Metal. Apple was turning Metal up to 11.

One day in 2018, Gaben was on his 5th consecutive hour of transidental meditation when the Jedi ghost of Steve Jobs whispered "You promised you'd always support Mac gaming." Gaben dropped 3 inches to the floor. He had a problem, but he liked that feeling. Valve was all in on Vulkan. It totally ruled and finally Bill Gates would have to finally stop pretending to be a pro gamer and that he invented DirectX and ported Doom to Windows. But Tim Cook didn't know about that last call with Steve and nobody would really understand anyways. They had Metal and he had Vulkan. They had just... drifted apart. Gaben had seen a lot of his friends spend a lot of time suing each other and accomplishing nothing. He knew there had to be a better way. He fired up Debian IceWeasel and hit askjeeves.com. "Vulkan on Metal" he typed in the search box.

Turns out some company calling themselves "The Brewnwill Workshop" out of Toronto had a proprietary library called MoltenVK which translated Vulkan API calls to Metal equivilant, with some limititations. Gaben was just coming out of a 6 month Dota 2 bender so he decided to see if he could get it running on a Mac using MoltenVK.

"Hey Siri, tell my assistant to buy me a Macbook" Gaben said as he went back to finish meditating.

"I found some web results. I've sent them to your iPhone." Siri responded cheerfully.

After a quick fiasco with an accidental firing over a Macbook purchase, Gaben got Dota running pretty well with MoltenVK. Only problem - it had a commercial license so Gaben needed to work some magic. Turned out most of the MoltenVK work was done but a guy named Bill Hollings so Gaben had him flown out to Valve. Gaben and Bill went out for some pizza at this local gem near the office. After exchanging stories about fragging Bill Gates on Doom 2 in the good old days, Gaben got down to business. "Bill, I want to buy MoltenVK" Gaben said. Bill didn't want to sell. After spending a couple of decades doing fintech, Bill had finally hit his green pasture. He was doing God's work and he was good at it. He wanted to keep working on MoltenVK. It was the same kind of passioin Gaben had felt in himself all those years ago when he ported Doom to Windows with no help from Bill Gates whatsoever. Gaben knew what he had wanted when he started Valve - freedom. He figured Bill Hollings wanted the same thing he had wanted, so he offered it to him. "I want to buy every developer a MoltenVK license, in advance. Name the price. You keep working on MoltenVK as you already are but the works needs to be open source." "Sounds great" Bill replied "Just one more thing - I want to see Half-Life 3."

On Feb. 26, 2018 Gaben posted on his blog that MoltenVK was open source.

One night in late 2019, Tim Cook had a dream that was kind of a nightmare. He had a dream that he was running on MacOS on his iPad Air (3rd Generation) and it ran _so smoothly_. The only problem was there was no way to predictiably input anything, it was like it had a mind of it's own and it kept going into voiceover and saying really crazy stuff like "Tim this is Steve Jobs. I want you to ditch Intel finally and run MacOS on the iPad chips." The next morning Tim called the whole gang together. He presented what appeared to be an iPad Air (3rd Generation) duck taped to a Mac Mini. "What is this?" Tim asked with a straight face. ...silence. Tim did that weird fake ventriloquist voice thing and said "Is it a iPad Air (3rd generation) duck taped to a Mac Mini?" "Precisely!" Tim responded, exstatic. "I spent all night on this. _This_ is what we need to make."

Jony Ive resigned from Apple the next day.

That brings us back to June 22, 2020 - WWDC. Tim Apple was like "Guys, it's really happening." In November of that year Apple released the M1 13" Macbook Air. Complete vertical integration on the Mac platform. The final puzzle piece. Gaben bought a Macbook and loaded it up with Crysis on Max settings and delivered it to his neice that Christmas.

Tim only taped a few more iPads to things (including the time he taped two separate iPad Pro's to a Macbook Pro like a sandwich and called it MkUltra). He hasn't really needed to. Everywhere he goes people throw flower pedals and sing angelic songs of praise. One time a guy saw Bill Gates at a burger stand, so he's still alive apparently.

Pretty soon after the M1's release a lot of smart people started looking really closely at the hardware, reverse engineering, documenting, porting, etc. Among the first to adopt MoltenVK and offer native ARM64 Mac builds were the Dolphin (Gamecube/Wii) and RPCS3 (PS3) emulators. The results were very encouraging! More than that, adding Apple builds presented a unique challenge with a big payoff so a lot of open source developers took an interest. Some apps didn't offer a native Apple build but still included MoltenVK such as Cemu (Wii U) and even running through Apple's x86 translation layer (named "Rosetta"), many pro gamers reported getting 4k60.

At the 2022 WWDC, Tim Apple announced the third major revision of Metal which included MetalFX, an upscaler so you can pretend to be playing 4k60 when actually you're only playing 2k60 but you'd never notice. The next year Apple released the Game Porting Tool Kit (GPTK) by suprise. Everyone was super confused. But it turns out, it is mostly a wrapper around WINE with a funky little library called "D3DMetal" which if you've been paying attention so far probably stands for "Direct3D Metal". It is a translation layer, similir to MoltenVK, but instead of translating Vulkan to Metal, it translates DirectX 11/12 to Metal! Very interesting. GPTK is oriented towards game developers who want to port their games, but many pro gamers and hackers figured out ways to use it to run whatever games they wanted.

Later that year at the launch event for the iPhone 15 Pro, Apple announced that "Death Stranding: Director's Cut" and "Resident Evil 4 Remake" which were both "AAA" titles would be coming to the iPhone and Mac. As a young lad I emulated Mario 64 at 10FPS on my OG Xbox. To be playing a modern-gen console quality game on a _phone_ is pretty wild.

In 2024 there continues to be rapid development in the cross platform graphics API space. Zink does OpenGL to Vulkan. MoltenGL (also from the creators of MoltenVK) is a proprietary library for OpenGL to Metal. DXVK does D3D9/10/11 to Vulkan. DXVK-macOS does the same thing on Mac via Wine.

One night in early February 2024, Tim Cook ran into Gaben picking up a Sega Saturn dev kit at a Hard-Off in Hanakoganei. "I got Death Stranding on my phone Tim." Gaben said "It's incredible" Coincidentally, Tim was in Tokyo to meet up with Hideo Kojima about the very game and asked if Gaben wanted to tag along. The three hit it off instantly, reminiscing about how bad Bill Gates sucked at Doom. Kojima told the AE86 story from GDC '95 and Gaben lit up. "So it is true after all. I've wondered all these years. That story is what made me finally quit Microsoft and start Valve".

"Small world" Kojima replied.
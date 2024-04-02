---
layout: post
category: post
date: 2024-04-01
title: History & Overview of Graphics APIs on Apple MacOS
---

On June 22, 2020, in the midst of a worldwide pandemic and lockdowns, Apple CEO Tim Cook announced that Apple would begin a 2-year transition to move their desktop computers away from Intel-produced x86-64 microprocessors to their own design based on ARM's 64-bit architecture[^1]. When the first M1 MacBook Air was released a few months later, I couldn't resist. Having been very underwhelmed by the Intel chip's performance in my MacBooks, despite being high-end options (anyone remember "fans going to 11"?), this was, from my perspective, the single greatest leap in personal computer performance in my lifetime. It seemed almost impossible how much performance you could get out of a chip at such low power. I eventually traded in that base model (only 8GB RAM!!) for a 14" M1 Pro (16GB/512GB). The 14" MacBook Pro is the single best computer ever made.

I am very interested in emulation - specifically, the huge advancements that have been made in emulating Xbox, Xbox 360, Wii U/Switch, PS2/3, and even regular old x86 via PCem or 86Box. I grew up playing NESticle, SNES9x, DOSBox, Project64, and others. I spent a summer in middle school softmodding an OG Xbox and installing various emulators on it. In many ways, I think I could credit the concept of emulation for the success I've had as a professional software engineer. However, as an adult, I haven't had any Windows computers to play games on because I use Mac. Gaming on Mac has historically been pretty terrible. I remember playing Bioshock Infinite on my specced-out 2013 15" MBP and I seriously thought it was going to melt or warp somehow due to how hot it got. There were a few highlights with Mac ports such as OpenEmu and StarCraft, but for the most part, we're in the dark. I actually bought an Xbox One but found it too hard to use - I only have time to play infrequently, and every time I turned it on, it would need hours to update.

So when the transition to Apple Silicon happened, we finally had enough compute power to do some pretty decent gaming. This has resulted in a lot of additional interest in using that compute power for emulation. Turns out, thanks to a lot of mostly thankless work by some developers whom I aspire to be, you can get really great emulation performance out of even base model chips. We've also had some first-party AAA games launch natively on MacOS, including Death Stranding, Resident Evil 4, and Assassin's Creed Origin. I find it hard to believe that just 10 years ago the best MacBook you could buy would experience a nuclear meltdown playing a not even that new of a game.

As I've researched and configured various modern emulators, I have become fascinated specifically with the history of Apple's use of graphics APIs. I've spent countless hours reading the various excellent Wikipedia pages about all of these libraries, APIs, companies, and their histories. I thought I'd compile this knowledge into a single article. I will do my best to reference the related Wikipedia pages or direct sources where applicable.

Below I've created a chart depicting the rough timeline of computer graphics APIs in general, but specifically as they relate to Apple's use.

---

<aside>
<figure>
<div class="highlighter-rouge">
  <pre style="margin: 0;">
    <code class="ascii-table">    
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

In the beginning, there was Silicon Graphics (SGI). They developed the first graphics-specific API as IRIS GL in 1982[^2]. Despite dominance in the PC space, large competitors such as IBM apparently skipped their geometry classes. Instead of innovating on their own, industry partners eventually pressured SGI to open source a version of their IRIS GL as OpenGL 1.0 in 1992[^3].

One afternoon in 1994, Bill Gates rolled out of bed, jumped in his imported 1983 Toyota AE86, and thought to himself, "If I can't own computer graphics, I don’t want to be alive." Windows was getting ready to launch, and he didn’t have anything for gaming. Luckily, unbeknownst to him, a couple of really smart Microsoft engineers were casually working in their free time on some graphics stuff for gaming. It was pretty chill; they named their work the "Manhattan Project" because they wanted to drop a nuke on the stranglehold Japanese companies had on video games. The project was released in 1995 as "Windows Game SDK" [^4]. Everything was great until Bill Gates showed up at the '95 Game Developers Conference in his '86, and Hideo Kojima ran up to say how much he loved the car (being a huge fan of the anime). But it turns out Bill Gates didn’t even watch Initial D - HE JUST SAW THE CAR ON A CALENDAR IN THE OFFICE - so everyone in the industry thought Microsoft was pretty lame for a while. Until one night, Bill Gates called John Carmack at like 3am or something and literally begged him to let Microsoft port Doom to Windows. Finally, after (I swear) an hour, John just said 'fine' and hung up.

<aside class="img-frame">
<figure>
  <figcaption>Bill Gates with his AE86<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/initd.jpeg" alt="Bill Gates with his AE86">
</figure>
</aside>

Here's where the story gets really crazy.

One of the biggest gamers of all time worked for Bill - Gabe Newell. Gabe had been a producer for Windows OS releases for the last 13 years, but when Doom came out only on MS-DOS, he felt like a complete joke. "If I can't game on Windows, I game what on can?" he said to himself. So one day, Gabe walked past Bill's office and happened to see him playing Doom. Being an out-of-character cool move for the otherwise snail-like Gates, Gabe decided to investigate. Apparently, Bill could not even get past the first level of Doom. Gabe could tell Bill had been crying but decided to just let it slide. After Gabe showed Bill that the green stuff on the ground was acid and killed you, he showed him the secret chainsaw, and Bill had a lot more fun with that. "Hey, you're pretty good at games for being a janitor - was it Grape?" Bill said disinterestedly. "John Carmack called me last night crying about how they were trying to port Doom to Windows but our graphics API is so advanced (he specifically said it was better than anything SGI has ever made) they were having trouble, so I told him I could probably take care of it this weekend for him. I'm totally just going to blow him off though; this game isn't even fun, and I’ve been playing for 9 hours straight."

Gabe walked out of Bill's office and went to tell the two smartest engineers he'd worked with on Windows about how bad Bill sucked at Doom. "I could literally frag him while AFK. He was getting killed by the acid, ffs!" It came up during the conversation about how John was crying about Windows, so the three of them took a peek under the hood, and it turns out they could port it pretty easily to Windows, probably only a week or two. However, they'd just released Windows 95 and had capped out their bonus for the year, so they decided to take the rest of the year off playing Doom and making fun of Bill Gates behind his back[^5].

<aside class="right img-frame">
<figure>
  <figcaption>Bill Gates pretending to play Doom<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/billgatesdoom.jpg" alt="Bill Gates pretending to play Doom">
</figure>
</aside>

In August of 1995, Gabe remembered they had ported Doom to Windows and he sent the files back to John Carmack. It was released as _technically_ the first DirectX game. After it came out, Bill totally tried to pretend he loved Doom. He made a bunch of commercials starring himself, talking about how good he was at Doom[^6]. Already chafed, Gabe overheard someone talking about how Bill didn't even know what Initial D was and decided that was the last straw. One of Gabe's friends had recently quit Microsoft after years of that kind of BS to work at id Software on Quake and kept emailing Gabe pictures of cool cars to make him jealous. It worked. Gabe called up his buddy Mike and said, "You ready to blow this joint?" "I'm in," Mike replied.

They named their new company Valve[^7].

"A Valve? You can't even see through that!" exclaimed Bill Gates when he heard the news. Rebuffed and desperate to make up for his huge faux pas at last year's GDC, Bill went all out for GDC 1996. He showed up wearing a toga in a chariot pulled by actual lions (is that technically even legal?). Luckily, his team had a secret weapon: Direct3D. Direct3D is a component of the DirectX suite of game development tools and was designed to compete directly with OpenGL. Most people thought the tech was pretty cool, but the lions weren't enough to make up for the Initial D mishap, so a lot of people were still hesitant to use Direct3D over the open-source OpenGL. Nevertheless, Microsoft made a video showing Bill Gates pretending to play MechWarrior against Charles Barkley over the internet, so a lot of people thought that was cool and decided to use Direct3D[^8].

<aside class="img-frame">
<figure>
  <figcaption>WaterRace for Mac OS<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/waterrace.jpeg" alt="a screenshot of WaterRace for Mac OS">
</figure>
</aside>

Meanwhile, Apple was going through some strong emotions. They were feeling a little left out with all this graphics business, so they released their own graphics API - QuickDraw 3D, powered by a low-level RAVE rendering engine[^9]. This is a lot of names to call something pretty much nobody cared about. Apparently, there were ports of Quake and Unreal[^10] and this cool game called WaterRace, which is now open source[^11]. In 1999, Steve Jobs took a heroic dose and realized he could combine NeXT and Apple to make a cool new operating system called "OS X," but a pillar of fire appeared and forbade him from using QD3D, so he had to go with OpenGL[^12]. Then these weird guys from Chicago named "Bungie" showed up talking about some "Halo" game they were going to make, so Steve told them it would be chill if he announced the game as coming to the new OS at Macworld 1999. By the time it actually released two years later, Bungie had entered an exclusive agreement with Microsoft to debut Halo on the Xbox[^13]. Steve Jobs hated video games ever since[^14].

<aside class="img-frame right">
<figure>
  <figcaption>Half-Life<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/half-life.jpeg" alt="a screenshot of Half-Life">
</figure>
</aside>

In November 1999, Valve released their first game: Half-Life[^16]. Exclusively for Microsoft Windows and built using Direct3D[^17]. It sold a bajillion copies[^18]. Over the following two decades, Microsoft would continue to develop and support DirectX, porting it to their Xbox platform as DirectXbox[^19] and generally dominating the PC gaming sphere[^20].

OS X ended up being a pretty popular consumer desktop platform, eventually building a small but significant minority share in the overall PC OS market[^21], monopolized by Microsoft[^22]. Valve made a few more hit games[^23], and Gabe ended up battling a balrog for 1000 years but was resurrected as "Gaben." Gaben created a distribution platform for Valve's games called "Steam[^24]." By the late 2000s, Steam had become the de facto solution for PC game distribution and largely solved piracy thanks to being mostly DRM-free[^25]. Occasionally, Steve Jobs would troll Gaben by pretending to care about gaming but never really did anything to make it happen[^26].

<aside class="img-frame">
<figure>
  <figcaption>Crysis on a MacBook Air<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/crysis4k60.jpg" alt="Crysis on a MacBook Air">
</figure>
</aside>

Over Thanksgiving 2009, Gaben's niece was visiting from college and asked him to help her get Crysis running on max settings on her 11" MacBook Air. Gaben took a look around to see what games were available on Mac and, after playing SuperTuxKart for 8 seconds, immediately decided he couldn't live in a world where Mac users were subjected to such horrific gaming. Even though Steve Jobs was still kind of a jerk, Gaben knew that as the one true gaming messiah, he needed to bring gaming to the masses. Valve released Steam on macOS and started porting all their games to Mac. All purchases were cross-platform; if you owned the Windows version, you got the Mac for free. Portal 2, released in 2011, was the first Valve game with both native Mac and Windows ports at launch[^27]. Not that it ran very well on Mac, but, I mean, technically it was pro-gaming.

A big part of the reason Steve Jobs trolled Gaben so much was that his iPhone thing was a really big deal. Everybody knew it, especially Bill Gates[^28], and especially Steve Ballmer[^29], who had a bright career ahead of him as a basketball team owner and not as a technology CEO[^30]. That success allowed the Apple beehive to do its thing and start efficiency optimizing everything, which resulted in them acquiring companies[^31] to design their own iPhone SoCs in-house. Starting in 2010 with the iPhone 4's A4 processor, all subsequent iOS devices, including iPad, Apple TV, Apple Watch, HomePod, AirPods, etc., have used so-called "Apple silicon[^32]." This level of vertical integration is topped probably only by Samsung because they are the fab. In fact, Samsung manufactured that first A4 and is still a constant silicon fabrication partner for Apple[^33].

In 2011, Steve decided he was ready to do something else for a while, so he called up his good buddy Tim Cook and told him he needed him to be the CEO of Apple for a while. "But what if I don't know what to do?" Tim asked Steve. "Just follow your heart, like you did when you were at Compaq. Remember that, Tim?" "Yeah, I remember," Tim replied[^34]. Steve had a lot of great reasons to choose Tim as well - he had somehow navigated the insanity of the 00's era Apple product launches and kept those iDevices on the shelves. Remember when you couldn't buy a Wii for a year?[^35] Remember how you still can't really buy an Xbox or PlayStation?

In late September 2011, Steve Jobs called Gaben on the phone. "Listen," Steve said, "I want you to know that I really respect the work you've done in PC gaming. You took the success of a platform like iTunes and fixed the entire gaming market. If I had a few more years, I'd love to work together on some fun stuff." "Don't worry, Steve," Gaben replied, "I get it. Just so you know, my first computer was an Apple II." "Oh wow," Steve replied.

Turns out, Steve was right about Tim Cook. There was this creepy guy who'd always kind of just hang around creepily at parties and stuff named Larry Ellison who went all on the news saying Apple would tank because it tanked the last time Steve Jobs left[^36]. But nobody really took Larry very seriously anymore after he and John McAfee got caught snorting a line in the bathroom at an airport Chili's in Tucson[^37]. Tim kept the ball rolling pretty much without a hitch, except for this weird stint he had where he suddenly became obsessed with butterflies for a few years[^38]. Other than that, it was pretty good.

<aside class="img-frame">
<figure>
  <figcaption>SuperTuxKart<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/tuxkart.png" alt="SuperTuxKart">
</figure>
</aside>

The Apple beehive kept doing its thing, and they decided they needed to do something about GPUs in their silicon. By 2014, OpenGL was kind of a piece of crap that everyone hated[^39]. Some people claimed that SuperTuxKart was a fun game[^40], but pro gamers knew better. Because of the way the consumer GPU industry converged into just a few major vendors with extremely closed-source architectures[^41], the GPU vendor would usually be the ones to code up an OpenGL or Direct3D compliant driver unless you were crazy enough to reverse engineer the driver and make your own and call it MESA[^42]. But nobody was that crazy. And here's the thing about when hardware vendors do software development in-house: by the time the boards have all been soldered together, everyone in the building is so high from the solder fumes that when they try to write the software, the best they can do is 2+2=5, and the developers and users of games have to play a game where it's trying to tell them 2+2=5, and Nvidia will literally sit there with a straight face and say, "It does. Gonna cry?[^43]"

Apple themselves had been subjected to this Nvidia tomfoolery a few times, so they decided to go ahead and design their own low-level graphics API to replace OpenGL, called Metal[^44]. They claimed to name it that because it's "close to the metal," as in "you pretty much have to be a demoscene assembly coder to use this," but I am actually very pleased to announce that I know for a fact it's because Craig Federighi saw Van Halen live at age 10[^45]. Metal launched in 2014 on iOS devices using the A7 chip. A year later, they brought the API to OS X.

<aside class="img-frame right">
<figure>
  <figcaption>Craig Federighi is Metal<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/metal.jpeg" alt="Craig Federighi is Metal">
</figure>
</aside>

By 2017, things at Apple were going even better than before. Metal was doing great, literally everyone was happy. Steve Jobs appeared at WWDC 2017 as an Obi-Wan Kenobi-style Jedi hologram and unveiled the first physical evidence of Apple's master plan: the A11 Bionic. They named it "bionic" because it had a GPU designed by Apple. We now have a situation where, for the first time possibly ever, a company has attained complete vertical integration in their CPU, GPU, OS, SDK, etc. They designed the API and the hardware. Very interesting. The results were solid too, a 30% increase in graphics performance over the previous year's A10[^46].

Secretly, Nvidia was really pissed that Apple was dissing their drivers so badly, but deep down, they knew it was true. Some of the OpenGL people thought, "What if we make our own low-level graphics API that's open source? Since it's so low-level, it will be a lot easier for the Nvidia people to write a driver after they fill their building with reflow fumes." They had to beg for a while, but eventually, Vulkan was released in 2016 as the successor to OpenGL[^47]. Unfortunately, that ship had already sailed at Apple, and in 2018 they deprecated OpenGL on all platforms in favor of Metal[^48]. Apple was turning Metal up to 11.

One day in 2018, Gaben was on his fifth consecutive hour of transcendental meditation when the Jedi ghost of Steve Jobs whispered, "You promised you'd always support Mac gaming." Gaben dropped three inches to the floor. He had a problem, but he liked that feeling. Valve was all in on Vulkan[^49]. It totally ruled, and finally, Bill Gates would have to stop pretending to be a pro gamer and that he invented DirectX and ported Doom to Windows. But Tim Cook didn't know about that last call with Steve, and nobody would really understand anyway. They had Metal, and he had Vulkan. They had just... drifted apart. Gaben had seen a lot of his friends spend a lot of time suing each other and accomplishing nothing. He knew there had to be a better way. He fired up Debian IceWeasel and hit askjeeves.com. "Vulkan on Metal," he typed in the search box.

Turns out, a company calling themselves "The Brewnwill Workshop" out of Toronto had a proprietary library called MoltenVK[^50], which translated Vulkan API calls to Metal equivalent, with some limitations. Gaben, just coming out of a six-month Dota 2 bender, decided to see if he could get it running on a Mac using MoltenVK.

"Hey Siri, tell my assistant to buy me a MacBook," Gaben said as he went back to finish meditating.

"I found some web results. I've sent them to your iPhone," Siri responded cheerfully.

<aside class="img-frame">
<figure>
  <figcaption>Bill Gates posing as a Gamer<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/dewm.jpeg" alt="Bill Gates posing as a Gamer">
</figure>
</aside>

After a quick fiasco with an accidental firing over a MacBook purchase, Gaben got Dota running pretty well with MoltenVK[^51]. The only problem—it had a commercial license, so Gaben needed to work some magic. It turned out most of the MoltenVK work was done by a guy named Bill Hollings, so Gaben had him flown out to Valve. Gaben and Bill went out for some pizza at this local gem near the office. After exchanging stories about fragging Bill Gates in Doom 2 back in the day, Gaben got down to business. "Bill, I want to buy MoltenVK," Gaben said. Bill didn't want to sell. After spending a couple of decades in fintech, Bill had finally hit his green pasture. He was doing God's work and was good at it. He wanted to keep working on MoltenVK. It was the same kind of passion Gaben had felt all those years ago when he ported Doom to Windows with no help from Bill Gates whatsoever. Gaben knew what he had wanted when he started Valve—freedom. He figured Bill Hollings wanted the same thing he had wanted, so he offered it to him. "I want to buy every developer a MoltenVK license, in advance. Name the price. You keep working on MoltenVK as you already are, but the work needs to be open source." "Sounds great," Bill replied, "Just one more thing—I want to see Half-Life 3[^52]."

On Feb. 26, 2018, Gaben posted on his blog that MoltenVK was open source[^53].

<aside class="img-frame right">
<figure>
  <figcaption>M2 Ultra<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/m2ultra.jpeg" alt="M2 Ultra">
</figure>
</aside>

One night in late 2019, Tim Cook had a dream that was kind of a nightmare. He dreamt he was running macOS on his iPad Air (3rd Generation), and it ran so smoothly. The only problem was there was no way to predictably input anything; it was like it had a mind of its own and kept going into voiceover and saying really crazy stuff like, "Tim, this is Steve Jobs. I want you to ditch Intel finally and run macOS on the iPad chips." The next morning, Tim called the whole gang together. He presented what appeared to be an iPad Air (3rd Generation) duct-taped to a Mac Mini. "What is this?" Tim asked with a straight face. ...silence. Tim did that weird fake ventriloquist voice thing and said, "Is it an iPad Air (3rd generation) duct-taped to a Mac Mini?" "Precisely!" Tim responded, ecstatic. "I spent all night on this. This is what we need to make."

Jony Ive resigned from Apple the next day[^54].

That brings us back to June 22, 2020 - WWDC. Tim Apple was like, "Guys, it's really happening[^55]." In November of that year, Apple released the M1 13" MacBook Air[^56]. Complete vertical integration on the Mac platform. The final puzzle piece. Gaben bought a MacBook and loaded it up with Crysis on max settings and delivered it to his niece that Christmas.

Tim only taped a few more iPads to things (including the time he taped two separate iPad Pros to a MacBook Pro like a sandwich and called it MkUltra[^57]). He hasn't really needed to. Everywhere he goes, people throw flower petals and sing angelic songs of praise. One time, a guy saw Bill Gates at a burger stand[^58], so he's still alive apparently.

<aside class="img-frame">
<figure>
  <figcaption>Bill Gates waiting  in line for Dick's<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/gatesdicks1.jpg" alt="Bill Gates waiting  in line for Dick's">
</figure>
</aside>

Pretty soon after the M1's release, a lot of smart people started looking really closely at the hardware, reverse engineering, documenting, porting, etc[^59]. Among the first to adopt MoltenVK and offer native ARM64 Mac builds were the Dolphin (Gamecube/Wii) and RPCS3 (PS3) emulators[^60]. The results were very encouraging! More than that, adding Apple builds presented a unique challenge with a big payoff, so a lot of open source developers took an interest. Some apps didn't offer a native Apple build but still included MoltenVK, such as Cemu (Wii U)[^61], and even running through Apple's x86 translation layer (named "Rosetta"[^62]), many pro gamers reported getting 4k60.

At the 2022 WWDC, Tim Apple announced the third major revision of Metal, which included MetalFX[^63], an upscaler so you can pretend to be playing 4k60 when actually you're only playing 2k60, but you'd never notice. The next year, Apple released the Game Porting Tool Kit (GPTK)[^64] by surprise. Everyone was super confused. But it turns out, it is mostly a wrapper around WINE with a funky little library called "D3DMetal," which if you've been paying attention so far probably stands for "Direct3D Metal." It is a translation layer, similar to MoltenVK, but instead of translating Vulkan to Metal, it translates DirectX 11/12 to Metal! Very interesting. GPTK is oriented towards game developers who want to port their games, but many pro gamers and hackers figured out ways to use it to run whatever games they wanted[^65].

Later that year at the launch event for the iPhone 15 Pro, Apple announced that "Death Stranding: Director's Cut" and "Resident Evil 4 Remake," both "AAA" titles, would be coming to the iPhone and Mac[^66]. As a young lad, I emulated Mario 64 at 10FPS on my OG Xbox. To be playing a modern-gen console quality game on a phone is pretty wild.

In 2024, there continues to be rapid development in the cross-platform graphics API space. Zink[^67] does OpenGL to Vulkan. MoltenGL[^68] (also from the creators of MoltenVK) is a proprietary library for OpenGL to Metal. DXVK[^69] does D3D9/10/11 to Vulkan. DXVK-macOS[^70] does the same thing on Mac via Wine.

One night in early February 2024, Tim Cook ran into Gaben picking up a Sega Saturn dev kit at a Hard-Off in Hanakoganei. "I got Death Stranding on my phone," Gaben said. "It's incredible." Coincidentally, Tim was in Tokyo to meet up with Hideo Kojima about the very game and asked if Gaben wanted to tag along. The three hit it off instantly, reminiscing about how bad Bill Gates sucked at Doom. Kojima told the AE86 story from GDC '95, and Gaben lit up. "So it is true after all. I've wondered all these years. That story is what made me finally quit Microsoft and start Valve."

"Oh wow," Kojima replied.

<figure class="img-frame img-frame-center">
  <figcaption>Gaben, Tim, and Kojima-san in Hard-Off<span class="img-icon">┅</span></figcaption>
  <img src="/public/media/posts/billgrates/hardoff.jpg" alt="Gaben, Tim, and Kojima-san in Hard-Off">
</figure>

---

Footnotes

[^1]: [Apple CEO Tim Cook announced a "two-year transition plan" to Apple silicon on June 22, 2020.](https://en.wikipedia.org/wiki/Mac_transition_to_Apple_silicon)
[^2]: [IRIS GL was a proprietary graphics API created by Silicon Graphics (SGI) in the early 1980s.](https://en.wikipedia.org/wiki/IRIS_GL)
[^3]: [OpenGL is the evolution of SGI's proprietary graphics API IRIS GL, open-sourced and standardized in the early 1990s.](https://en.wikipedia.org/wiki/OpenGL#History)
[^4]: [DirectX Development History](https://en.wikipedia.org/wiki/DirectX#Development_history)
[^5]: [Gabe Newell worked on the Doom 95 port and then quit to start Valve](https://en.wikipedia.org/wiki/List_of_Doom_ports#Microsoft_Windows)
[^6]: [Bill Gates Windows GDC 1996 Promo Video](https://www.youtube.com/watch?v=ixjzFOuLGWE)
[^7]: [Valve Corperation#Founding Wikipedia page](https://en.wikipedia.org/wiki/Valve_Corporation#History)
[^8]: [Jay Barnson, first hand account of Microsoft GDC 1996 party. Truth is stranger than fiction.](https://web.archive.org/web/20060717201712/http://www.rampantgames.com/blog/2006/07/wildest-birthday-party-ever.html)
[^9]: [QuickDraw 3D, or QD3D, was a 3D graphics API developed by Apple Inc., starting in 1995, originally for their Macintosh computers, but delivered as a cross-platform system.](https://en.wikipedia.org/wiki/QuickDraw_3D)
[^10]: [QuickDraw 3D Applications included Quake, Unreal, and Graphing Calculator](https://en.wikipedia.org/wiki/QuickDraw_3D#Applications)
[^11]: [WaterRace GitHub source code](https://github.com/swisspol/WaterRace)
[^12]: [Steve Jobs and the shift from QuickDraw 3D to OpenGL in Apple's software development.](https://en.wikipedia.org/wiki/QuickDraw_3D#Switch_to_OpenGL)
[^13]: [Halo: Combat Evolved development history](https://en.wikipedia.org/wiki/Halo:_Combat_Evolved#Development)
[^14]: [Bob Iger, Vanity Fair. Steve Jobs: "I hate \[comic books\] more than I hate video games"](https://web.archive.org/web/20190920064658/https://www.vanityfair.com/news/2019/09/bob-iger-remembers-steve-jobs)
[^16]: [Half-Life was released in November 1998.](https://en.wikipedia.org/wiki/Half-Life_(video_game)#Release)
[^17]: [Valve used a heavily modified version of the Quake engine called 'GldSrc'. A major addition was support for Direct3D (in addition to OpenGL)](https://combineoverwiki.net/wiki/Half-Life#Development)
[^18]: [Half-Life#Sales](https://en.wikipedia.org/wiki/Half-Life_(video_game)#Sales)
[^19]: [Xbox system software](https://en.wikipedia.org/wiki/Xbox_system_software)
[^20]: [Games for Windows](https://en.wikipedia.org/wiki/Games_for_Windows)
[^21]: [macOS has a 15.33% usage share as of 2023.](https://en.wikipedia.org/wiki/MacOS#Usage_share)
[^22]: [United States v. Microsoft Corp.](https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp.)
[^23]: [Source, Steam, and Half-Life 2](https://en.wikipedia.org/wiki/Valve_Corporation#Source,_Steam,_and_Half-Life_2_(2003–2010))
[^24]: [Steam Wikipedia](https://en.wikipedia.org/wiki/Steam_(service))
[^25]: ["By 2014, total annual game sales on Steam were estimated at $1.5 billion. By 2018, the service had over 90 million monthly active users."](https://en.wikipedia.org/wiki/Steam_(service)#History)
[^26]: [Gabe Newell: "We tried to have a conversation with Apple for several years, and they never seemed to... well, we have this pattern with Apple, where we meet with them, people there go "wow, gaming is incredibly important, we should do something with gaming". And then we'll say, "OK, here are three things you could do to make that better", and then they say OK, and then we never see them again. And then a year later, a new group of people show up, who apparently have no idea that the last group of people were there, and never follow through on anything. So, they seem to think that they want to do gaming, but there's never any follow through on any of the things they say they're going to do. That makes it hard to be excited about doing games for their platforms."](https://en.wikipedia.org/wiki/Mac_gaming#Attempts_by_Apple_to_promote_gaming_on_Mac)
[^27]: [Mac gaming#Steam](https://en.wikipedia.org/wiki/Mac_gaming#Steam)
[^28]: [Bill Gates won't talk to Steve Ballmer because of the mobile device fiasco](https://en.wikipedia.org/wiki/Steve_Ballmer#Relationship_with_Bill_Gates)
[^29]: [Steve Ballmer on the iPhone](https://en.wikipedia.org/wiki/Steve_Ballmer#Apple)
[^30]: [In a survey conducted by The Athletic in December 2020, Ballmer was voted the best owner in basketball.](https://en.wikipedia.org/wiki/Steve_Ballmer#Sports)
[^31]: [P.A. Semi](https://en.wikipedia.org/wiki/P.A._Semi)
[^32]: [Apple silicon](https://en.wikipedia.org/wiki/Apple_silicon)
[^33]: [Samsung Electronics#Relationship with Apple Inc.](https://en.wikipedia.org/wiki/Samsung_Electronics#Relationship_with_Apple_Inc.)
[^34]: [Tim Cook, on being recruited away from Compaq by Steve Jobs](https://en.wikipedia.org/wiki/Tim_Cook#Apple_era)
[^35]: [Wii sales](https://en.wikipedia.org/wiki/Wii#Sales)
[^36]: [Botox villain predicts the future](https://www.theverge.com/2013/8/12/4615882/larry-ellison-says-we-already-know-apple-is-doomed-without-steve-jobs)
[^37]: [John McAfee](https://en.wikipedia.org/wiki/John_McAfee#Legal_issues)
[^38]: [MacBook Pro#Touch Bar](https://en.wikipedia.org/wiki/MacBook_Pro#Touch_Bar_(2016–2021))
[^39]: [OpenGL 4.5](https://en.wikipedia.org/wiki/OpenGL#OpenGL_4.5)
[^40]: [SuperTuxKart#Reception](https://en.wikipedia.org/wiki/SuperTuxKart#Reception)
[^41]: [Nvidia#Open-source software support](https://en.wikipedia.org/wiki/Nvidia#Open-source_software_support)
[^42]: [Mesa, also called Mesa3D and The Mesa 3D Graphics Library, is an open source implementation of OpenGL, Vulkan, and other graphics API specifications.](https://en.wikipedia.org/wiki/Mesa_(computer_graphics))
[^43]: [Nvidia#Controversies](https://en.wikipedia.org/wiki/Nvidia#Controversies)
[^44]: [Metal (API)](https://en.wikipedia.org/wiki/Metal_(API))
[^45]: [This was once revealed to me in a dream](https://www.youtube.com/watch?v=BZlRt05RY9Y)
[^46]: [Apple A11](https://en.wikipedia.org/wiki/Apple_A11)
[^47]: [Vulkan#History](https://en.wikipedia.org/wiki/Vulkan#History)
[^48]: [In June 2018 Apple deprecated OpenGL on all platforms](https://en.wikipedia.org/wiki/OpenGL#Industry_support)
[^49]: [The Khronos Group began a project to create a next generation graphics API in July 2014 with a kickoff meeting at Valve.](https://en.wikipedia.org/wiki/Vulkan#History)
[^50]: [MoltenVK](https://en.wikipedia.org/wiki/MoltenVK)
[^51]: [Valve announced that Dota 2 will run on macOS using the Vulkan API with the aid of MoltenVK](https://en.wikipedia.org/wiki/MoltenVK#Open_source)
[^52]: [Half-Life 2: Episode Three](https://en.wikipedia.org/wiki/Half-Life_2:_Episode_Three)
[^53]: [Free and Open-Source Vulkan on macOS and iOS](https://store.steampowered.com/oldnews/37575)
[^54]: [Apple Ends Partnership With Former Design Chief Jony Ive](https://www.macrumors.com/2022/07/12/apple-ends-jony-ive-partnership/)
[^55]: [WWDC 2020](https://en.wikipedia.org/wiki/Worldwide_Developers_Conference#2020)
[^56]: [Apple M1](https://en.wikipedia.org/wiki/Apple_M1)
[^57]: [M1 Ultra](https://en.wikipedia.org/wiki/Apple_M1#M1_Ultra)
[^58]: [Bill likes Dick's](https://www.geekwire.com/2019/billions-served-bill-gates-photographed-standing-line-burger-dicks-drive-seattle/)
[^59]: [Asahi Lunux](https://en.wikipedia.org/wiki/Asahi_Linux)
[^60]: [MoltenVK 1.0](https://en.wikipedia.org/wiki/MoltenVK#Version_1.0)
[^61]: [Cemu](https://en.wikipedia.org/wiki/Cemu#Development)
[^62]: [Rosetta 2](https://en.wikipedia.org/wiki/Rosetta_(software)#Rosetta_2)
[^63]: [Metal 3 introduces the MetalFX upscaling framework, which renders complex scenes in less time per frame with high-performance upscaling and anti-aliasing.](https://en.wikipedia.org/wiki/Metal_(API)#History)
[^64]: [Mac gaming#Apple silicon](https://en.wikipedia.org/wiki/Mac_gaming#Apple_silicon)
[^65]: [Whisky - A modern Wine wrapper for macOS built with SwiftUI](https://github.com/Whisky-App/Whisky)
[^66]: [Apple announced that games such as Death Stranding, Resident Evil Village and Assassin's Creed Mirage (all games originally designed for consoles and PCs) would come to iOS in the future](https://en.wikipedia.org/wiki/IPhone_15_Pro#Chipset)
[^67]: [Zink Homepage](https://docs.mesa3d.org/drivers/zink.html)
[^68]: [MoltenGL Homepage](https://moltengl.com)
[^69]: [DXVK GitHub Repository](https://github.com/doitsujin/dxvk)
[^70]: [DXVK-macOS GitHub Repository](https://github.com/Gcenx/DXVK-macOS)

















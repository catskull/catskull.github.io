---
title: How I set up macOS for web development
tags: [development, programming, macos, homebrew, notes]
date: 2025-01-10 11:09:46 -0700
layout: post
---
# preamble

One of the weird things I enjoy doing is installing and configuring a computer for a needed development environment.

At a previous startup, I was involved with onboarding every new hire (dozens, over the course of a year or two). One aspect of our engineering culture was that developers needed to be extremely empowered to ship and deliver code and product features. As such, our goal was that each new hire would deploy code to production on their first day. Does that sound insane to you? Each new hire was paired with an experienced engineer and a specific ticket would be carefully groomed such that the trainer would certainly be able to be able to resolve it, but also that would expose the new hire to a decent selection of the product and codebase. So, that first commit really was mostly a puppet act, but the new hire was there present, typing each key, pressing commit, working through CI, etc. This was so important to me as I find a lot of the anxiousness with starting a new job is the self-doubt about your ability to actually perform the job you were hired for. I found that ripping this band-aid off on day 1 really set up most engineers for a lot of success. It wasn't designed to be stressful, it was more a testament to a lean and agile development process. There was a lot that went on behind the scenes to set these new hires up for success.

If you've never had to attempt to navigate the absolute minefield that is installing and configuring a legacy/enterprise application for local development, let me describe it to you - hell. If you're lucky there's a setup guide you can follow. When the last time the guide was updated - no clue. At least in the nodejs and Ruby on Rails world, there tend to be a few dependencies that are just a nightmare to get running. Needing specific versions of databases, JDK, etc.

But here's the crazy thing - I actually kind of _like_ doing that. Getting so lost in the dank abandoned corners of StackOverflow posts with no replies and you don't even have enough rep to save a hint for others. Decades old Github issues, long since abandoned by a maintainer, closed by bots. It's a real time struggle against the inevitable decay of the digital world. I especially like bearing that weight so that some hapless young new graduate doesn't have to ask themselves existential questions because they can't figure out how to install OpenJDK.

So, I'd find myself literally speed-running our development setup process. I'd get a freshly wiped laptop from IT, start a timer, and speed run our "Getting Started" guide. I think I got it down to under 30 min and that's with a full DB restore (multi-gig). Before a new hire would start, I'd usually squirrel away some time to run through it again to make sure that first day went as smoothly for them as possible.

Naturally, this interest extends into my personal development environment. I just really like installing and configuring development tools on macOS! I'm constantly tweaking and experimenting with new tools and processes. I've spent a lot of time experimenting with nix, devbox, brew (but not really mac ports), and I've finally come to a place where I'm pretty comfortable with my disaster recovery plan.

# backup files

I just zipped up all the folders in my home folder and stuck them on some external storage. I do have Time Machine set up, but I like to go totally "fresh".

I have some specific configs/profiles for Sublime Text and OBS Studio, which I manually archived and restored. For Sublime Text, I archived `~/Library/Application Support/Sublime Text/Packages/User/`. For OBS, I archived the entire `~/Library/Application Support/obs-studio/` directory.

Before deleting anything, it's well worth taking some time to consider what you absolutely must have working and don't want to have to play with. Ideally these files will be backed up (potentially also symlinked into iCloud). It's also worth setting some goals for what your system will look like when you're done. For me, running this blog is a goal. 

# reinstall macOS

{% include external_link.html href="https://support.apple.com/en-us/101578" text="Create a bootable installer." %}

Or, if you feel like waiting around for the rest of your life to install an outdated version of macOS, use the built in system recovery.

# dotfiles

[In a previous post]({% post_url 2024-06-05-use-icloud-for-dotfiles %}), I discussed moving my dotfiles to my iCloud Drive. This is a great option as it can be end-to-end encrypted and is very integrated into macOS. After I've logged into iCloud, I `cd` into `~/Library/Mobile\ Documents/com~apple~CloudDocs/dotfiles` which contains this setup script:

{% capture compiled_preview %}
{%comment%}
```sh
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "changing to home"
cd ~/
echo "iCloud..."
ln -s ~/Library/Mobile\ Documents/com~apple~CloudDocs ~/iCloud
echo "zsh..."
ln -s ~/iCloud/dotfiles/.zshrc ~/.zshrc
echo "ssh..."
ln -s ~/iCloud/dotfiles/.ssh .ssh
echo "config.."
ln -s ~/iCloud/dotfiles/.config .config
echo "notes.md..."
ln -s ~/iCloud/dotfiles/home/notes.md notes.md
echo "copying fonts to /Library/Fonts/.."
cp -r icloud-fonts /Library/Fonts/
echo "dorn."
```
{%endcomment%}
<div class="highlight highlight-source-shell"><pre>SCRIPT_DIR=<span class="pl-s"><span class="pl-pds">"</span><span class="pl-s"><span class="pl-pds">$(</span>cd <span class="pl-s"><span class="pl-pds">"</span><span class="pl-s"><span class="pl-pds">$(</span>dirname <span class="pl-s"><span class="pl-pds">"</span><span class="pl-smi">$0</span><span class="pl-pds">"</span></span><span class="pl-pds">)</span></span><span class="pl-pds">"</span></span> <span class="pl-k">&amp;&amp;</span> pwd<span class="pl-pds">)</span></span><span class="pl-pds">"</span></span>
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>changing to home<span class="pl-pds">"</span></span>
<span class="pl-c1">cd</span> <span class="pl-k">~</span>/
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>iCloud...<span class="pl-pds">"</span></span>
ln -s <span class="pl-k">~</span>/Library/Mobile<span class="pl-cce">\ </span>Documents/com~apple~CloudDocs <span class="pl-k">~</span>/iCloud
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>zsh...<span class="pl-pds">"</span></span>
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/.zshrc <span class="pl-k">~</span>/.zshrc
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>ssh...<span class="pl-pds">"</span></span>
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/.ssh .ssh
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>config..<span class="pl-pds">"</span></span>
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/.config .config
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>notes.md...<span class="pl-pds">"</span></span>
ln -s <span class="pl-k">~</span>/iCloud/dotfiles/home/notes.md notes.md
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>copying fonts to /Library/Fonts/..<span class="pl-pds">"</span></span>
cp -r icloud-fonts /Library/Fonts/
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds">"</span>dorn.<span class="pl-pds">"</span></span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="install.sh"
%}

This does a few things:
 - symbolic link iCloud Drive into my home directory, called 'iCloud'
 - create my .zshrc by symlinking into iCloud Drive
 - symlink my .ssh settings/keys/identities
 - symlink my `$XDG_CONFIG_HOME` .config directory to iCloud Drive
 - symlink a `notes.md` file I keep in my home directory
 - copy non-free fonts from iCloud Drive into the macOS fonts folder (nested folders work fine!)

All our configs and settings (including nano syntax highlighting!) are now ready for use! At least anything that respects the {% include external_link.html href="https://maex.me/2019/12/the-power-of-the-xdg-base-directory-specification/" text="xdg base directory specification" %}.

## Homebrew

I've settled on {% include external_link.html href="https://brew.sh" text="homebrew" %} as my package manager of choice. It's just powerful enough to let me automate a lot of stuff, but yet simple enough that I can hack on it when I need to. Nix/devbox ultimately didn't work for my local development needs, though I admit that's likely due to lack of skill on my part. Maybe don't name like 5 things the exact same thing?

Anyways, with a Brewfile, you can simply run `brew bundle` and it will install everything in your Brewfile. You can even specify a Brewfile, so you could have multiple if you wanted to be able to bundle dependencies in that way. There's even a strange `brew bundle exec` command, which I intend to research further as a means to achieve some of the isolated environment features nix et al bring to the table. [See the full documentation](https://docs.brew.sh/Manpage#bundle-subcommand). Using `mas`, I can install apps from the Mac App Store, such as Affinity Designer. I also install fonts using homebrew font casks. Here's my current Brewfile:

{% capture compiled_preview %}
{%comment%}
```ruby
tap "buo/cask-upgrade"  # brew cu to update cask apps
tap "homebrew/bundle"
tap "homebrew/services"
brew "mas"              # mac app store cli
brew "xz"               # ?
brew "openssl@3"        # ?
brew "readline"         # ruby?
brew "aria2"            # used by yt-dlp for faster dl's
brew "automake"         # ruby?
brew "bison"            # ruby?
brew "chruby"           # manage ruby versions
brew "gdbm"             # ruby?
brew "gh"               # github cli
brew "git"              # I like the latest version
brew "htop"             # task manager cli
brew "imagemagick"      # work
brew "less"             # I like the latest version
brew "libffi"           # ruby?
brew "libyaml"          # ruby?
brew "nano"             # me gusta nano
brew "ruby-install"     # self explanatory
brew "s3cmd"            # work
brew "tree"             # makes pretty file trees in the terminal
brew "volta"            # node
brew "wget"             # ya
brew "yazi"             # terminal file manager
brew "yt-dlp"           # download archival videos from online hosting providers
cask "86box"            # pc emulator
cask "appcleaner"       # removes apps
cask "chatgpt"          # ya
cask "discord"          # alternate client would be great
cask "eloston-chromium" # degoogled chrome
cask "ghostty"          # terminal app
cask "github"           # git gui
cask "iina"             # video player
cask "kap"              # screen recorder (another would be good)
cask "mac-mouse-fix"    # for logitech mx master
cask "obs"              # streaming
cask "omnidisksweeper"  # see what is taking up space
cask "openemu"          # play games
cask "scummvm"          # play games
cask "spotify"          # I don't use this
cask "steam"            # play games
cask "sublime-text"     # yes
cask "transmission"     # for archive.org
cask "transmit"         # ftp to xbox, 3ds, etc
cask "lulu"             # firewall
cask "crossover"        # play games if behavior is good
# fonts
cask "font-balsamiq-sans"
cask "font-departure-mono"
cask "font-montecarlo"
cask "font-montserrat"
cask "font-new-york"
cask "font-sf-pro"
# mac app store apps
mas "StopTheMadness Pro", id: 6471380298
mas "Final Cut Pro", id: 424389933
mas "Keynote", id: 409183694
mas "Playlisty for Apple Music", id: 1459275972
mas "Affinity Photo 2", id: 1616822987
mas "WireGuard", id: 1451685025
mas "Pages", id: 409201541
mas "Logic Pro", id: 634148309
mas "Affinity Designer 2", id: 1616831348
mas "Numbers", id: 409203825
```
{%endcomment%}
<div class="highlight highlight-source-ruby"><pre><span class="pl-en">tap</span> <span class="pl-s">"buo/cask-upgrade"</span>  <span class="pl-c"># brew cu to update cask apps</span>
<span class="pl-en">tap</span> <span class="pl-s">"homebrew/bundle"</span>
<span class="pl-en">tap</span> <span class="pl-s">"homebrew/services"</span>
<span class="pl-en">brew</span> <span class="pl-s">"mas"</span>              <span class="pl-c"># mac app store cli</span>
<span class="pl-en">brew</span> <span class="pl-s">"xz"</span>               <span class="pl-c"># ?</span>
<span class="pl-en">brew</span> <span class="pl-s">"openssl@3"</span>        <span class="pl-c"># ?</span>
<span class="pl-en">brew</span> <span class="pl-s">"readline"</span>         <span class="pl-c"># ruby?</span>
<span class="pl-en">brew</span> <span class="pl-s">"aria2"</span>            <span class="pl-c"># used by yt-dlp for faster dl's</span>
<span class="pl-en">brew</span> <span class="pl-s">"automake"</span>         <span class="pl-c"># ruby?</span>
<span class="pl-en">brew</span> <span class="pl-s">"bison"</span>            <span class="pl-c"># ruby?</span>
<span class="pl-en">brew</span> <span class="pl-s">"chruby"</span>           <span class="pl-c"># manage ruby versions</span>
<span class="pl-en">brew</span> <span class="pl-s">"gdbm"</span>             <span class="pl-c"># ruby?</span>
<span class="pl-en">brew</span> <span class="pl-s">"gh"</span>               <span class="pl-c"># github cli</span>
<span class="pl-en">brew</span> <span class="pl-s">"git"</span>              <span class="pl-c"># I like the latest version</span>
<span class="pl-en">brew</span> <span class="pl-s">"htop"</span>             <span class="pl-c"># task manager cli</span>
<span class="pl-en">brew</span> <span class="pl-s">"imagemagick"</span>      <span class="pl-c"># work</span>
<span class="pl-en">brew</span> <span class="pl-s">"less"</span>             <span class="pl-c"># I like the latest version</span>
<span class="pl-en">brew</span> <span class="pl-s">"libffi"</span>           <span class="pl-c"># ruby?</span>
<span class="pl-en">brew</span> <span class="pl-s">"libyaml"</span>          <span class="pl-c"># ruby?</span>
<span class="pl-en">brew</span> <span class="pl-s">"nano"</span>             <span class="pl-c"># me gusta nano</span>
<span class="pl-en">brew</span> <span class="pl-s">"ruby-install"</span>     <span class="pl-c"># self explanatory</span>
<span class="pl-en">brew</span> <span class="pl-s">"s3cmd"</span>            <span class="pl-c"># work</span>
<span class="pl-en">brew</span> <span class="pl-s">"tree"</span>             <span class="pl-c"># makes pretty file trees in the terminal</span>
<span class="pl-en">brew</span> <span class="pl-s">"volta"</span>            <span class="pl-c"># node</span>
<span class="pl-en">brew</span> <span class="pl-s">"wget"</span>             <span class="pl-c"># ya</span>
<span class="pl-en">brew</span> <span class="pl-s">"yazi"</span>             <span class="pl-c"># terminal file manager</span>
<span class="pl-en">brew</span> <span class="pl-s">"yt-dlp"</span>           <span class="pl-c"># download archival videos from online hosting providers</span>
<span class="pl-en">cask</span> <span class="pl-s">"86box"</span>            <span class="pl-c"># pc emulator</span>
<span class="pl-en">cask</span> <span class="pl-s">"appcleaner"</span>       <span class="pl-c"># removes apps</span>
<span class="pl-en">cask</span> <span class="pl-s">"chatgpt"</span>          <span class="pl-c"># ya</span>
<span class="pl-en">cask</span> <span class="pl-s">"discord"</span>          <span class="pl-c"># alternate client would be great</span>
<span class="pl-en">cask</span> <span class="pl-s">"eloston-chromium"</span> <span class="pl-c"># degoogled chrome</span>
<span class="pl-en">cask</span> <span class="pl-s">"ghostty"</span>          <span class="pl-c"># terminal app</span>
<span class="pl-en">cask</span> <span class="pl-s">"github"</span>           <span class="pl-c"># git gui</span>
<span class="pl-en">cask</span> <span class="pl-s">"iina"</span>             <span class="pl-c"># video player</span>
<span class="pl-en">cask</span> <span class="pl-s">"kap"</span>              <span class="pl-c"># screen recorder (another would be good)</span>
<span class="pl-en">cask</span> <span class="pl-s">"mac-mouse-fix"</span>    <span class="pl-c"># for logitech mx master</span>
<span class="pl-en">cask</span> <span class="pl-s">"obs"</span>              <span class="pl-c"># streaming</span>
<span class="pl-en">cask</span> <span class="pl-s">"omnidisksweeper"</span>  <span class="pl-c"># see what is taking up space</span>
<span class="pl-en">cask</span> <span class="pl-s">"openemu"</span>          <span class="pl-c"># play games</span>
<span class="pl-en">cask</span> <span class="pl-s">"scummvm"</span>          <span class="pl-c"># play games</span>
<span class="pl-en">cask</span> <span class="pl-s">"spotify"</span>          <span class="pl-c"># I don't use this</span>
<span class="pl-en">cask</span> <span class="pl-s">"steam"</span>            <span class="pl-c"># play games</span>
<span class="pl-en">cask</span> <span class="pl-s">"sublime-text"</span>     <span class="pl-c"># yes</span>
<span class="pl-en">cask</span> <span class="pl-s">"transmission"</span>     <span class="pl-c"># for archive.org</span>
<span class="pl-en">cask</span> <span class="pl-s">"transmit"</span>         <span class="pl-c"># ftp to xbox, 3ds, etc</span>
<span class="pl-en">cask</span> <span class="pl-s">"lulu"</span>             <span class="pl-c"># firewall</span>
<span class="pl-en">cask</span> <span class="pl-s">"crossover"</span>        <span class="pl-c"># play games if behavior is good</span>
<span class="pl-c"># fonts</span>
<span class="pl-en">cask</span> <span class="pl-s">"font-balsamiq-sans"</span>
<span class="pl-en">cask</span> <span class="pl-s">"font-departure-mono"</span>
<span class="pl-en">cask</span> <span class="pl-s">"font-montecarlo"</span>
<span class="pl-en">cask</span> <span class="pl-s">"font-montserrat"</span>
<span class="pl-en">cask</span> <span class="pl-s">"font-new-york"</span>
<span class="pl-en">cask</span> <span class="pl-s">"font-sf-pro"</span>
<span class="pl-c"># mac app store apps</span>
<span class="pl-en">mas</span> <span class="pl-s">"StopTheMadness Pro"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">6471380298</span>
<span class="pl-en">mas</span> <span class="pl-s">"Final Cut Pro"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">424389933</span>
<span class="pl-en">mas</span> <span class="pl-s">"Keynote"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">409183694</span>
<span class="pl-en">mas</span> <span class="pl-s">"Playlisty for Apple Music"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">1459275972</span>
<span class="pl-en">mas</span> <span class="pl-s">"Affinity Photo 2"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">1616822987</span>
<span class="pl-en">mas</span> <span class="pl-s">"WireGuard"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">1451685025</span>
<span class="pl-en">mas</span> <span class="pl-s">"Pages"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">409201541</span>
<span class="pl-en">mas</span> <span class="pl-s">"Logic Pro"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">634148309</span>
<span class="pl-en">mas</span> <span class="pl-s">"Affinity Designer 2"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">1616831348</span>
<span class="pl-en">mas</span> <span class="pl-s">"Numbers"</span><span class="pl-kos">,</span> <span class="pl-pds">id</span>: <span class="pl-c1">409203825</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="Brewfile"
%}

For Mac App Store apps, make sure you open and are signed into the store before trying to install these apps or it will fail. It's also a bit finicky, but I've had success.

At this point, I have all my packages and their config files ready to use!

# maintenance

`brew update` - this refreshes homebrew, basically updates the list of available packages and versions. It's needed to make sure you get the latest version of a package when you install it.

`brew upgrade` - upgrade (update to the latest version) all your brew packages

`brew cu -a` - provided by [brew-cask-upgrade](https://github.com/buo/homebrew-cask-upgrade). Passing the `-a` flag will update apps that have their own built in auto updater. I like it because then I can update the apps when it's convenient for me, not when they are booting up. This also runs `brew update`.

`brew bundle cleanup` will list any brew stuff you've installed that is not in your Brewfile. I find it _very_ helpful just to get a diff vs my expected development environment. Then I can review to either add it to the Brewfile, or run `brew bundle cleanup --force` to remove them.

`brew cleanup` & `brew autoremove` - theoretically cleanup also runs autoremove, I still run both of them. 

If you follow my advice and manually run `brew update` on a regular basis and before doing any major 'brewing, you can safely turn off homebrew's auto-update feature before it runs any command: `export HOMEBREW_NO_AUTO_UPDATE=1`

You can also disable hints for using homebrew with `export HOMEBREW_NO_ENV_HINTS=1`

# closing thoughts

I was really impressed with how smoothly my most recent wipe went. There seem to be inevitable macOS tweaks I have to do after a fresh setup, but I sort of like restarting that way. I should also mention that this setup would likely work pretty nicely across multiple machines.

If you have any ideas on how I can improve this setup, <a href="mailto:reply@replies.catskull.net?subject=re:%20https://catskull.net/how-i-set-up-macos-for-web-development.html">please send me a Reply</a> and I'll check it out.

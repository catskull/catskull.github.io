---
title: How to start a newsletter blog with Cloudflare Email Workers
tags: [html, programming, web, cloudflare, replies, likes, newsletter]
date: 2025-05-09 12:53:35 -0600
layout: post
---
I've often been asked what the best way to start blogging in [current year] is. It turns out, that's a pretty difficult question to answer! Instead, I have some guiding principles I personally follow to help guide my choices.

> Need professional help? [Contact The Bullpen](mailto:hello@bullpen.dev?subject=Re:%20Blogging%20Help), my indie web dev studio, and we will help you get your blog in tip-top shape!

## No subscriptions!
I'm really sorry, and I understand indie developers trying to make money. But I'm just not willing to recommend _any_ paid blogging service to my friends who in reality, will probably spend more time _thinking about blogging_ than they will _actually blogging_. If step one of your plan requires a credit card, it's a bad plan.

I would be willing to recommend a one-time fee such as $20 to get them up with a cool design. Hosting is literally free these days and whatever infrastructure you've built on top of AWS is not worth my friends and family reimbursing you for! If my friends already pay for some form of web hosting via email, I always like to explore that option. But we need something more than a raw folder to dump compiled HTML.

## The point of blogging is to _write_.
The first question I always ask is "How do you like to write?" To repeat a phrase, most people will probably spend more time _thinking about blogging_ than they will _actually blogging_. This is bad, in my opinion.

There are a zillion options out there. There's a disconnect here for most people. "Oh I'm going to buy xyz and install zyx on it to blah blah blah" STOP! Do not do that! We live in 2025. We have _technology_. We have a _society_.

So let's ask another question - "Currently in your life, in which system do you spend the most time entering text?" It's probably your phone, with instant messaging? Even if you use voice-to-text, you're still _entering text_. In other words, you are _writing_.

Do not introduce another "thing" to whatever writing process you currently have. It's okay to be idealistic and work towards goals, but if you're anything like me, you're extremely lazy. At the end of the day we're going to keep doing the easiest and most convenient thing.

Again, your goal is to _write_, not to _use [xyz] tool to write_! As you write, those little papercut inconveniences will cause you to seek out solutions to them. Resist the temptation to seek perfection. Most jobs worth doing leave you at least a little cut and bruised. I think we actually like it better that way.

## Make it as easy as possible for people to read your blog.
The only true innovation of technology is to expand accessibility and ease of use.

You used to have to pay a scribe to hand-copy a document for you. Then we invented the Gutenberg press and we could make mass-market printed books. Now we have the internet and information is freely shared and infinitely duplicated.

We have strong standards that help us make the documents of our lives, our "artifacts", accessible by all - present, and most importantly, future. If someone has to sign up for something to read your blog, they probably won't. If you decide to build your blog in a shared space where people have already signed up, that can work but long-term, it's a big risk. "Don't build your skyscraper on someone else's property." You need to have complete custody of your artifacts.

Once you have your thoughts written down and published, you can help others leverage additional technology to make it even _more_ accessible. Things like supporting reader mode, making sure it works okay with text-to-speech (maybe even offering a pre-recorded version yourself). This is one area that "generative AI" can actually _really_ help us, but be careful not to let _anything_ get in the way between you and sharing your thoughts!

There is also a movement called "POSSE", "publish (on your) own site, syndicate everywhere". This means _you_ have custody of your content, and then you re-post (syndicate) it everywhere else people consume information. I say that the first half of this is _mandatory_: publish on your own site. We can handle syndication later If we already have the nice, clean content in our own custody, it becomes trivial to enhance and syndicate later.

One easy way to share (syndicate) your blog is to literally just send your friends a text message with a link to your site if you think they might be interested. If someone sent you a link to a blog post they wrote what would you think? There's no login and it will load super quick, so no matter what platform you share your link on, it's going to work pretty well!

## Be your #1 critic; Be your #1 fan.

At least initially, you're going to be blogging for exactly one person: ~~your mom~~ you. This is okay and good! Use this as your time to learn how to express yourself purely. If you know nobody is going to read it, it's pretty easy to drown out the criticisms in your head. You should be your own #1 Fan! I don't think anyone besides your mom, or maybe your spouse is ever going to champion you as much as you should champion yourself. With that mindset, it's easy to then expand your aspirational audience size. Pretend like people cared! There are a _ton_ of people out there and every single one of them is a total nerd about _something_. Chances are there are lots of people who are just as passionate about what you are as you are! Pretend you are being interviewed by someone as an "expert" on a subject, what would you be excited to share with them?

_Always_ try and improve. The best way to do this is to consume your own content. Read your old writings with a critical eye for improvement. Before you publish anything, read it over a few times at least. Getting someone to proof-read can be helpful but also isn't strictly necessary. Using large language model tools can help give some input but take it with a grain of salt. Or, ship it as-is, flaws and all, as a testament to your unwillingness to give into the robots. We're just practicing self-expression here. There are no rules!

## My work so far.

I've published two experiments in decentralized, personal social networks:
- Likes - a simple like counter. Add a like button to any page!
- Replies - public web comments built with email. Send an email to post a reply!

They're both live on this page, you can use them right now! I call them "experiments" because I don't have a user base large enough to actually _adopt_ anything. I just build stuff, put it out there, and see if people use it.

And people do! The experiments have been successful! I've gotten 76 Replies on catskull.net, and I still love clicking the Like button each time I visit a page! They're both only additive, not distracting to me. I can't remember how many Likes something has, but it's just fun to see. Replies have been a really useful way to engage with my small audience. I've been able to communicate with readers and offer support and answer follow-up questions, as well as just the nice comments which I love!

I'm especially proud of Replies - it uses your existing email identity as your public web identity. There's no sign up, you just send an email. I learned a lot about email while building it. I've thought about email a lot since then.

## Introducing Newsletters, my humble solution.

When email received mass adoption in the 90's, it was truly a revolution. I think the 1998 romantic comedy _You've Got Mail_ documented the sensation the best. Even it's title comes from the now-obscure, but then highly-relevant AOL email announcement. People were falling in love over email.

Then companies realized they people really liked checking their email, and it was super cheap (free) to send, so why not fill up all those inboxes with ads for our garbage? What if people have to delete a couple emails in between their love letters? Well, it seems like people stopped using email. "Social Networking" sites emerged as a safe-haven, free from intrusive spam and ads. Facebook was a community gathering post. I don't think I have to tell you what happened next.

Here I am saying "let's take email back". I used to send my friends emails _all the time_. Our parents wasted _billions_ of dollars in the 90's sending each other email chains, not unlike our memes of today. We all have email accounts don't we? The weirder the better in my opinion!

My inbox sits empty, aside form the routine automated message. Let's fill them with our own personal Newsletters!

## How to start a Newsletter.
### Step 1 - Write your first newsletter!
This will take the majority of your time, and it should. How often do you think you'd send a newsletter out? Once a year is a great goal for a lot of people and most find time during the winter holidays to reflect and write about the year.

Emails are actually pretty cool, you can include all kinds of photos and other markup directly in them. Try to remember your high school English classes where you learned how to write and structure documents. Again, try and make it as easy as possible for people to read and follow along. You can use my first newsletter as a reference for how I did mine, but I think you should really just do whatever feels cool to you.

### Step 2 - Send the email!
Go through your contact lists and see which of your friends or family you think might want to read your newsletter. You might already have their email address, or you can just ask them. "Hey, would you like a copy of my newsletter? Tell me your email address and I'll send it to you!" Then simply forward your newsletter to them! I find it's helpful to send the newsletter to myself to make this even simpler. The newsletter will live in your email, for now at least. As you gather additional email addresses, add them to a group in your email client. When you're ready to send your next newsletter, make sure to _*BCC*_ (blind carbon copy) the entire group, so you don't needlessly expose anyone's email address. This is a pretty critical detail, so don't forget to BCC your newsletter!

### Step 3 - Publish on your own site, syndicate everywhere!
If you don't already have a site, then consider this step as something you may or may not at some point in the future. Maybe one day you will remember this step and come back here, with the added perspective and time necessary to understand the importance.

I've built a system that allows me to email a specific address, and it will take that email and all attachments and publish on my blog. This way, I have dual-custody of my Newsletter in both my email (as a backup) and my blog, tracked in a GitHub repository.

This is the only deliberate step you should have to take in order to preserve your thoughts, and you should only have to do this a single time. These instructions are hard and technical. My next goals will include steps to make this easier.

- {% include external_link.html text="Sign up for a free GitHub account" href="https://github.com/signup" %} Note that your username will appear in 
- {% include external_link.html text="Set up a GitHub Pages site with Jekyll" href="https://docs.github.com/en/pages/quickstart" %}
- Edit your site's `_config.yml` file on GitHub, adding the following section:


{% capture compiled_preview %}
{% comment %}
```yml
collections:
  newsletters:
    output: true
    permalink: /newsletter/:path
```
{% endcomment %}
<div class="highlight highlight-source-yaml"><pre><span class="pl-ent">collections</span>:
  <span class="pl-ent">newsletters</span>:
    <span class="pl-ent">output</span>: <span class="pl-c1">true</span>
    <span class="pl-ent">permalink</span>: <span class="pl-s">/newsletter/:path</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="_config.yml"
  copy="true"
%}
- Buy and configure a custom domain for your blog. Consider this an investment you're making in your blog and your newsletter. Again, this is optional, and only if you are wanting more. I recommend going for a .com, .org, .net, or another major/standard domain name. I would also recommend ponying the money up-front for at least a few years of renewals just to make sure you're really serious about the whole blogging thing. At the time of writing, {% include external_link.html text="Cloudflare Registrar" href="https://www.cloudflare.com/products/registrar/" %} has the lowest prices, and we'll need the domain in there anyways for the next step. If you already own a domain name, transfer it in to Cloudflare now.
- From your Cloudflare Dashboard, navigate to the Workers & Pages page, and create a new Worker. in the wizard, select "import a repository", then at the bottom, choose "Clone a public repository via Git URL". Enter the URL of my newsletters worker: [https://github.com/catskull/newsletters.git](https://github.com/catskull/newsletters.git) and hit continue. It will go through cloning the repository to your own account.
- After the Worker is created, you will end up on the page for the "newsletters" worker you just created. From the top tab navigation, go to "Settings". Under "Variables and Secrets", add the following:
	- `EMAIL`: the email you'll be sending your newsletter from
	- `GITHUB_BRANCH`: the main branch of your github repo. Probably `main`.
	- `GITHUB_OWNER`: your github username.
	- Add a new "secret" and name it `TOKEN`. We will get the value for this in the next step so keep it open with the value ready to be filled.
- In a new tab, go into {% include external_link.html text="GitHub and create a personal access token." href="https://github.com/settings/personal-access-tokens" %}. You can pretty safely set the expiration date to never since we'll lock it down to just the newsletters repository. In repository access, choose "Only select repositories" and choose your recently forked "newsletters" repository.
- Give your token permissions. In the "Repository permissions" drop down, find the following permission and set them all to "Read and write":
	- "Commit statuses"
	- "Contents"
	- "Pull requests"
- Click "generate" and on the resulting page, copy the token highlighted in green.
- Back in your Cloudflare worker configuration, paste the token into the field for the `TOKEN` secret we're creating.
- Now that our worker is all set up and ready to go, we will add a route to it from a custom email address. From your Cloudflare Dashboard, click your domain name to go into it's settings. From the left nav, choose "Email", "Email Routing". From the "Routing rules" tab, click "Create address" under the "Custom addresses" section.
- Make your custom address anything! Maybe "newsletter@domain.com"? For action, choose "Send to a Worker". In the "Destination" dropdown, choose the "newsletters" worker we just set up.

Congratulations! You can now send an email to your custom worker address (newsletter@domain.com) and it will parse out all the content and attachments and upload them to your GitHub Pages site, under the `_newsletters` collection. Within Jekyll, you can access your newsletters just like your posts with `site.newsletters` and iterate and show them however you'd like.

## Closing thoughts.

That all is a lot to say - I think the best way to start blogging is to just start blogging. Emails work really well for me, and I think they'll work well for you. We like getting emails, we like sending emails.

If you want to jump through the extra steps of getting your email Newsletter onto your own blog or website, hopefully you can follow along my steps and get your own running without too much trouble. I really need to get an example Jekyll site set up for people to clone, but for now this blog post will have to do.

## PS

[Subscribe to my newsletter](/newsletter)

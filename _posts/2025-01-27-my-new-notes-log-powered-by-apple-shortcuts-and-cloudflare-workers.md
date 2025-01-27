---
title: Notes log powered by Apple Shortcuts and Cloudflare Workers
tags: [html, programming, web, cloudflare, javascript, meta, tools]
date: 2025-01-27 12:48:23 -0700
layout: post
---

I wanted an easy way to quickly post content on my website. [Kind of like a public bookmarks page.](/notes) Here's what I came up with:

{% capture compiled_preview %}
{%comment%}
```javascript

import { Octokit, App } from "octokit";

export default {
  async fetch(request, env, ctx) {

    // it authenticates the request
    if (env.KEY !== request.headers.get('key')) {
      return new Response('u suck', {status: 401})
    }

    // it receives the parameters
    const body = await request.json()

    // it removes the double url from apple notes
    const link = body.link.split('\n')[0];

    // it makes the yaml
    const yaml =`- note: "${body.note}"
  link: "${link}"
  date: ${new Date().toLocaleDateString()}

`
    // it configures the configurations
    const repo = {
      owner: 'urmom',
      repo: 'urmom.github.io',
      path: '_data/notes.yml',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    };
    const octokit = new Octokit({auth: env.TOKEN});

    // it gets the file
    let file = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {...repo})
    let content = atob(file?.data?.content ?? '');

    // it rubs the yaml on it's skin
    const update = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}',
      {
        ...repo,
        message: `New note: ${link}`,
        content: btoa(yaml + content),
        sha: file.data.sha,
      });

    // it gets the updated file
    file = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {...repo})
    content = atob(file?.data?.content ?? '');

    // it shows us the updated file
    return new Response(content);
  }
}
```
{%endcomment%}
<div class="highlight highlight-source-js"><pre><span class="pl-k">import</span> <span class="pl-kos">{</span> <span class="pl-v">Octokit</span><span class="pl-kos">,</span> <span class="pl-v">App</span> <span class="pl-kos">}</span> <span class="pl-k">from</span> <span class="pl-s">"octokit"</span><span class="pl-kos">;</span>

<span class="pl-k">export</span> <span class="pl-k">default</span> <span class="pl-kos">{</span>
  <span class="pl-k">async</span> <span class="pl-en">fetch</span><span class="pl-kos">(</span><span class="pl-s1">request</span><span class="pl-kos">,</span> <span class="pl-s1">env</span><span class="pl-kos">,</span> <span class="pl-s1">ctx</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>

    <span class="pl-c">// it authenticates the request</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">env</span><span class="pl-kos">.</span><span class="pl-c1">KEY</span> <span class="pl-c1">!==</span> <span class="pl-s1">request</span><span class="pl-kos">.</span><span class="pl-c1">headers</span><span class="pl-kos">.</span><span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-s">'key'</span><span class="pl-kos">)</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
      <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Response</span><span class="pl-kos">(</span><span class="pl-s">'u suck'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span><span class="pl-c1">status</span>: <span class="pl-c1">401</span><span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-kos">}</span>

    <span class="pl-c">// it receives the parameters</span>
    <span class="pl-k">const</span> <span class="pl-s1">body</span> <span class="pl-c1">=</span> <span class="pl-k">await</span> <span class="pl-s1">request</span><span class="pl-kos">.</span><span class="pl-en">json</span><span class="pl-kos">(</span><span class="pl-kos">)</span>

    <span class="pl-c">// it removes the double url from apple notes</span>
    <span class="pl-k">const</span> <span class="pl-s1">link</span> <span class="pl-c1">=</span> <span class="pl-s1">body</span><span class="pl-kos">.</span><span class="pl-c1">link</span><span class="pl-kos">.</span><span class="pl-en">split</span><span class="pl-kos">(</span><span class="pl-s">'\n'</span><span class="pl-kos">)</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span><span class="pl-kos">;</span>

    <span class="pl-c">// it makes the yaml</span>
    <span class="pl-k">const</span> <span class="pl-s1">yaml</span> <span class="pl-c1">=</span><span class="pl-s">`- note: "<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">body</span><span class="pl-kos">.</span><span class="pl-c1">note</span><span class="pl-kos">}</span></span>"</span>
<span class="pl-s">  link: "<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">link</span><span class="pl-kos">}</span></span>"</span>
<span class="pl-s">  date: <span class="pl-s1"><span class="pl-kos">${</span><span class="pl-k">new</span> <span class="pl-v">Date</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">toLocaleDateString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">}</span></span></span>
<span class="pl-s"></span>
<span class="pl-s">`</span>
    <span class="pl-c">// it configures the configurations</span>
    <span class="pl-k">const</span> <span class="pl-s1">repo</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
      <span class="pl-c1">owner</span>: <span class="pl-s">'urmom'</span><span class="pl-kos">,</span>
      <span class="pl-c1">repo</span>: <span class="pl-s">'urmom.github.io'</span><span class="pl-kos">,</span>
      <span class="pl-c1">path</span>: <span class="pl-s">'_data/notes.yml'</span><span class="pl-kos">,</span>
      <span class="pl-c1">headers</span>: <span class="pl-kos">{</span>
        <span class="pl-s">'X-GitHub-Api-Version'</span>: <span class="pl-s">'2022-11-28'</span>
      <span class="pl-kos">}</span>
    <span class="pl-kos">}</span><span class="pl-kos">;</span>
    <span class="pl-k">const</span> <span class="pl-s1">octokit</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Octokit</span><span class="pl-kos">(</span><span class="pl-kos">{</span><span class="pl-c1">auth</span>: <span class="pl-s1">env</span><span class="pl-kos">.</span><span class="pl-c1">TOKEN</span><span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

    <span class="pl-c">// it gets the file</span>
    <span class="pl-k">let</span> <span class="pl-s1">file</span> <span class="pl-c1">=</span> <span class="pl-k">await</span> <span class="pl-s1">octokit</span><span class="pl-kos">.</span><span class="pl-en">request</span><span class="pl-kos">(</span><span class="pl-s">'GET /repos/{owner}/{repo}/contents/{path}'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>...<span class="pl-s1">repo</span><span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-k">let</span> <span class="pl-s1">content</span> <span class="pl-c1">=</span> <span class="pl-en">atob</span><span class="pl-kos">(</span><span class="pl-s1">file</span><span class="pl-kos">?.</span><span class="pl-c1">data</span><span class="pl-kos">?.</span><span class="pl-c1">content</span> <span class="pl-c1">??</span> <span class="pl-s">''</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

    <span class="pl-c">// it rubs the yaml on it's skin</span>
    <span class="pl-k">const</span> <span class="pl-s1">update</span> <span class="pl-c1">=</span> <span class="pl-k">await</span> <span class="pl-s1">octokit</span><span class="pl-kos">.</span><span class="pl-en">request</span><span class="pl-kos">(</span><span class="pl-s">'PUT /repos/{owner}/{repo}/contents/{path}'</span><span class="pl-kos">,</span>
      <span class="pl-kos">{</span>
        ...<span class="pl-s1">repo</span><span class="pl-kos">,</span>
        <span class="pl-c1">message</span>: <span class="pl-s">`New note: <span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">link</span><span class="pl-kos">}</span></span>`</span><span class="pl-kos">,</span>
        <span class="pl-c1">content</span>: <span class="pl-en">btoa</span><span class="pl-kos">(</span><span class="pl-s1">yaml</span> <span class="pl-c1">+</span> <span class="pl-s1">content</span><span class="pl-kos">)</span><span class="pl-kos">,</span>
        <span class="pl-c1">sha</span>: <span class="pl-s1">file</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">.</span><span class="pl-c1">sha</span><span class="pl-kos">,</span>
      <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

    <span class="pl-c">// it gets the updated file</span>
    <span class="pl-s1">file</span> <span class="pl-c1">=</span> <span class="pl-k">await</span> <span class="pl-s1">octokit</span><span class="pl-kos">.</span><span class="pl-en">request</span><span class="pl-kos">(</span><span class="pl-s">'GET /repos/{owner}/{repo}/contents/{path}'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>...<span class="pl-s1">repo</span><span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-s1">content</span> <span class="pl-c1">=</span> <span class="pl-en">atob</span><span class="pl-kos">(</span><span class="pl-s1">file</span><span class="pl-kos">?.</span><span class="pl-c1">data</span><span class="pl-kos">?.</span><span class="pl-c1">content</span> <span class="pl-c1">??</span> <span class="pl-s">''</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

    <span class="pl-c">// it shows us the updated file</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Response</span><span class="pl-kos">(</span><span class="pl-s1">content</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>
<span class="pl-kos">}</span></pre></div>
{% endcapture %}
{% include code.html
  content=compiled_preview
  filename="index.js"
%}

{% include figure.html
  caption="Click to open in Shortcuts (iCloud)"
  src="public/media/posts/notes/shortcut.jpg"
  href="https://www.icloud.com/shortcuts/0b942ce5caba43b3a11c9730930241b0"
  alt="A screenshot of the Apple Shortcuts app showing the various steps the shortcut takes to capture a URL and text input from the user and send as an HTTP POST request to a Cloudflare Worker"
%}

To use, just use the "share sheet" anywhere share sheets are supported. It's intended to take an (optional) URL and then just some random text you feel like writing.

{% include external_link.html text="Full source and more instruction on Github." href="https://github.com/catskull/notes-server" %}

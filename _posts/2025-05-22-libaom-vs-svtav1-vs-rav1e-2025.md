---
title: "What's the best AV1 encoder in 2025? I encoded four thousand GIFs to find out."
tags: [AV1, video, encoders, comparison, avif]
date: 2025-05-22 13:08:36 -0600
layout: post
---
What's the best AV1 encoder in 2025?

By "best" I mean, I guess, compression/quality ratio. I don't really care that much about compute intensity since I'm not transcoding. 

I found empirical evidence in this area lacking. This post is my attempt to inform on that subject.

# AVIF is the new JPG?

> AV1 Image File Format (AVIF) is a powerful, open source, royalty-free file format that encodes AV1 bitstreams in the High Efficiency Image File Format (HEIF) container.
>
> - mdn web docs

"Wait, I thought AV1 was for video?"

You are correct! But what is a video, exactly? A series of images with or without accompanying audio? AVIF is essentially just AV1-encoded images, wrapped into an "HEIF" (high-efficiency image file) container (a fancy way to store a series of images).

What you need to understand is that AVIF is simply a new image file format, like PNG, JPG, and WEBP. According to caniuse[^2], AVIF is supported in all evergreen browsers since January 2024. That means the answer to "can I use AVIF?" is "yes!"

# But which encoder?

There are currently three open source AV1 encoders: Libaom, SVT-AV1, and rav1e. Libaom is a "reference implementation" and is generally reliable, but really shouldn't be used. SVT-AV1 is an "open-source encoder and decoder developed primarily by Intel in collaboration with Netflix"[^3]. rav1e calls itself "The fastest and safest AV1 encoder"[^4] and it's written in Rust if that means anything to you.

# Test 1: One small GIF for man, one (much) smaller AVIF for mankind

I took a simple 88x31 animated GIF I created for catskull.net and used `ffmpeg` to convert it to an `.avif` with all three encoders. The exact command I used is: `ffmpeg -i badge.gif -c:v $ENCODER badge.avif`, where `$ENCODER` is the value from the table below.

| encoder | file size | compression ratio | savings | file |
| ------- | --------- | ----------------- | ------- | --- |
| gif     | 648 KB     | 1                 | 0%      | ![gif](/assets/badge.gif) |
| `libaom-av1` | 41 KB  | 13.5             | 92.59%  | ![libaom-av1](/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/libaom-av1.avif) |
| `librav1e` | 16 KB | 40.5 | 97.53% | ![librav1e](/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/librav1e.avif) |
| `libsvtav1` | 15 KB | 43.2 | 97.**69**% | ![libsvtav1](/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/libsvtav1.avif) |

`SVT-AV1` is the clear winner in this shootout, though `rav1e` is a good option as well. There may be additional parameters we could tweak to get more performance out of each respective encoder, but without guidance I don't know how to do it and I sure as heck don't trust LLM to hallucinate `ffmpeg` commands!

# Test 2: Four Thousand Gifs

I decided to take an online button collection over at [cyber.dabamos.de](https://cyber.dabamos.de/88x31/) and encode them all in avif. The collection has **4,539** images. After encoding them all to avif, I compressed the directory of gifs and the directory of avifs into zip files and this is the result. I suppose that this is a decent look at savings "on average". The exact command I used is `parallel ffmpeg -i {} -c:v $ENCODER "../$ENCODER/{.}.avif" ::: *.gif`, where `$ENCODER` is the value from the table below. Note `parallel` can be installed with brew, and it will max out your CPU by default.

| encoder    | zip file size   | compression ratio | savings |
| ---------- | --------------- | ----------------- | ------- |
| gif        | 32.3 MB         | 1                 | 0%      |
| `libaom-av1`| 27.7MB         | 1.1661            | 14.24%  |
| `librav1e` | 22.8 MB         | 1.4167            | 29.41%  |
| `libsvtav1`| 19.9 MB         | 1.6231            | 38.39%  |

Unfortunately not quite the silver-bullet the test above presented, but still, that's free bandwidth baby! On further investigation, it seems like the minimum file size for our avif is 1 KB. Looking in the source GIF directory, there are quite a few that are less than 1 KB. I'm not sure if this is due to the the container image itself, but I guess if your GIF is less than 1 KB then you probably don't need to bother encoding it.

![button](https://buttons.catskull.net/avif/ie_rainbow.avif)

[View the buttons at buttons.catskull.net!](https://buttons.catskull.net/)

# Test 3: A WebM video

Since I love this zone plate animation I love so much, I like to use it in lots of places. I have previously used webm as my standard for this kind of thing, but let's give avif a shot! I screen captured the animation I generated on [shadertoy](https://www.shadertoy.com/view/tfSGzK) and converted to a webm. I will compare against avif, gif, and apng.

Except for the avif encoders, I ran the following command:
`ffmpeg -i zoneplate.webm zoneplate.$IMAGE_TYPE`, where image type is from the table below.

| image type | file size       | compression ratio | savings |
| ---------- | --------------- | ----------------- | ------- |
| webm       | 859 KB          | 1                 | 0%      |
| apng       | 138 MB          | 0.0062            | -15,965.19% |
| gif        | 23.5 MB         | 0.0366            | -2,635.74%|
| `libsvtav1` | 114 KB         | 7.5351            | 86.73% |
| `libaom-av1` | 89 KB         | 9.6517            | 89.64%   |
| `librave1e` | 85 KB          |  10.1059          | 90.1% |

Quite different results again! I'm not sure what's up with apng, but I opened the file in iina and it played just fine. This time, STV-AV1 was behind both Libaom and rav1e by about 3 points!

Here are the resulting images (gif and apng excluded).

webm (859 KB):
<video autoplay loop>
  <source src="/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/zoneplate.webm" type="video/webm" />
</video>

libsvtav1 (114 KB):
<picture>
  <source srcest="/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/zoneplate-libsvtav1.avif" type="image/avif">
  <img src="/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/zoneplate-libsvtav1.avif" alt="libsvtav1" loading="eager">
</picture>

libaom-av1 (89 KB):
![libaom-av1](/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/zoneplate-libaom-av1.avif)

librav1e (85 KB):
![librav1e](/assets/images/posts/libaom-vs-svtav1-vs-rav1e-2025/zoneplate-librav1e.avif)

It seems like in all cases, avif has a hard time playing a consistent framerate in both Safari 18.5 and Safari Technology Preview Release 219. The issue does not present in Chromium 136.0.7103.113 (ungoogled-chromium). 

# Conclusion

Based on my testing, I believe that `rav1e` is currently the most reliable encoder. It's not a night and day difference in most cases. In some cases, `SVT-AV1` offered smaller files, but in our webm test, it performed _much_ worse than both `rav1e` and `Libaom`, which is suprising considering that `Libaom` took last place in every other test, as we would expect.

In either case, using `avif` instead of _any other image format_ is recommended. We have mainline support in all evergreen browsers. The bandwidth savings can be up to 97%! It feels a bit like switching out an incandescent light bulb for a new-fangled LED bulb. It's free real estate!

Be sure to check out the gallery at [buttons.catskull.net!](https://buttons.catskull.net/)

![scumsoft](https://buttons.catskull.net/avif/scumani.avif)

[^3]: [https://en.wikipedia.org/wiki/AV1#:~:text=open%2Dsource%20encoder%20and%20decoder%20developed%20primarily%20by%20Intel%20in%20collaboration%20with%20Netflix](https://en.wikipedia.org/wiki/AV1#:~:text=open%2Dsource%20encoder%20and%20decoder%20developed%20primarily%20by%20Intel%20in%20collaboration%20with%20Netflix)
[^2]: [https://caniuse.com/?search=avif](https://caniuse.com/?search=avif)
[^4]: [https://github.com/xiph/rav1e#:~:text=The%20fastest%20and%20safest%20AV1%20encoder.](https://github.com/xiph/rav1e#:~:text=The%20fastest%20and%20safest%20AV1%20encoder.)

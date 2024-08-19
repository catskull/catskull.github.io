---
layout: post
title:  "A note on iOS 12.2 input types"
date:   2019-04-17

---

Recently a bug came in for a web product I support. On certain fields, we want to show a specific keyboard (like the number pad for number inputs). Mobile Safari has always been a bit frustrating to deal with in this regard. As far as I know, before iOS version 12.2 (released March 25, 2019), the only way to control which keyboard Safari would show was to use the `pattern` attribute with a regular expression like this: `pattern="\d*"`. In other mobile browsers, the `type` attribute worked, but never in Safari.

The bug report said that input keyboards were not working any more and were defaulting back to the standard keyboard. After a quick git blame, I determined the code hadn't changed, so the client must have changed. Additionally I couldn't reproduce the issue on my test iPhone. After reviewing with the bug reporter, I determined their iPhone was on iOS 12.2 while mine was on 12.1.2. After updating my iPhone, sure enough the bug was reproducable.

Due to how recently the issue was introduced, I had a hard time finding anything online about what to do. Did Apple really just break all Safari input keyboard controls with no way to do it anymore? I'll admit I did briefly consider the possibility that this was a hostile move by Apple to dry and destabalize mobile web apps (to encourage native mobile apps). However, on further investigation, they simply adopted a new HTML spec (inputmode) and totally deprecated support for the old spec at the same time (pattern). A boneheaded move (especially to not publicize the decision anywhere I could find).

According to [caniuse](https://caniuse.com/#search=inputmode), inputmode is supported by 61% of mobile users globally (but only 40% in the USA). It's probably not safe to _only_ use `inputmode` yet, but we should start using it as the first option. At the time of writing, [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) incorrectly report no support for mobile Safari ([though there is a commit to address this](https://github.com/mdn/browser-compat-data/commit/9a08a26e1f1c77f52625d13ecd9c5f779e9a33da#diff-2a52c9b7d3948297f271ac5ef0a10070)).

Below is an example of the inputmode spec with live demos for use on an iPhone.

### "none"

<img src="/public/images/ios-inputs/none.png"/>

>No virtual keyboard; this is useful when the application or site implements its own keyboard input control.

Unsupported in iOS 12.2

<input type="text" inputmode="none" placeholder="none"/>

### "text"

<img src="/public/images/ios-inputs/text.png"/>

>Standard text input keyboard for the user's current locale.

<input type="text" inputmode="text" placeholder="text"/>

### "decimal"

<img src="/public/images/ios-inputs/decimal.png"/>

>Fractional numeric input keyboard containing the digits and the appropriate separator character for the user's locale (typically either "." or ","). Devices may or may not show a minus key.

<input type="text" inputmode="decimal" placeholder="decimal"/>

### "numeric"

<img src="/public/images/ios-inputs/numeric.png"/>

>Numeric input keyboard; all that is needed are the digits 0 through 9. Devices may or may not show a minus key.

<input type="text" inputmode="numeric" placeholder="numeric"/>

### "tel"

<img src="/public/images/ios-inputs/tel.png"/>

>A telephone keypad input, including the digits 0 through 9, the asterisk ("*"), and the pound ("#") key. Form inputs that require a telephone keypad should typically use `<input type="tel">` instead.

<input type="text" inputmode="tel" placeholder="tel"/>

### "search"

<img src="/public/images/ios-inputs/search.png"/>

>A virtual keyboard optimized for search input. For instance, the return key may be re-labeled "Search", and there may be other optimizations.

<input type="text" inputmode="search" placeholder="search"/>

### "email"

<img src="/public/images/ios-inputs/email.png"/>

>A virtual keyboard optimized for entering email addresses; typically this includes the "@" character as well as other optimizations. Form inputs that require email address entry should typically use `<input type="email">` instead.

<input type="text" inputmode="email" placeholder="email"/>

### "url"

<img src="/public/images/ios-inputs/url.png"/>

>A  keypad optimized for entering URLs. This may have the "/" key more prominently available, for example. Enhanced features could include history access and the like as well. Form inputs that request a URL should typically use `<input type="url">` instead.

<input type="text" inputmode="url" placeholder="url"/>

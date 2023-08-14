# SpamChannel

Live worker hosted at https://spamchannel.haxxx.workers.dev

**UPDATE (Aug 13 2023): Two days after my DEFCON 31 talk, MailChannels silently decided to require a [Domain Lockdown Record](https://support.mailchannels.com/hc/en-us/articles/16918954360845) in order to send emails from Cloudflare workers meaning this code doesn't work anymore. However because they just addressed a "symptom" and not the underlying issue (lack of sender idenitity verification) anyone can still signup on their website (80$) and use their "normal" SMTP relay to spoof all of their customer domains 🤷🏻‍♂️**

## What is this

As of writing, This allows you to spoof emails from any of the +2 Million domains using MailChannels. It also gives you a slightly higher chance of landing a spoofed emails from any domain that doesn't have an SPF & DMARC due to [ARC](https://www.rfc-editor.org/rfc/rfc8617.html#) adoption.

It was released at the Defcon 31 talk [SpamChannel: Spoofing Emails From 2 Million+ Domains and Virtually Becoming Satan](https://forum.defcon.org/node/245722).

## I'm a MailChannels customer, how do I stop people from impersonating my domain?

TL;DR set your [Domain Lockdown Record](https://support.mailchannels.com/hc/en-us/articles/16918954360845) ASAP.

## Demos

Below are the demos from my Defcon talk demonstrating email spoofing using this Cloudflare Worker.

This video demonstrates spoofing an email from a domain configured with DMARC + DKIM:

[![SpamChannel Demo 1](http://img.youtube.com/vi/eODw4t4WaCw/0.jpg)](https://youtu.be/eODw4t4WaCw "SpamChannel: Spoofing email from a domain with DMARC + DKIM")


This video demonstrates impersonating Satan (satan@churchofsatan.com):

[![SpamChannel Demo 2](http://img.youtube.com/vi/61PIOBp30vA/0.jpg)](https://youtu.be/61PIOBp30vA "SpamChannel: Impersonating Satan")

## How to deploy this yourself

1. Signup and create a free account on Cloudflare (https://dash.cloudflare.com/sign-up)
2. Clone this repo
3. Install Wrangler CLI tool (`npm i -g wrangler`)
4. Run `wrangler login` and login to your account
5. In the root of this repo run `wrangler publish`

## Credits

Code was based on @ihsangan's [gist](https://gist.github.com/ihsangan/6111b59b9a7b022b5897d28d8454ad8d).

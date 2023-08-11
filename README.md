# SpamChannel

Live worker hosted at https://spamchannel.haxxx.workers.dev

## What is this

As of writing, This allows you to spoof emails from any of the +2 Million domains using MailChannels. It also gives you a slightly higher chance of landing a spoofed emails from any domain that doesn't have an SPF & DMARC due to [ARC](https://www.rfc-editor.org/rfc/rfc8617.html#) adoption.

It was released at the Defcon 31 talk [SpamChannel: Spoofing Emails From 2 Million+ Domains and Virtually Becoming Satan](https://forum.defcon.org/node/245722).

## I'm a MailChannels customer, how do I stop people from impersonating my domain?

TL;DR set your [Domain Lockdown Record](https://support.mailchannels.com/hc/en-us/articles/16918954360845) ASAP.

## How to deploy this yourself

1. Signup and create a free account on Cloudflare (https://dash.cloudflare.com/sign-up)
2. Clone this repo
3. Install Wrangler CLI tool (`npm i -g wrangler`)
4. Run `wrangler login` and login to your account
5. In the root of this repo run `wrangler publish`

## Credits

Code was based on @ihsangan's [gist](https://gist.github.com/ihsangan/6111b59b9a7b022b5897d28d8454ad8d).

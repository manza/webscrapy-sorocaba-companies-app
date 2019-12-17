const request = require('request');
const cheerio = require('cheerio');
const getHrefs = require('get-hrefs');
const getEmails = require('get-emails');
const htmlToText = require('html-to-text');

const baseSite = '<site-address-goes-here>';

// Get main Url body from the index url
request(baseSite, (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        // filter the html content to get the main pages
        const baseList = $('body > div.middle > div.content > div.left > ul:nth-child(6)');
        // get all Hrefs from the main list of urls
        const baseUrls = getHrefs(baseList.html());
        if (baseUrls && Array.isArray(baseUrls) && baseUrls.length > 0) {
            baseUrls.forEach( currentUrl => {
                request(currentUrl, (error, response, html) => {
                    if (!error && response.statusCode === 200) {
                        const $$ = cheerio.load(html);
                        const subList = $$('.lista-categoria');
                        const subUrls = getHrefs(subList.html());
                        if (subUrls && Array.isArray(subUrls) && subUrls.length > 0) {
                            subUrls.forEach(page => {
                                request(page, (error, response, html) => {
                                    if (!error && response.statusCode === 200) {
                                        const $$$ = cheerio.load(html);
                                        const pageAds = $$$('.center');
                                        if (pageAds) {
                                            const adsPageHtmlBody = pageAds.html();
                                            if (adsPageHtmlBody && adsPageHtmlBody !== null && adsPageHtmlBody !== undefined) {
                                                const htmlAdsPageInText = htmlToText.fromString(adsPageHtmlBody);
                                                console.log(Array.from(getEmails(htmlAdsPageInText)));
                                            }
                                        }
                                    }
                                });
                            });              
                        }
                    }
                });
            });   
        }
    }
});
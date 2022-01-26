const express = require('express');
const router = express.Router();
const { countOccurrences } = require('../helpers/stringFrequency');

const siteData = require('../data/siteData.json');

router.get('/', (req, res) => {
    let query = req.query.q;

    // check if valid url
    if(typeof query === 'undefined') {
        res.status(400).send('400 Bad Request');
        return;
    }

    if(!query) {
        res.json([]);
        return;
    }

    // convert + to whitespace and normalise
    query = query.replace(/\+/g, ' ').toLowerCase().trim();

    // count number of occurrences of query string in title, url, preview
    let filteredSiteData = siteData.map(site => {
        let count = 0;
        count += countOccurrences(query, site.title.toLowerCase());
        count += countOccurrences(query, site.preview.toLowerCase());

        // e.g. selects 'https://www.', '.com/', '.net/', '.org/', etc.
        let urlIrrelevant = new RegExp('(http[s]?:\/\/(www\.)?)|(\.[^\.\/\w]{2,}\/)', 'g');

        count += countOccurrences(query, site.url.replace(urlIrrelevant, ''));

        return { ...site, freq: count };
    });

    // filter out zeroes
    filteredSiteData = filteredSiteData.filter(site => site.freq);

    // sort descending by count
    filteredSiteData.sort((a, b) => b.freq - a.freq);

    res.json(filteredSiteData);
});

module.exports = router;

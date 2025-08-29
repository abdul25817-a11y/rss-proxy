// api/rss.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const feedUrl = req.query.url;
    if (!feedUrl) {
      return res.status(400).json({ error: "No RSS feed URL provided" });
    }

    const response = await fetch(feedUrl);
    const text = await response.text();

    // Response کو XML ہی رہنے دیں
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Error fetching RSS feed", details: error.message });
  }
}

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const url = "https://www.theguardian.com/international";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");

      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

const PORT = 8080;
app.listen(PORT, () =>
  console.log(
    `Server running on PORT ${PORT}\nLocal:\thttp://localhost:${PORT}`
  )
);

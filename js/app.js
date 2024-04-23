const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const axios = require('axios');
const cheerio = require('cheerio');
const scraperUrl1 = 'https://www.ltn.com.tw/'; //自由
const scraperUrl2 = 'https://udn.com/news/index/'; //聯合
const scraperUrl3 = 'https://tw.nextapple.com/'; //蘋果
const scraperUrl4 = 'https://news.ebc.net.tw/'; //東森
const scraperUrl5 = 'https://www.ettoday.net/'; //Ettoday
const scraperUrl6 = 'https://www.cna.com.tw/'; //中央社CNA
const scraperUrl7 = 'https://news.pts.org.tw/'; //公視
const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url);

  //開起根目錄網頁
  //=======================================
  let filePath = '.' + req.url;
  if (filePath === './') {
    // filePath = './index.html';
    filePath = './index.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  //當收到網頁回傳資料
  //=======================================
  if (req.method === 'POST') {

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // 将请求数据拼接起来
    });

    req.on('end', async () => {
      const ClientData = JSON.parse(body); // 解析 JSON 格式的请求数据
      const DataArray = Object.values(ClientData);

      if (parsedUrl.pathname === '/scraperData') {
        const retrunData = await scrapeData(scraperUrl1, scraperUrl2, scraperUrl3, scraperUrl4, scraperUrl5, scraperUrl6, scraperUrl7);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(retrunData));
      }

    });

  } else {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('500 Internal Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  //連線資料庫
  // client.connect();
  // console.log('成功連接到 MongoDB');
});


// 爬蟲程式
const scrapeData = async (url1, url2, url3, url4, url5, url6, url7) => {
  try {

    //自由時報
    //----------------------------------------------------------------------
    var ItemsConut = 0
    var response = await axios.get(url1);
    var $ = cheerio.load(response.data);
    var newsItems = [];

    // 使用选择器定位新闻元素
    $('div.breakingnews_pc[data-desc="即時清單"]').find('a.title').each((index, element) => {
      const title = '自由時報-' + $(element).find('h3').text().trim();
      const link = $(element).attr('href');
      const time = $(element).find('span').text().trim();

      const newsItem = {
        title: title,
        link: link,
        time: time
      };
      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //聯合報
    //----------------------------------------------------------------------
    ItemsConut = 0
    response = await axios.get(url2);
    $ = cheerio.load(response.data);

    // 使用选择器定位新闻元素
    $('div.context-box[data-id="real"]').find('a').each((index, element) => {
      const title = '聯合新聞網-' + $(element).find('span.tab-link__title').text().trim();
      const link = $(element).attr('href');
      const time = $(element).find('span.tab-link__note').text().trim();
      // 将标题、链接和图片 URL 存储到对象中
      const newsItem = {
        title: title,
        link: link,
        time: time
      };
      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //蘋果
    //----------------------------------------------------------------------
    ItemsConut = 0
    response = await axios.get(url3);
    $ = cheerio.load(response.data);

    // 使用选择器定位新闻元素
    $('div.post-hot.stories-container').find('div.post-inner').each((index, element) => {
      const title = '壹蘋新聞網-' + $(element).find('h3').text().trim();
      const link = $(element).find('a').attr('href');
      const time = $(element).find('time').text().trim();

      // 将标题、链接和图片 URL 存储到对象中
      const newsItem = {
        title: title,
        link: link,
        time: time
      };

      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //東森新聞
    //----------------------------------------------------------------------
    // response = await axios.get(url4);
    ItemsConut = 0
    response = await axios.get(url4, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
    $ = cheerio.load(response.data);

    // 使用选择器定位新闻元素
    $('div#pc-focus-realtime').find('li').each((index, element) => {
      const title = '東森新聞-' + $(element).find('title-words').attr('title').trim();
      const link = url4.slice(0, -1) + $(element).find('a').attr('href');
      const time = $(element).find('span.small-gray-text.right').text().trim();

      // 将标题、链接和图片 URL 存储到对象中
      const newsItem = {
        title: title,
        link: link,
        time: time
      };

      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //ETtoday新聞
    //----------------------------------------------------------------------
    ItemsConut = 0
    response = await axios.get(url5);
    $ = cheerio.load(response.data);

    // 使用选择器定位新闻元素
    $('div.block_title:contains("即時新聞")').next('.block_content').find('.piece').each((index, element) => {
      const title = 'ETtoday新聞-' + $(element).find('h2.title').text().trim();
      const link = $(element).find('a').attr('href');
      const time = $(element).find('.date').text().trim();

      // 将标题、链接和图片 URL 存储到对象中
      const newsItem = {
        title: title,
        link: link,
        time: time
      };

      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //中央社CNA
    //----------------------------------------------------------------------
    ItemsConut = 0
    response = await axios.get(url6);
    $ = cheerio.load(response.data);

    // 使用选择器定位新闻元素
    $('div.row.paddingRow').find('ul.latesNews li').each((index, element) => {
      const title = '中央社CNA-' + $(element).find('div.title').text().trim();
      const link = url6.slice(0, -1) + $(element).find('a').attr('href');
      const time = $(element).find('span.time').text().trim();
      // 将标题、链接和图片 URL 存储到对象中
      const newsItem = {
        title: title,
        link: link,
        time: time
      };

      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //公視新聞網
    //----------------------------------------------------------------------
    ItemsConut = 0
    response = await axios.get(url7, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
    $ = cheerio.load(response.data);

    // 使用选择器定位新闻元素
    $('div.home-breaking-news').find('div.instant-item').each((index, element) => {
      var title = '公視新聞網-' + $(element).find('h3.tilte-instant-h3').text().trim();
      var link = $(element).find('a').attr('href');
      var time = $(element).find('time').attr('datetime').trim();
      // 将标题、链接和图片 URL 存储到对象中
      const newsItem = {
        title: title,
        link: link,
        time: time
      };

      if (ItemsConut < 10)
        newsItems.push(newsItem);

      console.log("Title: " + newsItem.title);
      console.log("Link: " + newsItem.link);
      console.log("Time: " + newsItem.time);
      console.log("----------------------------------");
      console.log("\n");

      ItemsConut++;
    });

    //----------------------------------------------------------------------
    return newsItems;
  } catch (error) {
    console.error('Error fetching the page:', error);
    throw new Error('Error fetching the page');
  }
};

// axios.get(url)
//   .then(response => {
//     const $ = cheerio.load(response.data);
//     const newsItems = [];

//     // 使用选择器定位新闻元素
//     $('div.boxTitle').each((index, element) => {
//       const title = $(element).find('a').text().trim();
//       const link = $(element).find('a').attr('href');
//       const imgURL = $(element).parent().find('img').attr('src');

//       // 将标题、链接和图片 URL 存储到对象中
//       const newsItem = {
//         title: title,
//         link: link,
//         imgURL: imgURL
//       };

//       // 将对象添加到数组中
//       newsItems.push(newsItem);
//     });

//     // 输出新闻标题、链接和图片 URL
//     newsItems.forEach(newsItem => {
//       console.log("Title: " + newsItem.title);
//       console.log("Link: " + newsItem.link);
//       console.log("Image URL: " + newsItem.imgURL);
//       console.log("\n");
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching the page:', error);
//   });
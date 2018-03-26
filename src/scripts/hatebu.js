let Parser = require('rss-parser');

module.exports = (robot => {
  robot.respond(/(.*)って流行ってるの？/i, res => {
    let parser = new Parser();
    let keyword = res.match[1];
    (async () => {
      let feed = await parser.parseURL('http://b.hatena.ne.jp/search/title?mode=rss&sort=popular&q=' + keyword);
      if (feed.items.length == 0) {
        res.send('全然流行ってないで')
      } else {
        res.send('流行ってるで');
      }
      feed.items.forEach((item, index) => {
        if (index < 3)
          res.send(item.title + ' <' + item.link + '>');
      });
    })()
  });
})

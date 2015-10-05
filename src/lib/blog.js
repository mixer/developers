import FeedReader from "feed-read";
import _ from "lodash";

export default class Blog {
  constructor(url) {
    this.url = url;
  }

  getPosts(cb) {
    return this._getArticlesFromRss(cb);
  }

  _getArticlesFromRss() {
    FeedReader(this.url, function (err, articles) {
      if (err) { console.log(err); }
      return cb(articles.map(function (article) {
        return _.pick(article, [ "title", "author", "link" ]);
      }));
    });
  }
}

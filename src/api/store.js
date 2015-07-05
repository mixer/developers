import Glob from "glob";
import Path from "path";

export default class APIDocumentationStore {
  constructor(path) {
    this.path = path;
    this.documents = {};
  }

  load() {
    let documents = Glob.sync(Path.join(__dirname, this.path, '**/*.js'))
      .map((path) => {
        let clazz = require(path);
        return typeof clazz === "function" ? new clazz() : undefined;
      });

    for (let i in documents) {
      let document = documents[i];
      if (typeof document === "undefined") continue;
      
      let slug = document.slug ? document.slug() : undefined;

      if (slug) {
        this.documents[slug] = document;
      }
    }

    console.log(this.documents);
  }

  findBySlug(slug) {
    return this.documents[slug.toLowerCase()];
  }
}

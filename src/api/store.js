import Glob from "glob";
import Path from "path";

export default class APIDocumentationStore {
  constructor(path) {
    this.path = path;
    this.documents = {};
  }

  load() {
    let documentPaths = Glob.sync(Path.join(__dirname, this.path, '**/*.js'));
    for (let path in documentPaths) {
      let doucmentation = new require(documentPaths[path])();
      this.documents[documentation.slug().toLowerCase()] = documentation;
    }
  }

  findBySlug(slug) {
    return this.documents[slug.toLowerCase()];
  }
}

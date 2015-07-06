import Glob from "glob";
import Path from "path";

export default class APIDocumentationStore {
  static load(path) {
    APIDocumentationStore.documents = {};
    let documents = Glob.sync(Path.join(__dirname, path, '**/*.js'))
      .map((path) => {
        let clazz = require(path);
        return typeof clazz === "function" ? new clazz() : undefined;
      });

    for (let i in documents) {
      let document = documents[i];
      if (typeof document === "undefined") continue;

      let group = document.group ? document.group() : undefined;

      if (group) {
        if (APIDocumentationStore.documents[group] === undefined)
          APIDocumentationStore.documents[group] = [];

        APIDocumentationStore.documents[group].push(document);
      }
    }
  }

  static findByGroup(group) {
    return APIDocumentationStore.documents[group.toLowerCase()];
  }
}

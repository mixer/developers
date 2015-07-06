export default class HTTPCodes {
  static methods() { return [
    { code: 200, msg: "OK", type: "good" },
    { code: 301, msg: "Moved permanently", type: "ok" },
    { code: 302, msg: "Found", type: "ok" },
    { code: 304, msg: "Not modified", type: "ok" },
    { code: 400, msg: "Bad request", type: "fatal" },
    { code: 401, msg: "Unauthorized", type: "fatal" },
    { code: 403, msg: "Forbidden", type: "fatal" },
    { code: 404, msg: "Not found", type: "fatal" },
    { code: 418, msg: "I'm a teapot!", type: "ok" },
    { code: 429, msg: "Rate limited", type: "ok" },
    { code: 500, msg: "Internal server error", type: "fatal" },
    { code: 502, msg: "Not implemented", type: "fatal" },
    { code: 503, msg: "Service unavailable", type: "fatal" },
  ]}

  static infoFor(code) {
    let methods = HTTPCodes.methods();

    for (let i = 0, ii = methods.length; i < ii; i++) {
      let method = methods[i];
      if (method.code === code) return method;
    }

    return undefined;
  }
}

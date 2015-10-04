import * as path from 'path';

export default function (req, res) {
  let location = path.join(__dirname, "../../../app/views" + req.url);
  try {
    if (/\.css$/.exec(location) !== null) res.set("Content-Type", "text/css");
    res.sendFile(location);
  } catch (_) { res.status(404).end() }
}

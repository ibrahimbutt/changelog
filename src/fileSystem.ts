const fs = require("fs");

export default class FileSystem {
  static create(filename: String, content: String): Boolean {
    fs.writeFileSync(filename, content);
    return true;
  }
}

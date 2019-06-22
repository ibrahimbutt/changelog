import FileSystem from "../../src/fileSystem";
const fs = require("fs");

describe("FileSystem", () => {
  describe("#create", () => {
    test("calls fs with 'CHANGELOG.md' and 'feat: device name getter and setter 90010eb'", () => {
      fs.writeFileSync = jest.fn();

      const filename = "CHANGELOG.md";
      const content = "feat: device name getter and setter 90010eb";

      const fileCreated = FileSystem.create(filename, content);

      expect(fileCreated).toBe(true);
      expect(fs.writeFileSync).toHaveBeenCalledWith(filename, content);
    });
  });
});

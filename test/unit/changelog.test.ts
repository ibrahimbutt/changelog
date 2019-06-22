import Changelog from "../../src/changelog";
import ChangelogFormatter from "../../src/changelogFormatter";

const testData = require("../lib/data");

describe("Changelog", () => {
  describe("#content", () => {
    test("calls ChangelogFormatter with commits", () => {
      ChangelogFormatter.format = jest.fn();
      const commits = [{ getDetails: () => testData.commits.first }];

      const changelog = new Changelog(commits, ChangelogFormatter);
      changelog.content();

      expect(ChangelogFormatter.format).toHaveBeenCalledWith(commits);
    });
  });
});

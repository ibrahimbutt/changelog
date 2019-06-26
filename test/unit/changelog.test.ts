import Changelog from "../../src/changelog";
import ChangelogFormatter from "../../src/formatters/changelogFormatter";
import Commit from "../../src/commit";

jest.mock("../../src/formatters/changelogFormatter");

jest.mock("../../src/commit");
Commit.mockImplementation(() => {
  return jest.fn();
});

const testData = require("../lib/data");

describe("Changelog", () => {
  beforeEach(() => {
    ChangelogFormatter.mockClear();
    Commit.mockClear();
  });

  describe("#content", () => {
    test("returns 'the content'", () => {
      const expected = "the content";

      ChangelogFormatter.format = jest.fn(() => expected);
      const commits = [new Commit("")];

      const changelog = new Changelog(commits, ChangelogFormatter);
      const actual = changelog.content();

      expect(actual).toEqual(expected);
    });

    test("returns 'more content'", () => {
      const expected = "more content";

      ChangelogFormatter.format = jest.fn(() => expected);
      const commits = [new Commit("")];

      const changelog = new Changelog(commits, ChangelogFormatter);
      const actual = changelog.content();

      expect(actual).toEqual(expected);
    });
  });
});

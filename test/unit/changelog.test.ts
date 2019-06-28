import Changelog from "../../src/changelog";
import ChangelogFormatter from "../../src/formatters/changelogFormatter";
import Commit from "../../src/commit";

jest.mock("../../src/formatters/changelogFormatter");

jest.mock("../../src/commit", () => {
  return jest.fn();
});

describe("Changelog", () => {
  describe("#content", () => {
    test("returns 'the content'", () => {
      const expected: string = "the content";

      ChangelogFormatter.format = jest.fn(() => expected);
      const commits: Array<Commit> = [new Commit("")];

      const changelog: Changelog = new Changelog(commits, ChangelogFormatter);
      const actual: string = changelog.content();

      expect(actual).toEqual(expected);
    });

    test("returns 'more content'", () => {
      const expected: string = "more content";

      ChangelogFormatter.format = jest.fn(() => expected);
      const commits: Array<Commit> = [new Commit("")];

      const changelog: Changelog = new Changelog(commits, ChangelogFormatter);
      const actual: string = changelog.content();

      expect(actual).toEqual(expected);
    });
  });
});
